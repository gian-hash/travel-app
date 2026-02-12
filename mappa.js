// ===============================
//  INIZIALIZZAZIONE MAPPA
// ===============================
var map = L.map('map').setView([48.5, 9], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// ===============================
//  VARIABILI GLOBALI
// ===============================
let startPoint = null;
let endPoint = null;
let startMarker = null;
let endMarker = null;
let routeLine = null;

// ===============================
//  GEOCODIFICA (RICERCA CITTA')
// ===============================
async function geocodeCity(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    const response = await fetch(url);
    const results = await response.json();

    if (results.length === 0) return null;

    return {
        lat: parseFloat(results[0].lat),
        lon: parseFloat(results[0].lon),
        name: results[0].display_name
    };
}

// ===============================
//  ANIMAZIONE DELLA ROTTA
// ===============================
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

// ===============================
//  CALCOLO ROTTA (PARTENZA + DESTINAZIONE)
// ===============================
document.getElementById("routeBtn").addEventListener("click", async () => {
    const startQuery = document.getElementById("startInput").value;
    const endQuery = document.getElementById("endInput").value;

    if (!startQuery || !endQuery) {
        alert("Inserisci sia la partenza che la destinazione");
        return;
    }

    // Geocodifica
    startPoint = await geocodeCity(startQuery);
    endPoint = await geocodeCity(endQuery);

    if (!startPoint || !endPoint) {
        alert("Località non trovata");
        return;
    }

    // Rimuovi marker e rotta precedenti
    if (startMarker) map.removeLayer(startMarker);
    if (endMarker) map.removeLayer(endMarker);
    if (routeLine) map.removeLayer(routeLine);

    // Marker partenza
    startMarker = L.marker([startPoint.lat, startPoint.lon])
        .addTo(map)
        .bindPopup("Partenza: " + startPoint.name)
        .openPopup();

    // Marker destinazione
    endMarker = L.marker([endPoint.lat, endPoint.lon])
        .addTo(map)
        .bindPopup("Destinazione: " + endPoint.name);

    // Centra la mappa su entrambi i punti
    map.fitBounds([
        [startPoint.lat, startPoint.lon],
        [endPoint.lat, endPoint.lon]
    ]);

    // Disegna rotta (linea retta)
    const coords = [
        [startPoint.lat, startPoint.lon],
        [endPoint.lat, endPoint.lon]
    ];

    routeLine = animateRoute(coords);
});
