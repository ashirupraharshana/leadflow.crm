package com.leadflow.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LeadResponse {

    private Long id;
    private String leadName;
    private String companyName;
    private String email;
    private String phoneNumber;
    private String leadSource;
    private String assignedSalesperson;
    private String status;
    private String statusLabel;
    private BigDecimal estimatedDealValue;
    private LocalDateTime createdDate;
    private LocalDateTime lastUpdatedDate;

    public LeadResponse() {
    }

    public LeadResponse(
            Long id,
            String leadName,
            String companyName,
            String email,
            String phoneNumber,
            String leadSource,
            String assignedSalesperson,
            String status,
            String statusLabel,
            BigDecimal estimatedDealValue,
            LocalDateTime createdDate,
            LocalDateTime lastUpdatedDate
    ) {
        this.id = id;
        this.leadName = leadName;
        this.companyName = companyName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.leadSource = leadSource;
        this.assignedSalesperson = assignedSalesperson;
        this.status = status;
        this.statusLabel = statusLabel;
        this.estimatedDealValue = estimatedDealValue;
        this.createdDate = createdDate;
        this.lastUpdatedDate = lastUpdatedDate;
    }

    public Long getId() {
        return id;
    }

    public String getLeadName() {
        return leadName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getLeadSource() {
        return leadSource;
    }

    public String getAssignedSalesperson() {
        return assignedSalesperson;
    }

    public String getStatus() {
        return status;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public BigDecimal getEstimatedDealValue() {
        return estimatedDealValue;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public LocalDateTime getLastUpdatedDate() {
        return lastUpdatedDate;
    }
}