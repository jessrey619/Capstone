package com.test.test.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "photos")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String studentSchoolId;
    private String name;
    
//  This sets the database so that it wont have any other values aside from 0-3
    //1 = License
    //2 = OR/CR
    //3 = Proof of Payment
    @Min(value = 0, message = "Type must be at least 0")
    @Max(value = 3, message = "Type must be at most 2")
    private int type;
    
    @Lob
    @Column(length = 20485760) // Set the length to 10MB (10485760 bytes)
    private byte[] image;

    public Photo() {
    }

	public Photo(Long id, String name, byte[] image) {
		super();
		this.id = id;
		this.name = name;
		this.image = image;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getApplicantSchoolId() {
		return studentSchoolId;
	}

	public void setApplicantSchoolId(String studentSchoolId) {
		this.studentSchoolId = studentSchoolId;
	}

    // getters and setters
	
}
