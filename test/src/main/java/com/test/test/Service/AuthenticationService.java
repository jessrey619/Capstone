package com.test.test.Service;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.test.Entity.AdminEntity;
import com.test.test.Entity.AuthenticationResponse;
import com.test.test.Entity.DecodedJwt;
import com.test.test.Entity.EmployeeEntity;
import com.test.test.Entity.Role;
import com.test.test.Entity.UserEntity;
import com.test.test.Repository.AdminRepository;
import com.test.test.Repository.EmployeeRepository;
import com.test.test.Repository.UserRepository;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

//  User Side
    public AuthenticationResponse register(UserEntity request) {
        UserEntity user = new UserEntity();

        // Set user details from request
        user.setUsername(request.getUsername());
        // Hash the password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole()); // Assuming role is already set in request

        // Saves user
        userRepository.save(user);

        // Generate JWT token
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }
    
    public AuthenticationResponse authenticate(UserEntity request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        UserEntity user = userRepository.findByUsername(request.getUsername());

        // Generate JWT token
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }

    
//  ADMIN SIDE
    public AuthenticationResponse adminRegister(AdminEntity request) {
    	AdminEntity user = new AdminEntity();

        // Set user details from request
        user.setUsername(request.getUsername());
        // Hash the password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ADMIN); // Assuming role is already set in request

        // Saves user
        adminRepository.save(user);

        // Generate JWT token
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }
    
    public AuthenticationResponse adminAuthenticate(AdminEntity request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        AdminEntity user = adminRepository.findByUsername(request.getUsername());

        // Generate JWT token
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }

    
//    Employee side
    public AuthenticationResponse employeeRegister(EmployeeEntity request) {
    	EmployeeEntity user = new EmployeeEntity();

        // Set user details from request
        user.setUsername(request.getUsername());
        // Hash the password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Saves user
        employeeRepository.save(user);

        // Generate JWT token
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }
    
    public AuthenticationResponse employeeAuthenticate(EmployeeEntity request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        EmployeeEntity user = employeeRepository.findByUsername(request.getUsername());

        // Generate JWT token
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }
    
    public DecodedJwt decodeJwt(String token) {
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String payload = new String(decoder.decode(chunks[1]));

        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode payloadJson = mapper.readTree(payload);
            return new DecodedJwt(payloadJson);
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse JWT", e);
        }
    }

}
