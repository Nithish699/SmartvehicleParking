package com.parkingsystem.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment_records")
public class PaymentRecord {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 
 @ManyToOne
 @JoinColumn(name = "parking_record_id", nullable = false)
 private ParkingRecord parkingRecord;
 
 @Column(name = "amount_paid", nullable = false)
 private Double amountPaid;
 
 @Enumerated(EnumType.STRING)
 @Column(name = "payment_method")
 private PaymentMethod paymentMethod;
 
 @Column(name = "payment_time")
 private LocalDateTime paymentTime;
 
 // Constructors, getters, and setters
 public PaymentRecord() {
     this.paymentTime = LocalDateTime.now();
 }
 
 public PaymentRecord(ParkingRecord parkingRecord, Double amountPaid, PaymentMethod paymentMethod) {
     this();
     this.parkingRecord = parkingRecord;
     this.amountPaid = amountPaid;
     this.paymentMethod = paymentMethod;
 }

 public Long getId() {
	return id;
 }

 public void setId(Long id) {
	this.id = id;
 }

 public ParkingRecord getParkingRecord() {
	return parkingRecord;
 }

 public void setParkingRecord(ParkingRecord parkingRecord) {
	this.parkingRecord = parkingRecord;
 }

 public Double getAmountPaid() {
	return amountPaid;
 }

 public void setAmountPaid(Double amountPaid) {
	this.amountPaid = amountPaid;
 }

 public PaymentMethod getPaymentMethod() {
	return paymentMethod;
 }

 public void setPaymentMethod(PaymentMethod paymentMethod) {
	this.paymentMethod = paymentMethod;
 }

 public LocalDateTime getPaymentTime() {
	return paymentTime;
 }

 public void setPaymentTime(LocalDateTime paymentTime) {
	this.paymentTime = paymentTime;
 }
 
 // Getters and setters
 // ...
 
}


