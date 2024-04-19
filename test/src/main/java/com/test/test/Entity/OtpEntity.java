package com.test.test.Entity;



import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="tblotp")
public class OtpEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    private String username;
    private String password;
    private String email;
    private String otp;
    private Date expirationDate;
//    @Column(name = "verification_code", length = 64)
//    private String verificationCode;
     
    private boolean enabled;
    
    
    
    public OtpEntity() {
    	super();
    }

	public OtpEntity(int id, String username, String password, String email, String otp, boolean enabled, Date expirationDate) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.otp = otp;
		this.enabled = enabled;
		this.expirationDate = expirationDate;
	}
    

	public OtpEntity(String email, String otp, Date expirationDate) {
		super();
		this.username = "";
		this.password = "";
		this.email = email;
		this.otp = otp;
		this.enabled = false;
		this.expirationDate =expirationDate;
	}

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
//	public String getVerificationCode() {
//		return verificationCode;
//	}
//	public void setVerificationCode(String verificationCode) {
//		this.verificationCode = verificationCode;
//	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}

	public Date getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}
	
	
    

}