export default function fetchAndRenderForms() {
    const containerCards = document.createElement('div');
    const container = document.createElement('div');
    container.id = 'forms-container';

    const heading = document.createElement('h1');
    heading.textContent = 'Available Forms';
    containerCards.appendChild(heading);
    fetch('http://localhost:8080/api/forms')
        .then(response => response.json())
        .then(forms => {
            if (!Array.isArray(forms)) {
                return;
            }

            const activeForms = forms.filter(form => form.status === 'active');

            activeForms.forEach(form => {
                console.log('Rendering active form:', form);

                // Create card for each form
                const card = document.createElement('div');
                card.classList.add('card');

                const title = document.createElement('h3');
                title.textContent = form.name;

                const questionCount = document.createElement('p');
                questionCount.textContent = `${form.questions ? form.questions.length : 0} questions`;

                const viewButton = document.createElement('button');
                viewButton.textContent = 'View';
                viewButton.classList.add('view-button');
                viewButton.addEventListener("click", () => {
                     navigate(`/form/${form.id}`);
                });

                // Append elements to the card
                card.appendChild(title);
                card.appendChild(questionCount);
                card.appendChild(viewButton);
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching forms:', error);
        });
    containerCards.appendChild(container);
    return containerCards;
}
