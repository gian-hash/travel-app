function login() {
    const pwd = document.getElementById("pwd").value;
    if (pwd === "viaggio2025") {
        window.location.href = "home.html";
    } else {
        document.getElementById("error").textContent = "Password errata";
    }
}
