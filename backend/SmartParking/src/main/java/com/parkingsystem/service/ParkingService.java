package com.parkingsystem.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parkingsystem.model.ParkingRecord;
import com.parkingsystem.model.ParkingSlot;
import com.parkingsystem.model.ParkingStatus;
import com.parkingsystem.model.PaymentMethod;
import com.parkingsystem.model.PaymentRecord;
import com.parkingsystem.model.PaymentStatus;
import com.parkingsystem.model.SlotType;
import com.parkingsystem.model.Vehicle;
import com.parkingsystem.model.VehicleType;
import com.parkingsystem.repository.ParkingRecordRepository;
import com.parkingsystem.repository.ParkingSlotRepository;
import com.parkingsystem.repository.PaymentRecordRepository;
import com.parkingsystem.repository.VehicleRepository;

import jakarta.transaction.Transactional;

@Service
public class ParkingService {
    
    @Autowired
    private ParkingRecordRepository parkingRecordRepository;
    
    @Autowired
    private ParkingSlotRepository parkingSlotRepository;
    
    @Autowired
    private VehicleRepository vehicleRepository;
    
    @Autowired
    private PaymentRecordRepository paymentRecordRepository;
    
    public List<ParkingSlot> getAvailableSlots() {
        return parkingSlotRepository.findByIsAvailableTrue();
    }
    
    public List<ParkingSlot> getAvailableSlotsByType(SlotType slotType) {
        return parkingSlotRepository.findBySlotTypeAndIsAvailableTrue(slotType);
    }
    
    @Transactional
    public ParkingRecord parkVehicle(String licensePlate, VehicleType vehicleType, String slotNumber) {
        // Check if vehicle already exists or create new
        Vehicle vehicle = vehicleRepository.findByLicensePlate(licensePlate);
        if (vehicle == null) {
            vehicle = new Vehicle(licensePlate, vehicleType);
            vehicle = vehicleRepository.save(vehicle);
        }
        
        // Get the parking slot
        ParkingSlot slot = parkingSlotRepository.findBySlotNumber(slotNumber);
        if (slot == null || !slot.getIsAvailable()) {
            throw new RuntimeException("Slot not available");
        }
        
        // Create parking record
        ParkingRecord record = new ParkingRecord(vehicle, slot);
        record = parkingRecordRepository.save(record);
        
        // Update slot availability
        slot.setIsAvailable(false);
        parkingSlotRepository.save(slot);
        
        return record;
    }
    
    @Transactional
    public ParkingRecord exitVehicle(String licensePlate) {
        // Find active parking record
        ParkingRecord record = parkingRecordRepository
            .findByVehicleLicensePlateAndStatus(licensePlate, ParkingStatus.PARKED)
            .orElseThrow(() -> new RuntimeException("No active parking record found"));
        
        // Update exit time and status
        record.setExitTime(LocalDateTime.now());
        record.setStatus(ParkingStatus.EXITED);
        
        // Calculate amount due (simple calculation: $2 per hour)
        long hours = Duration.between(record.getEntryTime(), record.getExitTime()).toHours();
        record.setAmountDue(Math.max(1, hours) * 2.0); // Minimum $2
        
        // Update slot availability
        ParkingSlot slot = record.getParkingSlot();
        slot.setIsAvailable(true);
        parkingSlotRepository.save(slot);
        
        return parkingRecordRepository.save(record);
    }
    
    @Transactional
    public ParkingRecord makePayment(Long recordId, String paymentMethod) {
        ParkingRecord record = parkingRecordRepository.findById(recordId)
            .orElseThrow(() -> new RuntimeException("Parking record not found"));
        
        // Create payment record
        PaymentRecord paymentRecord = new PaymentRecord(
            record, 
            record.getAmountDue(), 
            PaymentMethod.valueOf(paymentMethod)
        );
        paymentRecordRepository.save(paymentRecord);
        
        // Update parking record
        record.setPaymentStatus(PaymentStatus.PAID);
        return parkingRecordRepository.save(record);
    }
    
    public List<ParkingRecord> getActiveParkings() {
        return parkingRecordRepository.findByStatus(ParkingStatus.PARKED);
    }
}