package com.test.test.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.test.test.Entity.Role;
import com.test.test.Entity.UserEntity;
import com.test.test.Repository.AdminRepository;
import com.test.test.Repository.EmployeeRepository;
import com.test.test.Repository.UserRepository;
import com.test.test.Service.AuthenticationService;
import com.test.test.Service.UserService;

@RequestMapping("/jwt")
@RestController
public class AuthenticationController {

	@Autowired
	private AuthenticationService authService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private AdminRepository adminRepository;
	
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
	
	@CrossOrigin
	@PostMapping("/getrole")
	public Role getRole(@RequestParam String email) {
		return userService.getRole(email);
	}
	
	@CrossOrigin
	@GetMapping("/get-user")
	public UserEntity getUser(@RequestParam String username) {
		return userService.getUserByUsername(username);
	}
	
	@CrossOrigin
	@GetMapping("/get-employee")
	public EmployeeEntity getEmployee(@RequestParam String username) {
		return userService.getEmployeeByUsername(username);
	}
	
	@CrossOrigin
	@GetMapping("/getallemployee")
	public List<EmployeeEntity> getAllEmployee(){
		return employeeRepository.findAll();
	}

	@CrossOrigin
	@GetMapping("/getalladmin")
	public List<AdminEntity> getAllAdmin(){
		return adminRepository.findAll();
	}
	
	@CrossOrigin
	@PostMapping("/updateapprover")
	public String updateApprove(@RequestParam String username, @RequestParam boolean action){
		userService.updateApprover(username, action);
		return "success";
	}
	
	@CrossOrigin
	@PostMapping("/updateverifier")
	public String updateVerifier(@RequestParam String username, @RequestParam boolean action){
		userService.updateVerifier(username, action);
		return "success";
	}
	
	@CrossOrigin
	@PostMapping("/updatelogger")
	public String updateLogger(@RequestParam String username, @RequestParam boolean action){
		userService.updateLogger(username, action);
		return "success";
	}
	
	
	@CrossOrigin
	@GetMapping("/getallusers")
	public List<UserEntity> getAllUsers(){
		return userRepository.findAll();
	}
}
