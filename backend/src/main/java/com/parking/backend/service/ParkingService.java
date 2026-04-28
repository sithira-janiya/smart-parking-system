package com.parking.backend.service;
import java.time.Duration;
import java.time.LocalDateTime;
import com.parking.backend.entity.*;
import com.parking.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



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

    @Transactional
    public Ticket checkOut(String plateNumber) {

        // 1. Find active ticket
        Ticket ticket = ticketRepo
                .findByVehicle_PlateNumberAndStatus(plateNumber, "ACTIVE")
                .orElseThrow(() -> new RuntimeException("No active ticket found"));

        // 2. Set checkout time
        ticket.setCheckOutTime(java.time.LocalDateTime.now());

        // 3. Calculate duration
        long hours = java.time.Duration
                .between(ticket.getCheckInTime(), ticket.getCheckOutTime())
                .toHours();

        if (hours == 0) {
            hours = 1;
        }

        // 4. Calculate fee
        double fee = hours * 100;
        ticket.setFee(fee);

        // 5. Free slot
        ParkingSlot slot = ticket.getSlot();
        slot.setStatus(SlotStatus.AVAILABLE);
        slotRepo.save(slot);

        // 6. Complete ticket
        ticket.setStatus("COMPLETED");

        return ticketRepo.save(ticket);
    }
}