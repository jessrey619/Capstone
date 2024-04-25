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

    @PutMapping("/{id}")
    public void editPrices(@PathVariable int id, @RequestBody PricesEntity pricesEntity) {
        pricesService.editPrices(id, pricesEntity.getTwoWheelPickup(), pricesEntity.getFourWheelPickup(), pricesEntity.getTwoWheelParking(), pricesEntity.getFourWheelParking());
    }
}
