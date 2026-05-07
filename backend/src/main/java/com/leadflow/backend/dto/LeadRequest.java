package com.leadflow.backend.dto;

import java.math.BigDecimal;

public class LeadRequest {

    private String leadName;
    private String companyName;
    private String email;
    private String phoneNumber;
    private String leadSource;
    private String assignedSalesperson;
    private String status;
    private BigDecimal estimatedDealValue;

    public LeadRequest() {
    }

    public String getLeadName() {
        return leadName;
    }

    public void setLeadName(String leadName) {
        this.leadName = leadName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getLeadSource() {
        return leadSource;
    }

    public void setLeadSource(String leadSource) {
        this.leadSource = leadSource;
    }

    public String getAssignedSalesperson() {
        return assignedSalesperson;
    }

    public void setAssignedSalesperson(String assignedSalesperson) {
        this.assignedSalesperson = assignedSalesperson;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getEstimatedDealValue() {
        return estimatedDealValue;
    }

    public void setEstimatedDealValue(BigDecimal estimatedDealValue) {
        this.estimatedDealValue = estimatedDealValue;
    }
}