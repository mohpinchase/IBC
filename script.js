// script.js

let listings = [];

// Function to set the current year in the footer
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
}

// Fetch and display car listings in a grid
async function loadCars() {
    try {
        const response = await fetch('cars.json');
        listings = await response.json();

        displayCars(listings);
    } catch (error) {
        console.error('Error loading cars:', error);
    }
}

// Function to display cars in the grid
function displayCars(cars) {
    const listingsContainer = document.getElementById('featuredListings');
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

// Filter cars based on search inputs
async function filterCars() {
    try {
        const response = await fetch('cars.json');
        const cars = await response.json();
        const makeFilter = document.getElementById('makeFilter').value.toLowerCase();
        const modelFilter = document.getElementById('modelFilter').value.toLowerCase();
        const yearFilter = document.getElementById('yearFilter').value;
        const priceFilter = document.getElementById('priceFilter').value;

        const filteredCars = cars.filter(car => {
            const matchesMake = !makeFilter || car.name.toLowerCase().includes(makeFilter);
            const matchesModel = !modelFilter || car.name.toLowerCase().includes(modelFilter);
            const matchesYear = !yearFilter || car.year === yearFilter;
            const priceValue = parseInt(car.price.replace('$', '').replace(',', ''));
            const matchesPrice = !priceFilter || 
                (priceFilter === '0-50000' && priceValue <= 50000) ||
                (priceFilter === '50000-100000' && priceValue > 50000 && priceValue <= 100000) ||
                (priceFilter === '100000+' && priceValue > 100000);
            return matchesMake && matchesModel && matchesYear && matchesPrice;
        });

        displayCars(filteredCars);
    } catch (error) {
        console.error('Error filtering cars:', error);
    }
}

// Handle Contact Us form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && subject && message) {
        alert(`Thank you, ${name}! Your message has been sent:\nSubject: ${subject}\nMessage: ${message}\nWe will contact you at ${email}. (This is a demo alert)`);
        this.reset(); // Clear the form
    } else {
        alert('Please fill in all fields.');
    }
});

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

// Add event listener to the search button
document.querySelector('.search-bar button').addEventListener('click', filterCars);

// Optional: Add newsletter form submission handler
document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = this.querySelector('input').value;
    alert(`Thank you for subscribing with ${email}! (This is a demo alert)`);
    this.reset(); // Clear the form
});

// Load cars and set the current year when the page loads
window.onload = function() {
    loadCars();
    setCurrentYear();
};


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});