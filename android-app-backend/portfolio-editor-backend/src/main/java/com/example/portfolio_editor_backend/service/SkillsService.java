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
        // Try to find by type "skills_data" as per your structure
        List<Skills> skillsList = repository.findAll();
        for (Skills s : skillsList) {
            if ("skills_data".equals(s.getType())) {
                return s;
            }
        }
        
        // Fallback or Create New
        if (!skillsList.isEmpty()) {
            return skillsList.get(0);
        }

        Skills newSkills = new Skills();
        newSkills.setType("skills_data");
        newSkills.setProficiencyLevels(new ArrayList<>());
        newSkills.setSkillGroups(new ArrayList<>());
        newSkills.setTechStack(new ArrayList<>());
        return repository.save(newSkills);
    }

    // Proficiency Levels
    public List<Skills.ProficiencyLevel> getProficiencyLevels() {
        return getOrCreateSkills().getProficiencyLevels();
    }

    public Skills.ProficiencyLevel addProficiencyLevel(Skills.ProficiencyLevel level) {
        Skills skills = getOrCreateSkills();
        if (skills.getProficiencyLevels() == null) skills.setProficiencyLevels(new ArrayList<>());
        skills.getProficiencyLevels().add(level);
        repository.save(skills);
        return level;
    }

    public void deleteProficiencyLevel(String label) {
        Skills skills = getOrCreateSkills();
        if (skills.getProficiencyLevels() != null) {
            skills.getProficiencyLevels().removeIf(l -> label.equals(l.getLabel()));
            repository.save(skills);
        }
    }

    // Skill Groups
    public List<Skills.SkillGroup> getSkillGroups() {
        return getOrCreateSkills().getSkillGroups();
    }

    public Skills.SkillGroup addSkillGroup(Skills.SkillGroup group) {
        Skills skills = getOrCreateSkills();
        if (skills.getSkillGroups() == null) skills.setSkillGroups(new ArrayList<>());
        skills.getSkillGroups().add(group);
        repository.save(skills);
        return group;
    }

    public void deleteSkillGroup(String title) {
        Skills skills = getOrCreateSkills();
        if (skills.getSkillGroups() != null) {
            skills.getSkillGroups().removeIf(g -> title.equals(g.getTitle()));
            repository.save(skills);
        }
    }

    // Tech Stack
    public List<String> getTechStack() {
        return getOrCreateSkills().getTechStack();
    }

    public String addTechStackItem(String item) {
        Skills skills = getOrCreateSkills();
        if (skills.getTechStack() == null) skills.setTechStack(new ArrayList<>());
        if (!skills.getTechStack().contains(item)) {
            skills.getTechStack().add(item);
            repository.save(skills);
        }
        return item;
    }

    public void deleteTechStackItem(String item) {
        Skills skills = getOrCreateSkills();
        if (skills.getTechStack() != null) {
            skills.getTechStack().remove(item);
            repository.save(skills);
        }
    }
}
