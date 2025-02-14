export function validateInput(question) {
    let inputElement;
    const validations = question.validations || {};

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
    } else if (question.type === "checkbox" || question.type === "radio") {
        inputElement = document.createElement("div");
        inputElement.classList.add("option-group");
        if (Array.isArray(validations.options)) {
            validations.options.forEach(option => {
                const input = document.createElement("input");
                input.type = question.type;
                input.name = question.questionText;
                input.value = option;

                const optionLabel = document.createElement("label");
                optionLabel.appendChild(input);
                optionLabel.appendChild(document.createTextNode(option));

                inputElement.appendChild(optionLabel);
                inputElement.appendChild(document.createElement("br"));
            });
        } else {
            return null;
        }
    } else if (question.type === "dropdown") {
        inputElement = document.createElement("select");
        inputElement.classList.add("option-group");
        inputElement.name = question.questionText;
        inputElement.style.width = "100%";
        if (validations.required) inputElement.required = true;

        if (Array.isArray(validations.options)) {
            validations.options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                inputElement.appendChild(optionElement);
            });
        } else {
            return null;
        }
    } else if (question.type === "image") {
        inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.name = question.questionText;
        inputElement.accept = ".jpg, .jpeg, .png, .gif";
        if (validations.required) inputElement.required = true;
    } else {
        inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.name = question.questionText;
    }

    return inputElement;
}
