package com.parking.backend.dto;

import com.parking.backend.entity.VehicleType;
import lombok.Data;

@Data
public class AdminSlotRequest {
    private String slotNumber;
    private VehicleType vehicleType;
}