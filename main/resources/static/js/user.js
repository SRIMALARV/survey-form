export default function fetchAndRenderForms() {
    const containerCards = document.createElement('div');
    containerCards.id = 'forms-wrapper';

    fetch('http://localhost:8080/api/forms')
        .then(response => response.json())
        .then(forms => {
            if (!Array.isArray(forms)) return;

            const activeForms = forms.filter(form => form.status === 'active');

            const jsonStructure = {
                children: [
                    {
                        tag: 'div',
                        attributes: { id: 'forms-container' },
                        children: [
                            { tag: 'h1', text: 'Available Forms' },
                            ...activeForms.map(form => ({
                                tag: 'div',
                                class: 'card',
                                attributes: { id: `form-${form.id}` },
                                children: [
                                    { tag: 'h3', text: form.name },
                                    { tag: 'p', text: `${form.questions ? form.questions.length : 0} questions` },
                                    {
                                        tag: 'button',
                                        class: 'view-button',
                                        text: 'View',
                                        events: { click: () => navigate(`/form/${form.id}`) }
                                    }
                                ]
                            }))
                        ]
                    }
                ]
            };

            const parentContainer = document.getElementById('user-page-content'); // Update this to your specific container ID
            if (parentContainer) {
                parentContainer.innerHTML = ""; // Clear existing content
                renderJSON(jsonStructure, parentContainer);
            }
        })
        .catch(() => console.error('Error fetching forms'));

    return containerCards;
}
