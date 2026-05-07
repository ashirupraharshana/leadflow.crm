package com.leadflow.backend.service.impl;

import com.leadflow.backend.dto.LeadRequest;
import com.leadflow.backend.dto.LeadResponse;
import com.leadflow.backend.dto.LeadStatusUpdateRequest;
import com.leadflow.backend.entity.Lead;
import com.leadflow.backend.enums.LeadStatus;
import com.leadflow.backend.repository.LeadRepository;
import com.leadflow.backend.service.LeadService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@Service
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;

    public LeadServiceImpl(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @Override
    public LeadResponse createLead(LeadRequest request) {
        validateLeadRequest(request);

        Lead lead = new Lead();
        mapRequestToLead(request, lead);

        Lead savedLead = leadRepository.save(lead);

        return mapToLeadResponse(savedLead);
    }

    @Override
    public List<LeadResponse> getAllLeads(
            String search,
            String status,
            String leadSource,
            String assignedSalesperson
    ) {
        LeadStatus parsedStatus = parseStatusOrNull(status);

        String searchValue = cleanOptionalText(search);
        String sourceValue = cleanOptionalText(leadSource);
        String salespersonValue = cleanOptionalText(assignedSalesperson);

        return leadRepository.searchAndFilterLeads(
                        searchValue,
                        parsedStatus,
                        sourceValue,
                        salespersonValue
                )
                .stream()
                .map(this::mapToLeadResponse)
                .toList();
    }

    @Override
    public LeadResponse getLeadById(Long id) {
        Lead lead = findLeadOrThrow(id);
        return mapToLeadResponse(lead);
    }

    @Override
    public LeadResponse updateLead(Long id, LeadRequest request) {
        validateLeadRequest(request);

        Lead lead = findLeadOrThrow(id);
        mapRequestToLead(request, lead);

        Lead updatedLead = leadRepository.save(lead);

        return mapToLeadResponse(updatedLead);
    }

    @Override
    public LeadResponse updateLeadStatus(Long id, LeadStatusUpdateRequest request) {
        if (request.getStatus() == null || request.getStatus().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status is required");
        }

        Lead lead = findLeadOrThrow(id);
        lead.setStatus(parseStatus(request.getStatus()));

        Lead updatedLead = leadRepository.save(lead);

        return mapToLeadResponse(updatedLead);
    }

    @Override
    public void deleteLead(Long id) {
        Lead lead = findLeadOrThrow(id);
        leadRepository.delete(lead);
    }

    private void mapRequestToLead(LeadRequest request, Lead lead) {
        lead.setLeadName(request.getLeadName().trim());
        lead.setCompanyName(request.getCompanyName().trim());
        lead.setEmail(request.getEmail().trim().toLowerCase());
        lead.setPhoneNumber(request.getPhoneNumber() == null ? "" : request.getPhoneNumber().trim());
        lead.setLeadSource(request.getLeadSource().trim());
        lead.setAssignedSalesperson(request.getAssignedSalesperson().trim());
        lead.setStatus(parseStatusOrDefault(request.getStatus()));
        lead.setEstimatedDealValue(
                request.getEstimatedDealValue() == null
                        ? BigDecimal.ZERO
                        : request.getEstimatedDealValue()
        );
    }

    private void validateLeadRequest(LeadRequest request) {
        if (request.getLeadName() == null || request.getLeadName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Lead name is required");
        }

        if (request.getCompanyName() == null || request.getCompanyName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Company name is required");
        }

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }

        if (request.getLeadSource() == null || request.getLeadSource().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Lead source is required");
        }

        if (request.getAssignedSalesperson() == null || request.getAssignedSalesperson().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Assigned salesperson is required");
        }

        if (
                request.getEstimatedDealValue() != null
                        && request.getEstimatedDealValue().compareTo(BigDecimal.ZERO) < 0
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Estimated deal value cannot be negative"
            );
        }
    }

    private Lead findLeadOrThrow(Long id) {
        return leadRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Lead not found"
                ));
    }

    private LeadStatus parseStatusOrDefault(String statusText) {
        if (statusText == null || statusText.isBlank()) {
            return LeadStatus.NEW;
        }

        return parseStatus(statusText);
    }

    private LeadStatus parseStatusOrNull(String statusText) {
        if (statusText == null || statusText.isBlank()) {
            return null;
        }

        return parseStatus(statusText);
    }

    private LeadStatus parseStatus(String statusText) {
        try {
            String formattedStatus = statusText
                    .trim()
                    .toUpperCase()
                    .replace(" ", "_");

            return LeadStatus.valueOf(formattedStatus);
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid status. Use NEW, CONTACTED, QUALIFIED, PROPOSAL_SENT, WON, or LOST"
            );
        }
    }

    private String cleanOptionalText(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }

    private LeadResponse mapToLeadResponse(Lead lead) {
        return new LeadResponse(
                lead.getId(),
                lead.getLeadName(),
                lead.getCompanyName(),
                lead.getEmail(),
                lead.getPhoneNumber(),
                lead.getLeadSource(),
                lead.getAssignedSalesperson(),
                lead.getStatus().name(),
                lead.getStatus().getLabel(),
                lead.getEstimatedDealValue(),
                lead.getCreatedDate(),
                lead.getLastUpdatedDate()
        );
    }
}