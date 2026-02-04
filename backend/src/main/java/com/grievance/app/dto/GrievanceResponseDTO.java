package com.grievance.app.dto;

import java.time.LocalDateTime;

public class GrievanceResponseDTO {

    private Long id;
    private String department;
    private String subject;
    private String description;
    private String status;
    private String location;
    private String imagePath;
    private LocalDateTime createdAt;

    // ---- setters used by GrievanceController ----

    public void setId(Long id) {
        this.id = id;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}




