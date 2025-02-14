
const mainContainer = document.createElement("div");
mainContainer.id = "app";
mainContainer.innerHTML = `
    <h1>Welcome</h1>
    <button id="admin-btn">Go to Admin Role</button>
    <button id="user-btn">Go to User Role</button>
`;

document.body.innerHTML = "";
document.body.appendChild(mainContainer);

document.getElementById("admin-btn").addEventListener("click", () => navigate("/admin-role"));
document.getElementById("user-btn").addEventListener("click", () => navigate("/user-role"));
