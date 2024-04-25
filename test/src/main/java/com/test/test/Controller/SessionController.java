package com.test.test.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.test.Entity.UserEntity;
import com.test.test.Service.SessionService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserEntity user) {
        String sessionToken = sessionService.createSession(user.getId());
        return ResponseEntity.ok(sessionToken);
    }
}
