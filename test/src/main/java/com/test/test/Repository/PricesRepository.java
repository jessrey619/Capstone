package com.test.test.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.test.test.Entity.PricesEntity;

public interface PricesRepository extends JpaRepository<PricesEntity, Integer> {

    @Transactional
    @Modifying
    @Query("UPDATE PricesEntity p SET p.twoWheelPickup = :twoWheelPickup, p.fourWheelPickup = :fourWheelPickup, p.twoWheelParking = :twoWheelParking, p.fourWheelParking = :fourWheelParking WHERE p.id = :id")
    void editValues(int id, Double twoWheelPickup, Double fourWheelPickup, Double twoWheelParking, Double fourWheelParking);
    
}