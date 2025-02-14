package com.trustrace.form.repository;

import com.trustrace.form.model.Form;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface FormRepository extends MongoRepository<Form, String> {
    // Find a form by its name
    Optional<Form> findByName(String name);
    Optional<Form> findById(String id);
    Page<Form> findAll(Pageable pageable);

}
