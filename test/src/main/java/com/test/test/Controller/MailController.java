package com.test.test.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.OptBoolean;
import com.test.test.Entity.OtpEntity;
import com.test.test.Service.MailService;

import jakarta.mail.MessagingException;

@CrossOrigin
@RestController
public class MailController {
	
	@Autowired
	private MailService mailService;
	
	@CrossOrigin
	@PostMapping("/register/generateOtp/")
	public String sendOtpToMail(@RequestBody OtpEntity otp) {
		return mailService.sendOtp(otp.getEmail());
	}
	
	@CrossOrigin
	@PostMapping("/register/verifyOtp/")
	public String checkOtp(@RequestBody OtpEntity otp) {
		try {
			return mailService.checkOtp(otp.getOtp(), otp.getEmail());
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "Error";
	}
	
	@PostMapping("/forget-password/send-otp")
    public ResponseEntity<String> forgetPassword(@RequestParam String email) {
        String result = mailService.forgetPassSendOtp(email);
        return ResponseEntity.ok(result);
    }
	
	@PostMapping("/forget-password/check-otp")
    public ResponseEntity<?> forgetPasswordCheckOtp(@RequestParam String email, @RequestParam String otp) {
        try {
            boolean result = mailService.forgetPasswordCheckOtp(otp, email);
            if(result) {
            	return ResponseEntity.ok("Success");
            }
            return ResponseEntity.badRequest().body("OTP is invalid or has expired");
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unable to verify OTP");
        }
    }
}
