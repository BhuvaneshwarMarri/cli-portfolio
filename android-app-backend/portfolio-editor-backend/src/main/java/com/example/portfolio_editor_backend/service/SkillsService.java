package com.example.portfolio_editor_backend.service;

import com.example.portfolio_editor_backend.models.Skills;
import com.example.portfolio_editor_backend.repository.SkillsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillsService {
    private final SkillsRepository repository;

    private Skills getOrCreateSkills() {
        List<Skills> skillsList = repository.findAll();
        if (skillsList.isEmpty()) {
            Skills newSkills = new Skills();
            newSkills.setProficiencyLevels(new ArrayList<>());
            newSkills.setSkillGroups(new ArrayList<>());
            newSkills.setTechStack(new ArrayList<>());
            return repository.save(newSkills);
        }
        return skillsList.get(0);
    }

    // Proficiency Levels
    public List<Skills.ProficiencyLevel> getProficiencyLevels() {
        return getOrCreateSkills().getProficiencyLevels();
    }

    public Skills.ProficiencyLevel addProficiencyLevel(Skills.ProficiencyLevel level) {
        Skills skills = getOrCreateSkills();
        skills.getProficiencyLevels().add(level);
        repository.save(skills);
        return level;
    }

    public void deleteProficiencyLevel(String label) {
        Skills skills = getOrCreateSkills();
        skills.getProficiencyLevels().removeIf(l -> l.getLabel().equals(label));
        repository.save(skills);
    }

    // Skill Groups
    public List<Skills.SkillGroup> getSkillGroups() {
        return getOrCreateSkills().getSkillGroups();
    }

    public Skills.SkillGroup addSkillGroup(Skills.SkillGroup group) {
        Skills skills = getOrCreateSkills();
        skills.getSkillGroups().add(group);
        repository.save(skills);
        return group;
    }

    public void deleteSkillGroup(String title) {
        Skills skills = getOrCreateSkills();
        skills.getSkillGroups().removeIf(g -> g.getTitle().equals(title));
        repository.save(skills);
    }

    // Tech Stack
    public List<String> getTechStack() {
        return getOrCreateSkills().getTechStack();
    }

    public String addTechStackItem(String item) {
        Skills skills = getOrCreateSkills();
        if (!skills.getTechStack().contains(item)) {
            skills.getTechStack().add(item);
            repository.save(skills);
        }
        return item;
    }

    public void deleteTechStackItem(String item) {
        Skills skills = getOrCreateSkills();
        skills.getTechStack().remove(item);
        repository.save(skills);
    }
}
