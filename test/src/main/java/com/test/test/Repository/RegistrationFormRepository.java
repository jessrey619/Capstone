package com.test.test.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.test.test.Entity.RegistrationFormEntity;

public interface RegistrationFormRepository extends JpaRepository<RegistrationFormEntity, Integer> {
    RegistrationFormEntity findByStudentIdNo(String studentIdNo);
}

