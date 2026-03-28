package com.example.portfolio_editor_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "experience")
public class Experience {
    @Id
    private String id;
    private List<Job> jobs;
    private List<SkillMatrixItem> skillMatrix;

    @Data
    public static class Job {
        private String title;
        private String company;
        private String period;
        private String duration;
        private String status;
        private String type;
        private String location;
        private List<String> stack;
        private List<String> bullets;
        private List<Metric> metrics;
    }

    @Data
    public static class Metric {
        private String label;
        private String value;
        private String color;
    }

    @Data
    public static class SkillMatrixItem {
        private String label;
        private String level;
        private String color;
    }
}
