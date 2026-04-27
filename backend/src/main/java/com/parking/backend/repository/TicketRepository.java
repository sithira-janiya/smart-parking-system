package com.parking.backend.repository;

import com.parking.backend.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByVehicle_PlateNumberAndStatus(String plateNumber, String status);
}

