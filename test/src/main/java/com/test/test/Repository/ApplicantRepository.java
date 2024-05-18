package com.test.test.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.ApplicantEntity;

@Repository
public interface ApplicantRepository extends JpaRepository<ApplicantEntity, Long> {
    ApplicantEntity findById(int id);

    ApplicantEntity findByEmail(String email);
    
    List<ApplicantEntity> findAllByEmail(String email);
    
    List<ApplicantEntity> findAllByFirstNameAndMiddleInitialAndLastName(String fname, String mname, String lname);
}