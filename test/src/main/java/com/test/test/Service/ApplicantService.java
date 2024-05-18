package com.test.test.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.test.test.Entity.AccountExpirationEntity;
import com.test.test.Entity.ApplicantEntity;
import com.test.test.Entity.UserEntity;
import com.test.test.Entity.VehicleEntity;
import com.test.test.Repository.AccountExpirationRepository;
import com.test.test.Repository.ApplicantRepository;
import com.test.test.Repository.UserRepository;
import com.test.test.Repository.VehicleRepository;

import ch.qos.logback.core.joran.conditional.IfAction;
import jakarta.validation.constraints.Email;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicantService {

	@Autowired
    private ApplicantRepository applicantRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private VehicleRepository vehicleRepository;

	@Autowired
	private AccountExpirationRepository accountExpirationRepository;
	
	@Autowired
	private AccountExpirationService expirationService;
	
//	@UPLOAD PHOTOS WILL BE DONE IN THE PHOTO CONTROLLER
	
//    public String uploadImageToDrive(File file, String name) {
//        // Implement your image upload logic here
//        return ""; // Return the URL of the uploaded image
//    }
	public String verifyCredentials(ApplicantEntity applicant) {
	    ApplicantEntity existingApplicant = applicantRepository.findByEmail(applicant.getEmail());
	    String res = "";

	    if (existingApplicant == null) {
	        // Applicant with the given email does not exist
	        throw new RuntimeException("Applicant not found with email: " + applicant.getEmail());
	    }

	    existingApplicant.setVerified(true);
	    res = "Applicant OR/CR and License Have Been Verified";

	    return res;
	}


    public String registerApplicant(ApplicantEntity applicant) {
    	if (!isValidName(applicant.getFirstName()) || !isValidName(applicant.getLastName()) || !isValidName(applicant.getMiddleInitial())) {
            throw new IllegalArgumentException("Name contains invalid characters");
        }

    	List<ApplicantEntity> applicantsByEmail = applicantRepository.findAllByEmail(applicant.getEmail());
    	List<ApplicantEntity> applicantsByName = 
    			applicantRepository.findAllByFirstNameAndMiddleInitialAndLastName(
    					applicant.getFirstName().toUpperCase(), 
    					applicant.getMiddleInitial().toUpperCase(), 
    					applicant.getLastName().toUpperCase()
    			);
        
        UserEntity user = userRepository.findByUsername(applicant.getEmail());
        AccountExpirationEntity expirationEntity = expirationService.getAccountExpiration();
        Date expirationDate = new Date();
        
        //Checks if user is staff or student and sets expirations accordingly
        if(applicant.getIsStaff()) {
        	expirationDate = expirationEntity.getStaffExpirationDate();
        } else {
        	expirationDate = expirationEntity.getStudentExpirationDate();
        }
        
        //checks if the user 
        if(user == null) {
        	return "User not Found";
        }
        
        //checks for the applications that have the same name as the current applicant
        if(applicantsByName.isEmpty()==false) {

            //gets latest application and checks expiration date
	        boolean expired = applicantsByName.get(applicantsByName.size()-1).getExpirationDate().before(new Date());
        	if(expired == true){
//            	return "user with same identity already sent an application \n";
        		applicant.setRejected(false);
            	applicant.setExpirationDate(expirationDate);
            	applicant.setDatesubmitted(new Date());
            	
            	user.setAddress(applicant.getAddress());
        		user.setContactNumber(applicant.getContactNumber());
        		user.setFname(applicant.getFirstName());
        		user.setMname(applicant.getMiddleInitial());
        		user.setLname(applicant.getLastName());
        		user.setSchoolId(applicant.getIdNumber());
        		user.setSchoolIdOwner(applicant.getStudentName());
        		user.setIsParking(applicant.getIsParking());
        		user.setIsStaff(applicant.getIsStaff());
        		user.setIsEnabled(false);
        		user.setEmail(applicant.getEmail());
        		user.setDateApplied(new Date());
        		user.setUsername(applicant.getEmail());
        		
            	VehicleEntity vehicleEntity = new VehicleEntity();
            	vehicleEntity.setColor(applicant.getColor());
            	vehicleEntity.setIsParking(applicant.getIsParking());
            	vehicleEntity.setName(applicant.getFirstName()+" "+applicant.getMiddleInitial()+" "+applicant.getLastName());
            	vehicleEntity.setPlateNo(applicant.getPlateNo());
            	vehicleEntity.setStickerId(0);
            	vehicleEntity.setUsername(applicant.getEmail());
            	vehicleEntity.setVehicleMake(applicant.getVehicleMake());
            	vehicleEntity.setVehicleType(applicant.getVehicleType());
            		
            	vehicleRepository.save(vehicleEntity);
            	applicantRepository.save(applicant);
                userRepository.save(user);
                return "Registration Submitted Successfully";
            } else {
            	return "User with same Name Already has an Application";
            }

        } 
        
        //checks if there are applicants that have the same email as the user
        else if(applicantsByEmail.isEmpty()==false) {
        	// Set the date to 2025-05-11
        	SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
            Date date = null;
            try {
                date = inputFormat.parse("2025-05-12 00:00:00.0");
            } catch (Exception e) {
                e.printStackTrace();
            }
	         
            //gets latest application and checks expiration date
	         boolean expired = applicantsByEmail.get(applicantsByEmail.size()-1).getExpirationDate().before(new Date() );
	         System.out.println(applicantsByEmail.get(applicantsByEmail.size()-1).getExpirationDate());
        	if(expired == true){
//            	return "user with same identity already sent an application \n";
        		applicant.setRejected(false);
            	applicant.setExpirationDate(expirationDate);
            	user.setDateApplied(new Date());
            	applicant.setDatesubmitted(new Date());
            	applicantRepository.save(applicant);
                userRepository.save(user);
                return "Registration Submitted Successfully";
            } else {
            	return "User Email Already has an Application";
            }
        
        }else {
            // Create new applicant
        	applicant.setRejected(false);
        	applicant.setExpirationDate(expirationDate);
        	applicant.setDatesubmitted(new Date());
        	
        	user.setAddress(applicant.getAddress());
    		user.setContactNumber(applicant.getContactNumber());
    		user.setFname(applicant.getFirstName());
    		user.setMname(applicant.getMiddleInitial());
    		user.setLname(applicant.getLastName());
    		user.setSchoolId(applicant.getIdNumber());
    		user.setSchoolIdOwner(applicant.getStudentName());
    		user.setIsParking(applicant.getIsParking());
    		user.setIsStaff(applicant.getIsStaff());
    		user.setIsEnabled(false);
    		user.setEmail(applicant.getEmail());
    		user.setDateApplied(new Date());
    		user.setUsername(applicant.getEmail());
    		
        	VehicleEntity vehicleEntity = new VehicleEntity();
        	vehicleEntity.setColor(applicant.getColor());
        	vehicleEntity.setIsParking(applicant.getIsParking());
        	vehicleEntity.setName(applicant.getFirstName()+" "+applicant.getMiddleInitial()+" "+applicant.getLastName());
        	vehicleEntity.setPlateNo(applicant.getPlateNo());
        	vehicleEntity.setStickerId(0);
        	vehicleEntity.setUsername(applicant.getEmail());
        	vehicleEntity.setVehicleMake(applicant.getVehicleMake());
        	vehicleEntity.setVehicleType(applicant.getVehicleType());
        		
        	vehicleRepository.save(vehicleEntity);
        	applicantRepository.save(applicant);
            userRepository.save(user);
            return "Registration Submitted Successfully";
        }

    }
    
    private boolean isValidName(String name) {
        return name.matches("^[a-zA-Z ]+$"); // Checks if the name contains only letters and spaces
    }

    public List<ApplicantEntity> getAllApplicants() {
        return applicantRepository.findAll();
    }

    public ApplicantEntity getApplicantById(int applicantid) {
        return applicantRepository.findById(applicantid);
    }

    
//  @TODO may be updated through get by ID instead of email but to be continued...
//  Verification
    public String updateApplicant(String email) {
    	ApplicantEntity applicant = applicantRepository.findByEmail(email);
        UserEntity user = userRepository.findByUsername(email);
        if (applicant != null) {
        	if(user != null) {
        		applicant.setVerified(true);
                applicantRepository.save(applicant);
                user.setIsVerified(applicant.getVerified());
                userRepository.save(user);
                return "Applicant verified status updated successfully!";
        	}
        	else {
        		return "User Account not Found";
        	}
        } else {
            return "Applicant not found!";
        }
    }

//  Payment
    public String updatePaidApplicant(String email) {
        ApplicantEntity applicant = applicantRepository.findByEmail(email);
        UserEntity user = userRepository.findByUsername(email);
        if (applicant != null) {
        	if(user != null) {
        		applicant.setPaid(true);
                applicantRepository.save(applicant);
                user.setIsPaid(true);
                user.setDatePaid(new Date());
                userRepository.save(user);
                return "Applicant payment status updated successfully!";
        	}
        	else {
        		return "User Account not found";
        	}
        } else {
            return "Applicant not found!";
        }
    }

//  Approval
    public String approveApplicant(String email) {
        ApplicantEntity applicant = applicantRepository.findByEmail(email);
        UserEntity user = userRepository.findByUsername(email);
        VehicleEntity vehicle = vehicleRepository.findByUsername(email);
        Optional<AccountExpirationEntity> expirationEntity = accountExpirationRepository.findById(1);
        
        if (applicant != null) {
        	if(user != null) {
        		
        		applicant.setApproved(true);
        		
        		user.setAddress(applicant.getAddress());
        		user.setContactNumber(applicant.getContactNumber());
        		user.setIsApproved(true);
        		user.setFname(applicant.getFirstName());
        		user.setMname(applicant.getMiddleInitial());
        		user.setLname(applicant.getLastName());
        		user.setSchoolId(applicant.getIdNumber());
        		user.setSchoolIdOwner(applicant.getStudentName());
        		user.setIsParking(applicant.getIsParking());
        		user.setIsStaff(applicant.getIsStaff());
        		user.setIsEnabled(true);
        		
        		if(expirationEntity!=null) {
        			if(user.getIsStaff()) {
        				user.setExpirationDate(expirationEntity.get().getStaffExpirationDate());
        			}else {
        				user.setExpirationDate(expirationEntity.get().getStudentExpirationDate());
        			}
        		}
        		
        		if(vehicle!=null) {
        			vehicle.setColor(applicant.getColor());
            		vehicle.setPlateNo(applicant.getPlateNo());
            		vehicle.setUsername(email);
            		vehicle.setVehicleMake(applicant.getVehicleMake());
            		vehicle.setVehicleType(applicant.getVehicleType());
            		vehicle.setIsParking(applicant.getIsParking());
            		vehicle.setName(applicant.getFirstName()+" "+applicant.getMiddleInitial()+" "+applicant.getLastName());
            		vehicle.setStickerId(findMissingStickerId());
            		vehicleRepository.save(vehicle);
        		} else {
        			return "Vehicle with Username not Found";
        		}
        		//@TODO TEST THIS LATER
        		
                applicantRepository.save(applicant);
                userRepository.save(user);
                return "Application approved successfully!";
        	}
        	else {
        		return "User Account not found";
        	}
        } else {
            return "Applicant not found!";
        }
    }
    
    public ApplicantEntity getApplicantByEmail(String email) {
        return applicantRepository.findByEmail(email);
    }
    
    public void rejectApplication(int id) {
    	ApplicantEntity applicantEntity = applicantRepository.findById(id);
    	applicantEntity.setRejected(true);
    	applicantRepository.save(applicantEntity);
    }
    
    public List<ApplicantEntity> searchApplicants(String searchText) {
        return applicantRepository.findByFirstNameOrLastNameOrEmail(searchText.toLowerCase());
    }
    
    
    
//    SUPPORTING FUNCTIONS
    public int findMissingStickerId() {
        // Sort the list based on stickerId
    	
    	List<VehicleEntity> vehicles = (List<VehicleEntity>) vehicleRepository.findAll();    	
        vehicles.sort(Comparator.comparingInt(VehicleEntity::getStickerId));

        // Iterate through the list to find the missing stickerId
        for (int i = 0; i < vehicles.size() - 1; i++) {
            if (vehicles.get(i).getStickerId() != vehicles.get(i + 1).getStickerId() - 1) {
                return vehicles.get(i).getStickerId() + 1;
            }
        }

        // If no missing stickerId is found, return the next available stickerId after the last element
        return vehicles.get(vehicles.size() - 1).getStickerId() + 1;
    }
    
}
