package com.parking.backend.repository;

import com.parking.backend.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    // Find active ticket by vehicle plate number
    Optional<Ticket> findByVehicle_PlateNumberAndStatus(String plateNumber, String status);

    // (Optional - useful for dashboard later)
    List<Ticket> findByStatus(String status);
}