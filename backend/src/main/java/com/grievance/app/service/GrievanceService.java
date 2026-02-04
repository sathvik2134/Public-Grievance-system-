package com.grievance.app.service;

import com.grievance.app.dto.GrievanceRequestDTO;
import com.grievance.app.model.Grievance;
import com.grievance.app.model.User;
import com.grievance.app.repository.GrievanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GrievanceService {

    private final GrievanceRepository grievanceRepository;

    public GrievanceService(GrievanceRepository grievanceRepository) {
        this.grievanceRepository = grievanceRepository;
    }

    public Grievance createGrievance(GrievanceRequestDTO dto, User user, String imagePath) {

        Grievance grievance = new Grievance();
        grievance.setDepartment(dto.getDepartment());
        grievance.setSubject(dto.getSubject());
        grievance.setDescription(dto.getDescription());
        grievance.setLocation(dto.getLocation());

        grievance.setStatus("PENDING");
        grievance.setUser(user);
        grievance.setImagePath(imagePath);

        return grievanceRepository.save(grievance);
    }

    public List<Grievance> getUserGrievances(User user) {
        return grievanceRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Grievance updateStatus(Long id, User user, String status) {

        Grievance grievance = grievanceRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        grievance.setStatus(status);
        return grievanceRepository.save(grievance);
    }
}
