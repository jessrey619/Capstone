package com.test.test.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class SessionTokenEntity {
	
    @Id
    private int userId;
    private String sessionToken;
    private LocalDateTime expirationTime;
    
    
    
	public SessionTokenEntity() {
		super();
	}
	
	
	
	public SessionTokenEntity(int userId, String sessionToken, LocalDateTime expirationTime) {
		super();
		this.userId = userId;
		this.sessionToken = sessionToken;
		this.expirationTime = expirationTime;
	}



	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getSessionToken() {
		return sessionToken;
	}
	public void setSessionToken(String sessionToken) {
		this.sessionToken = sessionToken;
	}
	public LocalDateTime getExpirationTime() {
		return expirationTime;
	}
	public void setExpirationTime(LocalDateTime expirationTime) {
		this.expirationTime = expirationTime;
	}
    
    
    
    // getters and setters
}