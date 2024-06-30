package com.test.test.Entity;

import java.util.Collection;
import java.util.Date;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name="tblemployee")
public class EmployeeEntity implements UserDetails{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	private String username;
	private String password;
	private String fname;
	private String mname;
	private String lname;
	private Boolean isVerifier;
	private Boolean isViewLogger;
	private Boolean isApprover;
	@Enumerated(value = EnumType.STRING)
	private Role role = Role.EMPLOYEE;
	
	
//	added for employee balhin2
	private String schoolId;
	private String schoolIdOwner;
	private Boolean isStaff; //para different rates for Student/Staff
	private Boolean isParking; //type of application
	private String contactNumber;
	private Boolean isVIP;
	private String email;
	private String address;
	private Date dateApplied;
	private Date datePaid;
	private Boolean isVerified;
	private Boolean isApproved;
	private Boolean isPaid;
	private Boolean isEnabled;
	private Date expirationDate;
	
	
	public EmployeeEntity() {
		this.isApproved = false;
		this.isEnabled = false;
		this.isPaid = false;
		this.isVerified = false;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getMname() {
		return mname;
	}
	public void setMname(String mname) {
		this.mname = mname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public Boolean getIsVerifier() {
		return isVerifier;
	}
	public void setIsVerifier(Boolean isVerifier) {
		this.isVerifier = isVerifier;
	}
	public Boolean getIsViewLogger() {
		return isViewLogger;
	}
	public void setIsViewLogger(Boolean isViewLogger) {
		this.isViewLogger = isViewLogger;
	}
	public Boolean getIsApprover() {
		return isApprover;
	}
	public void setIsApprover(Boolean isApprover) {
		this.isApprover = isApprover;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public String getSchoolId() {
		return schoolId;
	}
	public void setSchoolId(String schoolId) {
		this.schoolId = schoolId;
	}
	public String getSchoolIdOwner() {
		return schoolIdOwner;
	}
	public void setSchoolIdOwner(String schoolIdOwner) {
		this.schoolIdOwner = schoolIdOwner;
	}
	public Boolean getIsStaff() {
		return isStaff;
	}
	public void setIsStaff(Boolean isStaff) {
		this.isStaff = isStaff;
	}
	public Boolean getIsParking() {
		return isParking;
	}
	public void setIsParking(Boolean isParking) {
		this.isParking = isParking;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public Boolean getIsVIP() {
		return isVIP;
	}
	public void setIsVIP(Boolean isVIP) {
		this.isVIP = isVIP;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Date getDateApplied() {
		return dateApplied;
	}
	public void setDateApplied(Date dateApplied) {
		this.dateApplied = dateApplied;
	}
	public Date getDatePaid() {
		return datePaid;
	}
	public void setDatePaid(Date datePaid) {
		this.datePaid = datePaid;
	}
	public Boolean getIsVerified() {
		return isVerified;
	}
	public void setIsVerified(Boolean isVerified) {
		this.isVerified = isVerified;
	}
	public Boolean getIsApproved() {
		return isApproved;
	}
	public void setIsApproved(Boolean isApproved) {
		this.isApproved = isApproved;
	}
	public Boolean getIsPaid() {
		return isPaid;
	}
	public void setIsPaid(Boolean isPaid) {
		this.isPaid = isPaid;
	}
	public Boolean getIsEnabled() {
		return isEnabled;
	}
	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}
	public Date getExpirationDate() {
		return expirationDate;
	}
	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return java.util.List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	
}
