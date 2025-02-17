import roleManager from "./subscribe-role.js";
import users from "./config-data/user-config.js";
import { renderJSON } from "./render.js";

export default function () {
    const loginFormJSON = {
        children: [
            {
                tag: "div",
                attributes: { class: "login-container" },
                children: [
                    { tag: "h2", text: "Login" },
                    { 
                        tag: "input", 
                        attributes: { type: "text", id: "username", placeholder: "Username" } 
                    },
                    { 
                        tag: "input", 
                        attributes: { type: "password", id: "password", placeholder: "Password" } 
                    },
                    { 
                        tag: "button", 
                        attributes: { id: "loginBtn" }, 
                        text: "Login" 
                    },
                    { 
                        tag: "p", 
                        attributes: { id: "error-msg", style: "color: red; display: none;" }, 
                        text: "Invalid credentials!" 
                    }
                ]
            }
        ]
    };

    document.body.innerHTML = ""; 
    renderJSON(loginFormJSON, document.body);

    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("error-msg");

    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            roleManager.setRole(user.role);
            window.location.hash = user.role === "admin" ? "/view-forms" : "/user";
        } else {
            errorMsg.style.display = "block";
        }
    });
}
