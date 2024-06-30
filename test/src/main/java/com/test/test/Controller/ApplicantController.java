package com.test.test.Controller;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.test.test.Entity.ApplicantEntity;
import com.test.test.Repository.ApplicantRepository;
import com.test.test.Service.ApplicantService;
import com.test.test.Service.PhotoService;

import jakarta.mail.MessagingException;


@RestController
@RequestMapping("/applicants")
public class ApplicantController {
	
	@Autowired
    private ApplicantService applicantService;
	
	@Autowired
	private ApplicantRepository applicantRepository;
	

	@CrossOrigin
	@PostMapping("/register")
    public String insertApplicant(@RequestBody ApplicantEntity applicant) {
        return applicantService.registerApplicant(applicant);
    }
	
//	FOR RENEWAL
	@PostMapping("/renew")
    public ResponseEntity<?> renewApplication(@RequestBody ApplicantEntity applicant) {
        boolean result = applicantService.renewApplication(applicant);
        if (result) {
            return ResponseEntity.ok("Application renewed successfully");
        } else {
            return ResponseEntity.status(400).body("Application renewal failed");
        }
    }
	
	@GetMapping("/last-approved/{email}")
    public ResponseEntity<ApplicantEntity> getLastApprovedApplication(@PathVariable String email) {
        List<ApplicantEntity> applicationsByEmail = applicantRepository.findAllByEmail(email);
        ApplicantEntity latestApprovedApplication = null;

        // Iterate from the last item to the first
        for (int i = applicationsByEmail.size() - 1; i >= 0; i--) {
            ApplicantEntity application = applicationsByEmail.get(i);
            if (application.isApproved()) {
                latestApprovedApplication = application;
                break; // Exit the loop once the latest approved application is found
            }
        }

        if (latestApprovedApplication != null) {
            return ResponseEntity.ok(latestApprovedApplication);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
//    @PostMapping("/uploadReq")
//    public String uploadRequirementsApplicant(@RequestParam String email, @RequestParam("orcrimg") MultipartFile orcrimg, @RequestParam("licenseimg") MultipartFile licenseimg) throws IOException, GeneralSecurityException, IllegalStateException, java.io.IOException {
//    	File tmpor = File.createTempFile("temp", null);
//    	File tmpli = File.createTempFile("temp", null);
//    	orcrimg.transferTo(tmpor);
//    	licenseimg.transferTo(tmpli);
//    	return applicantService.save(email, tmpor, tmpli);
//    }
    @CrossOrigin
    @GetMapping("/all")
    public List<ApplicantEntity> getAllApplicants() {
        return applicantService.getAllApplicants();
    }
    
    @CrossOrigin
    @GetMapping("/get-all-by-email/{email}")
    public List<ApplicantEntity> getAllByEmailEntity(@PathVariable String email){
    	return applicantService.getApplicantByEmail(email);
    }
    
    
    @CrossOrigin
    @GetMapping("/get-by-email/{email}")
    public ResponseEntity<?> getApplicantByEmail(@PathVariable String email) {
        List<ApplicantEntity> applicants = applicantService.getApplicantByEmail(email);
        ApplicantEntity applicant;
        if(applicants.size()>1) {
        	applicant = applicants.get(applicants.size()-1);
        } else {
        	applicant = applicants.get(0);
        }
         
        if (applicant != null) {
            return ResponseEntity.ok().body(applicant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<?> getApplicantById(@PathVariable int id) {
        ApplicantEntity applicant = applicantService.getApplicantById(id);
        if (applicant != null) {
            return ResponseEntity.ok().body(applicant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @CrossOrigin
    @PutMapping("/updateVerifiedStatus/{email}")
    public String updatePreApprovedStatus(@PathVariable String email) throws MessagingException {
        return applicantService.updateApplicant(email);
    }
    
    @CrossOrigin
    @PutMapping("/updatePaidStatus/{email}")
    public String updatePaidStatus(@PathVariable String email) throws MessagingException {
        return applicantService.updatePaidApplicant(email);
    }
    
    @CrossOrigin
    @PutMapping("/approveApplicant/{email}")
    public String approveApplicant(@PathVariable String email) throws MessagingException {
        return applicantService.approveApplicant(email);
    }
    
    @CrossOrigin
    @PostMapping("/rejectApplicant")
    private ResponseEntity<String> rejectApplication(@RequestParam String email, @RequestParam String message, @RequestParam String rejectionType) throws MessagingException {
        try {
            applicantService.rejectApplication(email, message, rejectionType);
            return ResponseEntity.ok("Application rejected successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to reject application: " + e.getMessage());
        }
    }

    @CrossOrigin
    @GetMapping("/search")
    public List<ApplicantEntity> searchApplicants(@RequestParam String searchText) {
        return applicantService.searchApplicants(searchText);
    }
    
    @CrossOrigin
    @PutMapping("/resend-update-status")
    public ResponseEntity<ApplicantEntity> reuploadUpdateStatus(@RequestParam String email) {
        ApplicantEntity updatedApplicant = applicantService.reuploadUpdateStatus(email);
        return ResponseEntity.ok(updatedApplicant);
    }

}
