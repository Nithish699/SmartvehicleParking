package com.parkingsystem.repository;

import com.parkingsystem.model.ParkingRecord;
import com.parkingsystem.model.ParkingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParkingRecordRepository extends JpaRepository<ParkingRecord, Long> {
    List<ParkingRecord> findByStatus(ParkingStatus status);
    Optional<ParkingRecord> findByVehicleLicensePlateAndStatus(String licensePlate, ParkingStatus status);
    List<ParkingRecord> findByPaymentStatus(String paymentStatus);
}