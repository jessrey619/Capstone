package com.test.test.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.test.Entity.AdminEntity;
import com.test.test.Entity.AuthenticationResponse;
import com.test.test.Entity.ChangePasswordRequest;
import com.test.test.Entity.EmployeeEntity;
import com.test.test.Entity.UserEntity;
import com.test.test.Service.AuthenticationService;
import com.test.test.Service.UserService;

@RequestMapping("/jwt")
@RestController
public class AuthenticationController {

	@Autowired
	private AuthenticationService authService;
	
	@Autowired
	private UserService userService;
	
	@CrossOrigin
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody UserEntity request){
		return ResponseEntity.ok(authService.register(request));
		
	}
	
	@CrossOrigin
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> login(
			@RequestBody UserEntity request
			){
				return ResponseEntity.ok(authService.authenticate(request));
		
	}
	
	
//	Admin Side
	@CrossOrigin
	@PostMapping("/admin-register")
	public ResponseEntity<AuthenticationResponse> adminRegister(
			@RequestBody AdminEntity request
			){
				return ResponseEntity.ok(authService.adminRegister(request));
		
	}
	
	@CrossOrigin
	@PostMapping("/admin-login")
	public ResponseEntity<AuthenticationResponse> adminLogin(
			@RequestBody AdminEntity request
			){
				return ResponseEntity.ok(authService.adminAuthenticate(request));
		
	}
	
	
//	Employee Side
	@CrossOrigin
	@PostMapping("/employee-register")
	public ResponseEntity<AuthenticationResponse> employeeRegister(
			@RequestBody EmployeeEntity request
			){
				return ResponseEntity.ok(authService.employeeRegister(request));
		
	}
	
	@CrossOrigin
	@PostMapping("/employee-login")
	public ResponseEntity<AuthenticationResponse> employeeLogin(
			@RequestBody EmployeeEntity request
			){
				return ResponseEntity.ok(authService.employeeAuthenticate(request));
		
	}
	
	@PostMapping("/change-password")
    public boolean changePassword(@RequestBody ChangePasswordRequest request) {
        return userService.changePassword(
            request.getUsername(),
            request.getOldPassword(),
            request.getNewPassword(),
            request.getConfirmNewPassword()
        );
    }
}
