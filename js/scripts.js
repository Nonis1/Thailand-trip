document.addEventListener("DOMContentLoaded", function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    // Slideshow functionality
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        const slides = document.getElementsByClassName("slides");
        const dots = document.getElementsByClassName("dot");
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }

    // Map functionality
    const map = L.map('map').setView([15.8700, 100.9925], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const locations = [
        { name: "Bangkok", latlng: [13.7563, 100.5018], photoLink: "https://photos.app.goo.gl/pQNBQ9dDv7sFL7kp6" },
        { name: "Chiang Mai", latlng: [18.7883, 98.9853], photoLink: "https://photos.app.goo.gl/hJWk9JG7STZ5hMoj9" },
        { name: "Pai", latlng: [19.3582, 98.4404], photoLink: "https://photos.app.goo.gl/4cAgHUNqfJcLtZin9" },
        { name: "Krabi", latlng: [8.0863, 98.9063], photoLink: "https://photos.app.goo.gl/yEX6ujG5R7EftJFv7" },
        { name: "Phuket", latlng: [7.8804, 98.3923], photoLink: "#" },
        { name: "Khao Sok", latlng: [8.9137, 98.5292], photoLink: "https://photos.app.goo.gl/g9PB9N3oudswfBQA8" },
        { name: "Koh Phangan", latlng: [9.7348, 100.0208], photoLink: "https://photos.app.goo.gl/imnJoEDKKbvvvrMZ9" }
    ];

    const bounds = new L.LatLngBounds(locations.map(loc => loc.latlng));

    locations.forEach(function(loc) {
        L.marker(loc.latlng).addTo(map)
            .bindTooltip(loc.name, {permanent: true, direction: 'top'})
            .bindPopup(`<a href="${loc.photoLink}" target="_blank">${loc.name}</a>`)
            .openTooltip();
    });

    map.fitBounds(bounds);

    // Route functionality
    const flightRoute = L.polyline([
        [13.7563, 100.5018], // Bangkok
        [18.7883, 98.9853]   // Chiang Mai
    ], { color: 'blue', dashArray: '5, 10', opacity: 0 }).addTo(map);

    const drivingRoute = L.polyline([
        [18.7883, 98.9853], // Chiang Mai
        [19.3582, 98.4404]  // Pai
    ], { color: 'green', opacity: 0 }).addTo(map);

    // Trip data
    const trips = {
        "2/7/24": { type: "flight", polyline: flightRoute, message: "Flight from Bangkok to Chiang Mai" },
        "5/7/24": { type: "drive", polyline: drivingRoute, message: "Drive from Chiang Mai to Pai" }
    };

    // Calendar functionality
    const calendar = document.getElementById('calendar');
    let calendarHtml = "<h2>Trip Calendar</h2><ul>";
    
    for (let date in trips) {
        calendarHtml += `<li class="calendar-day" data-date="${date}">${date}</li>`;
    }
    
    calendarHtml += "</ul>";
    calendar.innerHTML = calendarHtml;

    document.querySelectorAll('.calendar-day').forEach(function(day) {
        day.addEventListener('click', function() {
            const date = this.getAttribute('data-date');
            const trip = trips[date];

            // Reset all routes
            flightRoute.setStyle({ opacity: 0 });
            drivingRoute.setStyle({ opacity: 0 });

            // Show selected route
            trip.polyline.setStyle({ opacity: 1 });

            // Update active state
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
            this.classList.add('active');

            // Show trip info
            alert(trip.message);
        });
    });

    // Weather widget (example - you'd need to replace with actual API call)
    function updateWeather() {
        const weatherWidget = document.createElement('div');
        weatherWidget.id = 'weather-widget';
        weatherWidget.innerHTML = `
            <h3>Current Weather in Bangkok</h3>
            <p>Temperature: 32°C</p>
            <p>Condition: Partly Cloudy</p>
        `;
        document.querySelector('.calendar-container').appendChild(weatherWidget);
    }

    updateWeather();
});
