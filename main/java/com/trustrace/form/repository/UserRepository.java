package com.trustrace.form.repository;

import com.trustrace.form.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    // You can add custom query methods if needed
    Optional<User> findByUsername(String username);  // Custom query method to find user by username
}
