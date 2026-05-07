package com.leadflow.backend.service.impl;

import com.leadflow.backend.dto.LeadNoteRequest;
import com.leadflow.backend.dto.LeadNoteResponse;
import com.leadflow.backend.entity.Lead;
import com.leadflow.backend.entity.LeadNote;
import com.leadflow.backend.entity.User;
import com.leadflow.backend.repository.LeadNoteRepository;
import com.leadflow.backend.repository.LeadRepository;
import com.leadflow.backend.repository.UserRepository;
import com.leadflow.backend.service.LeadNoteService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class LeadNoteServiceImpl implements LeadNoteService {

    private final LeadNoteRepository leadNoteRepository;
    private final LeadRepository leadRepository;
    private final UserRepository userRepository;

    public LeadNoteServiceImpl(
            LeadNoteRepository leadNoteRepository,
            LeadRepository leadRepository,
            UserRepository userRepository
    ) {
        this.leadNoteRepository = leadNoteRepository;
        this.leadRepository = leadRepository;
        this.userRepository = userRepository;
    }

    @Override
    public LeadNoteResponse addNote(Long leadId, LeadNoteRequest request, String userEmail) {
        validateNoteRequest(request);

        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Lead not found"
                ));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        LeadNote note = new LeadNote();
        note.setLead(lead);
        note.setNoteContent(request.getNoteContent().trim());
        note.setCreatedBy(user.getName());

        LeadNote savedNote = leadNoteRepository.save(note);

        return mapToResponse(savedNote);
    }

    @Override
    public List<LeadNoteResponse> getNotesByLeadId(Long leadId) {
        if (!leadRepository.existsById(leadId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Lead not found");
        }

        return leadNoteRepository.findByLeadIdOrderByCreatedDateDesc(leadId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public LeadNoteResponse updateNote(Long leadId, Long noteId, LeadNoteRequest request) {
        validateNoteRequest(request);

        LeadNote note = findNoteByLeadOrThrow(leadId, noteId);

        note.setNoteContent(request.getNoteContent().trim());

        LeadNote updatedNote = leadNoteRepository.save(note);

        return mapToResponse(updatedNote);
    }

    @Override
    public void deleteNote(Long leadId, Long noteId) {
        LeadNote note = findNoteByLeadOrThrow(leadId, noteId);
        leadNoteRepository.delete(note);
    }

    private LeadNote findNoteByLeadOrThrow(Long leadId, Long noteId) {
        return leadNoteRepository.findByIdAndLeadId(noteId, leadId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Note not found for this lead"
                ));
    }

    private void validateNoteRequest(LeadNoteRequest request) {
        if (request.getNoteContent() == null || request.getNoteContent().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Note content is required");
        }
    }

    private LeadNoteResponse mapToResponse(LeadNote note) {
        return new LeadNoteResponse(
                note.getId(),
                note.getLead().getId(),
                note.getNoteContent(),
                note.getCreatedBy(),
                note.getCreatedDate()
        );
    }
}