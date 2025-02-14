package com.trustrace.form.service;

import com.trustrace.form.model.Form;
import com.trustrace.form.repository.FormRepository;
import com.trustrace.form.repository.ResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormService {

    private final FormRepository formRepository;

    @Autowired
    private ResponseRepository responseRepository;

    public FormService(FormRepository formRepository) {
        this.formRepository = formRepository;
    }

    public List<Form> getAllForms() {
        return formRepository.findAll();
    }

    public Page<Form> getForms(Pageable pageable) {
        return formRepository.findAll(pageable);
    }
}

