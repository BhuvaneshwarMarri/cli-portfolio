package com.example.portfolio_editor_backend.controller;

import com.example.portfolio_editor_backend.models.Courses;
import com.example.portfolio_editor_backend.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class EducationController {
    private final EducationService service;

    // Courses List
    @GetMapping
    public List<String> getCourses() {
        return service.getCourses();
    }

    @PostMapping
    public String addCourse(@RequestBody String courseName) {
        return service.addCourse(courseName);
    }

    @DeleteMapping("/{courseName}")
    public void deleteCourse(@PathVariable String courseName) {
        service.deleteCourse(courseName);
    }

    // Timeline
    @GetMapping("/timeline")
    public List<Courses.TimelineItem> getTimeline() {
        return service.getTimeline();
    }

    @PostMapping("/timeline")
    public Courses.TimelineItem addTimelineItem(@RequestBody Courses.TimelineItem item) {
        return service.addTimelineItem(item);
    }

    @DeleteMapping("/timeline/{title}")
    public void deleteTimelineItem(@PathVariable String title) {
        service.deleteTimelineItem(title);
    }
}
