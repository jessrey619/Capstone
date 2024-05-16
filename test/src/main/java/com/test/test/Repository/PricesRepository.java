package com.test.test.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.test.test.Entity.PricesEntity;

public interface PricesRepository extends JpaRepository<PricesEntity, Integer> {
	@Query(value = "SELECT * FROM tblprices LIMIT 1", nativeQuery = true)
    PricesEntity findFirst();
}