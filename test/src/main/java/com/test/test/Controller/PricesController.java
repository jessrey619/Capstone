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

    @PutMapping("/update-student-prices")
    public void editStudentPrices(@RequestBody PricesEntity prices) {
        pricesService.editStudentPrices(prices);
    }
    
    @PutMapping("/update-staff-prices")
    public void editStaffPrices(@RequestBody PricesEntity prices) {
        pricesService.editStaffPrices(prices);
    }
}
