// Galleria dinamica
const immagini = [
    "img/parigi.jpg",
    "img/tokyo.jpg"
];

const gallery = document.getElementById("gallery");
if (gallery) {
    immagini.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.className = "gallery-img";
        gallery.appendChild(img);
    });
}

immagini.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.style.width = "100%";
    img.style.borderRadius = "10px";
    gallery.appendChild(img);
});

// Diario salvato in localStorage
function salvaDiario() {
    const testo = document.getElementById('diarioInput').value;
    localStorage.setItem('diarioViaggio', testo);
    alert("Diario salvato!");
}

window.onload = () => {
    const salvato = localStorage.getItem('diarioViaggio');
    if (salvato) document.getElementById('diarioInput').value = salvato;
};
const destinazioni = {
    parigi: {
        img: "img/parigi.jpg",
        title: "Parigi",
        text: "Parigi è la città dell’amore, dell’arte e della luce. Perfetta per passeggiate romantiche, musei e cibo incredibile."
    },
    tokyo: {
        img: "img/tokyo.jpg",
        title: "Tokyo",
        text: "Tokyo è un mix unico di tradizione e modernità. Templi antichi, grattacieli futuristici e cibo straordinario."
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
