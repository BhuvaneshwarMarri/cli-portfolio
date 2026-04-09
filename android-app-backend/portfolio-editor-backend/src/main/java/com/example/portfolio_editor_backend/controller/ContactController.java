package com.example.portfolio_editor_backend.controller;

import com.example.portfolio_editor_backend.models.Contact;
import com.example.portfolio_editor_backend.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {
    private final ContactService service;

    // Availability
    @GetMapping("/availability")
    public Contact.Availability getAvailability() {
        return service.getAvailability();
    }

    @PostMapping("/availability")
    public Contact.Availability updateAvailability(@RequestBody Contact.Availability availability) {
        return service.updateAvailability(availability);
    }

    @DeleteMapping("/availability")
    public void deleteAvailability() {
        service.deleteAvailability();
    }

    // Info
    @GetMapping("/info")
    public Contact.Info getInfo() {
        return service.getInfo();
    }

    @PostMapping("/info")
    public Contact.Info updateInfo(@RequestBody Contact.Info info) {
        return service.updateInfo(info);
    }

    @DeleteMapping("/info")
    public void deleteInfo() {
        service.deleteInfo();
    }

    // GitHub
    @GetMapping("/github")
    public Contact.Social getGithub() {
        return service.getGithub();
    }

    @PostMapping("/github")
    public Contact.Social updateGithub(@RequestBody Contact.Social github) {
        return service.updateGithub(github);
    }

    @DeleteMapping("/github")
    public void deleteGithub() {
        service.deleteGithub();
    }

    // LinkedIn
    @GetMapping("/linkedin")
    public Contact.Social getLinkedin() {
        return service.getLinkedin();
    }

    @PostMapping("/linkedin")
    public Contact.Social updateLinkedin(@RequestBody Contact.Social linkedin) {
        return service.updateLinkedin(linkedin);
    }

    @DeleteMapping("/linkedin")
    public void deleteLinkedin() {
        service.deleteLinkedin();
    }

    // Twitter
    @GetMapping("/twitter")
    public Contact.Social getTwitter() {
        return service.getTwitter();
    }

    @PostMapping("/twitter")
    public Contact.Social updateTwitter(@RequestBody Contact.Social twitter) {
        return service.updateTwitter(twitter);
    }

    @DeleteMapping("/twitter")
    public void deleteTwitter() {
        service.deleteTwitter();
    }

    // Open To
    @GetMapping("/open-to")
    public List<Contact.OpenToItem> getOpenTo() {
        return service.getOpenTo();
    }

    @PostMapping("/open-to")
    public Contact.OpenToItem addOpenToItem(@RequestBody Contact.OpenToItem item) {
        return service.addOpenToItem(item);
    }

    @DeleteMapping("/open-to/{text}")
    public void deleteOpenToItem(@PathVariable String text) {
        service.deleteOpenToItem(text);
    }
}
