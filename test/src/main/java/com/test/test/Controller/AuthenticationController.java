package com.test.test.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.test.Entity.AdminEntity;
import com.test.test.Entity.AuthenticationResponse;
import com.test.test.Entity.ChangePasswordRequest;
import com.test.test.Entity.DecodedJwt;
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
	
	@PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String username, @RequestParam String newPassword, @RequestParam String confirmPassword) {
        try {
            boolean success = userService.forgotPassword(username, newPassword, confirmPassword);
            if (success) {
                return ResponseEntity.ok("Password updated successfully");
            } else {
                return ResponseEntity.ok("Failed to update password");
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username not found");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Passwords do not match");
        }
    }
	
	@CrossOrigin
    @PostMapping("/decode")
    public DecodedJwt decodeJwt(@RequestParam String token) {
        return authService.decodeJwt(token);
    }
}
