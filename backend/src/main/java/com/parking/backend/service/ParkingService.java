package com.parking.backend.service;

import com.parking.backend.dto.response.TicketResponse;
import com.parking.backend.entity.*;
import com.parking.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.parking.backend.exception.ResourceNotFoundException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

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
    public TicketResponse checkIn(String plateNumber, VehicleType type) {

        // 1. Find existing vehicle OR create new
        Vehicle vehicle = vehicleRepo.findByPlateNumber(plateNumber)
                .orElseGet(() -> vehicleRepo.save(new Vehicle(null, plateNumber, type)));

        // 2. Find available slot for vehicle type
        ParkingSlot slot = slotRepo
                .findFirstByVehicleTypeAndStatus(type, SlotStatus.AVAILABLE)
                .orElseThrow(() -> new RuntimeException("No available slot"));

        // 3. Mark slot as occupied
        slot.setStatus(SlotStatus.OCCUPIED);
        slotRepo.save(slot);

        // 4. Create ticket
        Ticket ticket = new Ticket();
        ticket.setVehicle(vehicle);
        ticket.setSlot(slot);
        ticket.setCheckInTime(LocalDateTime.now());
        ticket.setStatus("ACTIVE");

        Ticket saved = ticketRepo.save(ticket);

        // 5. Convert to DTO
        return mapToResponse(saved);
    }

    // ================= CHECK-OUT =================
    @Transactional
    public TicketResponse checkOut(String plateNumber) {

        // 1. Find active ticket
        Ticket ticket = ticketRepo
                .findByVehicle_PlateNumberAndStatus(plateNumber, "ACTIVE")
                .orElseThrow(() -> new ResourceNotFoundException("No active ticket found"));

        // 2. Set checkout time
        ticket.setCheckOutTime(LocalDateTime.now());

        // 3. Calculate duration
        long hours = Duration
                .between(ticket.getCheckInTime(), ticket.getCheckOutTime())
                .toHours();

        if (hours == 0) hours = 1;

        // 4. Dynamic pricing
        double rate;

        switch (ticket.getVehicle().getVehicleType()) {
            case CAR -> rate = 100;
            case BIKE -> rate = 50;
            case VAN -> rate = 150;
            default -> rate = 100;
        }

        double fee = hours * rate;
        ticket.setFee(fee);

        // 5. Free slot
        ParkingSlot slot = ticket.getSlot();
        slot.setStatus(SlotStatus.AVAILABLE);
        slotRepo.save(slot);

        // 6. Update status
        ticket.setStatus("COMPLETED");

        Ticket saved = ticketRepo.save(ticket);

        return mapToResponse(saved);
    }

    // ================= DASHBOARD =================
    public long getAvailableSlots() {
        return slotRepo.countByStatus(SlotStatus.AVAILABLE);
    }

    public long getActiveVehicles() {
        return ticketRepo.findByStatus("ACTIVE").size();
    }

    public double getTotalRevenue() {
        return ticketRepo.findAll().stream()
                .filter(t -> t.getFee() != null)
                .mapToDouble(Ticket::getFee)
                .sum();
    }

    // ================= DTO MAPPING =================
    private TicketResponse mapToResponse(Ticket t) {
        return new TicketResponse(
                t.getId(),
                t.getVehicle().getPlateNumber(),
                t.getVehicle().getVehicleType().name(),
                t.getSlot().getSlotNumber(),
                t.getStatus(),
                t.getCheckInTime(),
                t.getCheckOutTime(),
                t.getFee()
        );
    }

    public ParkingSlot createSlot(String slotNumber, VehicleType type) {

        if (slotRepo.existsBySlotNumber(slotNumber)) {
            throw new RuntimeException("Slot already exists");
        }

        ParkingSlot slot = new ParkingSlot();
        slot.setSlotNumber(slotNumber);
        slot.setVehicleType(type);
        slot.setStatus(SlotStatus.AVAILABLE);

        return slotRepo.save(slot);
    }

    public List<ParkingSlot> getAllSlots() {
        return slotRepo.findAll();
    }

    public void deleteSlot(Long id) {
        slotRepo.deleteById(id);
    }
}