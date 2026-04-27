package com.parking.backend.repository;

import com.parking.backend.entity.ParkingSlot;
import com.parking.backend.entity.SlotStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {

    Optional<ParkingSlot> findFirstByStatus(SlotStatus status);
}