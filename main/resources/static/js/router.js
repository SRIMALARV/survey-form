import renderApp from "./main.js";
import roleManager from "./subscribe-role.js";

const routes = {
    "/login": () => import("./login.js"),
    "/view-forms": () => import("./admin-control/view-forms.js"),
    "/create-form": () => import("./create-form/form-builder.js"),
    "/user": () => import("./user/forms.js"),
    "/view-responses": () => import("./admin-control/view-responses.js"),
    "/responses": () => import("./admin-control/responses.js"),
    "/form": () => import("./user/form-handler/form-creation.js"),
};

const router = () => {
    const path = window.location.hash.slice(1) || "/login";
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = "";

    if (!roleManager.getRole() && path !== "/login") {
        window.location.hash = "/login";
        return;
    }

    if (routes[path]) {
        if (typeof routes[path] === "function") {
            routes[path]()
                .then(module => {
                    const content = module.default();
                    app.appendChild(content);
                })
                .catch(() => {
                    app.innerHTML = "<h1>404 - Page Not Found</h1>";
                });
        } else {
            app.appendChild(routes[path]());
        }
        return;
    }

    const basePath = Object.keys(routes).find(route => path.startsWith(route));

    if (basePath) {
        if (typeof routes[basePath] === "function") {
            const id = path.replace(basePath, "").replace("/", "") || null;
            routes[basePath]()
                .then(module => {
                    const content = module.default(id);
                    app.appendChild(content);
                })
                .catch(() => {
                    app.innerHTML = "<h1>404 - Page Not Found</h1>";
                });
        } else {
            app.appendChild(routes[basePath]());
        }
    } else {
        app.innerHTML = "<h1>404 - Page Not Found</h1>";
    }
};

export const navigate = (url) => {
    window.location.hash = url;
};

window.addEventListener("hashchange", () => {
    renderApp();
    router();
});

window.addEventListener("DOMContentLoaded", () => {
    if (!roleManager.getRole()) {
        window.location.hash = "/login";
    } else {
        renderApp();
        router();
    }
});