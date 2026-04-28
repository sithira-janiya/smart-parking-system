package com.parking.backend.service;

import com.parking.backend.entity.*;
import com.parking.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class ParkingService {

    private final VehicleRepository vehicleRepo;
    private final ParkingSlotRepository slotRepo;
    private final TicketRepository ticketRepo;

    public ParkingService(VehicleRepository vehicleRepo,
                          ParkingSlotRepository slotRepo,
                          TicketRepository ticketRepo) {
        this.vehicleRepo = vehicleRepo;
        this.slotRepo = slotRepo;
        this.ticketRepo = ticketRepo;
    }

    // ================= CHECK-IN =================
    @Transactional
    public Ticket checkIn(String plateNumber, VehicleType type) {

        Vehicle vehicle = vehicleRepo.findByPlateNumber(plateNumber)
                .orElseGet(() -> vehicleRepo.save(new Vehicle(null, plateNumber, type)));

        ParkingSlot slot = slotRepo
                .findFirstByVehicleTypeAndStatus(type, SlotStatus.AVAILABLE)
                .orElseThrow(() -> new RuntimeException("No available slot"));

        slot.setStatus(SlotStatus.OCCUPIED);
        slotRepo.save(slot);

        Ticket ticket = new Ticket();
        ticket.setVehicle(vehicle);
        ticket.setSlot(slot);
        ticket.setCheckInTime(LocalDateTime.now());
        ticket.setStatus("ACTIVE");

        return ticketRepo.save(ticket);
    }

    // ================= CHECK-OUT =================
    @Transactional
    public Ticket checkOut(String plateNumber) {

        Ticket ticket = ticketRepo
                .findByVehicle_PlateNumberAndStatus(plateNumber, "ACTIVE")
                .orElseThrow(() -> new RuntimeException("No active ticket found"));

        ticket.setCheckOutTime(LocalDateTime.now());

        long hours = Duration
                .between(ticket.getCheckInTime(), ticket.getCheckOutTime())
                .toHours();

        if (hours == 0) hours = 1;

        // 🔥 Dynamic Pricing
        double rate;

        switch (ticket.getVehicle().getVehicleType()) {
            case CAR -> rate = 100;
            case BIKE -> rate = 50;
            case VAN -> rate = 150;
            default -> rate = 100;
        }

        double fee = hours * rate;
        ticket.setFee(fee);

        // free slot
        ParkingSlot slot = ticket.getSlot();
        slot.setStatus(SlotStatus.AVAILABLE);
        slotRepo.save(slot);

        ticket.setStatus("COMPLETED");

        return ticketRepo.save(ticket);
    }
}