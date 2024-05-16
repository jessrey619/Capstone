package com.test.test.Controller;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.test.test.Service.ApplicantService;
import com.test.test.Service.PhotoService;


@RestController
@RequestMapping("/applicants")
public class ApplicantController {
	
	@Autowired
    private ApplicantService applicantService;
	


	@PostMapping("/register")
    public String insertApplicant(@RequestBody ApplicantEntity applicant) {
        return applicantService.registerApplicant(applicant);
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
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getApplicantByEmail(@PathVariable String email) {
        ApplicantEntity applicant = applicantService.getApplicantByEmail(email);
        if (applicant != null) {
            return ResponseEntity.ok().body(applicant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{applicantid}")
    public ApplicantEntity getApplicantById(@PathVariable String applicantid) {
        return applicantService.getApplicantById(applicantid);
    }
    
    @PutMapping("/updateVerifiedStatus/{email}")
    public String updatePreApprovedStatus(@PathVariable String email) {
        return applicantService.updateApplicant(email);
    }
    
    @PutMapping("/updatePaidStatus/{email}")
    public String updatePaidStatus(@PathVariable String email) {
        return applicantService.updatePaidApplicant(email);
    }
    
    @PutMapping("/approveApplicant/{email}")
    public String approveApplicant(@PathVariable String email) {
        return applicantService.approveApplicant(email);
    }
    
    
}
