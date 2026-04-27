package com.parking.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "parking_slots")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParkingSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slotNumber;

    @Enumerated(EnumType.STRING)
    private SlotStatus status;

    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;
}