const destinazioni = {
    london: {
        img: "img/london.png",
        title: "London",
        text: "Londra"
    }
};

function openModal(key) {
    const data = destinazioni[key];
    document.getElementById("modal-img").src = data.img;
    document.getElementById("modal-title").textContent = data.title;
    document.getElementById("modal-text").textContent = data.text;

    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Chiudi cliccando fuori dal modal
window.onclick = function(e) {
    if (e.target.id === "modal") closeModal();
};
