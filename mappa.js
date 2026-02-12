// Inizializza la mappa
var map = L.map('map').setView([48.5, 9], 4);

// Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Variabili per la selezione dinamica
let startPoint = null;
let endPoint = null;
let startMarker = null;
let endMarker = null;
let routeLine = null;

// Funzione per disegnare la rotta animata
function animateRoute(coords) {
    let index = 0;
    const route = L.polyline([], { color: "#00d4ff", weight: 4 }).addTo(map);

    const interval = setInterval(() => {
        route.addLatLng(coords[index]);
        index++;

        if (index >= coords.length) clearInterval(interval);
    }, 80);

    return route;
}

// Quando clicchi sulla mappa
map.on("click", function (e) {

    // Se non c'è ancora la partenza → imposta start
    if (!startPoint) {
        startPoint = e.latlng;

        if (startMarker) map.removeLayer(startMarker);

        startMarker = L.marker(startPoint).addTo(map)
            .bindPopup("Partenza").openPopup();

        return;
    }

    // Se c'è la partenza ma non la destinazione → imposta end
    if (!endPoint) {
        endPoint = e.latlng;

        if (endMarker) map.removeLayer(endMarker);

        endMarker = L.marker(endPoint).addTo(map)
            .bindPopup("Destinazione").openPopup();

        // Calcola la rotta (linea retta per ora)
        const coords = [
            [startPoint.lat, startPoint.lng],
            [endPoint.lat, endPoint.lng]
        ];

        // Disegna la rotta animata
        if (routeLine) map.removeLayer(routeLine);
        routeLine = animateRoute(coords);

        return;
    }

    // Se clicchi una terza volta → reset
    startPoint = null;
    endPoint = null;

    if (startMarker) map.removeLayer(startMarker);
    if (endMarker) map.removeLayer(endMarker);
    if (routeLine) map.removeLayer(routeLine);

    startMarker = null;
    endMarker = null;
    routeLine = null;
});
// Funzione per cercare una città
async function searchCity(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    const response = await fetch(url);
    const results = await response.json();

    if (results.length === 0) {
        alert("Nessun risultato trovato");
        return;
    }

    const place = results[0];
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);

    // Sposta la mappa
    map.setView([lat, lon], 10);

    // Aggiungi marker
    if (window.searchMarker) map.removeLayer(window.searchMarker);

    window.searchMarker = L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`<b>${place.display_name}</b>`)
        .openPopup();
}

// Eventi ricerca
document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value;
    if (query.trim() !== "") searchCity(query);
});

document.getElementById("searchInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = document.getElementById("searchInput").value;
        if (query.trim() !== "") searchCity(query);
    }
});
