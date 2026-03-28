package com.example.portfolio_editor_backend.controller;

import com.example.portfolio_editor_backend.models.Home;
import com.example.portfolio_editor_backend.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor
public class HomeController {
    private final HomeService service;

    // Commands
    @GetMapping("/commands")
    public List<Home.Command> getCommands() {
        return service.getCommands();
    }

    @PostMapping("/commands")
    public Home.Command addCommand(@RequestBody Home.Command command) {
        return service.addCommand(command);
    }

    @DeleteMapping("/commands/{cmd}")
    public void deleteCommand(@PathVariable String cmd) {
        service.deleteCommand(cmd);
    }

    // Interests
    @GetMapping("/interests")
    public List<Home.Interest> getInterests() {
        return service.getInterests();
    }

    @PostMapping("/interests")
    public Home.Interest addInterest(@RequestBody Home.Interest interest) {
        return service.addInterest(interest);
    }

    @DeleteMapping("/interests/{text}")
    public void deleteInterest(@PathVariable String text) {
        service.deleteInterest(text);
    }

    // Links
    @GetMapping("/links")
    public List<Home.Link> getLinks() {
        return service.getLinks();
    }

    @PostMapping("/links")
    public Home.Link addLink(@RequestBody Home.Link link) {
        return service.addLink(link);
    }

    @DeleteMapping("/links/{label}")
    public void deleteLink(@PathVariable String label) {
        service.deleteLink(label);
    }
}
