package com.leadflow.backend.service;

import com.leadflow.backend.dto.LeadRequest;
import com.leadflow.backend.dto.LeadResponse;
import com.leadflow.backend.dto.LeadStatusUpdateRequest;

import java.util.List;

public interface LeadService {

    LeadResponse createLead(LeadRequest request);

    List<LeadResponse> getAllLeads(
            String search,
            String status,
            String leadSource,
            String assignedSalesperson
    );

    LeadResponse getLeadById(Long id);

    LeadResponse updateLead(Long id, LeadRequest request);

    LeadResponse updateLeadStatus(Long id, LeadStatusUpdateRequest request);

    void deleteLead(Long id);
}