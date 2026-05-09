-- Initial schema for Smart Parking System
-- Users
CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles
CREATE TABLE IF NOT EXISTS vehicles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  license_plate VARCHAR(50) NOT NULL,
  type VARCHAR(50),
  user_id BIGINT,
  CONSTRAINT fk_vehicle_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Parking slots
CREATE TABLE IF NOT EXISTS parking_slots (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  slot_number VARCHAR(50),
  status VARCHAR(50),
  location VARCHAR(255)
);

-- Tickets
CREATE TABLE IF NOT EXISTS tickets (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id BIGINT,
  slot_id BIGINT,
  check_in DATETIME,
  check_out DATETIME,
  fee DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(50),
  CONSTRAINT fk_ticket_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  CONSTRAINT fk_ticket_slot FOREIGN KEY (slot_id) REFERENCES parking_slots(id)
);
