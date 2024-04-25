package com.test.test.Entity;

@SuppressWarnings("serial")
public class AdminEntity extends UserEntity{
	private Boolean isVerifier = true;
	private Boolean isViewLogger = true;
	private Boolean isApprover = true;
	public AdminEntity() {
		super();
	}
	public Boolean getIsVerifier() {
		return isVerifier;
	}

	public Boolean getIsViewLogger() {
		return isViewLogger;
	}

	public Boolean getIsApprover() {
		return isApprover;
	}
	
}
