package com.leadflow.backend.service;

import com.leadflow.backend.dto.LeadNoteRequest;
import com.leadflow.backend.dto.LeadNoteResponse;

import java.util.List;

public interface LeadNoteService {

    LeadNoteResponse addNote(Long leadId, LeadNoteRequest request, String userEmail);

    List<LeadNoteResponse> getNotesByLeadId(Long leadId);

    LeadNoteResponse updateNote(Long leadId, Long noteId, LeadNoteRequest request);

    void deleteNote(Long leadId, Long noteId);
}