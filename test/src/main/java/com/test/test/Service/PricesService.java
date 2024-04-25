package com.test.test.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.test.Repository.PricesRepository;

@Service
public class PricesService {

    @Autowired
    private PricesRepository pricesRepository;

    public void editPrices(int id, Double twoWheelPickup, Double fourWheelPickup, Double twoWheelParking, Double fourWheelParking) {
        pricesRepository.editValues(id, twoWheelPickup, fourWheelPickup, twoWheelParking, fourWheelParking);
    }
}
