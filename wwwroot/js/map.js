var map = L.map('map').setView([41.9028, 12.4964], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
L.marker([41.9028, 12.4964]).addTo(map)
    .bindPopup('Benvenuto a Roma')
    .openPopup();
