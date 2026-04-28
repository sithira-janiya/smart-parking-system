package com.parking.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class CheckOutRequest {

    @NotBlank(message = "Plate number is required")
    private String plateNumber;

    public String getPlateNumber() { return plateNumber; }
    public void setPlateNumber(String plateNumber) { this.plateNumber = plateNumber; }
}