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
    const marker = L.marker(p.coords).addTo(map);

    marker._icon.classList.add("marker-bounce");

    marker.bindPopup(`<b>${p.name}</b><br>${p.desc}`);
});
function animateRoute(coords) {
    let index = 0;
    const route = L.polyline([], { color: "#00d4ff", weight: 4 }).addTo(map);

    const interval = setInterval(() => {
        route.addLatLng(coords[index]);
        index++;

        if (index >= coords.length) clearInterval(interval);
    }, 120);
}
animateRoute([ [48.8566, 2.3522], // Parigi 
                [40.7128, -74.0060] // New York 
            ]);
function addRadar(lat, lng) {
    const div = L.divIcon({ className: "radar" });
    L.marker([lat, lng], { icon: div }).addTo(map);
}

addRadar(48.8566, 2.3522); // Parigi
function flyMarker(start, end, duration = 4000) {
    const marker = L.marker(start).addTo(map);

    const latDiff = end[0] - start[0];
    const lngDiff = end[1] - start[1];

    let startTime = null;

    function animate(t) {
        if (!startTime) startTime = t;
        const progress = Math.min((t - startTime) / duration, 1);

        const lat = start[0] + latDiff * progress;
        const lng = start[1] + lngDiff * progress;

        marker.setLatLng([lat, lng]);

        if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
flyMarker([48.8566, 2.3522], [40.7128, -74.0060]); // Parigi → New York
