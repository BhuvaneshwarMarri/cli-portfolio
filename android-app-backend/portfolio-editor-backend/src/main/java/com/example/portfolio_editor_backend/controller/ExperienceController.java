package com.example.portfolio_editor_backend.controller;

import com.example.portfolio_editor_backend.models.Experience;
import com.example.portfolio_editor_backend.service.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/experience")
@RequiredArgsConstructor
public class ExperienceController {
    private final ExperienceService service;

    // Jobs
    @GetMapping("/jobs")
    public List<Experience.Job> getJobs() {
        return service.getJobs();
    }

    @PostMapping("/jobs")
    public Experience.Job addJob(@RequestBody Experience.Job job) {
        return service.addJob(job);
    }

    @DeleteMapping("/jobs/{company}/{title}")
    public void deleteJob(@PathVariable String company, @PathVariable String title) {
        service.deleteJob(title, company);
    }

    // Skill Matrix
    @GetMapping("/skill-matrix")
    public List<Experience.SkillMatrixItem> getSkillMatrix() {
        return service.getSkillMatrix();
    }

    @PostMapping("/skill-matrix")
    public Experience.SkillMatrixItem addSkillMatrixItem(@RequestBody Experience.SkillMatrixItem item) {
        return service.addSkillMatrixItem(item);
    }

    @DeleteMapping("/skill-matrix/{label}")
    public void deleteSkillMatrixItem(@PathVariable String label) {
        service.deleteSkillMatrixItem(label);
    }
}
