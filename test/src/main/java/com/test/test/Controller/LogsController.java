package com.test.test.Controller;

import com.test.test.Entity.LogsEntity;
import com.test.test.Entity.VehicleTypeCountResponse;
import com.test.test.Service.LogsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/logs")
public class LogsController {

    @Autowired
    private LogsService logsService;

//    @PostMapping("/add")
//    public ResponseEntity<LogsEntity> addLog(@RequestBody LogsEntity logsEntity) {
//        LogsEntity newLog = logsService.createLog(logsEntity);
//        return new ResponseEntity<>(newLog, HttpStatus.CREATED);
//    }

    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<LogsEntity>> getAllLogs() {
        List<LogsEntity> logs = logsService.getAllLogs();
        return new ResponseEntity<>(logs, HttpStatus.OK);
    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<LogsEntity> getLogById(@PathVariable int id) {
//        return logsService.getLogById(id)
//                .map(log -> new ResponseEntity<>(log, HttpStatus.OK))
//                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }

//    @PutMapping("/{id}")
//    public ResponseEntity<LogsEntity> updateLog(@PathVariable int id, @RequestBody LogsEntity updatedLog) {
//        LogsEntity updated = logsService.updateLog(id, updatedLog);
//        return new ResponseEntity<>(updated, HttpStatus.OK);
//    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteLog(@PathVariable int id) {
//        logsService.deleteLog(id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
    
//    TODO ISUMPAY SA FRONTEND
    @GetMapping("/vehicle-types/count")
    public ResponseEntity<VehicleTypeCountResponse> countVehicleTypes() {
        VehicleTypeCountResponse response = logsService.countVehicleTypes();
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/log-in")
    public ResponseEntity<String> log(@RequestParam int stickerId) {
        try {
            String parkingAreaName = logsService.log(stickerId);
            return ResponseEntity.ok(parkingAreaName);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
