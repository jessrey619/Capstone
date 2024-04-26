package com.test.test.Service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.test.test.Entity.UserEntity;
import com.test.test.Repository.AdminRepository;
import com.test.test.Repository.UserRepository;

@Service
public class UserService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;
    
//    Update for Admin
    @Autowired
    private AdminRepository adminRepository;
    
//    Update for Admin
    
    //forLogin
    public UserEntity login(String username, String password) {
        UserEntity user = userRepository.findByUsername(username);
        if (user != null) {
            return user;
        }
        return null;
    }
    
    public boolean verifyPassword(String plainTextPassword, String hashedPassword) {
        return BCrypt.checkpw(plainTextPassword, hashedPassword);
    }
    
    //Change Password
    public boolean changePassword(String username, String oldPassword, String newPassword, String confirmNewPassword) {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            return false; // User not found
        }
        if (!BCrypt.checkpw(oldPassword, user.getPassword())) {
            return false; // Old password is incorrect
        }
        if (!newPassword.equals(confirmNewPassword)) {
            return false; // New passwords do not match
        }

        // Hash the new password
        String hashedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt());
        user.setPassword(hashedPassword);
        userRepository.save(user);
        return true; // Password changed successfully
    }

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// UPDATE FOR ADMIN
		if(userRepository.findByUsername(username)==null) {
			if(adminRepository.findByUsername(username)==null) {
				throw new UsernameNotFoundException("Username Not Found");
			} else {
				return adminRepository.findByUsername(username);
			}
		} else {
			return userRepository.findByUsername(username);
		}
	}

    

}
