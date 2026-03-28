package com.example.portfolio_editor_backend.repository;

import com.example.portfolio_editor_backend.models.Experience;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepository extends MongoRepository<Experience, String> {
}
