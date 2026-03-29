package com.example.portfolio_editor_backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;

@Data
@Document(collection = "skills")
public class Skills {
    @Id
    private String id;
    
    private String type; // To match "type": "skills_data"

    @Field("proficiency_levels")
    @JsonProperty("proficiency_levels")
    private List<ProficiencyLevel> proficiencyLevels;

    @Field("skill_groups")
    @JsonProperty("skill_groups")
    private List<SkillGroup> skillGroups;

    @Field("tech_stack")
    @JsonProperty("tech_stack")
    private List<String> techStack;

    @Data
    public static class ProficiencyLevel {
        @Field("label")
        @JsonProperty("label")
        private String label;

        @Field("range")
        @JsonProperty("range")
        private String range;

        @Field("color")
        @JsonProperty("color")
        private String color;

        @Field("skills")
        @JsonProperty("skills")
        private List<String> skills;
    }

    @Data
    public static class SkillGroup {
        @Field("title")
        @JsonProperty("title")
        private String title;

        @Field("icon")
        @JsonProperty("icon")
        private String icon;

        @Field("color")
        @JsonProperty("color")
        private String color;

        @Field("skills")
        @JsonProperty("skills")
        private List<SkillItem> skills;
    }

    @Data
    public static class SkillItem {
        @Field("name")
        @JsonProperty("name")
        private String name;

        @Field("level")
        @JsonProperty("level")
        private Object level; // Changed to Object to handle numeric and string levels

        @Field("tag")
        @JsonProperty("tag")
        private String tag;
    }
}
