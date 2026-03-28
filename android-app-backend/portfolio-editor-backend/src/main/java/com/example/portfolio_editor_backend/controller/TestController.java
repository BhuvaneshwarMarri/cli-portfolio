package com.example.portfolio_editor_backend.controller;

import com.example.portfolio_editor_backend.models.Project;
import com.example.portfolio_editor_backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final ProjectRepository projectRepository;

    @GetMapping("/save")
    public Project save() {
        Project p = new Project();
        p.setTitle("Test Project");
        p.setDescription("Testing DB connection");
        return projectRepository.save(p);
    }
}
