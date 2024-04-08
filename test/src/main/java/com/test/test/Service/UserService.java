package com.test.test.Service;

import com.test.test.Entity.OtpEntity;
import com.test.test.Repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private OtpRepository userRepository;

    public OtpEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
