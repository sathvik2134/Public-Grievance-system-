package com.grievance.app.repository;

import com.grievance.app.model.Grievance;
import com.grievance.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GrievanceRepository extends JpaRepository<Grievance, Long> {

    List<Grievance> findByUserOrderByCreatedAtDesc(User user);

    Optional<Grievance> findByIdAndUser(Long id, User user);
}
