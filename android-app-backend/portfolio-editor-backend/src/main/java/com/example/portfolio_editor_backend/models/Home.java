package com.example.portfolio_editor_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "home")
public class Home {
    @Id
    private String id;
    private List<Command> commands;
    private List<Interest> interests;
    private List<Link> links;

    @Data
    public static class Command {
        private String cmd;
        private String desc;
    }

    @Data
    public static class Interest {
        private String icon;
        private String text;
    }

    @Data
    public static class Link {
        private String icon;
        private String label;
        private String href;
        private String val;
        private boolean active;
    }
}
