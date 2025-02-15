import { renderJSON } from "../render.js";
import { API_BASE_URL } from "../render.js";

export default function fetchAndRenderForms() {
    const containerCards = document.createElement('div');
    containerCards.id = 'forms-wrapper';
    containerCards.textContent = "Loading forms...";

    fetch(`${API_BASE_URL}/forms`)
        .then(response => response.json())
        .then(forms => {
            if (!Array.isArray(forms)) return;

            const activeForms = forms.filter(form => form.status === 'active');

            const jsonStructure = {
                children: [
                    {
                        tag: 'div',
                        attributes: { class: 'forms-wrapper' },
                        children: [
                            { tag: 'h1', attributes: { class: 'forms-heading' }, text: 'Available Forms' },
                            {
                                tag: 'div',
                                attributes: { id: 'forms-container', class: 'forms-container' },
                                children: activeForms.map(form => ({
                                    tag: 'div',
                                    attributes: { id: `form-${form.id}`, class: 'form-card' },
                                    children: [
                                        { tag: 'h3', attributes: { class: 'form-title' }, text: form.name },
                                        { tag: 'p', attributes: { class: 'form-question-count' }, text: `${form.questions ? form.questions.length : 0} questions` },
                                        {
                                            tag: 'button',
                                            attributes: { class: 'view-button' },
                                            text: 'View',
                                            events: { click: () => navigate(`/form/${form.id}`) }
                                        }
                                    ]
                                }))
                            }
                        ]
                    }
                ]
            };

            containerCards.innerHTML = "";
            renderJSON(jsonStructure, containerCards);

        })
        .catch(() => {
            throw new Error('Forms could not be fetched');
        });
    return containerCards;
}
