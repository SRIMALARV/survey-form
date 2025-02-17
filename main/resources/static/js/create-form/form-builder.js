import { renderJSON } from "../render.js";
import { formStructure } from "./question-structure/form-structure-json.js";
import { validationConfig } from "./question-structure/validation-data.js";
import { API_BASE_URL } from "../render.js";

function createFormsTableContainer() {
  const container = document.createElement('div');
  container.id = "container";
  document.body.appendChild(container);
   
  renderJSON(formStructure, container);

  function renderValidationOptions(questionDiv) {
    const type = questionDiv.querySelector('.question-type').value;
    const validationOptions = questionDiv.querySelector('.validation-options');

    validationOptions.innerHTML = '';

    if (validationConfig[type]) {
      validationConfig[type].forEach(option => {
        const label = document.createElement('label');
        label.style.textAlign = "left";
        label.style.width = "100%";
        label.textContent = option.label + ": ";


        if (option.type === "dynamic-list" && option.addRemove) {
          const optionsContainer = document.createElement("div");
          optionsContainer.style.width = "100%";
          optionsContainer.classList.add(option.className + "-container");

          const hiddenInput = document.createElement("input");
          hiddenInput.type = "hidden";
          hiddenInput.classList.add(option.className);
          hiddenInput.setAttribute("placeholder", option.placeholder);

          optionsContainer.appendChild(hiddenInput);
          validationOptions.appendChild(label);
          validationOptions.appendChild(optionsContainer);

          const addOption = () => {
            const optionWrapper = document.createElement("div");
            optionWrapper.style.display = "flex";
            optionWrapper.style.alignItems = "flex-start";
            optionWrapper.style.width = "100%";
            optionWrapper.style.gap = "8px";
            optionWrapper.classList.add("option-wrapper");

            const optionInput = document.createElement("input");
            optionInput.type = "text";
            optionInput.style.width = "100%";
            optionInput.placeholder = option.placeholder;
            optionInput.addEventListener("input", updateHiddenInput);

           const removeBtn = document.createElement("button");

           const removeIcon = document.createElement("img");
           removeBtn.style.padding = "0";
           removeBtn.style.margin = "0";
           removeBtn.style.backgroundColor = "white";
           removeIcon.src = "/images/cross.png";
           removeIcon.title = "Remove Option";
           removeIcon.style.width = "30px";
           removeIcon.style.height = "30px";

           removeBtn.appendChild(removeIcon);

           removeBtn.onclick = function () {
             optionWrapper.remove();
             updateHiddenInput();
           };

           optionWrapper.appendChild(optionInput);
           optionWrapper.appendChild(removeBtn);
           optionsContainer.insertBefore(optionWrapper, addBtn);

          };

          const updateHiddenInput = () => {
            const values = Array.from(optionsContainer.querySelectorAll("input[type='text']"))
              .map(input => input.value.trim())
              .filter(value => value !== "");
            hiddenInput.value = values.join(",");
          };

         const addBtn = document.createElement("button");

         const addIcon = document.createElement("img");
         addBtn.style.padding = "0";
         addBtn.style.margin = "0";
         addBtn.style.backgroundColor = "white";
         addIcon.src = "/images/add.png";
         addIcon.title = "Add Option";
         addIcon.style.width = "30px";
         addIcon.style.height = "30px";
         addBtn.appendChild(addIcon);

         addBtn.onclick = addOption;
         optionsContainer.appendChild(addBtn);

        } else {
          const input = document.createElement('input');
          input.type = option.type;
          input.className = option.className;
          if (option.placeholder) input.placeholder = option.placeholder;

          if (option.inline) {
            label.style.display = 'inline-flex';
          }

          label.appendChild(input);
          validationOptions.appendChild(label);
          validationOptions.appendChild(document.createElement('br'));
        }
      });
    }
  }
  let questionCount = 0;

let questionJSON = {
  tag: "div",
  attributes: { id: "questions-container" },
  children: []
};


let questionsContainer = document.getElementById("questions-container");
if (!questionsContainer) {
  questionsContainer = document.createElement("div");
  questionsContainer.id = "questions-container";
  container.appendChild(questionsContainer);
}

document.getElementById("add-question").addEventListener("click", () => {
  questionCount++;

  const questionId = `question-${questionCount}`;

  const questionData = {
    tag: "div",
    attributes: { class: "question-config", id: questionId, "data-id": questionId },
    children: [
      {
        tag: "div",
        attributes: { class: "question-content" },
        children: [
          { tag: "h3", text: `Question ${questionCount}` },
          {
            tag: "label",
            children: [
              { tag: "span", text: "Question Text: " },
              { tag: "input", attributes: { type: "text", class: "question-text", required: true, placeholder: "Enter your question here" } }
            ]
          },
          {
            tag: "label",
            children: [
              { tag: "span", text: "Question Type: " },
              {
                tag: "select",
                attributes: { class: "question-type" },
                children: [
                  { tag: "option", attributes: { value: "text" }, text: "Text" },
                  { tag: "option", attributes: { value: "number" }, text: "Number" },
                  { tag: "option", attributes: { value: "checkbox" }, text: "Checkbox" },
                  { tag: "option", attributes: { value: "dropdown" }, text: "Dropdown" },
                  { tag: "option", attributes: { value: "radio" }, text: "Radio" },
                  { tag: "option", attributes: { value: "image" }, text: "Image Upload" }
                ]
              }
            ]
          },
          { tag: "div", attributes: { class: "validation-options" } }
        ]
      },
      {
        tag: "div",
        attributes: { class: "question-actions" },
        children: [
          {
            tag: "button",
            attributes: { type: "button", class: "configure-validations", title: "Properties" },
            children: [
              {
                tag: "img",
                attributes: {
                  src: "/images/settings.png",
                  alt: "Configure",
                  class: "icon-button"
                }
              }
            ],
            events: {
              click: (e) => renderValidationOptions(e.currentTarget.closest(".question-config"))
            }
          },
          {
            tag: "button",
            attributes: { type: "button", class: "remove-question", title: "Delete Question" },
            children: [
              {
                tag: "img",
                attributes: {
                  src: "/images/trash.png",
                  alt: "Remove",
                  class: "icon-button"
                }
              }
            ],
            events: {
              click: (e) => removeQuestion(e.currentTarget.closest(".question-config").dataset.id)
            }
          }
        ]
      }
    ]
  };

  questionJSON.children.push(questionData);
  renderJSON({ children: [questionData] },document.getElementById("questions-container"),true);
});

  function removeQuestion(questionId) {
    Swal.fire({
        title: "Confirm Deletion",
        text: "Are you sure you want to delete this question?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No"
    }).then(result => {
        if (result.isConfirmed) {
            document.querySelector(`#container #${questionId}`)?.remove();
            questionJSON.children = questionJSON.children.filter(q => q.attributes.id !== questionId);
        }
    });
}

  renderJSON(questionJSON, document.getElementById("questions-container"));

  function validateFormTitle(title) {
    const errorMessage = document.getElementById('form-name-error');

    if (errorMessage) {
      errorMessage.style.color = "red";
      errorMessage.style.display = "block";
    }

    title = title.trim();

    if (title.length < 5) {
      errorMessage.textContent = "Form name must be at least 5 characters long!";
      return false;
    }
    else if (title.length > 50) {
      errorMessage.textContent = "Form name should not exceed 50 characters!";
      return false;
    }
    else {
      errorMessage.style.display = "none";
    }
    return true;
  }

  document.getElementById("form-name").addEventListener("input", (event) => {
    validateFormTitle(event.target.value);
  });
  function getUpdatedOptions(validationOptions, type) {
      const optionsInput = validationOptions.querySelector(`.${type}-options`);
      if (!optionsInput) return [];
      return optionsInput.value
          .split(',')
          .map(opt => opt.trim())
          .filter(opt => opt !== '');
  }

  document.getElementById('create-form').addEventListener('click', () => {
    const formName = document.getElementById('form-name').value.trim();
    if (!formName) {
      Swal.fire({
        title: 'Alert!',
        text: 'Please enter a form name!',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        return;
      });
      return;
    }

    const questions = document.querySelectorAll('.question-config');
    if (questions.length === 0) {
      Swal.fire({
        title: 'Alert!',
        text: 'Please add at least one question!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!validateFormTitle(formName)) {
      return;
    }
    const formDefinition = [];
    let hasInvalidQuestion = false;
    questions.forEach((questionDiv, index) => {
      const questionText = questionDiv.querySelector('.question-text').value.trim();
      if (!questionText) {
        hasInvalidQuestion = true;
        return;
      }

      const type = questionDiv.querySelector('.question-type').value;
      const validationOptions = questionDiv.querySelector('.validation-options');
      validationOptions.style.width = "100%";
      validationOptions.style.flex = "1"; 
      validationOptions.style.clear = "both"; 

      const validations = {};

      switch (type) {
        case 'text':
          validations.required = validationOptions.querySelector('.required')?.checked || false;
          validations.minLength = validationOptions.querySelector('.min-length')?.value || '';
          validations.maxLength = validationOptions.querySelector('.max-length')?.value || '';
          break;
        case 'number':
          validations.required = validationOptions.querySelector('.required')?.checked || false;
          validations.minValue = validationOptions.querySelector('.min-value')?.value || '';
          validations.maxValue = validationOptions.querySelector('.max-value')?.value || '';
          break;
        case 'checkbox':
        case 'dropdown':
        case 'radio':
          validations.required = validationOptions.querySelector('.required')?.checked || false;
          validations.options = getUpdatedOptions(validationOptions, type);
          break;
        case 'image':
          validations.required = validationOptions.querySelector('.required')?.checked || false;
          validations.allowedFormats = validationOptions.querySelector('.allowed-formats')?.value || '';
          break;
      }

      formDefinition.push({ questionText, type, validations });
    });


    if (hasInvalidQuestion) {
      Swal.fire({
        title: 'Alert!',
        text: 'Every question must have a label!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

  fetch(`${API_BASE_URL}/api/forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: formName, questions: formDefinition }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Form name must be unique");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Form saved successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          location.reload();
        });
      })
      .catch((error) => {
        console.error('Error saving form:', error);
        alert('Failed to save form: ' + error.message);
      });
  });

  return container;
}

export default createFormsTableContainer;