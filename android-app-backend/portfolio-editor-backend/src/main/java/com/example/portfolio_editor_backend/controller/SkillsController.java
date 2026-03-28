package com.example.portfolio_editor_backend.controller;

import com.example.portfolio_editor_backend.models.Skills;
import com.example.portfolio_editor_backend.service.SkillsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillsController {
    private final SkillsService service;

    // Proficiency Levels
    @GetMapping("/proficiency-levels")
    public List<Skills.ProficiencyLevel> getProficiencyLevels() {
        return service.getProficiencyLevels();
    }

    @PostMapping("/proficiency-levels")
    public Skills.ProficiencyLevel addProficiencyLevel(@RequestBody Skills.ProficiencyLevel level) {
        return service.addProficiencyLevel(level);
    }

    @DeleteMapping("/proficiency-levels/{label}")
    public void deleteProficiencyLevel(@PathVariable String label) {
        service.deleteProficiencyLevel(label);
    }

    // Skill Groups
    @GetMapping("/skill-groups")
    public List<Skills.SkillGroup> getSkillGroups() {
        return service.getSkillGroups();
    }

    @PostMapping("/skill-groups")
    public Skills.SkillGroup addSkillGroup(@RequestBody Skills.SkillGroup group) {
        return service.addSkillGroup(group);
    }

    @DeleteMapping("/skill-groups/{title}")
    public void deleteSkillGroup(@PathVariable String title) {
        service.deleteSkillGroup(title);
    }

    // Tech Stack
    @GetMapping("/tech-stack")
    public List<String> getTechStack() {
        return service.getTechStack();
    }

    @PostMapping("/tech-stack")
    public String addTechStackItem(@RequestBody String item) {
        return service.addTechStackItem(item);
    }

    @DeleteMapping("/tech-stack/{item}")
    public void deleteTechStackItem(@PathVariable String item) {
        service.deleteTechStackItem(item);
    }
}
