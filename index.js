class TravelItinerary {
    constructor(destination, startDate, endDate) {
        this.destination = destination;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.activities = [];
    }
    exportAsHTML() {
        const itinerary = this.getItinerary();
        let html = `<h1>🌍 ${itinerary.destination}</h1><p>📅 ${itinerary.duration}</p><ul>`;
        itinerary.activities.forEach(a => {
            html += `<li>Giorno ${a.day} - ${a.time}: ${a.activity}</li>`;
        });
        html += '</ul>';
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    }
    addActivity(day, activity, time) {
        this.activities.push({
            day,
            activity,
            time,
            id: Date.now()
        });
        return this;
    }

    removeActivity(id) {
        this.activities = this.activities.filter(a => a.id !== id);
        return this;
    }

    getItinerary() {
        return {
            destination: this.destination,
            duration: `${this.startDate.toLocaleDateString()} - ${this.endDate.toLocaleDateString()}`,
            activities: this.activities.sort((a, b) => a.day - b.day)
        };
    }

    displayItinerary() {
        console.log(`\n🌍 Itinerario: ${this.destination}`);
        console.log(`📅 ${this.getItinerary().duration}\n`);
        this.activities.forEach(a => {
            console.log(`  Giorno ${a.day} - ${a.time}: ${a.activity}`);
        });
    }
}

// Utilizzo
const myTrip = new TravelItinerary('Roma', '2024-06-01', '2024-06-05');
myTrip
    .addActivity(1, 'Visita Colosseo', '09:00')
    .addActivity(2, 'Musei Vaticani', '10:00')
    .addActivity(3, 'Fontana di Trevi', '14:00');

myTrip.displayItinerary();