package com.test.test.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.test.Entity.PricesEntity;
import com.test.test.Repository.PricesRepository;

@Service
public class PricesService {

    @Autowired
    private PricesRepository pricesRepository;

    public void editPrices(int id, PricesEntity prices) {
        // Find the PricesEntity by its id
        PricesEntity existingPrices = pricesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PricesEntity not found with id: " + id));

        // Update the values of the existingPrices entity with the new prices
        existingPrices.setTwoWheelPickup(prices.getTwoWheelPickup());
        existingPrices.setFourWheelPickup(prices.getFourWheelPickup());
        existingPrices.setTwoWheelParking(prices.getTwoWheelParking());
        existingPrices.setFourWheelParking(prices.getFourWheelParking());

        // Save the updated entity back to the database
        pricesRepository.save(existingPrices);
    }
}
