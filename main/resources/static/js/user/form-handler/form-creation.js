import { validateInput } from "./form-validation.js";
import { submitResponse } from "./form-submission.js";

function createDynamicForm(formId) {
    const containerForm = document.createElement("div");

    if (!formId) {
        containerForm.appendChild(renderError("Error: Form ID is missing"));
        return containerForm;
    }

    fetch(`http://localhost:8080/api/forms/${formId}`)
        .then(response => response.json())
        .then(form => {
            containerForm.appendChild(renderForm(form, formId));
        })
        .catch(error => console.error("Error fetching form details:", error));

    return containerForm;
}

function renderForm(form, formId) {
    const formElement = document.createElement("form");
    formElement.id = "dynamicForm";

    const title = document.createElement("h2");
    title.textContent = form.name;
    formElement.appendChild(title);
    formElement.appendChild(document.createElement('hr'));

    form.questions.forEach((question, index) => {
        const div = document.createElement("div");
        div.classList.add("form-group");

        const label = document.createElement("label");
        label.innerHTML = `${index + 1}. <strong>${question.questionText}</strong>`;
        div.appendChild(label);

        let inputElement = validateInput(question);

        if (!inputElement) {
            div.appendChild(document.createTextNode("Error: Invalid input type"));
            return;
        }

        div.appendChild(inputElement);
        formElement.appendChild(div);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.type = "submit";
    submitButton.setAttribute("class", "submit-btn");
    formElement.appendChild(submitButton);

    formElement.addEventListener("submit", (event) => submitResponse(event, formId));
    return formElement;
}

function renderError(message) {
    const errorElement = document.createElement("h3");
    errorElement.textContent = message;
    return errorElement;
}

export default createDynamicForm;
