const appStructure = {
    adminNav: [
        { text: "View Forms", href: "/view-forms" },
        { text: "Create Form", href: "/create-form" }
    ],
    userNav: [
        { text: "Available Forms", href: "/user" }
    ],
    mainContainer: { id: "app" }
};

let isAdmin = history.state?.isAdmin ?? true;

const routes = {
    "/view-forms": () => import("./view-forms.js"),
    "/create-form": () => import("./create-form/form-builder.js"),
    "/user": () => import("./user/forms.js"),
    "/view-responses": () => import("./view-responses.js"),
    "/responses": () => import("./responses.js"),
    "/form": () => import("./user/form-handler/form-creation.js"),
};

const createElement = (tag, attributes = {}, text = "") => {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr]);
    });
    if (text) element.textContent = text;
    return element;
};

const renderApp = () => {
    const root = document.body;
    root.innerHTML = "";

    const nav = createElement("nav");
    const title = createElement("h2", {}, isAdmin ? "Admin Dashboard" : "User Dashboard");

    const navLinks = createElement("div", { class: "nav-links" });

    const currentNav = isAdmin ? appStructure.adminNav : appStructure.userNav;
    currentNav.forEach(link => {
        const anchor = createElement("a", { href: link.href, "data-link": "true" }, link.text);
        navLinks.appendChild(anchor);
    });

    const switchUserBtn = createElement(
        "button",
        { class: "switch-user", "data-link": "true" },
        isAdmin ? "Switch to User" : "Switch to Admin"
    );

    nav.appendChild(title);
    nav.appendChild(navLinks);
    nav.appendChild(switchUserBtn);

    const mainContainer = createElement("div", { id: appStructure.mainContainer.id });

    root.appendChild(nav);
    root.appendChild(mainContainer);
};

const switchUser = () => {
    isAdmin = !isAdmin;
    history.replaceState({ isAdmin }, "");
    renderApp();
    navigate(isAdmin ? "/view-forms" : "/user");
};

const router = () => {
    let path = window.location.hash.slice(1);

    if (!path || path === "/") {
        navigate(isAdmin ? "/view-forms" : "/user");
        return;
    }

    const [basePath, id] = path.split("/").filter(Boolean);

    const app = document.getElementById("app");
    app.innerHTML = "";

    if (routes[`/${basePath}`]) {
        routes[`/${basePath}`]()
            .then(module => {
                const content = module.default(id);
                app.appendChild(content);
            })
            .catch(error => {
                showNotFound(app);
            });
    } else {
        showNotFound(app);
    }
};

const showNotFound = (app) => {
    app.innerHTML = "<h1>404 - Page Not Found</h1><p>Please go back to Home</p>";
};

const navigate = (url) => {
    window.location.hash = url;
};

document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        const route = e.target.getAttribute("href");

        if (e.target.classList.contains("switch-user")) {
            switchUser();
        } else if (route) {
            navigate(route);
        }
    }
});

window.addEventListener("DOMContentLoaded", () => {
    if (!window.location.hash || window.location.hash === "#/") {
        navigate(isAdmin ? "/view-forms" : "/user");
    }
    router();
});

window.addEventListener("hashchange", router);

renderApp();
