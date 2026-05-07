package com.leadflow.backend.controller;

import com.leadflow.backend.dto.LeadRequest;
import com.leadflow.backend.dto.LeadResponse;
import com.leadflow.backend.dto.LeadStatusUpdateRequest;
import com.leadflow.backend.service.LeadService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LeadResponse createLead(@RequestBody LeadRequest request) {
        return leadService.createLead(request);
    }

    @GetMapping
    public List<LeadResponse> getAllLeads(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String leadSource,
            @RequestParam(required = false) String assignedSalesperson
    ) {
        return leadService.getAllLeads(search, status, leadSource, assignedSalesperson);
    }

    @GetMapping("/{id}")
    public LeadResponse getLeadById(@PathVariable Long id) {
        return leadService.getLeadById(id);
    }

    @PutMapping("/{id}")
    public LeadResponse updateLead(
            @PathVariable Long id,
            @RequestBody LeadRequest request
    ) {
        return leadService.updateLead(id, request);
    }

    @PatchMapping("/{id}/status")
    public LeadResponse updateLeadStatus(
            @PathVariable Long id,
            @RequestBody LeadStatusUpdateRequest request
    ) {
        return leadService.updateLeadStatus(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
    }
}