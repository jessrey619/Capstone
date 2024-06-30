package com.test.test.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import com.test.test.Entity.ParkingReservationEntity;
import com.test.test.Repository.ParkingReservationRepository;

@Service
public class ParkingReservationService {
	
	@Autowired
	private ParkingReservationRepository parkRepo;
	
	public Boolean createParkingReservation(ParkingReservationEntity parkingReservationEntity) {
		if(parkingReservationEntity!=null) {
			parkRepo.save(parkingReservationEntity);
			return true;
		}
		return false;
	}
	
	 public List<ParkingReservationEntity> getParkingReservationEntityByDate(Date date) {
	        Calendar cal = Calendar.getInstance();
	        cal.setTime(date);
	        cal.set(Calendar.HOUR_OF_DAY, 0);
	        cal.set(Calendar.MINUTE, 0);
	        cal.set(Calendar.SECOND, 0);
	        cal.set(Calendar.MILLISECOND, 0);
	        Date startDate = cal.getTime();

	        cal.set(Calendar.HOUR_OF_DAY, 23);
	        cal.set(Calendar.MINUTE, 59);
	        cal.set(Calendar.SECOND, 59);
	        cal.set(Calendar.MILLISECOND, 999);
	        Date endDate = cal.getTime();

	        return parkRepo.findAllByDateBetween(startDate, endDate);
	    }
	 
	 public Boolean cancelReservation(int id) {
	        Optional<ParkingReservationEntity> reservationOpt = parkRepo.findById(id);
	        if (reservationOpt.isPresent()) {
	            ParkingReservationEntity reservation = reservationOpt.get();
	            reservation.setCancelled(true);
	            parkRepo.save(reservation);
	            return true;
	        }
	        return false;
	    }
}
