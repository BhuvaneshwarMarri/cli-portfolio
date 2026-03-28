package com.example.portfolio_editor_backend.service;

import com.example.portfolio_editor_backend.models.Courses;
import com.example.portfolio_editor_backend.repository.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationService {
    private final EducationRepository repository;

    private Courses getOrCreateCourses() {
        List<Courses> coursesList = repository.findAll();
        if (coursesList.isEmpty()) {
            Courses newCourses = new Courses();
            newCourses.setCourses(new ArrayList<>());
            newCourses.setTimeline(new ArrayList<>());
            return repository.save(newCourses);
        }
        return coursesList.get(0);
    }

    // Courses List
    public List<String> getCourses() {
        return getOrCreateCourses().getCourses();
    }

    public String addCourse(String courseName) {
        Courses courses = getOrCreateCourses();
        if (!courses.getCourses().contains(courseName)) {
            courses.getCourses().add(courseName);
            repository.save(courses);
        }
        return courseName;
    }

    public void deleteCourse(String courseName) {
        Courses courses = getOrCreateCourses();
        courses.getCourses().remove(courseName);
        repository.save(courses);
    }

    // Timeline
    public List<Courses.TimelineItem> getTimeline() {
        return getOrCreateCourses().getTimeline();
    }

    public Courses.TimelineItem addTimelineItem(Courses.TimelineItem item) {
        Courses courses = getOrCreateCourses();
        courses.getTimeline().add(item);
        repository.save(courses);
        return item;
    }

    public void deleteTimelineItem(String title) {
        Courses courses = getOrCreateCourses();
        courses.getTimeline().removeIf(item -> item.getTitle().equals(title));
        repository.save(courses);
    }
}
