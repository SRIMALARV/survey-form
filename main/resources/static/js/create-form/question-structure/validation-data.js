export const validationConfig = {
  text: [
    { tag: "input", type: "checkbox", class: "required", label: "Required", inline: true },
    { tag: "input", type: "number", class: "min-length", label: "Min Length", placeholder: "Minimum number of characters" },
    { tag: "input", type: "number", class: "max-length", label: "Max Length", placeholder: "Maximum number of characters" }
  ],
  number: [
    { tag: "input", type: "checkbox", class: "required", label: "Required", inline: true },
    { tag: "input", type: "number", class: "min-value", label: "Min Value", placeholder: "Minimum integer value" },
    { tag: "input", type: "number", class: "max-value", label: "Max Value", placeholder: "Maximum integer value" }
  ],
  image: [
    { tag: "input", type: "checkbox", class: "required", label: "Required", inline: true },
    { tag: "input", type: "text", class: "allowed-formats", label: "File Formats", placeholder: "Allowed formats - jpg/png/pdf" },
    { tag: "input", type: "number", class: "max-size", label: "Max Size(MB)", placeholder: "Maximum size of the file" }
  ],
  checkbox: [
    { tag: "input", type: "checkbox", class: "required", label: "Required", inline: true },
    { tag: "div", class: "checkbox-options", label: "Options", type: "dynamic-list", placeholder: "Enter option", addRemove: true }
  ],
  radio: [
    { tag: "input", type: "checkbox", class: "required", label: "Required", inline: true },
    { tag: "div", class: "radio-options", label: "Options", type: "dynamic-list", placeholder: "Enter option", addRemove: true }
  ],
  dropdown: [
    { tag: "input", type: "checkbox", class: "required", label: "Required", inline: true },
    { tag: "div", class: "dropdown-options", label: "Options", type: "dynamic-list", placeholder: "Enter option", addRemove: true }
  ]
};