function login() {
    const pwd = document.getElementById("pwd").value;

    if (pwd === "viaggio2025") {
        document.body.classList.add("fade-out");
        setTimeout(() => {
            window.location.href = "home.html";
        }, 650);
    } else {
        document.getElementById("error").textContent = "Password errata";
    }
}
