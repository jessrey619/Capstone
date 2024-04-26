package com.test.test.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.test.Service.MailService;

import jakarta.mail.MessagingException;

@CrossOrigin
@RestController
public class MailController {
	
	@Autowired
	private MailService mailService;
	
	@CrossOrigin
	@PostMapping("/OTPSend/")
	public String sendOtpToMail(@RequestParam("email") String email) {
		return mailService.sendOtp(email);
	}
	
	@CrossOrigin
	@PostMapping("/OTPVerify/")
	public String checkOtp(@RequestParam("otp") String otp, @RequestParam("email") String email) {
	    // Your code here
		try {
			return mailService.checkOtp(otp, email);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "Finished OTP Verification";
	}
}
