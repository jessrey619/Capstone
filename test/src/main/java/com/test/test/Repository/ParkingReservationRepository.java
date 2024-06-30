package com.test.test.Repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.test.Entity.ParkingReservationEntity;

@Repository
public interface ParkingReservationRepository extends JpaRepository<ParkingReservationEntity, Integer> {
	List<ParkingReservationEntity> findAllByDateBetween(Date startDate, Date endDate);
}
