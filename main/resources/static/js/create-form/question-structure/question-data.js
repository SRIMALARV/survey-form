export const questionData = {
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
