import { validateInput } from "./form-validation.js";
import { submitResponse } from "./form-submission.js";
import { API_BASE_URL } from "../../render.js";
import { navigate } from "../../router.js";

function createDynamicForm(formId) {
    const containerForm = document.createElement("div");

    if (!formId) {
        containerForm.appendChild(renderError("Error: Form ID is missing"));
        return containerForm;
    }

    fetch(`${API_BASE_URL}/api/forms/${formId}`)
        .then(response => response.json())
        .then(form => {
            containerForm.appendChild(renderForm(form, formId));
            const backButton = document.createElement("button");
            backButton.textContent = "Back";
            backButton.classList.add("back-btn");
            backButton.addEventListener("click", () => {
                navigate(`/user`);
            });
            containerForm.appendChild(backButton);

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
    formElement.appendChild(document.createElement("hr"));

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

        inputElement.addEventListener("input", toggleSubmitButton);
        div.appendChild(inputElement);

        formElement.appendChild(div);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.type = "submit";
    submitButton.classList.add("submit-btn");
    submitButton.disabled = true;
    formElement.appendChild(submitButton);

    formElement.addEventListener("input", toggleSubmitButton);

    formElement.addEventListener("submit", (event) => submitResponse(event, formId));

    return formElement;
}

export function toggleSubmitButton() {
    const form = document.getElementById("dynamicForm");
    const submitButton = form.querySelector(".submit-btn");

    if (!submitButton) return;

    const inputs = form.querySelectorAll("input, select, textarea");
    let allValid = true;

    inputs.forEach(input => {
        if (input.required) {
            if ((input.type === "text" || input.type === "number" || input.tagName === "SELECT") && !input.value.trim()) {
                allValid = false;
            }

            if (input.type === "checkbox" || input.type === "radio") {
                if (!groupedNames.has(input.name)) {
                    groupedNames.add(input.name); // Avoid checking same group multiple times
                    const groupChecked = form.querySelectorAll(`input[name="${CSS.escape(input.name)}"]:checked`);
                    if (groupChecked.length === 0) {
                        allValid = false;
                    }
                }
            }
        }

        const errorMessage = input.parentElement.querySelector("small");
        if (errorMessage) {
            if (errorMessage.textContent.trim() !== "") {
                allValid = false;
            }
        }

    });

    submitButton.disabled = !allValid;
}


function renderError(message) {
    const errorElement = document.createElement("h3");
    errorElement.textContent = message;
    return errorElement;
}

export default createDynamicForm;
