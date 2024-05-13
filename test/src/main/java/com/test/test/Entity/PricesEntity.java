package com.test.test.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tblprices")
public class PricesEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	private Double studentTwoWheelPickup; 
	private Double studentFourWheelPickup;
	private Double studentTwoWheelParking;
	private Double studentFourWheelParking;
	
	private Double staffTwoWheelPickup;		
	private Double staffFourWheelPickup;
	private Double staffTwoWheelParking;
	private Double staffFourWheelParking;
	
	public PricesEntity() {
		this.studentTwoWheelPickup = 0.0;
		this.studentFourWheelPickup = 0.0;
		this.studentTwoWheelParking = 0.0;
		this.studentFourWheelParking = 0.0;
		
		this.staffTwoWheelPickup = 0.0;
		this.staffFourWheelPickup = 0.0;
		this.staffTwoWheelParking = 0.0;
		this.staffFourWheelParking = 0.0;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public Double getStudentTwoWheelPickup() {
		return studentTwoWheelPickup;
	}

	public void setStudentTwoWheelPickup(Double studentTwoWheelPickup) {
		this.studentTwoWheelPickup = studentTwoWheelPickup;
	}

	public Double getStudentFourWheelPickup() {
		return studentFourWheelPickup;
	}

	public void setStudentFourWheelPickup(Double studentFourWheelPickup) {
		this.studentFourWheelPickup = studentFourWheelPickup;
	}

	public Double getStudentTwoWheelParking() {
		return studentTwoWheelParking;
	}

	public void setStudentTwoWheelParking(Double studentTwoWheelParking) {
		this.studentTwoWheelParking = studentTwoWheelParking;
	}

	public Double getStudentFourWheelParking() {
		return studentFourWheelParking;
	}

	public void setStudentFourWheelParking(Double studentFourWheelParking) {
		this.studentFourWheelParking = studentFourWheelParking;
	}

	public Double getStaffTwoWheelPickup() {
		return staffTwoWheelPickup;
	}

	public void setStaffTwoWheelPickup(Double staffTwoWheelPickup) {
		this.staffTwoWheelPickup = staffTwoWheelPickup;
	}

	public Double getStaffFourWheelPickup() {
		return staffFourWheelPickup;
	}

	public void setStaffFourWheelPickup(Double staffFourWheelPickup) {
		this.staffFourWheelPickup = staffFourWheelPickup;
	}

	public Double getStaffTwoWheelParking() {
		return staffTwoWheelParking;
	}

	public void setStaffTwoWheelParking(Double staffTwoWheelParking) {
		this.staffTwoWheelParking = staffTwoWheelParking;
	}

	public Double getStaffFourWheelParking() {
		return staffFourWheelParking;
	}

	public void setStaffFourWheelParking(Double staffFourWheelParking) {
		this.staffFourWheelParking = staffFourWheelParking;
	}

	
	
	
}
