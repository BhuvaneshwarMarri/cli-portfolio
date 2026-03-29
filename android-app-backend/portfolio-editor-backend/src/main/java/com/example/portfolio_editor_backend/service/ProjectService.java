package com.example.portfolio_editor_backend.service;

import com.example.portfolio_editor_backend.models.Project;
import com.example.portfolio_editor_backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository repository;

    private Project getOrCreateProject() {
        List<Project> projectList = repository.findAll();
        if (projectList.isEmpty()) {
            Project newProject = new Project();
            newProject.setProjects(new ArrayList<>());
            return repository.save(newProject);
        }
        return projectList.get(0);
    }

    public List<String> getProjects() {
        return getOrCreateProject().getProjects();
    }

    public String addProject(String projectName) {
        Project project = getOrCreateProject();
        if (project.getProjects() == null) project.setProjects(new ArrayList<>());
        if (!project.getProjects().contains(projectName)) {
            project.getProjects().add(projectName);
            repository.save(project);
        }
        return projectName;
    }

    public void deleteProject(String projectName) {
        Project project = getOrCreateProject();
        if (project.getProjects() != null) {
            project.getProjects().remove(projectName);
            repository.save(project);
        }
    }
}
