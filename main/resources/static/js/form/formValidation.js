export function validateInput(question) {
    let inputElement;
    const validations = question.validations || {};
    const errorElement = document.createElement("span");
    errorElement.classList.add("error-message");
    errorElement.style.color = "red";

    function validate() {
        let errorMsg = "";
        if ((question.type === "text" || question.type === "number") && validations.required && !inputElement.value.trim()) {
            errorMsg = "This field is required.";
        }
        if (question.type === "text") {
            if (validations.minLength && inputElement.value.length < validations.minLength) {
                errorMsg = `Minimum ${validations.minLength} characters required.`;
            }
            if (validations.maxLength && inputElement.value.length > validations.maxLength) {
                errorMsg = `Maximum ${validations.maxLength} characters allowed.`;
            }
        }
        if (question.type === "number") {
            const value = parseFloat(inputElement.value);
            if (validations.minValue && value < validations.minValue) {
                errorMsg = `Minimum value is ${validations.minValue}.`;
            }
            if (validations.maxValue && value > validations.maxValue) {
                errorMsg = `Maximum value is ${validations.maxValue}.`;
            }
        }
        if ((question.type === "checkbox" || question.type === "radio" || question.type === "dropdown") && validations.required) {
            const selected = Array.from(inputElement.querySelectorAll("input, select")).some(el => el.checked || el.value);
            if (!selected) {
                errorMsg = "Please select at least one option.";
            }
        }
        if (question.type === "image") {
            const file = inputElement.files[0];
            if (file) {
                const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
                const fileExtension = file.name.split(".").pop().toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    errorMsg = "Only JPG, JPEG, PNG, and GIF files are allowed.";
                }
            } else if (validations.required) {
                errorMsg = "Please upload an image.";
            }
        }
        errorElement.textContent = errorMsg;
    }

    if (question.type === "text" || question.type === "number") {
        inputElement = document.createElement("input");
        inputElement.type = question.type;
        inputElement.name = question.questionText;
        inputElement.placeholder = question.type === "text" ? "Enter your text" : "Enter the number";
        inputElement.addEventListener("input", validate);
    } else if (question.type === "checkbox" || question.type === "radio") {
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
        }
    } else if (question.type === "dropdown") {
        inputElement = document.createElement("select");
        inputElement.name = question.questionText;
        inputElement.addEventListener("change", validate);

        if (Array.isArray(validations.options)) {
            validations.options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                inputElement.appendChild(optionElement);
            });
        }
    } else if (question.type === "image") {
        inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.name = question.questionText;
        inputElement.accept = ".jpg, .jpeg, .png, .gif";
        inputElement.addEventListener("change", validate);
    }

    const wrapper = document.createElement("div");
    wrapper.appendChild(inputElement);
    wrapper.appendChild(errorElement);
    return wrapper;
}
