package com.grievance.app.controller;

import com.grievance.app.dto.admin.AdminGrievanceDTO;
import com.grievance.app.dto.admin.AdminMetricsDTO;
import com.grievance.app.model.Grievance;
import com.grievance.app.repository.GrievanceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final GrievanceRepository grievanceRepository;

    public AdminController(GrievanceRepository grievanceRepository) {
        this.grievanceRepository = grievanceRepository;
    }

    @GetMapping("/metrics")
    public AdminMetricsDTO getMetrics() {

        List<Grievance> grievances = grievanceRepository.findAll();

        AdminMetricsDTO metrics = new AdminMetricsDTO();
        metrics.setTotal(grievances.size());
        metrics.setPending(grievances.stream().filter(g -> "PENDING".equals(g.getStatus())).count());
        metrics.setInProgress(grievances.stream().filter(g -> "IN_PROGRESS".equals(g.getStatus())).count());
        metrics.setResolved(grievances.stream().filter(g -> "RESOLVED".equals(g.getStatus())).count());
        metrics.setCancelled(grievances.stream().filter(g -> "CANCELLED".equals(g.getStatus())).count());

        return metrics;
    }

    @GetMapping("/grievances")
    public List<AdminGrievanceDTO> getAllGrievances() {

        return grievanceRepository.findAll().stream().map(g -> {
            AdminGrievanceDTO dto = new AdminGrievanceDTO();
            dto.setUserEmail(g.getUser().getEmail());
            dto.setDepartment(g.getDepartment());
            dto.setSubject(g.getSubject());
            dto.setStatus(g.getStatus());
            dto.setLocation(g.getLocation());
            dto.setCreatedAt(g.getCreatedAt());
            return dto;
        }).collect(Collectors.toList());
    }
}
