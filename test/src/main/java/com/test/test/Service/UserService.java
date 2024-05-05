package com.test.test.Service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.test.test.Entity.AdminEntity;
import com.test.test.Entity.EmployeeEntity;
import com.test.test.Entity.UserEntity;
import com.test.test.Repository.AdminRepository;
import com.test.test.Repository.EmployeeRepository;
import com.test.test.Repository.UserRepository;

@Service
public class UserService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;
    
//    Update for Admin
    @Autowired
    private AdminRepository adminRepository;

//    Update for Employee
    @Autowired
    private EmployeeRepository employeeRepository;
    
    public boolean verifyPassword(String plainTextPassword, String hashedPassword) {
        return BCrypt.checkpw(plainTextPassword, hashedPassword);
    }
    
    public boolean changePassword(String username, String oldPassword, String newPassword, String confirmNewPassword) {
    	String hashedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt());
    	
        if(userRepository.findByUsername(username)!=null) {
        	
        	UserEntity user = userRepository.findByUsername(username);
        	if (!BCrypt.checkpw(oldPassword, user.getPassword())) {
                return false; // Old password is incorrect
            }
        	if (!newPassword.equals(confirmNewPassword)) {
                return false; // New passwords do not match
            }
        	 user.setPassword(hashedPassword);
             userRepository.save(user);
             return true;
        }
        
        if(employeeRepository.findByUsername(username)!=null) {
        	EmployeeEntity user = employeeRepository.findByUsername(username);
        	if (!BCrypt.checkpw(oldPassword, user.getPassword())) {
                return false; // Old password is incorrect
            }
        	if (!newPassword.equals(confirmNewPassword)) {
                return false; // New passwords do not match
            }
        	 user.setPassword(hashedPassword);
        	 employeeRepository.save(user);
             return true;
        }

        if(adminRepository.findByUsername(username)!=null) {
        	AdminEntity user = adminRepository.findByUsername(username);
        	if (!BCrypt.checkpw(oldPassword, user.getPassword())) {
                return false; // Old password is incorrect
            }
        	if (!newPassword.equals(confirmNewPassword)) {
                return false; // New passwords do not match
            }
        	 user.setPassword(hashedPassword);
        	 adminRepository.save(user);
             return true;
        }
        else {
        	return false;
        }
    }


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if(userRepository.findByUsername(username)==null) {
			if(adminRepository.findByUsername(username)==null) {
				if(employeeRepository.findByUsername(username)==null) {
					throw new UsernameNotFoundException("Username Not Found");
				} else {
					return employeeRepository.findByUsername(username);
				}
			} else {
				return adminRepository.findByUsername(username);
			}
		} else {
			return userRepository.findByUsername(username);
		}
	}

	
//	This allows a user to become a vip and will be able to register 2 vehicles
    public String toVIP(UserEntity user) {
    	
    	if(userRepository.findByUsername(user.getUsername())==null) {
			if(adminRepository.findByUsername(user.getUsername())==null) {
				if(employeeRepository.findByUsername(user.getUsername())==null) {
					throw new UsernameNotFoundException("Username Not Found");
				} else {
					UserEntity existingUser = (UserEntity) loadUserByUsername(user.getUsername());
			    	user.setIsVIP(true);
			    	userRepository.save(existingUser);
					return "User Updated";
				}
			} else {
				AdminEntity existingUser = (AdminEntity) loadUserByUsername(user.getUsername());
		    	user.setIsVIP(true);
		    	adminRepository.save(existingUser);
				return "Admin Updated";
			}
		} else {
			EmployeeEntity existingUser = (EmployeeEntity) loadUserByUsername(user.getUsername());
	    	user.setIsVIP(true);
	    	employeeRepository.save(existingUser);
			return "Employee Updated";
		} 
    }

}
