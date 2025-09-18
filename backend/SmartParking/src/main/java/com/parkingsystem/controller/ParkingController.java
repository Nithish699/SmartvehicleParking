package com.parkingsystem.controller;

import com.parkingsystem.model.*;
import com.parkingsystem.service.ParkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking")
@CrossOrigin(origins = "http://localhost:5173")
public class ParkingController {
    
    @Autowired
    private ParkingService parkingService;
    
    @GetMapping("/slots/available")
    public List<ParkingSlot> getAvailableSlots() {
        return parkingService.getAvailableSlots();
    }
    
    @GetMapping("/slots/available/{type}")
    public List<ParkingSlot> getAvailableSlotsByType(@PathVariable SlotType type) {
        return parkingService.getAvailableSlotsByType(type);
    }
    
    @PostMapping("/park")
    public ResponseEntity<ParkingRecord> parkVehicle(
            @RequestParam String licensePlate,
            @RequestParam VehicleType vehicleType,
            @RequestParam String slotNumber) {
        try {
            ParkingRecord record = parkingService.parkVehicle(licensePlate, vehicleType, slotNumber);
            return ResponseEntity.ok(record);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @PostMapping("/exit")
    public ResponseEntity<ParkingRecord> exitVehicle(@RequestParam String licensePlate) {
        try {
            ParkingRecord record = parkingService.exitVehicle(licensePlate);
            return ResponseEntity.ok(record);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @PostMapping("/payment")
    public ResponseEntity<ParkingRecord> makePayment(
            @RequestParam Long recordId,
            @RequestParam String paymentMethod) {
        try {
            ParkingRecord record = parkingService.makePayment(recordId, paymentMethod);
            return ResponseEntity.ok(record);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @GetMapping("/active")
    public List<ParkingRecord> getActiveParkings() {
        return parkingService.getActiveParkings();
    }
}