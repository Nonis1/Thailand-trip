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
        { name: "Pai", latlng: [19.3582, 98.4404], photoLink: "#" },
        { name: "Krabi", latlng: [8.0863, 98.9063], photoLink: "#" },
        { name: "Phuket", latlng: [7.8804, 98.3923], photoLink: "#" },
        { name: "Khao Sok", latlng: [8.9137, 98.5292], photoLink: "#" },
        { name: "Koh Phangan", latlng: [9.7348, 100.0208], photoLink: "#" }
    ];

    // Add markers to the map
    locations.forEach(function(loc) {
        L.marker(loc.latlng).addTo(map)
            .bindTooltip(loc.name, {permanent: true, direction: 'top'})
            .bindPopup('<a href="' + loc.photoLink + '" target="_blank">' + loc.name + '</a>')
            .openTooltip();
    });

    window.closePhotoLink = function() {
        document.getElementById('photo-link').style.display = 'none';
    };
});
