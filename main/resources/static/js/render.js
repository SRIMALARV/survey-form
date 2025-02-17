export function renderJSON(json, parent, preserveExisting = false) {
  if (!preserveExisting) {
    parent.innerHTML = "";
  }
  json.children.forEach(element => {
    let existingElement = document.getElementById(element.attributes?.id);
    let el = existingElement || document.createElement(element.tag);

    if (element.attributes) {
      Object.entries(element.attributes).forEach(([key, value]) => el.setAttribute(key, value));
    }

    if (element.text) {
      el.textContent = element.text;
    }

    if (element.events && !existingElement) {
      Object.entries(element.events).forEach(([event, handler]) => el.addEventListener(event, handler));
    }

    if (element.children) {
      renderJSON({ children: element.children }, el, preserveExisting);
    }

    if (!existingElement) {
      parent.appendChild(el);
    }
  });
}

export const API_BASE_URL = "http://localhost:8080";
