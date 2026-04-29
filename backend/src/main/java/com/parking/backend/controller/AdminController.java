package com.parking.backend.controller;

import com.parking.backend.dto.AdminSlotRequest;
import com.parking.backend.entity.ParkingSlot;
import com.parking.backend.service.ParkingService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ParkingService parkingService;

    public AdminController(ParkingService parkingService) {
        this.parkingService = parkingService;
    }

    @PostMapping("/slots")
    public ParkingSlot createSlot(@RequestBody AdminSlotRequest request) {
        return parkingService.createSlot(
                request.getSlotNumber(),
                request.getVehicleType()
        );
    }

    @GetMapping("/slots")
    public List<ParkingSlot> getAllSlots() {
        return parkingService.getAllSlots();
    }

    @DeleteMapping("/slots/{id}")
    public String deleteSlot(@PathVariable Long id) {
        parkingService.deleteSlot(id);
        return "Slot deleted";
    }
}