package com.test.test.Entity;

import java.sql.Blob;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name ="tblimage")
public class Image {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private long id;
	 	
	    @Lob
	    @Column(columnDefinition = "LONGBLOB")
	    private Blob image;
	    
	    private Date date = new Date();
	    private String applicantSchoolId;
	    
	    public Image(long id, Blob image, Date date, String applicantSchoolId) {
			super();
			this.id = id;
			this.image = image;
			this.date = date;
			this.applicantSchoolId = applicantSchoolId;
		}
	    
		public Image() {
			super();
		}


		public long getId() {
	        return id;
	    }
	    public void setId(long id) {
	        this.id = id;
	    }
	    public Blob getImage() {
	        return image;
	    }
	    public void setImage(Blob image) {
	        this.image = image;
	    }
	    public Date getDate() {
	        return date;
	    }
		public String getApplicantSchoolId() {
			return applicantSchoolId;
		}
		public void setApplicantSchoolId(String applicantSchoolId) {
			this.applicantSchoolId = applicantSchoolId;
		}
}
