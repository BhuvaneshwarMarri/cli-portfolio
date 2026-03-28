package com.example.portfolio_editor_backend.repository;

import com.example.portfolio_editor_backend.models.Skills;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillsRepository extends MongoRepository<Skills, String> {
}
