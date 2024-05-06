package com.test.test.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.test.Entity.LogsEntity;
import com.test.test.Entity.VehicleTypeCountResponse;
import com.test.test.Repository.LogsRepository;

@Service
public class LogsService {

    @Autowired
    private LogsRepository logsRepository;

    public LogsEntity createLog(LogsEntity logsEntity) {
        return logsRepository.save(logsEntity);
    }

    public List<LogsEntity> getAllLogs() {
        return logsRepository.findAll();
    }

    public Optional<LogsEntity> getLogById(int id) {
        return logsRepository.findById(id);
    }

    public void deleteLog(int id) {
        logsRepository.deleteById(id);
    }

    public LogsEntity updateLog(int id, LogsEntity updatedLog) {
        LogsEntity existingLog = logsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Log not found with id: " + id));

        existingLog.setIsParking(updatedLog.getIsParking());
        existingLog.setStickerId(updatedLog.getStickerId());
        existingLog.setIsFourWheel(updatedLog.getIsFourWheel());
        existingLog.setColor(updatedLog.getColor());
        existingLog.setPlateNo(updatedLog.getPlateNo());
        existingLog.setName(updatedLog.getName());
        existingLog.setTimeIn(updatedLog.getTimeIn());
        existingLog.setTimeOut(updatedLog.getTimeOut());

        return logsRepository.save(existingLog);
    }
    
    public VehicleTypeCountResponse countVehicleTypes() {
        List<LogsEntity> logs = logsRepository.findAll();
        int countFourWheel = (int) logs.stream().filter(LogsEntity::getIsFourWheel).count();
        int countOther = (int) logs.stream().filter(log -> !log.getIsFourWheel()).count();
        return new VehicleTypeCountResponse(countFourWheel, countOther);
    }
}