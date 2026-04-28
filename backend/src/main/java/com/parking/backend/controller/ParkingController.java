package com.parking.backend.controller;

import com.parking.backend.dto.*;
import com.parking.backend.entity.Ticket;
import com.parking.backend.service.ParkingService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parking")
public class ParkingController {

    private final ParkingService parkingService;

    public ParkingController(ParkingService parkingService) {
        this.parkingService = parkingService;
    }

    @PostMapping("/check-in")
    public Ticket checkIn(@Valid @RequestBody CheckInRequest request) {
        return parkingService.checkIn(request.getPlateNumber(), request.getType());
    }

    @PostMapping("/check-out")
    public Ticket checkOut(@Valid @RequestBody CheckOutRequest request) {
        return parkingService.checkOut(request.getPlateNumber());
    }
}