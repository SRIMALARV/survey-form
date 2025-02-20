export const validationConfig = {
  text: [
    { label: "Required", type: "checkbox", className: "required", inline: true },
    { label: "Min Length", type: "number", className: "min-length", placeholder: "Minimum character length" },
    { label: "Max Length", type: "number", className: "max-length",  placeholder: "Maximum character length" }
  ],
  number: [
    { label: "Required", type: "checkbox", className: "required", inline: true },
    { label: "Min Value", type: "number", className: "min-value", placeholder: "Minimum integer value" },
    { label: "Max Value", type: "number", className: "max-value", placeholder: "Maximum integer value" }
  ],
  file: [
    { label: "Required", type: "checkbox", className: "required", inline: true },
    { label: "File Formats", type: "text", className: "allowed-formats", placeholder: "e.g., jpg, png, pdf" },
    { label: "Max Size (MB)", type: "number", className: "max-size", placeholder: "Maximum file size" }
  ],
  checkbox: [
    { label: "Required", type: "checkbox", className: "required", inline: true },
    { label: "Options", type: "dynamic-list", className: "checkbox-options", placeholder: "Enter option", addRemove: true}
  ],
  radio: [
    { label: "Required", type: "checkbox", className: "required", inline: true },
    { label: "Options", type: "dynamic-list", className: "radio-options", placeholder: "Enter option", addRemove: true }
  ],
  dropdown: [
    { label: "Required", type: "checkbox", className: "required", inline: true },
    { label: "Options", type: "dynamic-list", className: "dropdown-options", placeholder: "Enter option", addRemove: true }
  ]
};