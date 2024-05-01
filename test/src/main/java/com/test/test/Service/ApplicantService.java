package com.test.test.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.test.Entity.ApplicantEntity;
import com.test.test.Repository.ApplicantRepository;

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
        if (existingApplicant != null) {
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

            existingApplicant.setDatesubmitted(applicant.getDatesubmitted());
            existingApplicant.setDateDay(applicant.getDateDay());
            existingApplicant.setVerified(applicant.getVerified());
            existingApplicant.setApproved(applicant.isApproved());
            existingApplicant.setPaid(applicant.isPaid());

            applicantRepository.save(existingApplicant);
            
        } else {
            // Create new applicant
        	applicantRepository.save(applicant);
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

    public String updateApplicant(String applicantid) {
        ApplicantEntity applicant = applicantRepository.findByApplicantid(applicantid);
        if (applicant != null) {
            applicant.setVerified(true);
            applicantRepository.save(applicant);
            return "Applicant verified status updated successfully!";
        } else {
            return "Applicant not found!";
        }
    }

    public String updatePaidApplicant(String applicantid) {
        ApplicantEntity applicant = applicantRepository.findByApplicantid(applicantid);
        if (applicant != null) {
            applicant.setPaid(true);
            applicantRepository.save(applicant);
            return "Applicant payment status updated successfully!";
        } else {
            return "Applicant not found!";
        }
    }

    public String approveApplicant(String applicantid) {
        ApplicantEntity applicant = applicantRepository.findByApplicantid(applicantid);
        if (applicant != null) {
            applicant.setApproved(true);
            applicantRepository.save(applicant);
            return "Application approved successfully!";
        } else {
            return "Applicant not found!";
        }
    }
}
