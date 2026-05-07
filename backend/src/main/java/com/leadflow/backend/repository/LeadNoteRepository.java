package com.leadflow.backend.repository;

import com.leadflow.backend.entity.LeadNote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LeadNoteRepository extends JpaRepository<LeadNote, Long> {

    List<LeadNote> findByLeadIdOrderByCreatedDateDesc(Long leadId);

    Optional<LeadNote> findByIdAndLeadId(Long noteId, Long leadId);
}