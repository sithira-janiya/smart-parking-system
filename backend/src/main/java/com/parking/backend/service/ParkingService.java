package com.parking.backend.service;

import com.parking.backend.entity.*;
import com.parking.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

// Check-in logic implementation
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

    @Transactional
    public Ticket checkIn(String plateNumber, VehicleType type) {

        // 1. Find existing vehicle OR create new one
        Vehicle vehicle = vehicleRepo.findByPlateNumber(plateNumber)
                .orElseGet(() -> vehicleRepo.save(
                        new Vehicle(null, plateNumber, type)
                ));

        // 2. Find available slot
        ParkingSlot slot = slotRepo.findFirstByStatus(SlotStatus.AVAILABLE)
                .orElseThrow(() -> new RuntimeException("No parking slots available"));

        // 3. Mark slot as OCCUPIED
        slot.setStatus(SlotStatus.OCCUPIED);
        slotRepo.save(slot);

        // 4. Create ticket
        Ticket ticket = new Ticket();
        ticket.setVehicle(vehicle);
        ticket.setSlot(slot);
        ticket.setCheckInTime(LocalDateTime.now());
        ticket.setStatus("ACTIVE");

        // 5. Save ticket
        return ticketRepo.save(ticket);
    }
}