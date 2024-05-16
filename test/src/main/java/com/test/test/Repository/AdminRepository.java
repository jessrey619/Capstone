package com.test.test.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.AdminEntity;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Integer>{
	AdminEntity findByUsername(String username);
}
