package com.trustrace.form.controller;

import com.trustrace.form.model.Form;
import com.trustrace.form.repository.FormRepository;
import com.trustrace.form.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;


import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/forms")
public class FormController {

    @Autowired
    private FormRepository formRepository;
    @Autowired
    private FormService formService;

    @PostMapping
    public ResponseEntity<?> saveForm(@RequestBody Form form) {
        try {
            if (form == null || form.getQuestions() == null || form.getQuestions().isEmpty()) {
                return new ResponseEntity<>("Form data is invalid", HttpStatus.BAD_REQUEST);
            }

            Optional<Form> existingForm = formRepository.findByName(form.getName());
            if (existingForm.isPresent()) {
                return new ResponseEntity<>("Form name must be unique", HttpStatus.BAD_REQUEST);
            }
            Form savedForm = formRepository.save(form);

            return new ResponseEntity<>(savedForm, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error saving form: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public List<Form> getAllForms() {
        System.out.println("Fetching all forms...");
        return formService.getAllForms();
    }

    @GetMapping("/{formId}")
    public ResponseEntity<Object> getFormById(@PathVariable String formId) {
        Optional<Form> form = formRepository.findById(formId);
        return form.<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Form not found"));
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateFormStatus(@PathVariable String id, @RequestBody Map<String, String> requestBody) {
        System.out.println("Received request to update status for form ID: " + id);
        System.out.println("Request Body: " + requestBody);

        Optional<Form> optionalForm = formRepository.findById(id);
        if (optionalForm.isPresent()) {
            Form form = optionalForm.get();
            String newStatus = requestBody.get("status");

            if (newStatus == null || (!newStatus.equalsIgnoreCase("active") && !newStatus.equalsIgnoreCase("inactive"))) {
                return ResponseEntity.badRequest().body("Invalid status value");
            }

            form.setStatus(newStatus);
            formRepository.save(form);
            return ResponseEntity.ok(form);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Form not found");
    }

    @GetMapping("/paginated")
    public Page<Form> getForms(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return formService.getForms(PageRequest.of(page, size));
    }



}
