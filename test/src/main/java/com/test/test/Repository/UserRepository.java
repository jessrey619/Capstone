package com.test.test.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	UserEntity findByUsername(String username);
	
	@Query("SELECT u FROM UserEntity u WHERE u.isStaff = true")
    List<UserEntity> findAllStaffMembers();
	
	@Query("SELECT u FROM UserEntity u WHERE u.isStaff = false")
    List<UserEntity> findAllStudents();
}
