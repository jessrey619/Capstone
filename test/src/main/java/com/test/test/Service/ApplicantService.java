package com.test.test.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.weaving.DefaultContextLoadTimeWeaver;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.event.PublicInvocationEvent;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.test.test.Entity.AccountExpirationEntity;
import com.test.test.Entity.ApplicantEntity;
import com.test.test.Entity.EmployeeEntity;
import com.test.test.Entity.UserEntity;
import com.test.test.Entity.VehicleEntity;
import com.test.test.Repository.AccountExpirationRepository;
import com.test.test.Repository.ApplicantRepository;
import com.test.test.Repository.EmployeeRepository;
import com.test.test.Repository.UserRepository;
import com.test.test.Repository.VehicleRepository;

import ch.qos.logback.core.joran.conditional.IfAction;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
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
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ApplicantService {

	@Autowired
    private ApplicantRepository applicantRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private VehicleRepository vehicleRepository;

	@Autowired
	private AccountExpirationRepository accountExpirationRepository;
	
	@Autowired
	private AccountExpirationService expirationService;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
//	@UPLOAD PHOTOS WILL BE DONE IN THE PHOTO CONTROLLER
	
//    public String uploadImageToDrive(File file, String name) {
//        // Implement your image upload logic here
//        return ""; // Return the URL of the uploaded image
//    }
	public String verifyCredentials(ApplicantEntity applicant) {
	    List<ApplicantEntity> existingApplicants = applicantRepository.findAllByEmail(applicant.getEmail());
	    String res = "";
	    ApplicantEntity existingApplicant;
	    
	    if(existingApplicants.size()>0) {
	    	existingApplicant = existingApplicants.get(existingApplicants.size()-1);
	    }else {
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
	    EmployeeEntity employeeApplicant = employeeRepository.findByUsername(applicant.getEmail());
	    
//	    TO BE CONTINUED
	    
	    AccountExpirationEntity expirationEntity = expirationService.getAccountExpiration();
	    Date expirationDate = new Date();
	    
	    if (applicant.getIsStaff()) {
	        expirationDate = expirationEntity.getStaffExpirationDate();
	    } else {
	        expirationDate = expirationEntity.getStudentExpirationDate();
	    }
	    
	    if (user == null) {
	        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not Found");
	    }
	    
	    if (!applicantsByName.isEmpty()) {
	    	boolean expired = applicantsByName.get(applicantsByName.size() - 1).getExpirationDate().before(new Date());
	        if (applicantsByName.get(applicantsByName.size() - 1).isRejected() || expired) {
	            processApplicant(applicant, user, expirationDate);
	            return "Registration Submitted Successfully";
	        }
	       else {
	            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User with same Name Already has an Application");
	        }
	    } else if (!applicantsByEmail.isEmpty()) {
	    	boolean expired = applicantsByEmail.get(applicantsByEmail.size() - 1).getExpirationDate().before(new Date());
	        if (applicantsByEmail.get(applicantsByEmail.size() - 1).isRejected() || expired) {
	            processApplicant(applicant, user, expirationDate);
	            return "Registration Submitted Successfully";
	        }
	        else {
	            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User Email Already has an Application");
	        }
	    } else {
	        processApplicant(applicant, user, expirationDate);
	        return "Registration Submitted Successfully";
	    }
	}

	private void processApplicant(ApplicantEntity applicant, UserEntity user, Date expirationDate) {
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
	    List<VehicleEntity> vehicles = vehicleRepository.findByPlateNo(applicant.getPlateNo());
	    
	    if (vehicles != null && !vehicles.isEmpty()) {
	        vehicleEntity = vehicles.get(0);
	        if (!vehicleEntity.getName().equalsIgnoreCase(applicant.getFirstName() + " " + applicant.getMiddleInitial() + " " + applicant.getLastName())) {
	            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Vehicle Belongs to Someone Else Please Contact School");
	        }
	    }
	    
	    vehicleEntity.setColor(applicant.getColor());
	    vehicleEntity.setIsParking(applicant.getIsParking());
	    vehicleEntity.setName(applicant.getFirstName() + " " + applicant.getMiddleInitial() + " " + applicant.getLastName());
	    vehicleEntity.setPlateNo(applicant.getPlateNo());
	    vehicleEntity.setStickerId(0);
	    vehicleEntity.setUsername(applicant.getEmail());
	    vehicleEntity.setVehicleMake(applicant.getVehicleMake());
	    vehicleEntity.setVehicleType(applicant.getVehicleType());
	    vehicleEntity.setExpirationDate(expirationDate);
	    
	    vehicleRepository.save(vehicleEntity);
	    applicantRepository.save(applicant);
	    userRepository.save(user);
	}
    private boolean isValidName(String name) {
        return name.matches("^[a-zA-Z ]+$"); // Checks if the name contains only letters and spaces
    }
    
// FOR RENEWAL
    public ApplicantEntity getLastApprovedApplication(String email) {
        List<ApplicantEntity> applicationsByEmail = applicantRepository.findAllByEmail(email);
        ApplicantEntity latestApprovedApplication = null;

        // Iterate from the last item to the first
        for (int i = applicationsByEmail.size() - 1; i >= 0; i--) {
            ApplicantEntity application = applicationsByEmail.get(i);
            if (application.isApproved()) {
                latestApprovedApplication = application;
                
                break; // Exit the loop once the latest approved application is found
            } 
//          checks if the user still has a pending Application case and if there is, it will not add another
            else if(application.isRejected() == false && application.isApproved()==false) {
            	break;
            }
        }
        
        return latestApprovedApplication;
    }
    
    public boolean renewApplication(ApplicantEntity applicant) {
    	UserEntity userApplicant = userRepository.findByUsername(applicant.getEmail());
    	EmployeeEntity employeeApplicant = employeeRepository.findByUsername(applicant.getEmail());
    	
    	AccountExpirationEntity expirationEntity = expirationService.getAccountExpiration();
	    Date expirationDate = new Date();
	    
	    if (applicant.getIsStaff()) {
	        expirationDate = expirationEntity.getStaffExpirationDate();
	    } else {
	        expirationDate = expirationEntity.getStudentExpirationDate();
	    }
    	
    	if(userApplicant!=null) {
    	    ApplicantEntity renewApplicant = new ApplicantEntity();
    	    
    	    renewApplicant.setRejected(false);
    	    renewApplicant.setExpirationDate(expirationDate);
    	    renewApplicant.setDatesubmitted(new Date());
    	    
    	    renewApplicant.setAddress(applicant.getAddress());
    	    renewApplicant.setContactNumber(applicant.getContactNumber());
    	    renewApplicant.setFirstName(applicant.getFirstName());
    	    renewApplicant.setMiddleInitial(applicant.getMiddleInitial());
    	    renewApplicant.setLastName(applicant.getLastName());
    	    renewApplicant.setIdNumber(applicant.getIdNumber());
    	    renewApplicant.setStudentName(applicant.getStudentName());
    	    renewApplicant.setIsParking(applicant.getIsParking());
    	    renewApplicant.setIsStaff(applicant.getIsStaff());
    	    renewApplicant.setEmail(applicant.getEmail());
    	    renewApplicant.setGradeLevel(applicant.getGradeLevel());
    	    
    	    renewApplicant.setColor(applicant.getColor());
    	    renewApplicant.setColor(applicant.getColor());
    	    renewApplicant.setIsParking(applicant.getIsParking());
    	    renewApplicant.setPlateNo(applicant.getPlateNo());
    	    renewApplicant.setVehicleMake(applicant.getVehicleMake());
    	    renewApplicant.setVehicleType(applicant.getVehicleType());
    	    renewApplicant.setExpirationDate(expirationDate);
    	    
    	    
    	    
    	    userApplicant.setAddress(applicant.getAddress());
    	    userApplicant.setContactNumber(applicant.getContactNumber());
    	    userApplicant.setFname(applicant.getFirstName());
    	    userApplicant.setMname(applicant.getMiddleInitial());
    	    userApplicant.setLname(applicant.getLastName());
    	    userApplicant.setSchoolId(applicant.getIdNumber());
    	    userApplicant.setSchoolIdOwner(applicant.getStudentName());
    	    userApplicant.setIsParking(applicant.getIsParking());
    	    userApplicant.setIsStaff(applicant.getIsStaff());
    	    userApplicant.setIsEnabled(false);
    	    userApplicant.setEmail(applicant.getEmail());
    	    userApplicant.setDateApplied(new Date());
    	    userApplicant.setUsername(applicant.getEmail());
    	    
    	    VehicleEntity vehicleEntity = new VehicleEntity();
    	    List<VehicleEntity> vehicles = vehicleRepository.findByPlateNo(applicant.getPlateNo());
    	    
    	    if (vehicles != null && !vehicles.isEmpty()) {
    	        vehicleEntity = vehicles.get(0);
    	        if (!vehicleEntity.getName().equalsIgnoreCase(applicant.getFirstName() + " " + applicant.getMiddleInitial() + " " + applicant.getLastName())) {
    	            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Vehicle Belongs to Someone Else Please Contact School");
    	        }
    	    }
    	    
    	    vehicleEntity.setColor(applicant.getColor());
    	    vehicleEntity.setIsParking(applicant.getIsParking());
    	    vehicleEntity.setName(applicant.getFirstName() + " " + applicant.getMiddleInitial() + " " + applicant.getLastName());
    	    vehicleEntity.setPlateNo(applicant.getPlateNo());
    	    vehicleEntity.setUsername(applicant.getEmail());
    	    vehicleEntity.setVehicleMake(applicant.getVehicleMake());
    	    vehicleEntity.setVehicleType(applicant.getVehicleType());
    	    vehicleEntity.setExpirationDate(expirationDate);
    	    
    	    vehicleRepository.save(vehicleEntity);
    	    applicantRepository.save(renewApplicant);
    	    userRepository.save(userApplicant);
    	    
    	    return true;
    	} else if(employeeApplicant!=null) {
    		applicant.setRejected(false);
    	    applicant.setExpirationDate(expirationDate);
    	    applicant.setDatesubmitted(new Date());
    	    
    	    ApplicantEntity renewApplicant = new ApplicantEntity();
    	    
    	    renewApplicant.setAddress(applicant.getAddress());
    	    renewApplicant.setContactNumber(applicant.getContactNumber());
    	    renewApplicant.setFirstName(applicant.getFirstName());
    	    renewApplicant.setMiddleInitial(applicant.getMiddleInitial());
    	    renewApplicant.setLastName(applicant.getLastName());
    	    renewApplicant.setIdNumber(applicant.getIdNumber());
    	    renewApplicant.setStudentName(applicant.getStudentName());
    	    renewApplicant.setIsParking(applicant.getIsParking());
    	    renewApplicant.setIsStaff(applicant.getIsStaff());
    	    renewApplicant.setEmail(applicant.getEmail());

    	    employeeApplicant.setAddress(applicant.getAddress());
    	    employeeApplicant.setContactNumber(applicant.getContactNumber());
    	    employeeApplicant.setFname(applicant.getFirstName());
    	    employeeApplicant.setMname(applicant.getMiddleInitial());
    	    employeeApplicant.setLname(applicant.getLastName());
    	    employeeApplicant.setSchoolId(applicant.getIdNumber());
    	    employeeApplicant.setSchoolIdOwner(applicant.getStudentName());
    	    employeeApplicant.setIsParking(applicant.getIsParking());
    	    employeeApplicant.setIsStaff(applicant.getIsStaff());
    	    employeeApplicant.setIsEnabled(false);
    	    employeeApplicant.setEmail(applicant.getEmail());
    	    employeeApplicant.setDateApplied(new Date());
    	    employeeApplicant.setUsername(applicant.getEmail());
    	    
    	    VehicleEntity vehicleEntity = new VehicleEntity();
    	    List<VehicleEntity> vehicles = vehicleRepository.findByPlateNo(applicant.getPlateNo());
    	    
    	    if (vehicles != null && !vehicles.isEmpty()) {
    	        vehicleEntity = vehicles.get(0);
    	        if (!vehicleEntity.getName().equalsIgnoreCase(applicant.getFirstName() + " " + applicant.getMiddleInitial() + " " + applicant.getLastName())) {
    	            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Vehicle Belongs to Someone Else Please Contact School");
    	        }
    	    }
    	    
    	    vehicleEntity.setColor(applicant.getColor());
    	    vehicleEntity.setIsParking(applicant.getIsParking());
    	    vehicleEntity.setName(applicant.getFirstName() + " " + applicant.getMiddleInitial() + " " + applicant.getLastName());
    	    vehicleEntity.setPlateNo(applicant.getPlateNo());
    	    vehicleEntity.setUsername(applicant.getEmail());
    	    vehicleEntity.setVehicleMake(applicant.getVehicleMake());
    	    vehicleEntity.setVehicleType(applicant.getVehicleType());
    	    vehicleEntity.setExpirationDate(expirationDate);
    	    
    	    vehicleRepository.save(vehicleEntity);
    	    applicantRepository.save(renewApplicant);
    	    userRepository.save(userApplicant);
    	    
    	    return true;
    	} else {
    		return false;
    	}
    }
    
    

    public List<ApplicantEntity> getAllApplicants() {
        return applicantRepository.findAll();
    }

    public ApplicantEntity getApplicantById(int applicantid) {
        return applicantRepository.findById(applicantid);
    }

    
//  @TODO may be updated through get by ID instead of email but to be continued...
//  Verification
    public String updateApplicant(String email) throws MessagingException {
    	ApplicantEntity applicant = applicantRepository.findByEmail(email);
    	
        UserEntity user = userRepository.findByUsername(email);
        EmployeeEntity employeeApplicant = employeeRepository.findByUsername(email);
        
        
        if (applicant != null) {
        	if(user != null) {
        		applicant.setVerified(true);
                applicantRepository.save(applicant);
                user.setIsVerified(applicant.getVerified());
                userRepository.save(user);
                
                String fname = user.getFname();
                
                String message = "Your ORCR and license have been approved. You may now proceed with the payment.";
                String subject = "Vehicle Registration: ORCR and LICENSE Verified";
                sendEmail(email, fname, message, subject);
                return "Applicant verified status updated successfully!";
        	} 
            else if (employeeApplicant!= null) {
            	applicant.setVerified(true);
                applicantRepository.save(applicant);
                employeeApplicant.setIsVerified(applicant.getVerified());
                userRepository.save(user);
                
                String fname = employeeApplicant.getFname();
                
                String message = "Your ORCR and license have been approved. You may now proceed with the payment.";
                String subject = "Vehicle Registration: ORCR and LICENSE Verified";
                sendEmail(email, fname, message, subject);
                return "Applicant verified status updated successfully!";
            }
        	else {
        		return "User Account not Found";
        	}
        } 
        else {
            return "Applicant not found!";
        }
    }
    
    private void sendEmail(String email, String fname, String message, String subject) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        // Set recipient
        mimeMessageHelper.setTo(email);
        // Set email subject
        mimeMessageHelper.setSubject(subject);
        // Set email content
        String messageContent = "<html><body><h2>Good day, " + fname + "</h2>" +
                                "<h4>" + message + "</h4>" +
                                "<br>" +
                                "<h4>Best regards,</h4>" +
                                "<h4><i>VehicleVista</i></h4></body></html>";
        mimeMessageHelper.setText(messageContent, true); // Enable HTML
        // Send email
        javaMailSender.send(mimeMessage);
    }

//  Payment
    public String updatePaidApplicant(String email) throws MessagingException {
        ApplicantEntity applicant = applicantRepository.findByEmail(email);

        EmployeeEntity employeeApplicant = employeeRepository.findByUsername(email);
        UserEntity user = userRepository.findByUsername(email);
        if (applicant != null) {
        	if(user != null) {
        		applicant.setPaid(true);
                applicantRepository.save(applicant);
                user.setIsPaid(true);
                user.setDatePaid(new Date());
                userRepository.save(user);
                String fname = user.getFname();
                
                String message = "Your Payment has been Verified. Final Approval Pending.";
                String subject = "Vehicle Registration: Payment Verified";
                sendEmail(email, fname, message, subject);
                
                return "Applicant payment status updated successfully!";
        	}
        	else if(employeeApplicant!=null) {
        		applicant.setPaid(true);
                applicantRepository.save(applicant);
                employeeApplicant.setIsPaid(true);
                employeeApplicant.setDatePaid(new Date());
                employeeRepository.save(employeeApplicant);
                String fname = employeeApplicant.getFname();
                
                String message = "Your Payment has been Verified. Final Approval Pending.";
                String subject = "Vehicle Registration: Payment Verified";
                sendEmail(email, fname, message, subject);
                
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
    public String approveApplicant(String email) throws MessagingException {
    	List<ApplicantEntity> applicants = applicantRepository.findAllByEmail(email);
    	
    	VehicleEntity vehicle = null;
    	
        ApplicantEntity applicant = applicants.get(applicants.size()-1);
        UserEntity user = userRepository.findByUsername(email);
        EmployeeEntity employeeApplicant = employeeRepository.findByUsername(email);
        
        if(user!=null) {
        	vehicle = vehicleRepository.findByUsername(email);
        }
        if(employeeApplicant!=null) {
        	vehicle = new VehicleEntity();
        	
        }
         
        
        List<AccountExpirationEntity> expirations= accountExpirationRepository.findAll();
        AccountExpirationEntity expirationEntity = expirations.get(0);

        if (applicants.isEmpty()==false) {
        	if(applicant.isRejected()) {
            	return "Application was Rejected";
            }
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
        				user.setExpirationDate(expirationEntity.getStaffExpirationDate());
        			}else {
        				user.setExpirationDate(expirationEntity.getStudentExpirationDate());
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
        		String fname = user.getFname();
                
                String message = "Congratulations, Your Application has been approved.";
                String subject = "Vehicle Registration: Application has been Approved";
                sendEmail(email, fname, message, subject);
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
    
    public List<ApplicantEntity> getApplicantByEmail(String email) {
        return applicantRepository.findAllByEmail(email);
    }
    
    public void rejectApplication(String email, String message, String rejectionType) throws Exception {
    	List<ApplicantEntity> applicants = applicantRepository.findAllByEmail(email);
    	ApplicantEntity applicantEntity = applicants.get(applicants.size()-1);
    	if(applicants.size()==0) {
    		throw new Exception();
    	}
    	if(rejectionType.equals("orcr")) {
    		applicantEntity.setResendORCR(true);
    	} else if (rejectionType.equals("license")) {
    		applicantEntity.setResendLicense(true);
		} else if (rejectionType.equals("proof")) {
    		applicantEntity.setResendProof(true);
		} else if (rejectionType.equals("overall")) {
			applicantEntity.setRejected(true);
		}
    	applicantRepository.save(applicantEntity);
    	String subject = "Rejected Application"; 
    	
    	sendMail(email, applicantEntity.getFirstName(), message, subject);
    }
    
    public List<ApplicantEntity> searchApplicants(String searchText) {
        return applicantRepository.findByFirstNameOrLastNameOrEmail(searchText.toLowerCase());
    }
    
    public List<VehicleEntity> findByPlateNo(String plateNo) {
    	return vehicleRepository.findByPlateNo(plateNo);
    }
    
    public ApplicantEntity reuploadUpdateStatus(String email) {
    	List<ApplicantEntity> applicants = applicantRepository.findAllByEmail(email);
    	ApplicantEntity applicantEntity = applicants.get(applicants.size()-1);
    	
    	applicantEntity.setResendLicense(false);
    	applicantEntity.setResendORCR(false);
    	applicantEntity.setResendProof(false);
    	
    	return applicantRepository.save(applicantEntity);
    }
    
    
    
    
//    SUPPORTING FUNCTIONS
    public int findMissingStickerId() {
        // Fetch all vehicle entities
        List<VehicleEntity> vehicles = vehicleRepository.findAll();

        // Create a set to store the present sticker IDs
        Set<Integer> presentStickerIds = new HashSet<>();
        for (VehicleEntity vehicle : vehicles) {
            presentStickerIds.add(vehicle.getStickerId());
        }

        // Find the smallest sticker ID and the largest sticker ID in the list
        int minStickerId = Integer.MAX_VALUE;
        int maxStickerId = Integer.MIN_VALUE;
        for (int stickerId : presentStickerIds) {
            if (stickerId < minStickerId) {
                minStickerId = stickerId;
            }
            if (stickerId > maxStickerId) {
                maxStickerId = stickerId;
            }
        }

        // Iterate through the range of sticker IDs to find the first missing one
        for (int stickerId = minStickerId; stickerId <= maxStickerId; stickerId++) {
            if (!presentStickerIds.contains(stickerId)) {
                return stickerId;
            }
        }

        // If no missing stickerId is found, return the next available stickerId after the last element
        return maxStickerId + 1;
    }
    
    private void sendMail(String email,String fname, String message, String subject) throws MessagingException{
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
		mimeMessageHelper.setTo(email);
		mimeMessageHelper.setSubject(subject);
		String messageContent = "<html><body><h2>Good day, " + fname + "</h2>" +
                "<h4>" + message + "</h4>" +
                "<br>" +
                "<h4>Best regards,</h4>" +
                "<h4><i>VehicleVista</i></h4></body></html>";
        //@TODO We can Edit the Text Later On 
		mimeMessageHelper.setText(messageContent, true);
		javaMailSender.send(mimeMessage);
	}
}

