package com.example.portfolio_editor_backend.controller;

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
    public List<String> getProjects() {
        return service.getProjects();
    }

    @PostMapping
    public String addProject(@RequestBody String projectName) {
        return service.addProject(projectName);
    }

    @DeleteMapping("/{projectName}")
    public void deleteProject(@PathVariable String projectName) {
        service.deleteProject(projectName);
    }
}
