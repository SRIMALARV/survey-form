export default function viewResponses(responseId) {
    if (!responseId) {
        console.error('Response ID is missing');
        return document.createElement('div');
    }

    console.log('Fetching response details for responseId:', responseId);

    const containerBox = document.createElement('div');
    containerBox.classList.add('containerBox');

    const heading = document.createElement('h2');
    heading.textContent = 'Response Details';
    containerBox.appendChild(heading);

    const backButton = document.createElement('button');
    backButton.classList.add('back-btn');
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => window.history.back());
    containerBox.appendChild(backButton);

    const responseDetails = document.createElement('div');
    responseDetails.id = 'response-details';
    containerBox.appendChild(responseDetails);

    fetch(`http://localhost:8080/api/responses/details/${responseId}`)
        .then(response => response.json())
        .then(responseData => {
            responseDetails.innerHTML = '';

            responseData.responses.forEach((answer, index) => {
                const questionElement = document.createElement('p');
                questionElement.innerHTML = `<strong>Question ${index + 1}:</strong> ${answer.questionId}`;
                responseDetails.appendChild(questionElement);

                const answerElement = document.createElement('p');
                answerElement.innerHTML = `<strong>Answer:</strong> ${answer.answer}`;
                responseDetails.appendChild(answerElement);

                const hr = document.createElement('hr');
                responseDetails.appendChild(hr);
            });
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
