package com.test.test.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.test.test.Entity.PricesEntity;
import com.test.test.Service.PricesService;

@RestController
@RequestMapping("/prices")
public class PricesController {

    @Autowired
    private PricesService pricesService;

    @CrossOrigin
    @PutMapping("/update-student-prices")
    public String editStudentPrices(@RequestBody PricesEntity prices) {
        return pricesService.editStudentPrices(prices);
    }
    
    @CrossOrigin
    @PutMapping("/update-staff-prices")
    public String editStaffPrices(@RequestBody PricesEntity prices) {
        return pricesService.editStaffPrices(prices);
    }
    
    @CrossOrigin
    @GetMapping("/get-prices")
    public PricesEntity getPrices() {
    	return pricesService.getPrice();
    }
}
