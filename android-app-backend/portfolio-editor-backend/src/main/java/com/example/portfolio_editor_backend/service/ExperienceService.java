package com.example.portfolio_editor_backend.service;

import com.example.portfolio_editor_backend.models.Experience;
import com.example.portfolio_editor_backend.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {
    private final ExperienceRepository repository;

    private Experience getOrCreateExperience() {
        List<Experience> experienceList = repository.findAll();
        if (experienceList.isEmpty()) {
            Experience newExperience = new Experience();
            newExperience.setJobs(new ArrayList<>());
            newExperience.setSkillMatrix(new ArrayList<>());
            return repository.save(newExperience);
        }
        return experienceList.get(0);
    }

    // Jobs
    public List<Experience.Job> getJobs() {
        return getOrCreateExperience().getJobs();
    }

    public Experience.Job addJob(Experience.Job job) {
        Experience experience = getOrCreateExperience();
        experience.getJobs().add(job);
        repository.save(experience);
        return job;
    }

    public void deleteJob(String title, String company) {
        Experience experience = getOrCreateExperience();
        experience.getJobs().removeIf(j -> j.getTitle().equals(title) && j.getCompany().equals(company));
        repository.save(experience);
    }

    // Skill Matrix
    public List<Experience.SkillMatrixItem> getSkillMatrix() {
        return getOrCreateExperience().getSkillMatrix();
    }

    public Experience.SkillMatrixItem addSkillMatrixItem(Experience.SkillMatrixItem item) {
        Experience experience = getOrCreateExperience();
        experience.getSkillMatrix().add(item);
        repository.save(experience);
        return item;
    }

    public void deleteSkillMatrixItem(String label) {
        Experience experience = getOrCreateExperience();
        experience.getSkillMatrix().removeIf(item -> item.getLabel().equals(label));
        repository.save(experience);
    }
}
