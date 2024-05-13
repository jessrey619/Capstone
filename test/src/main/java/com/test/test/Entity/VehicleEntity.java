package com.test.test.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblvehicle")
public class VehicleEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	private String username;
	private String vehicleMake;
	private String name;
	private String plateNo;
	private String color;
	private int stickerId;
	private Boolean vehicleType; // 0 if twoWheeler, 1 if 4 wheeler
	private Boolean isParking; //1 if parking 0 if dropoff/pickup
	
	public VehicleEntity() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getVehicleMake() {
		return vehicleMake;
	}

	public void setVehicleMake(String vehicleMake) {
		this.vehicleMake = vehicleMake;
	}

	public String getPlateNo() {
		return plateNo;
	}

	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Boolean getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(Boolean vehicleType) {
		this.vehicleType = vehicleType;
	}

	public int getStickerId() {
		return stickerId;
	}

	public void setStickerId(int stickerId) {
		this.stickerId = stickerId;
	}

	public Boolean getIsParking() {
		return isParking;
	}

	public void setIsParking(Boolean isParking) {
		this.isParking = isParking;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
