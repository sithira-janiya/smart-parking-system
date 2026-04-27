package com.parking.backend.controller;

import com.parking.backend.entity.*;
import com.parking.backend.service.ParkingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parking")
public class ParkingController {

    private final ParkingService parkingService;

    public ParkingController(ParkingService parkingService) {
        this.parkingService = parkingService;
    }

    @PostMapping("/check-in")
    public Ticket checkIn(@RequestParam String plateNumber,
                          @RequestParam VehicleType type) {

        return parkingService.checkIn(plateNumber, type);
    }
}