package com.test.test.Service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.test.Entity.UserEntity;
import com.test.test.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }

    public Iterable<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
    
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

}
