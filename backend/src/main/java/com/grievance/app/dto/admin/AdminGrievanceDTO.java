package com.grievance.app.dto.admin;

import java.time.LocalDateTime;

public class AdminGrievanceDTO {

    private Long id;
    private String userEmail;
    private String department;
    private String subject;
    private String status;
    private String location;
    private LocalDateTime createdAt;

    // ---- setters used by AdminController ----

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}



