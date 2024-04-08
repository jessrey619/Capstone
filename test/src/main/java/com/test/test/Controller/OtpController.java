package com.test.test.Controller;

import com.test.test.Entity.OtpEntity;
import com.test.test.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class OtpController {
    @Autowired
    private UserService userService;

    @CrossOrigin
    @GetMapping("/user/{email}")
    public OtpEntity getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }
}

