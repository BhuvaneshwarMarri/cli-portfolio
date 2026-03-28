package com.example.portfolio_editor_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "skills")
public class Skills {
    @Id
    private String id;
    private List<ProficiencyLevel> proficiencyLevels;
    private List<SkillGroup> skillGroups;
    private List<String> techStack;

    @Data
    public static class ProficiencyLevel {
        private String label;
        private String range;
        private String color;
        private List<String> skills;
    }

    @Data
    public static class SkillGroup {
        private String title;
        private String icon;
        private String color;
        private List<SkillItem> skills;
    }

    @Data
    public static class SkillItem {
        private String name;
        private String level;
        private String tag;
    }
}
