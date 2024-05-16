package com.test.test.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.test.Entity.PricesEntity;
import com.test.test.Repository.PricesRepository;

@Service
public class PricesService {

    @Autowired
    private PricesRepository pricesRepository;

    public void editStudentPrices(PricesEntity prices) {
        // Find the PricesEntity by its id
        Optional<PricesEntity> existingPricesOptional = pricesRepository.findById(1);

        // Update the values of the existingPrices entity with the new prices
        PricesEntity existingPrices = existingPricesOptional.orElseGet(() -> new PricesEntity());

        // Update existingPrices with the new prices entity
        existingPrices.setStudentTwoWheelPickup(prices.getStudentTwoWheelPickup());
        existingPrices.setStudentFourWheelPickup(prices.getStudentFourWheelPickup());
        existingPrices.setStudentTwoWheelParking(prices.getStudentTwoWheelParking());
        existingPrices.setStudentFourWheelParking(prices.getStudentFourWheelParking());

        // Save the updated entity back to the database
        pricesRepository.save(existingPrices);
    }
    
    public void editStaffPrices(PricesEntity prices) {
        // Find the PricesEntity by its id
        Optional<PricesEntity> existingPricesOptional = pricesRepository.findById(1);

        // Update the values of the existingPrices entity with the new prices
        PricesEntity existingPrices = existingPricesOptional.orElseGet(() -> new PricesEntity());

        // Update existingPrices with the new prices entity
        existingPrices.setStaffTwoWheelPickup(prices.getStaffTwoWheelPickup());
        existingPrices.setStaffFourWheelPickup(prices.getStaffFourWheelPickup());
        existingPrices.setStaffTwoWheelParking(prices.getStaffTwoWheelParking());
        existingPrices.setStaffFourWheelParking(prices.getStaffFourWheelParking());
        

        // Save the updated entity back to the database
        pricesRepository.save(existingPrices);
    }


}
