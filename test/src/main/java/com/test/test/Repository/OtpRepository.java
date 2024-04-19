package com.test.test.Repository;

import com.test.test.Entity.OtpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OtpRepository extends JpaRepository<OtpEntity, Integer> {
	OtpEntity findByEmail(String email);
}