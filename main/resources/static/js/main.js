import roleManager from "./subscribe-role.js";

const appStructure = {
    adminNav: [
        { text: "View Forms", href: "#/view-forms" },
        { text: "Create Form", href: "#/create-form" }
    ],
    userNav: [
        { text: "Available Forms", href: "#/user" }
    ],
    mainContainer: { id: "app" }
};

const renderApp = () => {
    const root = document.body;
    root.innerHTML = "";

    const nav = document.createElement("nav");
    const title = document.createElement("h2");

    const navLinks = document.createElement("div");
    navLinks.classList.add("nav-links");

    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.addEventListener("click", () => {
        roleManager.clearRole();
        window.location.hash = "/login";
        renderApp(); 
    });

    const handleNavigation = (event) => {
        if (event.target.matches("[data-link]")) {
            event.preventDefault();
            window.location.hash = event.target.getAttribute("href");
        }
    };

    const updateNavbar = (role) => {
        nav.innerHTML = "";
        navLinks.innerHTML = "";

        title.textContent = role === "admin" ? "Admin Dashboard" : "User Dashboard";
        const currentNav = role === "admin" ? appStructure.adminNav : appStructure.userNav;

        currentNav.forEach(link => {
            const anchor = document.createElement("a");
            anchor.textContent = link.text;
            anchor.href = link.href;  
            anchor.setAttribute("data-link", "true");
            navLinks.appendChild(anchor);
        });

        nav.appendChild(title);
        nav.appendChild(navLinks);
        nav.appendChild(logoutBtn);
    };

    updateNavbar(roleManager.getRole());

    roleManager.subscribe(updateNavbar);

    const mainContainer = document.createElement("div");
    mainContainer.id = appStructure.mainContainer.id;

    root.appendChild(nav);
    root.appendChild(mainContainer);

    document.addEventListener("click", handleNavigation);
};

export default renderApp;
