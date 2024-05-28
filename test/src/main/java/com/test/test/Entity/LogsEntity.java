package com.test.test.Entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbllogs")
public class LogsEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	private Boolean isParking;
	private int stickerId;
	private String parkingAreaName; 
	
	@Column(name="vehicleType")
	private Boolean isFourWheel;
	private String color;
	private String plateNo;
	private String name;
	private Date timeIn;
	private Date timeOut;
	private boolean isActive;
	
	public LogsEntity() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Boolean getIsParking() {
		return isParking;
	}

	public void setIsParking(Boolean isParking) {
		this.isParking = isParking;
	}

	public int getStickerId() {
		return stickerId;
	}

	public void setStickerId(int stickerId) {
		this.stickerId = stickerId;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getPlateNo() {
		return plateNo;
	}

	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getTimeIn() {
		return timeIn;
	}

	public void setTimeIn(Date timeIn) {
		this.timeIn = timeIn;
	}

	public Date getTimeOut() {
		return timeOut;
	}

	public void setTimeOut(Date timeOut) {
		this.timeOut = timeOut;
	}

	public Boolean getIsFourWheel() {
		return isFourWheel;
	}

	public void setIsFourWheel(Boolean isFourWheel) {
		this.isFourWheel = isFourWheel;
	}

	public String getParkingAreaName() {
		return parkingAreaName;
	}

	public void setParkingAreaName(String parkingAreaName) {
		this.parkingAreaName = parkingAreaName;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
	
}
