package com.test.test.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.test.test.Entity.ApplicantEntity;
import com.test.test.Entity.UserEntity;
import com.test.test.Entity.VehicleEntity;
import com.test.test.Repository.ApplicantRepository;
import com.test.test.Repository.UserRepository;
import com.test.test.Repository.VehicleRepository;

import jakarta.validation.constraints.Email;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class ApplicantService {

	@Autowired
    private ApplicantRepository applicantRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private VehicleRepository vehicleRepository;

	
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

        ApplicantEntity existingApplicant = applicantRepository.findByEmail(applicant.getEmail());
        UserEntity user = userRepository.findByUsername(applicant.getEmail());
        
        if(user == null) {
        	return "User not Found";
        }
        
        if (existingApplicant != null) {
        	
        	user.setDateApplied(new Date());
        	userRepository.save(user);
        	
            // Update existing applicant
            existingApplicant.setFirstName(applicant.getFirstName());
            existingApplicant.setLastName(applicant.getLastName());
            existingApplicant.setMiddleInitial(applicant.getMiddleInitial());
            existingApplicant.setStudentName(applicant.getStudentName());
            existingApplicant.setIdNumber(applicant.getIdNumber());
            existingApplicant.setGradeLevel(applicant.getGradeLevel());
            existingApplicant.setContactNumber(applicant.getContactNumber());
            existingApplicant.setAddress(applicant.getAddress());
            existingApplicant.setVehicleMake(applicant.getVehicleMake());
            existingApplicant.setPlateNo(applicant.getPlateNo());
            existingApplicant.setColor(applicant.getColor());
            existingApplicant.setVehicleType(applicant.getVehicleType());
            existingApplicant.setApplicantid(applicant.getApplicantid());

            existingApplicant.setDatesubmitted(applicant.getDatesubmitted());
            existingApplicant.setVerified(applicant.getVerified());
            existingApplicant.setApproved(applicant.isApproved());
            existingApplicant.setPaid(applicant.isPaid());

            applicantRepository.save(existingApplicant);
            
            
        } else {
            // Create new applicant
        	user.setDateApplied(new Date());
        	applicantRepository.save(applicant);
            userRepository.save(user);
        }
        
        return "Registration Submitted Successfully";
    }
    
    private boolean isValidName(String name) {
        return name.matches("^[a-zA-Z ]+$"); // Checks if the name contains only letters and spaces
    }

//    DONE IN PHOTO CONTROLLER
//    public String uploadRequirements(String email, File orcrimg, File licenseimg) {
//        try {
//            String orname = email + ":orcr";
//            String liname = email + ":license";
//            String or = uploadImageToDrive(orcrimg, orname);
//            String li = uploadImageToDrive(licenseimg, liname);
//            ApplicantEntity applicant = applicantRepository.findByEmail(email);
//            if (applicant != null) {
//                applicant.setOrcrimg(or);
//                applicant.setLicenseimg(li);
//                applicantRepository.save(applicant);
//                return "Images Submitted successfully!" + "ORCR: " + or + "\nLICENSE: " + li;
//            } else {
//                return "Applicant not found!";
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Failed to submit images";
//        }
//    }

    public List<ApplicantEntity> getAllApplicants() {
        return applicantRepository.findAll();
    }

    public ApplicantEntity getApplicantById(String applicantid) {
        return applicantRepository.findByApplicantid(applicantid);
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
        
        if (applicant != null) {
        	if(user != null) {
        		
        		applicant.setApproved(true);
        		
        		user.setAddress(applicant.getAddress());
        		user.setContactNumber(applicant.getContactNumber());
        		user.setIsApproved(true);
        		user.setFname(applicant.getFirstName());
        		user.setMname(applicant.getMiddleInitial());
        		user.setSchoolId(applicant.getIdNumber());
        		user.setSchoolIdOwner(applicant.getStudentName());
        		user.setIsParking(applicant.getIsParking());
        		
        		if(vehicle!=null) {
        			vehicle.setColor(applicant.getColor());
            		vehicle.setPlateNo(applicant.getPlateNo());
            		vehicle.setUsername(email);
            		vehicle.setVehicleMake(applicant.getVehicleMake());
            		vehicle.setVehicleType(applicant.getVehicleType());
        		} else {
        			vehicle = new VehicleEntity();
            		vehicle.setColor(applicant.getColor());
            		vehicle.setPlateNo(applicant.getPlateNo());
            		vehicle.setUsername(email);
            		vehicle.setVehicleMake(applicant.getVehicleMake());
            		vehicle.setVehicleType(applicant.getVehicleType());
            		vehicle.setIsParking(applicant.getIsParking());
            		vehicle.setName(applicant.getFirstName()+" "+applicant.getMiddleInitial()+" "+applicant.getLastName());
            		
        		}
//@TODO TEST THIS LATER
        		vehicleRepository.save(vehicle);
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
}
