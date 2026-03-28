package com.example.portfolio_editor_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "education")
public class Courses {
    @Id
    private String id;
    private List<String> courses;
    private List<TimelineItem> timeline;

    @Data
    public static class TimelineItem {
        private String year;
        private String title;
        private String place;
        private String detail;
        private List<String> tags;
        private String status;
    }
}
