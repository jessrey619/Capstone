package com.test.test.Service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import com.test.test.Entity.AccountExpirationEntity;
import com.test.test.Entity.ApplicantEntity;
import com.test.test.Entity.UserEntity;
import com.test.test.Repository.AccountExpirationRepository;
import com.test.test.Repository.ApplicantRepository;
import com.test.test.Repository.UserRepository;

@Service
public class AccountExpirationService {

    @Autowired
    private AccountExpirationRepository accountExpirationRepository;
    
    @Autowired
    private ApplicantRepository applicantRepository;
    
    @Autowired
    private UserRepository userRepository;

    public void saveAccountExpiration(AccountExpirationEntity accountExpirationEntity) {
        accountExpirationRepository.save(accountExpirationEntity);
    }
   
    
    public String setStaffGlobalExpiry(@DateTimeFormat(pattern = "yyyy-MM-dd")  Date expirationDate) {
        List<UserEntity> staff = userRepository.findAllStaffMembers();
        List<ApplicantEntity> applications = applicantRepository.findAllStaffMembers();
        List<AccountExpirationEntity> accountExpiration = accountExpirationRepository.findAll();
        AccountExpirationEntity acc = null;
        
        if (!accountExpiration.isEmpty()) {
            acc = accountExpiration.get(0);
        } else {
            acc = new AccountExpirationEntity();
        }
        
        for (UserEntity user : staff) {
        	if(user.getExpirationDate().before(new Date())) {
        		user.setExpirationDate(expirationDate);
        	}    
        }
        
        for(ApplicantEntity application: applications) {
        	if(application.getExpirationDate().before(new Date() )) {
        		application.setExpirationDate(expirationDate);
        	}
//        	application.setExpirationDate(expirationDate);
        }
        
        acc.setStaffExpirationDate(expirationDate);
        accountExpirationRepository.save(acc);
        userRepository.saveAll(staff);
        return("Staff Expiration Set");
    }
    
    public String setStudentGlobalExpiry(Date expirationDate) {
        List<UserEntity> students = userRepository.findAllStudents();
        List<ApplicantEntity> applications = applicantRepository.findAllStudents();
        List<AccountExpirationEntity> accountExpiration = accountExpirationRepository.findAll();
        AccountExpirationEntity acc = null;
        if (!accountExpiration.isEmpty()) {
            acc = accountExpiration.get(0);
        } else {
            acc = new AccountExpirationEntity();
        }
        
        for (UserEntity student : students) {
        	if(student.getExpirationDate().before(new Date())) {
        		student.setExpirationDate(expirationDate);
        	}   
//        	student.setExpirationDate(expirationDate);
        	userRepository.save(student);
        	System.out.println(student.getExpirationDate());
        }
        
        for(ApplicantEntity application: applications) {
        	if(application.getExpirationDate().before(new Date() )) {
        		application.setExpirationDate(expirationDate);
        	}
//        	application.setExpirationDate(expirationDate);
        }
        
        acc.setStudentExpirationDate(expirationDate);
        accountExpirationRepository.save(acc);
        return("Student Expiration Set");
    }
    
    public String setSchoolYear(String schoolyear) {
         List<AccountExpirationEntity> accountExpiration = accountExpirationRepository.findAll();
         AccountExpirationEntity acc = null;
         if (!accountExpiration.isEmpty()) {
             acc = accountExpiration.get(0);
         } else {
             acc = new AccountExpirationEntity();
         }
         
         acc.setSchoolYear(schoolyear);
         accountExpirationRepository.save(acc);
         return("School Year Set");
    }
    
    public String setSemester(String sem) {
        List<AccountExpirationEntity> accountExpiration = accountExpirationRepository.findAll();
        AccountExpirationEntity acc = null;
        if (!accountExpiration.isEmpty()) {
            acc = accountExpiration.get(0);
        } else {
            acc = new AccountExpirationEntity();
        }
        
        acc.setSemester(sem);
        accountExpirationRepository.save(acc);
        return("Semester Set");
   }
    
    public AccountExpirationEntity getAccountExpiration() {
    	List<AccountExpirationEntity> accountExpirationEntities = accountExpirationRepository.findAll();
    	return accountExpirationEntities.get(0);
    }



    // Add other methods as needed
}
