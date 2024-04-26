package com.test.test.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.test.Entity.ParkingAreaEntity;
import com.test.test.Repository.ParkingAreaRepository;

@Service
public class ParkingAreaService {

    @Autowired
    private ParkingAreaRepository parkingAreaRepository;

    public String updateParkingArea(ParkingAreaEntity parkingArea) {
        ParkingAreaEntity existingParkingArea = parkingAreaRepository.findById(parkingArea.getId()).orElse(null);
        if (existingParkingArea != null) {
        	existingParkingArea.setTotalSpace(parkingArea.getTotalSpace());
        	existingParkingArea.setAvailableSpace(parkingArea.getAvailableSpace());
        	existingParkingArea.setOccupiedSpace(parkingArea.getTotalSpace());
        	existingParkingArea.setIsFull(parkingArea.getIsFull());
        	existingParkingArea.setIsActive(parkingArea.getIsActive());
            parkingAreaRepository.save(existingParkingArea);
            return "Parking Area updated Successfully";
        }
        return "Parking Update Failed";
    }
    
    public List<ParkingAreaEntity> findAllActiveParkingAreas() {
        return parkingAreaRepository.findAllByIsActiveTrue();
    }
}

