package com.leadflow.backend.controller;

import com.leadflow.backend.dto.LeadNoteRequest;
import com.leadflow.backend.dto.LeadNoteResponse;
import com.leadflow.backend.service.LeadNoteService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/leads/{leadId}/notes")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class LeadNoteController {

    private final LeadNoteService leadNoteService;

    public LeadNoteController(LeadNoteService leadNoteService) {
        this.leadNoteService = leadNoteService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LeadNoteResponse addNote(
            @PathVariable Long leadId,
            @RequestBody LeadNoteRequest request,
            Principal principal
    ) {
        return leadNoteService.addNote(leadId, request, principal.getName());
    }

    @GetMapping
    public List<LeadNoteResponse> getNotesByLeadId(@PathVariable Long leadId) {
        return leadNoteService.getNotesByLeadId(leadId);
    }

    @PutMapping("/{noteId}")
    public LeadNoteResponse updateNote(
            @PathVariable Long leadId,
            @PathVariable Long noteId,
            @RequestBody LeadNoteRequest request
    ) {
        return leadNoteService.updateNote(leadId, noteId, request);
    }

    @DeleteMapping("/{noteId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteNote(
            @PathVariable Long leadId,
            @PathVariable Long noteId
    ) {
        leadNoteService.deleteNote(leadId, noteId);
    }
}