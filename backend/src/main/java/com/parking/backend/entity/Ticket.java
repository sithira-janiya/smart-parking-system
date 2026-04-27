package com.parking.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many tickets can belong to one vehicle
    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    // Many tickets can use one slot
    @ManyToOne
    @JoinColumn(name = "slot_id")
    private ParkingSlot slot;

    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;

    private Double fee;

    private String status;
}