package com.test.test.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ParkingAreaEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	private String name;
	private int totalSpace;
	private int availableSpace;
	private int occupiedSpace;
	private int numberOfCars;
	private int numberOfMotorcycles;
	private Boolean isFull;
	private Boolean isActive;
	
	private Boolean allowMotorcycles;
	private Boolean allowCars;
	
	
	public ParkingAreaEntity() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTotalSpace() {
		return totalSpace;
	}
	public void setTotalSpace(int totalSpace) {
		this.totalSpace = totalSpace;
	}
	public int getAvailableSpace() {
		return availableSpace;
	}
	public void setAvailableSpace(int availableSpace) {
		this.availableSpace = availableSpace;
	}
	public int getOccupiedSpace() {
		return occupiedSpace;
	}
	public void setOccupiedSpace(int occupiedSpace) {
		this.occupiedSpace = occupiedSpace;
	}
	public Boolean getIsFull() {
		return isFull;
	}
	public void setIsFull(Boolean isFull) {
		this.isFull = isFull;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public int getNumberOfCars() {
		return numberOfCars;
	}
	public void setNumberOfCars(int numberOfCars) {
		this.numberOfCars = numberOfCars;
	}
	public int getNumberOfMotorcycles() {
		return numberOfMotorcycles;
	}
	public void setNumberOfMotorcycles(int numberOfMotorcycles) {
		this.numberOfMotorcycles = numberOfMotorcycles;
	}
	public Boolean getAllowMotorcycles() {
		return allowMotorcycles;
	}
	public void setAllowMotorcycles(Boolean allowMotorcycles) {
		this.allowMotorcycles = allowMotorcycles;
	}
	public Boolean getAllowCars() {
		return allowCars;
	}
	public void setAllowCars(Boolean allowCars) {
		this.allowCars = allowCars;
	}
	
	
	
}
