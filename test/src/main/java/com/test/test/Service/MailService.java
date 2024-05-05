package com.test.test.Service;

import java.security.SecureRandom;
import java.util.Calendar;
import java.util.Date;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.test.test.Entity.OtpEntity;
import com.test.test.Entity.Role;
import com.test.test.Entity.UserEntity;
import com.test.test.Repository.OtpRepository;
import com.test.test.Repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
    private OtpRepository otpRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public String sendOtp (String email) {
		String otp = generateOtp(email);
		if(userRepository.findByUsername(modifyEmail(email))!=null) {
			return "Email Already Verified";
		} else {
			try {
				sendOtpToMail(email, otp);
				return "OTP Sent Successfully";
			}catch (MessagingException e) {
				throw new RuntimeException("Unable to send OTP");
			}
		}
			
	}
	
	public String forgetPassSendOtp (String email) {
		String otp = generateOtp(email);
		if(userRepository.findByUsername(modifyEmail(email))!=null) {
			return "Email Already Verified";
		} else {
			try {
				sendForgetPassOtpToMail(email, otp);
				return "OTP Sent Successfully";
			}catch (MessagingException e) {
				throw new RuntimeException("Unable to send OTP");
			}
		}
			
	}
	
	private String generateOtp(String email) {
	    OtpEntity existingOtp = otpRepository.findByEmail(email);
	    
	    SecureRandom random = new SecureRandom();
        String otp = String.valueOf(Math.abs(100000 + random.nextInt(900000)));
        String hashOtp = hash(otp);

	    if (existingOtp == null || existingOtp.getIsUsed() || isExpired(existingOtp.getExpirationDate())) {
	        // Generate new OTP
	        Date date = new Date();
	        Calendar calendar = Calendar.getInstance();
	        calendar.setTime(date);
	        calendar.add(Calendar.MINUTE, 5);
	        Date expirationDate = calendar.getTime();

	        if (existingOtp == null) {
	            existingOtp = new OtpEntity();
	            existingOtp.setEmail(email);
	        }

	        existingOtp.setOtp(hashOtp);
	        existingOtp.setIsUsed(false);
	        existingOtp.setExpirationDate(expirationDate);

	        otpRepository.save(existingOtp);

	    } else {
	        // Update expiration date
	        Date date = new Date();
	        Calendar calendar = Calendar.getInstance();
	        calendar.setTime(date);
	        calendar.add(Calendar.MINUTE, 5);
	        Date expirationDate = calendar.getTime();

	        existingOtp.setOtp(hashOtp);
	        existingOtp.setExpirationDate(expirationDate);
	        otpRepository.save(existingOtp);
	        
	    }
	    return otp;
	}


	private boolean isExpired(Date expirationDate) {
	    Date currentDate = new Date();
	    return expirationDate.before(currentDate);
	}


	private String hash(String plainText){
		return BCrypt.hashpw(plainText, BCrypt.gensalt());
	}
	
	
	private void sendOtpToMail(String email, String otp) throws MessagingException{
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
		mimeMessageHelper.setTo(email);
		mimeMessageHelper.setSubject("Email Verification OTP");
		
        //@TODO We can Edit the Text Later On 
		mimeMessageHelper.setText("Your Verification Code is "+ otp+"");
		javaMailSender.send(mimeMessage);
	}
	
	private void sendForgetPassOtpToMail(String email, String otp) throws MessagingException{
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
		mimeMessageHelper.setTo(email);
		mimeMessageHelper.setSubject("Forgot Password OTP");
		
        //@TODO We can Edit the Text Later On 
		mimeMessageHelper.setText("Your Verification Code is "+ otp+"");
		javaMailSender.send(mimeMessage);
	}
	
	
	
	//USE LATER WHEN CHECKING FOR OTP :)
	public String checkOtp(String otp, String email) throws MessagingException{
		String res ="";
		Date currentDate = new Date(); 
		
		OtpEntity user = otpRepository.findByEmail(email);
		String hashedOtp = user.getOtp();
		
		if(user.getExpirationDate().after(currentDate)) {
			if (BCrypt.checkpw(otp, hashedOtp)) {
				if(user.getIsUsed()==false) {
					res = "Success";
					//Email to Confirm Verification along with default username and password of user
					
					//Make a new UserAccount
					UserEntity newUser = new UserEntity();
					String password = generatePassword();
					newUser.setEmail(email);
					newUser.setUsername(email);
					newUser.setPassword(hash(password));
					newUser.setRole(Role.USER);
					userRepository.save(newUser);					
					
					user.setIsUsed(true);
					otpRepository.save(user);
					
					MimeMessage mimeMessage = javaMailSender.createMimeMessage();
					MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
					mimeMessageHelper.setTo(email);
					mimeMessageHelper.setSubject("Confirmation Email of Verification");
					//We can Edit the Text Later On
					mimeMessageHelper.setText("Email is Verified and here are your login credentials: \n"
							+ "Username: "+newUser.getUsername()+"\n"
									+ "Password: "+password+"");
					
					javaMailSender.send(mimeMessage);
				}
				else {
					res = "code already used please send again";
				}
			}
			else
				res = "Code Mismatch";
		} else {
			res = "Code has Already Expired";
		}
		System.out.print(res);
		return res;
	}
	
	
	
	public String forgetPasswordCheckOtp(String otp, String email) throws MessagingException{
		String res ="";
		Date currentDate = new Date(); 
		
		OtpEntity user = otpRepository.findByEmail(email);
		String hashedOtp = user.getOtp();
		
		if(user.getExpirationDate().after(currentDate)) {
			if (BCrypt.checkpw(otp, hashedOtp)) {
				if(user.getIsUsed()==false) {
					res = "Success";
				}
				else {
					res = "code already used please send again";
				}
			}
			else
				res = "Code Mismatch";
		} else {
			res = "Code has Already Expired";
		}
		System.out.print(res);
		return res;
	}
	
	

	
	//	method used to remove the address in the email for username purposes
	private String modifyEmail(String email) {
	    int atIndex = email.indexOf('@');
	    if (atIndex != -1) {
	        return email.substring(0, atIndex);
	    }
	    return email; // Return the original email if no @ symbol is found
	}
	
	

	// Character Password Generator
	private static String generatePassword() {
	    String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    SecureRandom random = new SecureRandom();
	    StringBuilder sb = new StringBuilder(8);
	    for (int i = 0; i < 8; i++) {
	        int randomIndex = random.nextInt(CHARACTERS.length());
	        char randomChar = CHARACTERS.charAt(randomIndex);
	        sb.append(randomChar);
	    }
	    return sb.toString();
	}
}
