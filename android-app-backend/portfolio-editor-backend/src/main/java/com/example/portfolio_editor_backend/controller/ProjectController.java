package com.example.portfolio_editor_backend.controller;

import com.example.portfolio_editor_backend.models.Project;
import com.example.portfolio_editor_backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService service;

    @GetMapping
    public List<Project> getProjects() {
        return service.getAllProjects();
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return service.saveProject(project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable String id) {
        service.deleteProject(id);
    }
}
