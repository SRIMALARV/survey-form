const roleManager = (() => {
    let role = localStorage.getItem("userRole") || null;
    let subscribers = [];

    return {
        subscribe(callback) {
            subscribers.push(callback);
            callback(role);
        },
        setRole(newRole) {
            role = newRole;
            localStorage.setItem("userRole", newRole);
            subscribers.forEach(callback => callback(role));
        },
        getRole() {
            return localStorage.getItem("userRole") || role;
        },
        clearRole() {
            role = null;
            localStorage.removeItem("userRole");
            subscribers.forEach(callback => callback(role));
        }
    };
})();

export default roleManager;
