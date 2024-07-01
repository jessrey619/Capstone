package com.test.test.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.test.Entity.LogsEntity;
import com.test.test.Entity.ParkingAreaEntity;
import com.test.test.Entity.VehicleEntity;
import com.test.test.Entity.VehicleTypeCountResponse;
import com.test.test.Repository.LogsRepository;
import com.test.test.Repository.ParkingAreaRepository;
import com.test.test.Repository.VehicleRepository;

@Service
public class LogsService {

    @Autowired
    private LogsRepository logsRepository;
    
    @Autowired
    private ParkingAreaRepository parkingAreaRepository;
    
    @Autowired
    private VehicleRepository vehicleRepository;

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

    //TODO ask ETO ug unsaon ni style
    public LogsEntity log(int stickerId) {
    // Get all parking areas
    List<ParkingAreaEntity> parkingAreas = parkingAreaRepository.findAll();
    VehicleEntity vehicle = vehicleRepository.findByStickerId(stickerId);
    
    
    // Calculate the occupancy rate for each parking area
    ParkingAreaEntity selectedParkingArea = null;
    double minOccupancyRate = Double.MAX_VALUE;

    
    for (ParkingAreaEntity parkingArea : parkingAreas) {
    	//checks what type of vehicle is entering
    	//if car Enters
    	if(vehicle.getVehicleType() && parkingArea.getAllowCars()) {
    		//checks if parking area allows cars
    			double occupancyRate = (double) parkingArea.getOccupiedSpace() / parkingArea.getTotalSpace();
    	        if (occupancyRate < minOccupancyRate) {
    	            minOccupancyRate = occupancyRate;
    	            selectedParkingArea = parkingArea;
    	        }
    		
    	//if motorcycle Enters
    	} else if(vehicle.getVehicleType()==false && parkingArea.getAllowMotorcycles()) {
    			double occupancyRate = (double) parkingArea.getOccupiedSpace() / parkingArea.getTotalSpace();
    	        if (occupancyRate < minOccupancyRate) {
    	            minOccupancyRate = occupancyRate;
    	            selectedParkingArea = parkingArea;
    	        }
    		}
    }

    if (selectedParkingArea == null) {
        throw new RuntimeException("No parking area found");
    }

    // Check if there is an existing log for this stickerId
    List<LogsEntity> existingLogs = logsRepository.findByStickerId(stickerId);
    
    //finds the vehicle by sticker Id

    if(vehicle == null) {
    	throw new RuntimeException("There is no Vehicle with that Id");
    }

    if (!existingLogs.isEmpty()) {
        
        LogsEntity existingLog = existingLogs.get(existingLogs.size()-1);
        //checks for Logs if the latest Log has 
        if(existingLog.getTimeIn()!=null && existingLog.getTimeOut()!=null) {
        	LogsEntity logsEntity = new LogsEntity();
            logsEntity.setStickerId(stickerId);
            logsEntity.setIsParking(true);
            logsEntity.setTimeIn(new Date());
            logsEntity.setParkingAreaName(selectedParkingArea.getName());
//            System.out.println(vehicle.getExpirationDate().after(new Date()));
            logsEntity.setActive(vehicle.getExpirationDate().after(new Date()));
            logsEntity.setIsFourWheel(vehicle.getVehicleType());
            logsEntity.setColor(vehicle.getColor());
            logsEntity.setPlateNo(vehicle.getPlateNo());
            logsEntity.setName(vehicle.getName());
            
            //TODO insert Plus and Minus Logic for Parking Area Spaces here
            logsRepository.save(logsEntity);
            
//            if(vehicle.getVehicleType() && selectedParkingArea.getAllowCars()) {
//            	selectedParkingArea.setNumberOfCars(selectedParkingArea.getNumberOfCars()+1);
//            }
//            
//            if(vehicle.getVehicleType()==false && selectedParkingArea.getAllowMotorcycles()) {
//            	selectedParkingArea.setNumberOfMotorcycles(selectedParkingArea.getNumberOfMotorcycles()+1);
//            }
//            
            selectedParkingArea.setOccupiedSpace(selectedParkingArea.getOccupiedSpace()+1);
            selectedParkingArea.setAvailableSpace(selectedParkingArea.getAvailableSpace()-1);
            
            if(vehicle.getVehicleType()) {
            	selectedParkingArea.setNumberOfCars(selectedParkingArea.getNumberOfCars()+1);
            } else {
            	selectedParkingArea.setNumberOfMotorcycles(selectedParkingArea.getNumberOfMotorcycles()+1);
            }
            
//            SAVES UPDATED PARKING AREA
            parkingAreaRepository.save(selectedParkingArea);
            
            return logsEntity;
        }
        //checks if there is login but no logout OR Vehicle is Still in the Premises
        else if(existingLog.getTimeIn()!=null && existingLog.getTimeOut()==null) {
        	Date logOut = new Date();
        	
        	ParkingAreaEntity existingParkingArea = parkingAreaRepository.findByName(existingLog.getParkingAreaName());
        	
        	if(logOut.before(new Date(existingLog.getTimeIn().getTime()+60000))) {
        		 throw new RuntimeException("Logout time must be at least 1 minute after login time.");
        	} else {
        		existingLog.setTimeOut(logOut);
        		//TODO insert Plus and Minus Logic for Parking Area Spaces here FOR THE PARKING AREA MOTOR COUNT
//        		SAVES LOGS NA MI LOGOUT
        		logsRepository.save(existingLog);
        		
        		existingParkingArea.setOccupiedSpace(existingParkingArea.getOccupiedSpace()-1);
        		existingParkingArea.setAvailableSpace(existingParkingArea.getAvailableSpace()+1);
                
                if(vehicle.getVehicleType()) {
                	existingParkingArea.setNumberOfCars(existingParkingArea.getNumberOfCars()-1);
                } else {
                	existingParkingArea.setNumberOfMotorcycles(existingParkingArea.getNumberOfMotorcycles()-1);
                }
                
                parkingAreaRepository.save(existingParkingArea);
        		return existingLog;
        	}
        }
        else if(existingLog.getTimeIn()==null){
        	throw new RuntimeException("There is a log without Log in Time"); 
        }
    } else {
        // No existing log with no logout time, create a new log
        LogsEntity logsEntity = new LogsEntity();
        logsEntity.setStickerId(stickerId);
        logsEntity.setIsParking(true);
        logsEntity.setTimeIn(new Date());
        logsEntity.setParkingAreaName(selectedParkingArea.getName());
        
        logsEntity.setIsFourWheel(vehicle.getVehicleType());
        logsEntity.setColor(vehicle.getColor());
        logsEntity.setPlateNo(vehicle.getPlateNo());
        logsEntity.setName(vehicle.getName());
        
//        SAVES EXISTING LOGS
        logsRepository.save(logsEntity);
        
        selectedParkingArea.setOccupiedSpace(selectedParkingArea.getOccupiedSpace()+1);
        selectedParkingArea.setAvailableSpace(selectedParkingArea.getAvailableSpace()-1);
        
        if(vehicle.getVehicleType()) {
        	selectedParkingArea.setNumberOfCars(selectedParkingArea.getNumberOfCars()+1);
        } else {
        	selectedParkingArea.setNumberOfMotorcycles(selectedParkingArea.getNumberOfMotorcycles()+1);
        }
        
        parkingAreaRepository.save(selectedParkingArea);
        return logsEntity;
    }
	return new LogsEntity();
}

    
}