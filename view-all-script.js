// Function to set the current year in the footer
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
}

// Fetch and display all cars
async function loadAllCars() {
    try {
        const response = await fetch('cars.json');
        const cars = await response.json();

        displayAllCars(cars);
    } catch (error) {
        console.error('Error loading all cars:', error);
        document.getElementById('allListings').innerHTML = '<p>Error loading cars.</p>';
    }
}

// Function to display all cars in the grid
function displayAllCars(cars) {
    const listingsContainer = document.getElementById('allListings');
    listingsContainer.innerHTML = '';

    cars.forEach(car => {
        const listingDiv = document.createElement('div');
        listingDiv.className = 'listing';
        listingDiv.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h3>${car.name}</h3>
            <p>${car.description}</p>
            <p>Price: ${car.price}</p>
            <p>Fuel: ${car.fuel} | Transmission: ${car.transmission}</p>
            <p>Mileage: ${car.mileage} | Year: ${car.year}</p>
            <button onclick="viewDetails(${car.id})">View Details</button>
        `;
        listingsContainer.appendChild(listingDiv);
    });
}

// Function to handle "View Details" click
function viewDetails(carId) {
    window.location.href = `car-details.html?id=${carId}`;
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

// Load all cars and set the current year when the page loads
window.onload = function() {
    loadAllCars();
    setCurrentYear();
};