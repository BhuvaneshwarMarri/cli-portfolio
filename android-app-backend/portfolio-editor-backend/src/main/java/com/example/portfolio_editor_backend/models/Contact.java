package com.example.portfolio_editor_backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;

@Data
@Document(collection = "contact")
public class Contact {
    @Id
    private String id;
    
    private String type; // "contact_data"

    private Availability availability;
    private Info info; // Info now contains social links

    @Field("open_to")
    @JsonProperty("open_to")
    private List<OpenToItem> openTo;

    @Data
    public static class Availability {
        private String status;
        private String type;
        private String timezone;
        @Field("response_time")
        @JsonProperty("response_time")
        private String responseTime;
        @Field("preferred_contact")
        @JsonProperty("preferred_contact")
        private String preferredContact;
    }

    @Data
    public static class Info {
        private String email;
        // Social links are now nested inside Info
        private Social github;
        private Social linkedin;
        private Social twitter;
    }

    @Data
    public static class Social {
        private String url;
        private String handle;
    }

    @Data
    public static class OpenToItem {
        private String text;
        private boolean active;
    }
}
