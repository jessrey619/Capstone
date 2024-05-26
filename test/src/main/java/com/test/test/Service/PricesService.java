package com.test.test.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.test.Entity.PricesEntity;
import com.test.test.Repository.PricesRepository;

@Service
public class PricesService {

    @Autowired
    private PricesRepository pricesRepository;

    
    public PricesEntity getPrice() {
    	return pricesRepository.findFirst();
    }
    
    public String editStudentPrices(PricesEntity prices) {
        // Find the PricesEntity by its id
        PricesEntity existingPricesOptional = pricesRepository.findFirst();

        if(existingPricesOptional==null) {
        	existingPricesOptional = new PricesEntity();
        }
        
        // Update the values of the existingPrices entity with the new prices
        PricesEntity existingPrices = existingPricesOptional;
        
        

        // Update existingPrices with the new prices entity
        existingPrices.setStudentTwoWheelPickup(prices.getStudentTwoWheelPickup());
        existingPrices.setStudentFourWheelPickup(prices.getStudentFourWheelPickup());
        existingPrices.setStudentTwoWheelParking(prices.getStudentTwoWheelParking());
        existingPrices.setStudentFourWheelParking(prices.getStudentFourWheelParking());

        // Save the updated entity back to the database
        pricesRepository.save(existingPrices);
        
        return "Student Prices Editted Successfully";
    }
    
    public String editStaffPrices(PricesEntity prices) {
        // Find the PricesEntity by its id
        PricesEntity existingPricesOptional = pricesRepository.findFirst();
        if(existingPricesOptional==null) {
        	existingPricesOptional = new PricesEntity();
        }
        // Update the values of the existingPrices entity with the new prices
        PricesEntity existingPrices = existingPricesOptional;

        // Update existingPrices with the new prices entity
        existingPrices.setStaffTwoWheelPickup(prices.getStaffTwoWheelPickup());
        existingPrices.setStaffFourWheelPickup(prices.getStaffFourWheelPickup());
        existingPrices.setStaffTwoWheelParking(prices.getStaffTwoWheelParking());
        existingPrices.setStaffFourWheelParking(prices.getStaffFourWheelParking());
        

        // Save the updated entity back to the database
        pricesRepository.save(existingPrices);
        
        return "Staff Prices Editted Successfully";
    }


}
