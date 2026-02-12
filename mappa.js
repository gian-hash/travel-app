// Inizializza la mappa centrata sull'Europa
var map = L.map('map').setView([48.5, 9], 4);

// Tile layer (sfondo mappa)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Destinazioni
const places = [
    { name: "Parigi", coords: [48.8566, 2.3522], desc: "La città dell’amore." },
    { name: "Tokyo", coords: [35.6895, 139.6917], desc: "Tradizione e futuro." },
    { name: "New York", coords: [40.7128, -74.0060], desc: "La città che non dorme mai." },
    { name: "Maldive", coords: [3.2028, 73.2207], desc: "Paradiso tropicale." }
];

// Aggiungi marker
places.forEach(p => {
    L.marker(p.coords)
        .addTo(map)
        .bindPopup(`<b>${p.name}</b><br>${p.desc}`);
});
