 package com.test.test.Controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
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
    
    @PostMapping("/setStaffGlobalExpiry")
    public void setStaffGlobalExpiry(@RequestParam("expirationDate")@DateTimeFormat(pattern = "yyyy-MM-dd") Date expirationDate) {
    	accService.setStaffGlobalExpiry(expirationDate);
    }

    @PostMapping("/setStudentGlobalExpiry")
    public void setStudentGlobalExpiry(@RequestParam("expirationDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date expirationDate) {
    	accService.setStudentGlobalExpiry(expirationDate);
    }
}
