package com.example.portfolio_editor_backend.repository;

import com.example.portfolio_editor_backend.models.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {
}
