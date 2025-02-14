package com.trustrace.form.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "formsdata")
public class Form {
    @Id
    private String id;
    private String name;
    private List<Question> questions;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private String status = "active";

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static class Question {
        private String questionText;
        private String type; // text, number, checkbox, etc.
        private Validation validations;

        public static class Validation {
            private boolean required;
            private Integer minLength;
            private Integer maxLength;
            private Integer minValue;
            private Integer maxValue;
            private List<String> options;

            public boolean isRequired() {
                return required;
            }

            public void setRequired(boolean required) {
                this.required = required;
            }

            public Integer getMinLength() {
                return minLength;
            }

            public void setMinLength(Integer minLength) {
                this.minLength = minLength;
            }

            public Integer getMaxLength() {
                return maxLength;
            }

            public void setMaxLength(Integer maxLength) {
                this.maxLength = maxLength;
            }

            public Integer getMinValue() {
                return minValue;
            }

            public void setMinValue(Integer minValue) {
                this.minValue = minValue;
            }

            public Integer getMaxValue() {
                return maxValue;
            }

            public void setMaxValue(Integer maxValue) {
                this.maxValue = maxValue;
            }

            public List<String> getOptions() {
                return options;
            }

            public void setOptions(List<String> options) {
                this.options = options;
            }
        }

        public String getQuestionText() {
            return questionText;
        }

        public void setQuestionText(String questionText) {
            this.questionText = questionText;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public Validation getValidations() {
            return validations;
        }

        public void setValidations(Validation validations) {
            this.validations = validations;
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
