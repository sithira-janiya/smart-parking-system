package com.parking.backend.controller;

import com.parking.backend.dto.CheckInRequest;
import com.parking.backend.dto.CheckOutRequest;
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

    // ================= CHECK-IN =================
    @PostMapping("/check-in")
    public Ticket checkIn(@Valid @RequestBody CheckInRequest request) {
        return parkingService.checkIn(
                request.getPlateNumber(),
                request.getType()
        );
    }

    // ================= CHECK-OUT =================
    @PostMapping("/check-out")
    public Ticket checkOut(@Valid @RequestBody CheckOutRequest request) {
        return parkingService.checkOut(
                request.getPlateNumber()
        );
    }

    @GetMapping("/available-slots")
    public long availableSlots() {
        return parkingService.getAvailableSlots();
    }

    @GetMapping("/active")
    public long activeVehicles() {
        return parkingService.getActiveVehicles();
    }

    @GetMapping("/revenue")
    public double totalRevenue() {
        return parkingService.getTotalRevenue();
    }
}