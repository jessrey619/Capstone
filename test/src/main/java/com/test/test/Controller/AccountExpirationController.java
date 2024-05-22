 package com.test.test.Controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.test.Entity.AccountExpirationEntity;
import com.test.test.Service.AccountExpirationService;

@RestController
@RequestMapping("/config")
public class AccountExpirationController {

    @Autowired
    private AccountExpirationService accService;

    @PostMapping("/save")
    public ResponseEntity<String> saveAccountExpiration(@RequestBody AccountExpirationEntity accountExpirationEntity) {
    	accService.saveAccountExpiration(accountExpirationEntity);
        return ResponseEntity.ok("Account expiration saved successfully");
    }
    
    @CrossOrigin
    @PostMapping("/setStaffGlobalExpiry")
    public String  setStaffGlobalExpiry(@RequestParam("expirationDate")@DateTimeFormat(pattern = "yyyy-MM-dd") Date expirationDate) {
    	return accService.setStaffGlobalExpiry(expirationDate);
    }

    @CrossOrigin
    @PostMapping("/setStudentGlobalExpiry")
    public String setStudentGlobalExpiry(@RequestParam("expirationDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date expirationDate) {
    	return accService.setStudentGlobalExpiry(expirationDate);
    }
    
    @CrossOrigin
    @PostMapping("/set-schoolyear")
    public String setSchoolYear(@RequestParam String schoolyear) {
    	return accService.setSchoolYear(schoolyear);
    }
    
    @CrossOrigin
    @PostMapping("/set-semester")
    public String setSemester(@RequestParam String semester) {
    	return accService.setSemester(semester);
    }
    
    @CrossOrigin
    @GetMapping("/get-expiration")
    public AccountExpirationEntity getAccountExpiration() {
    	return accService.getAccountExpiration();
    }
}
