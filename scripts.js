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
});
