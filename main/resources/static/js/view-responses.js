import { renderJSON, API_BASE_URL } from "./render.js";

function renderViewResponses(formId) {
    if (!formId) {
        return document.createTextNode("Error: Form ID is missing");
    }

    const container = document.createElement("div");
    container.classList.add("containerResponse");

    const jsonStructure = {
        children: [
            { tag: "h2", text: "Form Responses" },
            { tag: "div", attributes: { class: "summary-container" }, children: [
                { tag: "p", attributes: { id: "totalResponses" }, text: "Total Responses: 0" },
                { tag: "p", attributes: { id: "approvedResponses" }, text: "Approved: 0" },
                { tag: "p", attributes: { id: "rejectedResponses" }, text: "Rejected: 0" }
            ]},
            { tag: "button", attributes: { class: "back-btn" }, text: "Back", events: { click: () => window.history.back() } },
            { tag: "table", children: [
                { tag: "thead", children: [
                    { tag: "tr", children: [
                        { tag: "th", text: "Response ID" },
                        { tag: "th", text: "View" },
                        { tag: "th", text: "Status" },
                        { tag: "th", text: "Actions" }
                    ]}
                ]},
                { tag: "tbody", attributes: { id: "responses-table-body" } }
            ]}
        ]
    };

    renderJSON(jsonStructure, container);

    const tbody = container.querySelector("#responses-table-body");
    const totalResponses = container.querySelector("#totalResponses");
    const approvedResponses = container.querySelector("#approvedResponses");
    const rejectedResponses = container.querySelector("#rejectedResponses");

    fetch(`${API_BASE_URL}/api/responses/${formId}`)
        .then(response => response.json())
        .then(responses => {
            let total = responses.length;
            let approved = responses.filter(r => r.status === "Approved").length;
            let rejected = responses.filter(r => r.status === "Rejected").length;

            totalResponses.textContent = `Total Responses: ${total}`;
            approvedResponses.textContent = `Approved: ${approved}`;
            rejectedResponses.textContent = `Rejected: ${rejected}`;

            responses.forEach(response => {
                const rowJSON = {
                    tag: "tr",
                    children: [
                        { tag: "td", text: response.id },
                        { tag: "td", children: [
                            { tag: "button", text: "View", attributes: { class: "view-btn" },
                              events: { click: () => navigate(`responses/${response.id}`) } }
                        ]},
                        { tag: "td", text: response.status || "Pending" },
                        { tag: "td", children: [
                            { tag: "button", text: "Approve", attributes: { class: "approve-btn" },
                              events: { click: () => handleStatusUpdate(response.id, "Approved") } },
                            { tag: "button", text: "Reject", attributes: { class: "reject-btn" },
                              events: { click: () => handleStatusUpdate(response.id, "Rejected") } }
                        ]}
                    ]
                };

                renderJSON({ children: [rowJSON] }, tbody, true);
            });
        })
        .catch(error => console.error("Error fetching responses:", error));

    function handleStatusUpdate(responseId, newStatus) {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to ${newStatus.toLowerCase()} this response?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                updateResponseStatus(responseId, newStatus);
                Swal.fire(`${newStatus}!`, `The response has been ${newStatus.toLowerCase()}.`, "success");
            }
        });
    }

    function updateResponseStatus(responseId, newStatus) {
        fetch(`${API_BASE_URL}/api/responses/${responseId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to update status");
                }
                return response.json();
            })
            .then(() => {
                let total = parseInt(totalResponses.textContent.split(": ")[1]);
                let approved = parseInt(approvedResponses.textContent.split(": ")[1]);
                let rejected = parseInt(rejectedResponses.textContent.split(": ")[1]);

                totalResponses.textContent = `Total Responses: ${total}`;
                if (newStatus === "Approved") {
                    approved++;
                    approvedResponses.textContent = `Approved: ${approved}`;
                } else if (newStatus === "Rejected") {
                    rejected++;
                    rejectedResponses.textContent = `Rejected: ${rejected}`;
                }

                document.querySelector(`td:contains("${responseId}")`).nextElementSibling.textContent = newStatus;
            })
            .catch(error => console.error("Error updating response status:", error));
    }

    return container;
}

export default renderViewResponses;
