export function renderValidationOptions(questionDiv) {
    const type = questionDiv.querySelector('.question-type').value;
    const validationOptions = questionDiv.querySelector('.validation-options');

    validationOptions.innerHTML = '';

    if (validationConfig[type]) {
      validationConfig[type].forEach(option => {
        const label = document.createElement('label');
        label.classList.add("validation-label");
        label.textContent = option.label + " : ";
    
        if (option.type === "dynamic-list" && option.addRemove) {
          const optionsContainer = document.createElement("div");
          optionsContainer.classList.add(option.className + "-container", "options-container");
    
          const hiddenInput = document.createElement("input");
          hiddenInput.type = "hidden";
          hiddenInput.classList.add(option.className, "hidden-input");
          hiddenInput.setAttribute("placeholder", option.placeholder);
    
          optionsContainer.appendChild(hiddenInput);
          validationOptions.appendChild(label);
          validationOptions.appendChild(optionsContainer);
    
          const addOption = () => {
            const optionWrapper = document.createElement("div");
            optionWrapper.classList.add("option-wrapper");
    
            const optionInput = document.createElement("input");
            optionInput.type = "text";
            optionInput.classList.add("option-input");
            optionInput.placeholder = option.placeholder;
            optionInput.addEventListener("input", updateHiddenInput);
    
            const removeBtn = document.createElement("button");
            removeBtn.classList.add("remove-btn");
    
            const removeIcon = document.createElement("img");
            removeIcon.src = "/images/cross.png";
            removeIcon.title = "Remove Option";
            removeIcon.classList.add("remove-icon");
    
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
            const values = Array.from(optionsContainer.querySelectorAll(".option-input"))
              .map(input => input.value.trim())
              .filter(value => value !== "");
            hiddenInput.value = values.join(",");
          };
    
          const addBtn = document.createElement("button");
          addBtn.classList.add("add-btn");
    
          const addIcon = document.createElement("img");
          addIcon.src = "/images/add.png";
          addIcon.title = "Add Option";
          addIcon.classList.add("add-icon");
    
          addBtn.appendChild(addIcon);
          addBtn.onclick = addOption;
          optionsContainer.appendChild(addBtn);
        }
     else {
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