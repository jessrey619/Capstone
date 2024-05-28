package com.test.test.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.test.test.Entity.VehicleEntity;
import com.test.test.Entity.VehicleUserRequest;
import com.test.test.Repository.VehicleRepository;
import com.test.test.Service.VehicleService;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;
    
    @Autowired
    private VehicleRepository vehicleRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createVehicle(@RequestBody VehicleUserRequest vUserRequest) {
        String createdVehicleResponse = vehicleService.createVehicle(vUserRequest);
        return ResponseEntity.ok(createdVehicleResponse);
    }

    @GetMapping("/find-by-username/{username}")
    public ResponseEntity<VehicleEntity> findVehicleByUsername(@PathVariable String username) {
        List<VehicleEntity> vehicles = vehicleService.findVehiclesByUsername(username);
        VehicleEntity vehicle;
        if(vehicles.size()>1) {
        	vehicle = vehicles.get(vehicles.size()-1);
        } else {
        	vehicle = vehicles.get(0);
        }
        if (vehicle != null) {
            return ResponseEntity.ok(vehicle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<VehicleEntity> updateVehicle(@RequestBody VehicleEntity vehicle) {
        VehicleEntity updatedVehicle = vehicleService.updateVehicle(vehicle);
        if (updatedVehicle != null) {
            return ResponseEntity.ok(updatedVehicle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/find-all-by-username/{username}")
    public ResponseEntity<List<VehicleEntity>> findVehiclesByUsername(@PathVariable String username) {
        List<VehicleEntity> vehicles = vehicleService.findVehiclesByUsername(username);
        if (!vehicles.isEmpty()) {
            return ResponseEntity.ok(vehicles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/find-by-sticker-id")
    public VehicleEntity findVehiclesBySticker(@RequestParam int stickerId){
    	return vehicleService.findByStickerId(stickerId);
    }
    
    @CrossOrigin
    @GetMapping("/all")
    public List<VehicleEntity> findAllVehicles(){
    	return vehicleRepository.findAll();
    }
}
