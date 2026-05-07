package com.leadflow.backend.dto;

import java.time.LocalDateTime;

public class LeadNoteResponse {

    private Long id;
    private Long leadId;
    private String noteContent;
    private String createdBy;
    private LocalDateTime createdDate;

    public LeadNoteResponse() {
    }

    public LeadNoteResponse(
            Long id,
            Long leadId,
            String noteContent,
            String createdBy,
            LocalDateTime createdDate
    ) {
        this.id = id;
        this.leadId = leadId;
        this.noteContent = noteContent;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
    }

    public Long getId() {
        return id;
    }

    public Long getLeadId() {
        return leadId;
    }

    public String getNoteContent() {
        return noteContent;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }
}