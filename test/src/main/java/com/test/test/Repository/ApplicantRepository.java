package com.test.test.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.ApplicantEntity;
import com.test.test.Entity.UserEntity;

@Repository
public interface ApplicantRepository extends JpaRepository<ApplicantEntity, Long> {
    ApplicantEntity findById(int id);

    ApplicantEntity findByEmail(String email);
    
    List<ApplicantEntity> findAllByEmail(String email);
    
    List<ApplicantEntity> findAllByFirstNameAndMiddleInitialAndLastName(String fname, String mname, String lname);
    
    @Query("SELECT a FROM ApplicantEntity a WHERE lower(a.firstName) LIKE %:searchText% OR lower(a.lastName) LIKE %:searchText% OR lower(a.email) LIKE %:searchText%")
    List<ApplicantEntity> findByFirstNameOrLastNameOrEmail(String searchText);
    
    @Query("SELECT u FROM ApplicantEntity u WHERE u.isStaff = true")
    List<ApplicantEntity> findAllStaffMembers();
	
	@Query("SELECT u FROM ApplicantEntity u WHERE u.isStaff = false")
    List<ApplicantEntity> findAllStudents();
}