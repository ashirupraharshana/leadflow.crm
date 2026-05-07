package com.leadflow.backend.dto;

public class LeadNoteRequest {

    private String noteContent;

    public LeadNoteRequest() {
    }

    public String getNoteContent() {
        return noteContent;
    }

    public void setNoteContent(String noteContent) {
        this.noteContent = noteContent;
    }
}