package com.grievance.app.controller;

import com.grievance.app.dto.GrievanceRequestDTO;
import com.grievance.app.dto.GrievanceResponseDTO;
import com.grievance.app.model.Grievance;
import com.grievance.app.model.User;
import com.grievance.app.service.GrievanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/grievances")
public class GrievanceController {

    private final GrievanceService grievanceService;

    public GrievanceController(GrievanceService grievanceService) {
        this.grievanceService = grievanceService;
    }

    @PostMapping
    public String createGrievance(@RequestBody GrievanceRequestDTO dto,
                                  @RequestAttribute("user") User user) {

        grievanceService.createGrievance(dto, user, null);
        return "Grievance submitted successfully";
    }

    @GetMapping
    public List<GrievanceResponseDTO> getMyGrievances(@RequestAttribute("user") User user) {

        List<Grievance> grievances = grievanceService.getUserGrievances(user);

        return grievances.stream().map(g -> {
            GrievanceResponseDTO dto = new GrievanceResponseDTO();
            dto.setId(g.getId());
            dto.setDepartment(g.getDepartment());
            dto.setSubject(g.getSubject());
            dto.setDescription(g.getDescription());
            dto.setStatus(g.getStatus());
            dto.setCreatedAt(g.getCreatedAt());
            dto.setLocation(g.getLocation());
            dto.setImagePath(g.getImagePath());
            return dto;
        }).collect(Collectors.toList());
    }
}
