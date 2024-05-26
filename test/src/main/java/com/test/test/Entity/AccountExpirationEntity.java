package com.test.test.Entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AccountExpirationEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
    private Date studentExpirationDate;
    private Date staffExpirationDate;
    private String schoolYear;
    private String semester;

    
    public AccountExpirationEntity() {
    	this.id = 1; 
    	this.semester = "2025-2026";
	}

	public Date getStudentExpirationDate() {
        return studentExpirationDate;
    }

    public void setStudentExpirationDate(Date studentExpirationDate) {
        this.studentExpirationDate = studentExpirationDate;
    }

    public Date getStaffExpirationDate() {
        return staffExpirationDate;
    }

    public void setStaffExpirationDate(Date staffExpirationDate) {
        this.staffExpirationDate = staffExpirationDate;
    }

	public String getSchoolYear() {
		return schoolYear;
	}

	public void setSchoolYear(String schoolYear) {
		this.schoolYear = schoolYear;
	}

	public String getSemester() {
		return semester;
	}

	public void setSemester(String semester) {
		this.semester = semester;
	}
    
}
