package com.example.portfolio_editor_backend.service;

import com.example.portfolio_editor_backend.models.Contact;
import com.example.portfolio_editor_backend.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepository repository;

    private Contact getOrCreateContact() {
        List<Contact> contactList = repository.findAll();
        for (Contact c : contactList) {
            if ("contact_data".equals(c.getType())) {
                return c;
            }
        }
        
        if (!contactList.isEmpty()) {
            return contactList.get(0);
        }

        Contact newContact = new Contact();
        newContact.setType("contact_data");
        newContact.setOpenTo(new ArrayList<>());
        newContact.setInfo(new Contact.Info()); // Initialize Info object
        return repository.save(newContact);
    }

    // Availability
    public Contact.Availability getAvailability() {
        return getOrCreateContact().getAvailability();
    }

    public Contact.Availability updateAvailability(Contact.Availability availability) {
        Contact contact = getOrCreateContact();
        contact.setAvailability(availability);
        repository.save(contact);
        return availability;
    }

    public void deleteAvailability() {
        Contact contact = getOrCreateContact();
        contact.setAvailability(null);
        repository.save(contact);
    }

    // Info (Main Email)
    public Contact.Info getInfo() {
        return getOrCreateContact().getInfo();
    }

    public Contact.Info updateInfo(Contact.Info info) {
        Contact contact = getOrCreateContact();
        if (contact.getInfo() == null) contact.setInfo(new Contact.Info());
        contact.getInfo().setEmail(info.getEmail());
        repository.save(contact);
        return contact.getInfo();
    }

    public void deleteInfo() {
        Contact contact = getOrCreateContact();
        if (contact.getInfo() != null) {
            contact.getInfo().setEmail(null);
            repository.save(contact);
        }
    }

    // GitHub (Nested in Info)
    public Contact.Social getGithub() {
        Contact.Info info = getOrCreateContact().getInfo();
        return (info != null) ? info.getGithub() : null;
    }

    public Contact.Social updateGithub(Contact.Social github) {
        Contact contact = getOrCreateContact();
        if (contact.getInfo() == null) contact.setInfo(new Contact.Info());
        contact.getInfo().setGithub(github);
        repository.save(contact);
        return github;
    }

    public void deleteGithub() {
        Contact contact = getOrCreateContact();
        if (contact.getInfo() != null) {
            contact.getInfo().setGithub(null);
            repository.save(contact);
        }
    }

    // LinkedIn (Nested in Info)
    public Contact.Social getLinkedin() {
        Contact.Info info = getOrCreateContact().getInfo();
        return (info != null) ? info.getLinkedin() : null;
    }

    public Contact.Social updateLinkedin(Contact.Social linkedin) {
        Contact contact = getOrCreateContact();
        if (contact.getInfo() == null) contact.setInfo(new Contact.Info());
        contact.getInfo().setLinkedin(linkedin);
        repository.save(contact);
        return linkedin;
    }

    public void deleteLinkedin() {
        Contact contact = getOrCreateContact();
        if (contact.getInfo() != null) {
            contact.getInfo().setLinkedin(null);
            repository.save(contact);
        }
    }

    // Twitter (Nested in Info)
    public Contact.Social getTwitter() {
        Contact.Info info = getOrCreateContact().getInfo();
        return (info != null) ? info.getTwitter() : null;
    }

    public Contact.Social updateTwitter(Contact.Social twitter) {
        Contact contact = getOrCreateContact();
        if (contact.getInfo() == null) contact.setInfo(new Contact.Info());
        contact.getInfo().setTwitter(twitter);
        repository.save(contact);
        return twitter;
    }

    public void deleteTwitter() {
        Contact contact = getOrCreateContact();
        if (contact.getInfo() != null) {
            contact.getInfo().setTwitter(null);
            repository.save(contact);
        }
    }

    // Open To
    public List<Contact.OpenToItem> getOpenTo() {
        return getOrCreateContact().getOpenTo();
    }

    public Contact.OpenToItem addOpenToItem(Contact.OpenToItem item) {
        Contact contact = getOrCreateContact();
        if (contact.getOpenTo() == null) contact.setOpenTo(new ArrayList<>());
        contact.getOpenTo().add(item);
        repository.save(contact);
        return item;
    }

    public void deleteOpenToItem(String text) {
        Contact contact = getOrCreateContact();
        if (contact.getOpenTo() != null) {
            contact.getOpenTo().removeIf(item -> text.equals(item.getText()));
            repository.save(contact);
        }
    }
}
