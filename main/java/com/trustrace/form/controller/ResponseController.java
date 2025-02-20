package com.trustrace.form.controller;

import com.trustrace.form.model.Response;
import com.trustrace.form.repository.FormRepository;
import com.trustrace.form.repository.ResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/responses")
public class ResponseController {
    @Autowired
    private ResponseRepository responseRepository;

    @GetMapping("/{formId}")
    public List<Response> getResponses(@PathVariable String formId) {
        return responseRepository.findAll().stream()
                .filter(response -> response.getFormId().equals(formId))
                .toList();
    }
    @PostMapping
    public ResponseEntity<?> saveResponse(@RequestBody Response response) {
        try {
            Response savedResponse = responseRepository.save(response);
            return new ResponseEntity<>(savedResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error saving response: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count/{formId}")
    public ResponseEntity<Long> getResponseCount(@PathVariable String formId) {
        long count = responseRepository.countByFormId(formId);
        return ResponseEntity.ok(count);
    }
    @GetMapping("/details/{responseId}")
    public ResponseEntity<Response> getResponseById(@PathVariable String responseId) {
        return responseRepository.findById(responseId)
                .map(response -> new ResponseEntity<>(response, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PatchMapping("/{responseId}")
    public ResponseEntity<String> updateResponseStatus(@PathVariable String responseId, @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");

        System.out.println("Received PATCH request for ID: " + responseId + " | New Status: " + newStatus);

        Optional<Response> existingResponse = responseRepository.findById(responseId);
        if (existingResponse.isPresent()) {
            Response response = existingResponse.get();
            response.setStatus(newStatus);
            responseRepository.save(response);
            return ResponseEntity.ok("Updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Response not found");
        }
    }


}
