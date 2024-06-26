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
    private String email;
    private String otp;
    private Date expirationDate;
    private Boolean isUsed;
//    @Column(name = "verification_code", length = 64)
//    private String verificationCode;
     
    
    
    
    public OtpEntity() {
    	super();
    }

	public OtpEntity(int id, String username, String password, String email, String otp, Date expirationDate) {
		super();
		this.id = id;
		this.email = email;
		this.otp = otp;
		this.expirationDate = expirationDate;
	}
    

	public OtpEntity(String email, String otp, Date expirationDate) {
		super();
		this.email = email;
		this.otp = otp;
		this.expirationDate =expirationDate;
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

	public Boolean getIsUsed() {
		return isUsed;
	}

	public void setIsUsed(Boolean isUsed) {
		this.isUsed = isUsed;
	}
	
	
    

}