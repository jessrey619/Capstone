package com.test.test.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.ApplicantEntity;

@Repository
public interface ApplicantRepository extends JpaRepository<ApplicantEntity, Long> {
    ApplicantEntity findByApplicantid(String applicantid);

    ApplicantEntity findByEmail(String email);
}