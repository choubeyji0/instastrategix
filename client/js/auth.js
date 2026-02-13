document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;

    const user = {
        email: email,
        name: email.split("@")[0]
    };

    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "dashboard.html";
});
