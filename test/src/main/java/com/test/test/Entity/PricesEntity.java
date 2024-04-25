package com.test.test.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PricesEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	private Double twoWheelPickup;
	private Double fourWheelPickup;
	private Double twoWheelParking;
	private Double fourWheelParking;
	public PricesEntity() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Double getTwoWheelPickup() {
		return twoWheelPickup;
	}
	public void setTwoWheelPickup(Double twoWheelPickup) {
		this.twoWheelPickup = twoWheelPickup;
	}
	public Double getFourWheelPickup() {
		return fourWheelPickup;
	}
	public void setFourWheelPickup(Double fourWheelPickup) {
		this.fourWheelPickup = fourWheelPickup;
	}
	public Double getTwoWheelParking() {
		return twoWheelParking;
	}
	public void setTwoWheelParking(Double twoWheelParking) {
		this.twoWheelParking = twoWheelParking;
	}
	public Double getFourWheelParking() {
		return fourWheelParking;
	}
	public void setFourWheelParking(Double fourWheelParking) {
		this.fourWheelParking = fourWheelParking;
	}
	
	
	
	
}
