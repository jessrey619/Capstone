package com.test.test.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.test.Entity.UserEntity;
import com.test.test.Entity.VehicleEntity;
import com.test.test.Entity.VehicleUserRequest;
import com.test.test.Repository.VehicleRepository;

@Service
public class VehicleService {

	@Autowired
    private VehicleRepository vehicleRepository;
	

    public String createVehicle(VehicleUserRequest vUserRequest) {
    	if(vUserRequest.getUser().getIsVIP()==true) {
    		if(countVehiclesByUsername(vUserRequest.getVehicle().getUsername())<2){
    			vehicleRepository.save(vUserRequest.getVehicle());
    			return "Vehicle Added to VIP Successfully";
    		} else {
    			return "VIP already has registered 2 vehicles";
    		}
    		
    	} else if (countVehiclesByUsername(vUserRequest.getVehicle().getUsername())<1) {
    		vehicleRepository.save(vUserRequest.getVehicle());
    		return "Vehicle has been Registered";
    	}
    	else {
    		return "Registration unsuccessful";
    	}
		
    }

    public VehicleEntity findVehicleByUsername(String username) {
        return vehicleRepository.findByUsername(username);
    }

    public List<VehicleEntity> findVehiclesByUsername(String username) {
        return vehicleRepository.findAllByUsername(username);
    }
    
    public VehicleEntity updateVehicle(VehicleEntity vehicle) {
        Optional<VehicleEntity> existingVehicleOptional = vehicleRepository.findById(vehicle.getId());
        if (existingVehicleOptional.isPresent()) {
            VehicleEntity existingVehicle = existingVehicleOptional.get();
            existingVehicle.setVehicleMake(vehicle.getVehicleMake());
            existingVehicle.setPlateNo(vehicle.getPlateNo());
            existingVehicle.setColor(vehicle.getColor());
            existingVehicle.setVehicleType(vehicle.getVehicleType());
            return vehicleRepository.save(existingVehicle);
        }
        return null;
    }
  
    public int countVehiclesByUsername(String username) {
        List<VehicleEntity> vehicles = findVehiclesByUsername(username);
        return vehicles.size();
    }
}
