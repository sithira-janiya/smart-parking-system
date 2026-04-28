package com.parking.backend.repository;

import com.parking.backend.entity.ParkingSlot;
import com.parking.backend.entity.SlotStatus;
import com.parking.backend.entity.VehicleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {

    // Find first available slot for given vehicle type
    Optional<ParkingSlot> findFirstByVehicleTypeAndStatus(
            VehicleType vehicleType,
            SlotStatus status
    );
}