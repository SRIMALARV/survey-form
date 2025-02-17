import { API_BASE_URL, renderJSON } from "./render.js";

export default function viewResponses(responseId) {
    if (!responseId) {
        return document.createElement('div');
    }

    const containerBox = document.createElement('div');
    containerBox.classList.add('containerBox');

    fetch(`${API_BASE_URL}/api/responses/details/${responseId}`)
        .then(response => response.json())
        .then(responseData => {
            const responseElements = {
                children: [
                    { tag: 'h2', text: 'Response Details' },
                    {
                        tag: 'button',
                        text: 'Back',
                        attributes: { class: 'back-btn' },
                        events: { click: () => window.history.back() }
                    },
                    {
                        tag: 'div',
                        attributes: { id: 'response-details' },
                        children: responseData.responses.map((answer, index) => ({
                            tag: 'div',
                            children: [
                                { tag: 'p', text: `Question ${index + 1}: ${answer.questionId}` },
                                { tag: 'p', text: `Answer: ${answer.answer}` },
                                { tag: 'hr' }
                            ]
                        }))
                    }
                ]
            };

            renderJSON(responseElements, containerBox);
        })
        .catch(() => {
            Swal.fire({
                title: 'Failed!',
                text: 'Error fetching response details!',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "/form";
            });
        });

    return containerBox;
}
