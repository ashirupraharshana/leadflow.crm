package com.leadflow.backend.repository;

import com.leadflow.backend.entity.Lead;
import com.leadflow.backend.enums.LeadStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LeadRepository extends JpaRepository<Lead, Long> {

    @Query("""
            SELECT l FROM Lead l
            WHERE (:status IS NULL OR l.status = :status)
            AND (:leadSource IS NULL OR LOWER(l.leadSource) = LOWER(:leadSource))
            AND (:assignedSalesperson IS NULL OR LOWER(l.assignedSalesperson) = LOWER(:assignedSalesperson))
            AND (
                :search IS NULL
                OR LOWER(l.leadName) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(l.companyName) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(l.email) LIKE LOWER(CONCAT('%', :search, '%'))
            )
            ORDER BY l.lastUpdatedDate DESC
            """)
    List<Lead> searchAndFilterLeads(
            String search,
            LeadStatus status,
            String leadSource,
            String assignedSalesperson
    );
}