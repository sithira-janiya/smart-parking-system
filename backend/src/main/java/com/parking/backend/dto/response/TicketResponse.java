package com.parking.backend.dto.response;

import java.time.LocalDateTime;

public class TicketResponse {

    private Long id;
    private String plateNumber;
    private String vehicleType;
    private String slotNumber;
    private String status;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private Double fee;

    public TicketResponse(Long id, String plateNumber, String vehicleType,
                          String slotNumber, String status,
                          LocalDateTime checkInTime,
                          LocalDateTime checkOutTime,
                          Double fee) {

        this.id = id;
        this.plateNumber = plateNumber;
        this.vehicleType = vehicleType;
        this.slotNumber = slotNumber;
        this.status = status;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
        this.fee = fee;
    }

    public Long getId() { return id; }
    public String getPlateNumber() { return plateNumber; }
    public String getVehicleType() { return vehicleType; }
    public String getSlotNumber() { return slotNumber; }
    public String getStatus() { return status; }
    public LocalDateTime getCheckInTime() { return checkInTime; }
    public LocalDateTime getCheckOutTime() { return checkOutTime; }
    public Double getFee() { return fee; }
}