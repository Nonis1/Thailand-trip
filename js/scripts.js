document.addEventListener("DOMContentLoaded", function() {
    // Load header and footer
    document.getElementById('header').innerHTML = `
        <div class="hamburger-menu" onclick="toggleMenu()">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="menu" id="menu">
            <a href="index.html">Home</a>
            <a href="about.html">מי אנחנו</a>
            <a href="our-trip.html">רקע על הטיול שלנו</a>
            <a href="visited-places.html">המקומות שביקרנו</a>
        </div>
    `;
    document.getElementById('footer').innerHTML = `
        <footer>
            <p>&copy; 2024 Snapir & Ptaya</p>
        </footer>
    `;

    // Toggle menu
    window.toggleMenu = function() {
        var menu = document.getElementById('menu');
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    };

    // Slideshow functionality
    var slideIndex = 0;
    showSlides();

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("slides");
        var dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }

    window.currentSlide = function(n) {
        slideIndex = n;
        showSlides();
    };

    // Initialize the map centered on Thailand
    var map = L.map('map').setView([15.8700, 100.9925], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Specified points of interest in Thailand with Google Photos links
    var locations = [
        { name: "Bangkok", latlng: [13.7563, 100.5018], photoLink: "https://photos.app.goo.gl/pQNBQ9dDv7sFL7kp6" },
        { name: "Chiang Mai", latlng: [18.7883, 98.9853], photoLink: "https://photos.app.goo.gl/hJWk9JG7STZ5hMoj9" },
        { name: "Pai", latlng: [19.3582, 98.4404], photoLink: "https://photos.app.goo.gl/4cAgHUNqfJcLtZin9" },
        { name: "Krabi", latlng: [8.0863, 98.9063], photoLink: "https://photos.app.goo.gl/yEX6ujG5R7EftJFv7" },
        { name: "Phuket", latlng: [7.8804, 98.3923], photoLink: "#" },
        { name: "Khao Sok", latlng: [8.9137, 98.5292], photoLink: "https://photos.app.goo.gl/g9PB9N3oudswfBQA8" },
        { name: "Koh Phangan", latlng: [9.7348, 100.0208], photoLink: "https://photos.app.goo.gl/imnJoEDKKbvvvrMZ9" }
    ];

    // Create a LatLng bounds object
    var bounds = new L.LatLngBounds(locations.map(loc => loc.latlng));

    // Add markers to the map
    locations.forEach(function(loc) {
        L.marker(loc.latlng).addTo(map)
            .bindTooltip(loc.name, {permanent: true, direction: 'top'})
            .bindPopup('<a href="' + loc.photoLink + '" target="_blank">' + loc.name + '</a>')
            .openTooltip();
    });

    // Fit the map to the bounds
    map.fitBounds(bounds);

        // Define the flight route from Bangkok to Chiang Mai
    var flightRoute = [
        [13.7563, 100.5018], // Bangkok
        [18.7883, 98.9853]   // Chiang Mai
    ];

    // Define the driving route from Chiang Mai to Pai
    var drivingRoute = [
        [18.7883, 98.9853], // Chiang Mai
        [19.3582, 98.4404]  // Pai
    ];

    // Add flight route to the map
    var flightPolyline = L.polyline(flightRoute, { color: 'blue', dashArray: '5, 10' }).addTo(map);

    // Add driving route to the map
    var drivingPolyline = L.polyline(drivingRoute, { color: 'green' }).addTo(map);

    // Hide the polylines initially
    flightPolyline.setStyle({ opacity: 0 });
    drivingPolyline.setStyle({ opacity: 0 });

    // Define the trip data
    var trips = {
        "2/7/24": { type: "flight", polyline: flightPolyline, message: "Flight from Bangkok to Chiang Mai (2/7/24)" },
        "5/7/24": { type: "drive", polyline: drivingPolyline, message: "Drive from Chiang Mai to Pai (5/7/24)" }
    };

    // Generate the calendar
    var calendarHtml = "<h2>Trip Calendar</h2><ul>";
    for (var date in trips) {
        calendarHtml += `<li class="calendar-day" data-date="${date}">${date}</li>`;
    }
    calendarHtml += "</ul>";
    document.getElementById('calendar').innerHTML = calendarHtml;

    // Add click event listener to calendar days
    document.querySelectorAll('.calendar-day').forEach(function(day) {
        day.addEventListener('click', function() {
            var date = this.getAttribute('data-date');
            var trip = trips[date];

            // Hide all polylines
            flightPolyline.setStyle({ opacity: 0 });
            drivingPolyline.setStyle({ opacity: 0 });

            // Show the selected polyline
            trip.polyline.setStyle({ opacity: 1 });

            // Display the trip message
            alert(trip.message);
        });
    });

    window.closePhotoLink = function() {
        document.getElementById('photo-link').style.display = 'none';
    };
});
