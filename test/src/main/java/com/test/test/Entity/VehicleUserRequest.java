package com.test.test.Entity;

public class VehicleUserRequest {
    private VehicleEntity vehicle;
    private UserEntity user;
    
    public VehicleUserRequest() {
    	super();
    }
    
	public VehicleEntity getVehicle() {
		return vehicle;
	}
	public void setVehicle(VehicleEntity vehicle) {
		this.vehicle = vehicle;
	}
	public UserEntity getUser() {
		return user;
	}
	public void setUser(UserEntity user) {
		this.user = user;
	}

}