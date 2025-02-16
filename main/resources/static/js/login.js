import RoleManager from "./roleManager.js";
import users from "./user-config.js";

export default function () {
    const container = document.createElement("div");
    container.classList.add("login-container");

    const heading = document.createElement("h2");
    heading.textContent = "Login";

    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.id = "username";
    usernameInput.placeholder = "Username";

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "password";
    passwordInput.placeholder = "Password";

    const loginBtn = document.createElement("button");
    loginBtn.id = "loginBtn";
    loginBtn.textContent = "Login";

    const errorMsg = document.createElement("p");
    errorMsg.id = "error-msg";
    errorMsg.style.color = "red";
    errorMsg.style.display = "none";
    errorMsg.textContent = "Invalid credentials!";

    container.appendChild(heading);
    container.appendChild(usernameInput);
    container.appendChild(passwordInput);
    container.appendChild(loginBtn);
    container.appendChild(errorMsg);

    document.body.innerHTML = ""; // Clear previous content
    document.body.appendChild(container);

    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            RoleManager.setRole(user.role);
            window.location.hash = user.role === "admin" ? "/view-forms" : "/user";
        } else {
            errorMsg.style.display = "block";
        }
    });
}
