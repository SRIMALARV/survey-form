package com.trustrace.form.repository;

import com.trustrace.form.model.Response;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ResponseRepository extends MongoRepository<Response, String> {
    long countByFormId(String formId);
    Optional<Response> findById(String responseId);
}
