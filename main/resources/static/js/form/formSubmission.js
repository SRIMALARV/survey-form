export function submitResponse(event, formId) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const responses = {};

    formData.forEach((value, key) => {
        if (!responses[key]) {
            responses[key] = [];
        }
        responses[key].push(value);
    });

    const finalResponses = Object.keys(responses).map(questionId => ({
        questionId: questionId,
        answer: responses[questionId].join(", ")
    }));

    fetch("http://localhost:8080/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId, responses: finalResponses })
    })
    .then(res => res.json())
    .then(() => {
        alert("Form submitted successfully!");
        navigate(`/user`);
    })
    .catch(error => console.error("Error submitting response:", error));
}
