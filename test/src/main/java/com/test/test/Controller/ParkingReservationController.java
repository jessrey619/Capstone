package com.test.test.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.test.test.Entity.ParkingReservationEntity;
import com.test.test.Service.ParkingReservationService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/parking-reservations")
public class ParkingReservationController {

    @Autowired
    private ParkingReservationService parkingReservationService;

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<String> createParkingReservation(@RequestBody ParkingReservationEntity parkingReservationEntity) {
        Boolean isCreated = parkingReservationService.createParkingReservation(parkingReservationEntity);
        if (isCreated) {
            return new ResponseEntity<>("Parking reservation created successfully.", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to create parking reservation.", HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @GetMapping("/get-by-date")
    public ResponseEntity<List<ParkingReservationEntity>> getParkingReservationsByDate(
            @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        List<ParkingReservationEntity> reservations = parkingReservationService.getParkingReservationEntityByDate(date);
        if (reservations != null) {
            return new ResponseEntity<>(reservations, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    
    @CrossOrigin
    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelReservation(@PathVariable("id") int id) {
        Boolean isCancelled = parkingReservationService.cancelReservation(id);
        if (isCancelled) {
            return new ResponseEntity<>("Reservation cancelled successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to cancel reservation.", HttpStatus.NOT_FOUND);
        }
    }
    
    
}
