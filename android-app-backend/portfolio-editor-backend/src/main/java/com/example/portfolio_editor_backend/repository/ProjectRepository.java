package com.example.portfolio_editor_backend.repository;

import com.example.portfolio_editor_backend.models.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    // Basic CRUD methods like save(), findById(), and delete() are included by default
}
