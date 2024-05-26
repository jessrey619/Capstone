package com.test.test.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.VehicleEntity;

@Repository
public interface VehicleRepository extends CrudRepository<VehicleEntity, Integer> {
	VehicleEntity findByUsername(String username);
	VehicleEntity findByStickerId(int stickerId);
	List<VehicleEntity> findByPlateNo(String plateNo);
	
	List<VehicleEntity> findAllByUsername(String username);
	List<VehicleEntity> findAll();
	
	@Query("SELECT MAX(v.stickerId) FROM VehicleEntity v")
    Integer findMaxStickerId();

}
