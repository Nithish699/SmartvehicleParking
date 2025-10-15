package com.parkingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.parkingsystem.model.ParkingSlot;
import com.parkingsystem.model.SlotType;

@Repository
public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {
    List<ParkingSlot> findByIsAvailableTrue();
    List<ParkingSlot> findBySlotTypeAndIsAvailableTrue(SlotType slotType);
    ParkingSlot findBySlotNumber(String slotNumber);
}