package com.test.test.Entity;

public class ApplicantVehicleRequest {
	private ApplicantEntity applicant;
	private VehicleEntity vehicle;
	
	
//	TODO buhat ug thing inig in
	public ApplicantVehicleRequest() {
		super();
	}
	
	public ApplicantEntity getApplicant() {
		return applicant;
	}
	public void setApplicant(ApplicantEntity applicant) {
		this.applicant = applicant;
	}
	public VehicleEntity getVehicle() {
		return vehicle;
	}
	public void setVehicle(VehicleEntity vehicle) {
		this.vehicle = vehicle;
	}
}
