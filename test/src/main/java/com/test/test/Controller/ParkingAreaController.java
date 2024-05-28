package com.test.test.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.test.test.Entity.ParkingAreaEntity;
import com.test.test.Repository.ParkingAreaRepository;
import com.test.test.Service.ParkingAreaService;

import java.util.List;

@RestController
@RequestMapping("/parking")
public class ParkingAreaController {

    @Autowired
    private ParkingAreaService parkingAreaService;
    
    @Autowired
    private ParkingAreaRepository parkingAreaRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createParkingArea(@RequestBody ParkingAreaEntity parkingArea) {
        String message = parkingAreaService.createParkingArea(parkingArea);
        return ResponseEntity.ok(message);
    }
    
    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<String> updateParkingArea(@PathVariable int id, @RequestBody ParkingAreaEntity parkingArea) {
        parkingArea.setId(id); // Set the ID from the path variable
        String message = parkingAreaService.updateParkingArea(parkingArea);
        return ResponseEntity.ok(message);
    }
    
    @CrossOrigin
    @PutMapping("/update-total-space/{id}")
    public ResponseEntity<String> updateParkingArea(@PathVariable int id, @RequestParam int totalSpace) {
        String message = parkingAreaService.updateTotalSpace(id, totalSpace);
        return ResponseEntity.ok(message);
    }
    
    @GetMapping("/count/motorcycles")
    public int countAllMotorcycles() {
        return parkingAreaService.countAllMotorcycles();
    }

    @GetMapping("/count/cars")
    public int countAllCars() {
        return parkingAreaService.countAllCars();
    }
    
    
    
    @CrossOrigin
    @PutMapping("/update-active-status/{id}")
    public ResponseEntity<String> updateActiveStatus(@PathVariable int id, @RequestParam boolean activeStatus) {
        String message = parkingAreaService.updateActiveStatus(id, activeStatus);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/active")
    public List<ParkingAreaEntity> findAllActiveParkingAreas() {
        return parkingAreaService.findAllActiveParkingAreas();
    }
    
    @GetMapping("/all")
    public List<ParkingAreaEntity> findAll() {
        return parkingAreaRepository.findAll();
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
