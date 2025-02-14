function renderViewResponses(formId) {
    if (!formId) {
        console.error("Form ID is missing");
        return document.createTextNode("Error: Form ID is missing");
    }

    const container = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = "Form Responses";
    container.appendChild(title);

    const backButton = document.createElement("button");
    backButton.textContent = "Back to Forms";
    backButton.classList.add("back-btn");
    backButton.addEventListener("click", () => window.history.back());
    container.appendChild(backButton);

    const table = document.createElement("table");
    container.appendChild(table);

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Response ID", "User ID", "View", "Status", "Actions"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    tbody.id = "responses-table-body";
    table.appendChild(tbody);

    fetch(`http://localhost:8080/api/responses/${formId}`)
        .then(response => response.json())
        .then(responses => {
            tbody.innerHTML = "";
            responses.forEach(response => {
                const row = document.createElement("tr");

                const responseIdCell = document.createElement("td");
                responseIdCell.textContent = response.id;
                row.appendChild(responseIdCell);

                const userIdCell = document.createElement("td");
                userIdCell.textContent = response.userId;
                row.appendChild(userIdCell);

                const viewCell = document.createElement("td");
                const viewButton = document.createElement("button");
                viewButton.textContent = "View";
                viewButton.classList.add("view-btn");
                viewButton.addEventListener("click", () => {
                    navigate(`responses/${response.id}`);
                });
                viewCell.appendChild(viewButton);
                row.appendChild(viewCell);

                const statusCell = document.createElement("td");
                statusCell.textContent = response.status || "Pending";
                row.appendChild(statusCell);

                const actionsCell = document.createElement("td");

                const approveButton = document.createElement("button");
                approveButton.textContent = "Approve";
                approveButton.classList.add("approve-btn");
                approveButton.addEventListener("click", () => handleStatusUpdate(response.id, "Approved"));
                actionsCell.appendChild(approveButton);

                const rejectButton = document.createElement("button");
                rejectButton.textContent = "Reject";
                rejectButton.classList.add("reject-btn");
                rejectButton.addEventListener("click", () => handleStatusUpdate(response.id, "Rejected"));
                actionsCell.appendChild(rejectButton);

                row.appendChild(actionsCell);
                tbody.appendChild(row);
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
        console.log(`Updating responseId ${responseId} to ${newStatus}`);

        fetch(`http://localhost:8080/api/responses/${responseId}`, {
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
                alert(`Response ID: ${responseId} has been marked as ${newStatus}.`);
                location.reload();
            })
            .catch(error => console.error("Error updating response status:", error));
    }

    return container;
}
export default renderViewResponses;