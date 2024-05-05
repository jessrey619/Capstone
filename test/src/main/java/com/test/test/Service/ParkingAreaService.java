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

    public String createParkingArea(ParkingAreaEntity parkingArea) {
        parkingAreaRepository.save(parkingArea);
        return "Parking Area created Successfully";
    }
    
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
    
    //IMPORTANT 
    //Sumpay Ni siya sa Logs like if mu update ang logs ... update ni siya
    public String updateParkingSpace(int parkingAreaId, boolean isEntry) {
        ParkingAreaEntity parkingArea = parkingAreaRepository.findById(parkingAreaId).orElse(null);
        if (parkingArea != null) {
            if (isEntry) {
                if (parkingArea.getAvailableSpace() > 0) {
                    parkingArea.setAvailableSpace(parkingArea.getAvailableSpace() - 1);
                    parkingArea.setOccupiedSpace(parkingArea.getOccupiedSpace() + 1);
                } else {
                    return "Parking Area is full";
                }
            } else {
                if (parkingArea.getOccupiedSpace() > 0) {
                    parkingArea.setAvailableSpace(parkingArea.getAvailableSpace() + 1);
                    parkingArea.setOccupiedSpace(parkingArea.getOccupiedSpace() - 1);
                } else {
                    return "Parking Area is already empty";
                }
            }
            parkingAreaRepository.save(parkingArea);
            return "Parking Area updated successfully";
        }
        return "Parking Area not found";
    }
    
    public List<ParkingAreaEntity> findAllActiveParkingAreas() {
        return parkingAreaRepository.findAllByIsActiveTrue();
    }
    
    public int getTotalAvailableSpace() {
        List<ParkingAreaEntity> activeParkingAreas = findAllActiveParkingAreas();
        int totalAvailableSpace = activeParkingAreas.stream().mapToInt(ParkingAreaEntity::getAvailableSpace).sum();
        return totalAvailableSpace;
    }

    public int getTotalOccupiedSpace() {
        List<ParkingAreaEntity> activeParkingAreas = findAllActiveParkingAreas();
        int totalOccupiedSpace = activeParkingAreas.stream().mapToInt(ParkingAreaEntity::getOccupiedSpace).sum();
        return totalOccupiedSpace;
    }

    public int getTotalSpace() {
        List<ParkingAreaEntity> activeParkingAreas = findAllActiveParkingAreas();
        int totalSpace = activeParkingAreas.stream().mapToInt(ParkingAreaEntity::getTotalSpace).sum();
        return totalSpace;
    }
}

