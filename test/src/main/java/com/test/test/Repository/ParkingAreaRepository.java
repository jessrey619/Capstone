package com.test.test.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.ParkingAreaEntity;

@Repository
public interface ParkingAreaRepository extends JpaRepository<ParkingAreaEntity, Integer> {
	List<ParkingAreaEntity> findAllByIsActiveTrue();
	ParkingAreaEntity findByName(String name);
}
