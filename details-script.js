// Function to set the current year in the footer
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
}

// Function to get query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fetch and display car details
async function loadCarDetails() {
    const carId = getQueryParam('id');
    if (!carId) {
        document.getElementById('carDetails').innerHTML = '<p>Car not found.</p>';
        return;
    }

    try {
        const response = await fetch('cars.json');
        const cars = await response.json();
        const car = cars.find(c => c.id === parseInt(carId));

        if (car) {
            document.getElementById('carDetails').innerHTML = `
                <div class="details-image">
                    <img src="${car.image}" alt="${car.name}">
                </div>
                <div class="details-properties">
                    <h2>${car.name}</h2>
                    <p>${car.description}</p>
                    <div class="property-item"><span>Price:</span> ${car.price}</div>
                    <div class="property-item"><span>Fuel:</span> ${car.fuel}</div>
                    <div class="property-item"><span>Transmission:</span> ${car.transmission}</div>
                    <div class="property-item"><span>Mileage:</span> ${car.mileage}</div>
                    <div class="property-item"><span>Year:</span> ${car.year}</div>
                    <a href="#contact" class="cta-button">Contact for Purchase</a>
                    <a href="index.html" class="cta-button">back</a>
                </div>
            `;
        } else {
            document.getElementById('carDetails').innerHTML = '<p>Car not found.</p>';
        }
    } catch (error) {
        console.error('Error loading car details:', error);
        document.getElementById('carDetails').innerHTML = '<p>Error loading car details.</p>';
    }
}

// Toggle sidebar and overlay
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const sidebarClose = document.querySelector('.sidebar-close');
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

hamburger.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Close sidebar when clicking outside
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Close menu when clicking a nav link on mobile
document.querySelectorAll('.sidebar ul a').forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});

// Optional: Add newsletter form submission handler
document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = this.querySelector('input').value;
    alert(`Thank you for subscribing with ${email}! (This is a demo alert)`);
    this.reset(); // Clear the form
});

// Load car details and set the current year when the page loads
window.onload = function() {
    loadCarDetails();
    setCurrentYear();
};