// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// Carousel Functionality
// ============================================
const carouselSlides = document.getElementById('carouselSlides');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const indicators = document.querySelectorAll('.indicator');

let currentSlide = 0;
let carouselInterval;

if (carouselSlides) {
    const slides = carouselSlides.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 5000);
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    if (carouselNext) {
        carouselNext.addEventListener('click', () => {
            nextSlide();
            stopCarousel();
            startCarousel();
        });
    }

    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => {
            prevSlide();
            stopCarousel();
            startCarousel();
        });
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopCarousel();
            startCarousel();
        });
    });

    // Auto-play carousel
    startCarousel();

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarousel);
        carouselContainer.addEventListener('mouseleave', startCarousel);
    }
}

// ============================================
// Movie Carousel Horizontal Scroll
// ============================================
const movieCarousels = document.querySelectorAll('.movie-carousel');

movieCarousels.forEach(carousel => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - carousel.offsetLeft;
        touchScrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - touchStartX) * 1.5;
        carousel.scrollLeft = touchScrollLeft - walk;
    });
});

// ============================================
// Booking Tabs
// ============================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(`${targetTab}Tab`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ============================================
// Date Selector
// ============================================
const dateButtons = document.querySelectorAll('.date-btn');

dateButtons.forEach(button => {
    button.addEventListener('click', () => {
        dateButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// ============================================
// Time Slot Selection
// ============================================
const timeSlots = document.querySelectorAll('.time-slot');

timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
        // Remove active class from all slots in the same theater
        const theaterCard = slot.closest('.theater-card');
        const theaterSlots = theaterCard.querySelectorAll('.time-slot');
        theaterSlots.forEach(s => s.classList.remove('active'));

        // Add active class to clicked slot
        slot.classList.add('active');

        // Optional: Redirect to booking page
        // window.location.href = 'booking.html';
    });
});

// ============================================
// Search Functionality
// ============================================
const searchToggle = document.getElementById('searchToggle');
const headerSearch = document.getElementById('headerSearch');
const searchInput = document.querySelector('.header-search-input'); // Reusing variable name
const searchBtn = document.querySelector('.header-search-btn');

if (searchToggle && headerSearch) {
    searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        headerSearch.classList.toggle('active');
        if (headerSearch.classList.contains('active')) {
            searchInput.focus();
        }
    });
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!headerSearch.contains(e.target) && !searchToggle.contains(e.target)) {
            headerSearch.classList.remove('active');
        }
    });
}// Reusing variable name

if (searchInput && searchBtn) {
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // In a real application, this would trigger a search
            console.log('Searching for:', query);
            // You could redirect to a search results page or filter movies
            alert(`Searching for: ${query}`);
        }
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// Header Scroll Effect
// ============================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ============================================
// Filter Functionality
// ============================================
const filterSelects = document.querySelectorAll('.filter-select');

filterSelects.forEach(select => {
    select.addEventListener('change', () => {
        // In a real application, this would filter the movies
        console.log('Filter changed:', select.value);
        // You could implement filtering logic here
    });
});

// ============================================
// City Selector
// ============================================
const citySelect = document.getElementById('citySelect');

if (citySelect) {
    citySelect.addEventListener('change', () => {
        // In a real application, this would update the available movies/theaters
        console.log('City changed to:', citySelect.value);
        // You could implement city-based filtering here
    });
}

// ============================================
// Movie Card Hover Effects
// ============================================
const movieCards = document.querySelectorAll('.movie-card');

movieCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// Notification Bell Animation
// ============================================
const notificationBtn = document.querySelector('.icon-btn[aria-label="Notifications"]');

if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        notificationBtn.style.animation = 'shake 0.5s';
        setTimeout(() => {
            notificationBtn.style.animation = '';
        }, 500);

        // In a real application, this would show notifications
        console.log('Notifications clicked');
    });
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
    }
