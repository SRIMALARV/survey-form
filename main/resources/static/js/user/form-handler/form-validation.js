export function validateInput(question) {
    let inputElement;
    const validations = question.validations || {};
    const errorElement = document.createElement("small");
    errorElement.style.color = "red";
    
    function validate() {
        let isValid = true;
        errorElement.textContent = ""; 
        
        if (question.type === "text" || question.type === "number") {
            if (validations.required && !inputElement.value.trim()) {
                errorElement.textContent = "This field is required.";
                isValid = false;
            }
            if (validations.minLength && inputElement.value.length < validations.minLength) {
                errorElement.textContent = `Minimum ${validations.minLength} characters required.`;
                isValid = false;
            }
            if (validations.maxLength && inputElement.value.length > validations.maxLength) {
                errorElement.textContent = `Maximum ${validations.maxLength} characters allowed.`;
                isValid = false;
            }
        }
        
        if (question.type === "number") {
            const value = parseFloat(inputElement.value);
            if (validations.minValue && value < validations.minValue) {
                errorElement.textContent = `Minimum value is ${validations.minValue}.`;
                isValid = false;
            }
            if (validations.maxValue && value > validations.maxValue) {
                errorElement.textContent = `Maximum value is ${validations.maxValue}.`;
                isValid = false;
            }
        }

        if (question.type === "checkbox" || question.type === "radio") {
            const checkedOptions = [...inputElement.querySelectorAll("input")].filter(input => input.checked);
            if (validations.required && checkedOptions.length === 0) {
                errorElement.textContent = "Please select at least one option.";
                isValid = false;
            }
        }

        if (question.type === "dropdown") {
            if (validations.required && inputElement.value === "") {
                errorElement.textContent = "Please select an option.";
                isValid = false;
            }
        }

        toggleSubmitButton(); // Update submit button state
        return isValid;
    }

    if (question.type === "text" || question.type === "number") {
        inputElement = document.createElement("input");
        inputElement.type = question.type;
        inputElement.name = question.questionText;
        inputElement.placeholder = question.type === "text" ? "Enter your text" : "Enter the number";

        if (validations.required) inputElement.required = true;
        if (validations.minLength) inputElement.minLength = validations.minLength;
        if (validations.maxLength) inputElement.maxLength = validations.maxLength;

        if (question.type === "number") {
            if (validations.minValue) inputElement.min = validations.minValue;
            if (validations.maxValue) inputElement.max = validations.maxValue;
        }

        inputElement.addEventListener("input", validate); 
    } 
    else if (question.type === "checkbox" || question.type === "radio") {
        inputElement = document.createElement("div");
        inputElement.classList.add("option-group");

        if (Array.isArray(validations.options)) {
            validations.options.forEach(option => {
                const input = document.createElement("input");
                input.type = question.type;
                input.name = question.questionText;
                input.value = option;
                input.addEventListener("change", validate); 

                const optionLabel = document.createElement("label");
                optionLabel.appendChild(input);
                optionLabel.appendChild(document.createTextNode(option));

                inputElement.appendChild(optionLabel);
                inputElement.appendChild(document.createElement("br"));
            });
        } else {
            return null;
        }
    } 
    else if (question.type === "dropdown") {
        inputElement = document.createElement("select");
        inputElement.classList.add("option-group");
        inputElement.name = question.questionText;
        inputElement.style.width = "100%";

        if (validations.required) inputElement.required = true;

        if (Array.isArray(validations.options)) {
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Select an option";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            inputElement.appendChild(defaultOption);

            validations.options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                inputElement.appendChild(optionElement);
            });
        } else {
            return null;
        }

        inputElement.addEventListener("change", validate); 
    } 
    else if (question.type === "image") {
        inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.name = question.questionText;
        inputElement.accept = ".jpg, .jpeg, .png, .gif";
        
        if (validations.required) inputElement.required = true;

        inputElement.addEventListener("change", validate); 
    } 
    else {
        inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.name = question.questionText;
        inputElement.addEventListener("input", validate);
    }

    const wrapper = document.createElement("div"); 
    wrapper.appendChild(inputElement);
    wrapper.appendChild(errorElement);

    return wrapper;
}
