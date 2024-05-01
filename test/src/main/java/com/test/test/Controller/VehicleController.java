package com.test.test.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.test.test.Entity.VehicleEntity;
import com.test.test.Entity.VehicleUserRequest;
import com.test.test.Service.VehicleService;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/create")
    public ResponseEntity<String> createVehicle(@RequestBody VehicleUserRequest vUserRequest) {
        String createdVehicleResponse = vehicleService.createVehicle(vUserRequest);
        return ResponseEntity.ok(createdVehicleResponse);
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<VehicleEntity> findVehicleByUsername(@PathVariable String username) {
        VehicleEntity vehicle = vehicleService.findVehicleByUsername(username);
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
    
    @GetMapping("/find-by-username/{username}")
    public ResponseEntity<List<VehicleEntity>> findVehiclesByUsername(@PathVariable String username) {
        List<VehicleEntity> vehicles = vehicleService.findVehiclesByUsername(username);
        if (!vehicles.isEmpty()) {
            return ResponseEntity.ok(vehicles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
