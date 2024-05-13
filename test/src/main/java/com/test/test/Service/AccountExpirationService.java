package com.test.test.Service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import com.test.test.Entity.AccountExpirationEntity;
import com.test.test.Entity.UserEntity;
import com.test.test.Repository.AccountExpirationRepository;
import com.test.test.Repository.UserRepository;

@Service
public class AccountExpirationService {

    @Autowired
    private AccountExpirationRepository accountExpirationRepository;
    
    @Autowired
    private UserRepository userRepository;

    public void saveAccountExpiration(AccountExpirationEntity accountExpirationEntity) {
        accountExpirationRepository.save(accountExpirationEntity);
    }
   
    
    public String setStaffGlobalExpiry(@DateTimeFormat(pattern = "yyyy-MM-dd")  Date expirationDate) {
        List<UserEntity> users = userRepository.findAll();
        List<AccountExpirationEntity> accountExpiration = accountExpirationRepository.findAll();
        AccountExpirationEntity acc = null;
        if (!accountExpiration.isEmpty()) {
            acc = accountExpiration.get(0);
        } else {
            acc = new AccountExpirationEntity();
        }
        
        for (UserEntity user : users) {
            if (user.getIsStaff()==true) {
                user.setExpirationDate(expirationDate);
                acc.setStaffExpirationDate(expirationDate);
            }
        }
        
        accountExpirationRepository.save(acc);
        userRepository.saveAll(users);
        return("Staff Expiration Set");
    }


    
    public void setStudentGlobalExpiry(Date expirationDate) {
        List<UserEntity> users = userRepository.findAll();
        List<AccountExpirationEntity> accountExpiration = accountExpirationRepository.findAll();
        AccountExpirationEntity acc = null;
        if (!accountExpiration.isEmpty()) {
            acc = accountExpiration.get(0);
        } else {
            acc = new AccountExpirationEntity();
        }
        
        for (UserEntity user : users) {
            if (!user.getIsStaff()) {
            	user.setExpirationDate(expirationDate);
                acc.setStudentExpirationDate(expirationDate);
            }
        }
        accountExpirationRepository.save(acc);
        userRepository.saveAll(users);
    }



    // Add other methods as needed
}
