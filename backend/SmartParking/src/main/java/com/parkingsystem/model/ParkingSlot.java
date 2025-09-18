package com.parkingsystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "parking_slots")
public class ParkingSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "slot_number", unique = true, nullable = false)
    private String slotNumber;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "slot_type")
    private SlotType slotType;
    
    @Column(name = "is_available")
    private Boolean isAvailable;
    
    // Constructors, getters, and setters
    public ParkingSlot() {}
    
    public ParkingSlot(String slotNumber, SlotType slotType, Boolean isAvailable) {
        this.slotNumber = slotNumber;
        this.slotType = slotType;
        this.isAvailable = isAvailable;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSlotNumber() {
		return slotNumber;
	}

	public void setSlotNumber(String slotNumber) {
		this.slotNumber = slotNumber;
	}

	public SlotType getSlotType() {
		return slotType;
	}

	public void setSlotType(SlotType slotType) {
		this.slotType = slotType;
	}

	public Boolean getIsAvailable() {
		return isAvailable;
	}

	public void setIsAvailable(Boolean isAvailable) {
		this.isAvailable = isAvailable;
	}
    
}