`;
document.head.appendChild(style);

// ============================================
// Booking Management Functions
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize bookings display
    loadAndDisplayBookings();

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
});

async function loadAndDisplayBookings() {
    try {
        const response = await fetch('http://localhost:3000/api/bookings');
        const bookings = await response.json();
        const currentDate = new Date();

        // Separate upcoming and past bookings
        const upcomingBookings = [];
        const pastBookings = [];

        bookings.forEach(booking => {
            const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
            if (bookingDateTime > currentDate) {
                upcomingBookings.push(booking);
            } else {
                pastBookings.push(booking);
            }
        });

        // Display upcoming bookings
        displayBookings('upcomingTab', upcomingBookings, 'upcoming');

        // Display past bookings
        displayBookings('pastTab', pastBookings, 'past');
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
}

function displayBookings(tabId, bookings, type) {
    const tabContent = document.getElementById(tabId);

    if (bookings.length === 0) {
        // Show empty state
        const emptyState = type === 'upcoming' ?
            `<div class="empty-bookings">
                <div class="empty-icon">
                    <i class="fas fa-calendar-times"></i>
                </div>
                <h3>No Upcoming Bookings</h3>
                <p>You haven't booked any tickets yet. Start exploring movies and book your first show!</p>
                <a href="#movies" class="btn-primary">Browse Movies</a>
            </div>` :
            `<div class="empty-bookings">
                <div class="empty-icon">
                    <i class="fas fa-history"></i>
                </div>
                <h3>No Past Bookings</h3>
                <p>Your booking history will appear here once you watch movies.</p>
                <a href="#movies" class="btn-secondary">Browse Movies</a>
            </div>`;

        tabContent.innerHTML = emptyState;
    } else {
        // Show bookings
        const bookingsHTML = bookings.map(booking => createBookingCard(booking, type)).join('');
        tabContent.innerHTML = bookingsHTML;
    }
}

function createBookingCard(booking, type) {
    const movie = booking.movie;
    const seatsText = booking.seats.map(seat => seat.id).join(', ');
    const dateTime = `${formatDate(booking.date)} | ${booking.time}`;

    const buttonText = type === 'upcoming' ? 'View Ticket' : 'View Details';
    const buttonClass = type === 'upcoming' ? 'btn-primary' : 'btn-secondary';

    return `
        <div class="booking-card">
            <div class="booking-poster">
                <img src="${movie.thumbnail}" alt="${movie.title}">
            </div>
            <div class="booking-details">
                <h3>${movie.title}</h3>
                <p class="booking-theater"><i class="fas fa-map-marker-alt"></i> ${booking.theater.name}</p>
                <p class="booking-date"><i class="fas fa-calendar"></i> ${dateTime}</p>
                <p class="booking-seats"><i class="fas fa-chair"></i> Seats: ${seatsText}</p>
                ${booking.selectedLanguage ? `<p class="booking-language"><i class="fas fa-globe"></i> ${booking.selectedLanguage}</p>` : ''}
            </div>
            <div class="booking-actions">
                <button class="${buttonClass}" onclick="viewTicket('${movie.title}', '${booking.theater.name}', '${dateTime}', '${seatsText}', '${type}', '${booking.id}', '${booking.selectedLanguage || ''}')">${buttonText}</button>
                ${type === 'upcoming' ? `<button class="btn-secondary" onclick="cancelBooking('${booking.id}')">Cancel</button>` : ''}
            </div>
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function switchTab(tabName) {
    // Update tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    // Update tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}Tab`);
    });
}

function viewTicket(movieTitle, theaterName, dateTime, seats, type, bookingId, language) {
    // Create ticket modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${type === 'upcoming' ? 'Your Ticket' : 'Booking Details'}</h2>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="ticket-details">
                    <div class="ticket-header">
                        <h3>${movieTitle}</h3>
                        <p class="booking-id">Booking ID: ${bookingId || 'N/A'}</p>
                    </div>
                    <div class="ticket-info">
                        <div class="info-row">
                            <span class="label">Theater:</span>
                            <span class="value">${theaterName}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Date & Time:</span>
                            <span class="value">${dateTime}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Seats:</span>
                            <span class="value">${seats}</span>
                        </div>
                        ${language ? `<div class="info-row">
                            <span class="label">Language:</span>
                            <span class="value">${language}</span>
                        </div>` : ''}
                    </div>
                    ${type === 'upcoming' ?
            `<div class="ticket-qr">
                            <div class="qr-placeholder">
                                <i class="fas fa-qrcode"></i>
                                <p>Scan QR Code at Theater</p>
                            </div>
                        </div>` : ''
        }
                </div>
                <div class="ticket-actions">
                    ${type === 'upcoming' ?
            `<button class="btn-primary" onclick="downloadTicket('${bookingId}')">Download Ticket</button>` : ''
        }
                    <button class="btn-secondary" onclick="closeModal()">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
        const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
        localStorage.setItem('userBookings', JSON.stringify(updatedBookings));

        // Refresh the display
        loadAndDisplayBookings();

        alert('Booking cancelled successfully.');
    }
}

function downloadTicket(bookingId) {
    // In a real application, this would generate and download a PDF ticket
    alert('Ticket download feature would be implemented here. Booking ID: ' + bookingId);
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}
