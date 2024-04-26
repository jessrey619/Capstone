package com.test.test.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.test.test.Entity.ParkingAreaEntity;
import com.test.test.Service.ParkingAreaService;

import java.util.List;

@RestController
@RequestMapping("/parking")
public class ParkingAreaController {

    @Autowired
    private ParkingAreaService parkingAreaService;

    @PutMapping("/{id}")
    public void updateParkingArea(@PathVariable int id, @RequestBody ParkingAreaEntity parkingArea) {
        parkingArea.setId(id); // Set the ID from the path variable
        parkingAreaService.updateParkingArea(parkingArea);
    }

    @GetMapping("/active")
    public List<ParkingAreaEntity> findAllActiveParkingAreas() {
        return parkingAreaService.findAllActiveParkingAreas();
    }
}
