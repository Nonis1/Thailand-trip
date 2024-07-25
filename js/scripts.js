body {
    background-color: #f0f8ff;
    font-family: Arial, sans-serif;
}
h1 {
    font-family: 'Pacifico', cursive;
    color: #2c3e50;
    text-align: center;
}
.map-container {
    width: 50%; /* Thinner width */
    height: 80vh; /* Taller height */
    margin: 0 auto; /* Center the container */
}
#map {
    height: 100%; /* Full height within the container */
    width: 100%; /* Full width within the container */
}
.hamburger-menu {
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
    z-index: 1001;
}
.hamburger-menu div {
    width: 30px;
    height: 3px;
    background-color: #333;
    margin: 5px 0;
}
.menu {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100%;
    background-color: #fff;
    box-shadow: 2px 0 5px rgba(0,0,0,0.5);
    z-index: 1000;
    padding-top: 60px;
}
.menu a {
    display: block;
    padding: 10px 15px;
    text-decoration: none;
    color: #333;
}
.menu a:hover {
    background-color: #f1f1f1;
}
/* Slideshow styles */
.slideshow-container {
    max-width: 1000px;
    position: relative;
    margin: auto;
    text-align: center;
}
.slides img {
    width: 3cm;
    height: 3cm;
    border-radius: 50%;
    object-fit: cover;
}
.fade {
    animation-name: fade;
    animation-duration: 2s;
}
@keyframes fade {
    from {opacity: 0.4}
    to {opacity: 1}
}
.dot {
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
}
.active, .dot:hover {
    background-color: #717171;
}
/* Footer styles */
footer {
    text-align: center;
    padding: 10px;
    background-color: #2c3e50;
    color: white;
}
