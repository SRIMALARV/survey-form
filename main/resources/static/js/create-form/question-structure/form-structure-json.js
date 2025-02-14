export const formStructure = {
  tag: "div",
  attributes: { id: "form-builder" },
  children: [
    { tag: "h1", text: "Create Your Form" },
    {
      tag: "label",
      attributes: { for: "form-name" },
      text: "Form Name:"
    },
    {
      tag: "input",
      attributes: { type: "text", id: "form-name", placeholder: "Enter Form Name", required: true }
    },
    { tag: "div", attributes: { id: "form-name-error" } },
    { tag: "div", attributes: { id: "questions-container" } },
    {
      tag: "button",
      attributes: { id: "add-question" },
      text: "+",
      events: { click: () => document.getElementById('add-question') }
    },
    {
      tag: "button",
      attributes: { id: "create-form" },
      text: "Create Form",
      events: { click: () => document.getElementById('create-form') }
    }
  ]
};


