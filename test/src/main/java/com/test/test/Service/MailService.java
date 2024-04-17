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
	
	private String generateOtp(String email) {
        OtpEntity existingOtp = otpRepository.findByEmail(email);
        OtpEntity user;

        if(userRepository.findByUsername(modifyEmail(email))!= null) {
        	if (existingOtp != null) {
                user = existingOtp;
            } else {
                user = new OtpEntity();
            }

            Date date = new Date();

            // Set expiration date to 5 minutes after creation
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.MINUTE, 5);
            Date expirationDate = calendar.getTime();

            String otp;
            SecureRandom random = new SecureRandom();   
            otp = String.valueOf(Math.abs(100000 * random.nextInt()));

            String hashOtp = hash(otp);

            user.setEmail(email);
            user.setOtp(hashOtp);
            user.setUsername("");
            user.setPassword("");
            user.setIsUsed(false);
            user.setExpirationDate(expirationDate);

            otpRepository.save(user);

            return otp;
        } else {
        	return null;
        }

        
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
					newUser.setEmail(email);
					newUser.setUsername(modifyEmail(email));
					newUser.setPassword(hash(generatePassword()));
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
									+ "Password: "+newUser.getPassword()+"");
					
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