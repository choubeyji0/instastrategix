// navbar.js

document.addEventListener("DOMContentLoaded", () => {
    const navContainer = document.querySelector(".dynamic-nav");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!navContainer) return;

    if (user) {
        navContainer.innerHTML = `
            <a href="dashboard.html">Dashboard</a>
            <a href="payment.html">Payment</a>
            <a href="#" id="logoutBtn">Logout</a>
        `;

        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });

    } else {
        navContainer.innerHTML = `
            <a href="login.html">Login</a>
            <a href="payment.html">Payment</a>
        `;
    }
});
