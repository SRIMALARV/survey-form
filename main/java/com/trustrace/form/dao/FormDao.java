package com.trustrace.form.dao;

import com.trustrace.form.model.Form;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FormDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Form> findAll() {
        return mongoTemplate.findAll(Form.class);
    }

    public Form findById(String id) {
        return mongoTemplate.findById(id, Form.class);
    }
}
