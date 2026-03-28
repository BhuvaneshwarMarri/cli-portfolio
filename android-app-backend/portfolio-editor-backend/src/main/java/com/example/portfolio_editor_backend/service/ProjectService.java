package com.example.portfolio_editor_backend.service;

import com.example.portfolio_editor_backend.models.Project;
import com.example.portfolio_editor_backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor // Automatically injects the repository via constructor
public class ProjectService {
    private final ProjectRepository repository;

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public Project saveProject(Project project) {
        return repository.save(project);
    }

    public void deleteProject(String id) {
        repository.deleteById(id);
    }
}
