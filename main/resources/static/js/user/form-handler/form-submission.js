import { API_BASE_URL } from "../../render.js";
import { navigate } from "../../router.js";

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

    fetch(`${API_BASE_URL}/api/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId, responses: finalResponses })
    })
    .then(res => res.json())
    .then(() => {
        return Swal.fire({
            title: 'Success!',
            text: 'Response submitted successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            navigate(`/user`);
        });
    })
    .catch(error => console.error("Error submitting response:", error));
    
}
