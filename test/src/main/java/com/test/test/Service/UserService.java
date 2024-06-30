package com.test.test.Service;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.test.test.Entity.AdminEntity;
import com.test.test.Entity.EmployeeEntity;
import com.test.test.Entity.Role;
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
    
//    public boolean verifyPassword(String plainTextPassword, String hashedPassword) {
//        return BCrypt.checkpw(plainTextPassword, hashedPassword);
//    }
    
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
    
    public boolean forgotPassword(String username, String newPassword, String confirmPassword) throws UsernameNotFoundException, IllegalArgumentException {
        if (!newPassword.equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match");
        }

//        Optional<UserEntity> userOptional = Optional.of(userRepository.findByUsername(username));
//        Optional<EmployeeEntity> employeeOptional = Optional.of(employeeRepository.findByUsername(username));
//        Optional<AdminEntity> adminOptional = Optional.of(adminRepository.findByUsername(username));

        if (userRepository.findByUsername(username)!=null) {
            UserEntity userEntity = userRepository.findByUsername(username);
            userEntity.setPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt()));
            userRepository.save(userEntity);
            return true;
        } else if (employeeRepository.findByUsername(username)!=null) {
            EmployeeEntity employeeEntity = employeeRepository.findByUsername(username);
            employeeEntity.setPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt()));
            employeeRepository.save(employeeEntity);
            return true;
        } else if (adminRepository.findByUsername(username)!=null) {
            AdminEntity adminEntity = adminRepository.findByUsername(username);
            adminEntity.setPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt()));
            adminRepository.save(adminEntity);
            return true;
        } else {
            throw new UsernameNotFoundException("Username not found");
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
//    public String toVIP(String username) {
//    	
//    	if(userRepository.findByUsername(username)==null) {
//			if(adminRepository.findByUsername(username)==null) {
//				if(employeeRepository.findByUsername(username)==null) {
//					throw new UsernameNotFoundException("Username Not Found");
//				} else {
//					UserEntity existingUser = (UserEntity) loadUserByUsername(user.getUsername());
//			    	user.setIsVIP(true);
//			    	userRepository.save(existingUser);
//					return "User Updated";
//				}
//			} else {
//				AdminEntity existingUser = (AdminEntity) loadUserByUsername(user.getUsername());
//		    	user.setIsVIP(true);
//		    	adminRepository.save(existingUser);
//				return "Admin Updated";
//			}
//		} else {
//			EmployeeEntity existingUser = (EmployeeEntity) loadUserByUsername(user.getUsername());
//	    	user.setIsVIP(true);
//	    	employeeRepository.save(existingUser);
//			return "Employee Updated";
//		} 
//    }
//    
    public Role getRole(String email) {
    	Role role = null;
    	if(userRepository.findByUsername(email)!=null) {
    		return userRepository.findByUsername(email).getRole();
    	} else if(employeeRepository.findByUsername(email)!=null) {
    		return employeeRepository.findByUsername(email).getRole();
    	} else if(adminRepository.findByUsername(email)!=null) {
    		return adminRepository.findByUsername(email).getRole();
    	}
    	return role;
    }
    
    public UserEntity getUserByUsername(String username) {
    	return userRepository.findByUsername(username);
    }
    
    public EmployeeEntity getEmployeeByUsername(String username) {
    	return employeeRepository.findByUsername(username);
    }
    
    public void updateApprover(String username, Boolean action) {
    	EmployeeEntity employee = getEmployeeByUsername(username);
    	employee.setIsApprover(action);
    	employeeRepository.save(employee);
    }
    
    public void updateVerifier(String username, Boolean action) {
    	EmployeeEntity employee = getEmployeeByUsername(username);
    	employee.setIsVerifier(action);
    	employeeRepository.save(employee);
    }
    
    public void updateLogger(String username, Boolean action) {
    	EmployeeEntity employee = getEmployeeByUsername(username);
    	employee.setIsViewLogger(action);
    	employeeRepository.save(employee);
    }

}
