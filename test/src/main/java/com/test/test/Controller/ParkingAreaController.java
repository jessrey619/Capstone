package com.test.test.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.test.test.Entity.ParkingAreaEntity;
import com.test.test.Service.ParkingAreaService;

import java.util.List;

@RestController
@RequestMapping("/parking")
public class ParkingAreaController {

    @Autowired
    private ParkingAreaService parkingAreaService;

    @PostMapping("/create")
    public ResponseEntity<String> createParkingArea(@RequestBody ParkingAreaEntity parkingArea) {
        String message = parkingAreaService.createParkingArea(parkingArea);
        return ResponseEntity.ok(message);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<String> updateParkingArea(@PathVariable int id, @RequestBody ParkingAreaEntity parkingArea) {
        parkingArea.setId(id); // Set the ID from the path variable
        String message = parkingAreaService.updateParkingArea(parkingArea);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/active")
    public List<ParkingAreaEntity> findAllActiveParkingAreas() {
        return parkingAreaService.findAllActiveParkingAreas();
    }
    
    @GetMapping("/total-available-space")
    public ResponseEntity<Integer> getTotalAvailableSpace() {
        int totalAvailableSpace = parkingAreaService.getTotalAvailableSpace();
        return ResponseEntity.ok(totalAvailableSpace);
    }

    @GetMapping("/total-occupied-space")
    public ResponseEntity<Integer> getTotalOccupiedSpace() {
        int totalOccupiedSpace = parkingAreaService.getTotalOccupiedSpace();
        return ResponseEntity.ok(totalOccupiedSpace);
    }

    @CrossOrigin
    @GetMapping("/total-space")
    public ResponseEntity<Integer> getTotalSpace() {
        int totalSpace = parkingAreaService.getTotalSpace();
        return ResponseEntity.ok(totalSpace);
    }
}
