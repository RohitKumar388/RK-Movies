// ============================================
// Payment Page Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Load booking data from sessionStorage
    loadBookingData();

    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option');
    const cardForm = document.getElementById('cardForm');
    const netbankingForm = document.getElementById('netbankingForm');
    const upiForm = document.getElementById('upiForm');

    paymentOptions.forEach(option => {
        option.addEventListener('click', function () {
            const method = this.dataset.method;

            // Remove active class from all options
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');

            // Hide all forms
            cardForm.style.display = 'none';
            netbankingForm.style.display = 'none';
            upiForm.style.display = 'none';

            // Show selected form
            if (method === 'card') {
                cardForm.style.display = 'block';
            } else if (method === 'netbanking') {
                netbankingForm.style.display = 'block';
            } else if (method === 'upi') {
                upiForm.style.display = 'block';
            }
        });
    });

    // Card form validation and formatting
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');

    // Format card number with spaces
    cardNumber.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        e.target.value = formattedValue;
    });

    // Format expiry date
    expiryDate.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });

    // Card form submission
    const cardPaymentForm = document.getElementById('cardPaymentForm');
    cardPaymentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic validation
        if (!validateCardForm()) {
            return;
        }

        // Show loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        // Simulate payment processing
        setTimeout(async () => {
            await showPaymentSuccess();
        }, 2000);
    });

    // Net banking form submission
    const netbankingPaymentForm = document.getElementById('netbankingPaymentForm');
    netbankingPaymentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic validation
        if (!validateNetbankingForm()) {
            return;
        }

        // Show loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Connecting to Bank...';
        submitBtn.disabled = true;

        // Simulate bank redirect
        setTimeout(async () => {
            await showPaymentSuccess();
        }, 3000);
    });

    // UPI payment completion
    const upiCompleteBtn = document.getElementById('upiCompleteBtn');
    upiCompleteBtn.addEventListener('click', async function () {
        // In real implementation, you'd verify the payment status
        await showPaymentSuccess();
    });
});

// ============================================
// Helper Functions
// ============================================

function loadBookingData() {
    // Load booking details
    const bookingData = sessionStorage.getItem('currentBooking');
    if (bookingData) {
        const booking = JSON.parse(bookingData);

        // Format date
        const date = new Date(booking.date);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

        document.getElementById('summaryMovie').textContent = booking.movie.title;
        document.getElementById('summaryTheater').textContent = booking.theater.name;
        document.getElementById('summaryDateTime').textContent = `${formattedDate} | ${booking.time}`;
        document.getElementById('summaryLanguage').textContent = booking.selectedLanguage || 'English'; // Default fallback
    }

    // Load selected seats
    const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats') || '[]');
    const ticketCount = selectedSeats.length;

    document.getElementById('ticketCount').textContent = ticketCount;
    document.getElementById('selectedSeats').innerHTML = ticketCount
        ? selectedSeats.map(s => `<span class="selected-seat">${s.id}</span>`).join('')
        : '<span class="no-seats">No seats selected</span>';

    // Load selected snacks
    const selectedSnacks = JSON.parse(sessionStorage.getItem('selectedSnacks') || '[]');
    const snacksTotal = parseInt(sessionStorage.getItem('snacksTotal') || '0');

    if (selectedSnacks.length > 0) {
        document.getElementById('snacksSummary').style.display = 'block';
        document.getElementById('snacksPriceRow').style.display = 'flex';
        document.getElementById('selectedSnacks').innerHTML = selectedSnacks
            .map(s => `<span class="selected-snack">${s.quantity}x ${formatSnackName(s.id)}</span>`)
            .join('');
        document.getElementById('snacksPrice').textContent = snacksTotal;
    }

    // Load pricing
    const ticketPrice = parseInt(sessionStorage.getItem('ticketPrice') || '0');
    const totalPrice = parseInt(sessionStorage.getItem('totalPrice') || '0');
    const convenienceFee = ticketCount * 30;

    document.getElementById('ticketPrice').textContent = ticketPrice;
    document.getElementById('convenienceFee').textContent = convenienceFee;
    document.getElementById('totalPrice').textContent = totalPrice;
    document.getElementById('cardTotalAmount').textContent = totalPrice;
    document.getElementById('upiTotalAmount').textContent = totalPrice;
}

function formatSnackName(snackId) {
    const names = {
        'popcorn-regular': 'Regular Popcorn',
        'popcorn-large': 'Large Popcorn',
        'nachos': 'Nachos',
        'hot-dog': 'Hot Dog',
        'coke': 'Coke',
        'sprite': 'Sprite',
        'chips': 'Chips',
        'chocolate': 'Chocolate'
    };
    return names[snackId] || snackId;
}

// ============================================
// Booking Storage Functions
// ============================================

async function saveBookingToDatabase() {
    // Get booking data from sessionStorage
    const bookingData = sessionStorage.getItem('currentBooking');
    const selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats') || '[]');
    const selectedSnacks = JSON.parse(sessionStorage.getItem('selectedSnacks') || '[]');
    const ticketCount = parseInt(sessionStorage.getItem('ticketCount') || '0');
    const totalPrice = parseInt(sessionStorage.getItem('totalPrice') || '0');

    if (!bookingData) return null;

    const booking = JSON.parse(bookingData);

    // Create booking object for API
    const newBooking = {
        movie_id: booking.movie.id,
        theater_id: booking.theater.id,
        screen_id: booking.screen.id,
        date: booking.date,
        time: booking.time,
        seats: selectedSeats,
        snacks: selectedSnacks,
        total_price: totalPrice,
        status: 'upcoming',
        user_id: 'guest' // In a real app this would be the logged in user
    };

    try {
        const response = await fetch('http://localhost:3000/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBooking)
        });

        if (!response.ok) {
            throw new Error('Booking failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving booking:', error);
        return null;
    }
}

async function showPaymentSuccess() {
    // Save booking to Database
    const result = await saveBookingToDatabase();
    const bookingId = result ? result.booking_id : generateBookingId(); // Fallback if API fails

    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'payment-success-modal';
    modal.innerHTML = `
        <div class="modal-content success-modal">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Payment Successful!</h2>
            <p>Your booking has been confirmed.</p>
            <div class="booking-details">
                <p><strong>Booking ID:</strong> #${bookingId}</p>
                <p><strong>Movie:</strong> ${document.getElementById('summaryMovie').textContent}</p>
                <p><strong>Language:</strong> ${document.getElementById('summaryLanguage').textContent}</p>
                <p><strong>Theater:</strong> ${document.getElementById('summaryTheater').textContent}</p>
                <p><strong>Date & Time:</strong> ${document.getElementById('summaryDateTime').textContent}</p>
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="window.location.href='index.html'">Back to Home</button>
                <button class="btn-secondary" onclick="window.location.href='index.html#bookings'">View My Bookings</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .payment-success-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .success-modal {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            max-width: 400px;
            width: 90%;
        }
        .success-icon {
            font-size: 4rem;
            color: #4CAF50;
            margin-bottom: 1rem;
        }
        .booking-details {
            background: #f5f5f5;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            text-align: left;
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        .modal-actions button {
            flex: 1;
            padding: 0.75rem;
        }
    `;
    document.head.appendChild(style);
}

function generateBookingId() {
    return 'BK' + Date.now().toString().slice(-8);
}

function validateCardForm() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;

    // Basic validation
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        alert('Please enter a valid card number');
        return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
    }

    if (cvv.length < 3 || cvv.length > 4) {
        alert('Please enter a valid CVV');
        return false;
    }

    if (cardName.trim().length < 2) {
        alert('Please enter the name on card');
        return false;
    }

    return true;
}

function validateNetbankingForm() {
    const bankSelect = document.getElementById('bankSelect').value;
    const customerId = document.getElementById('customerId').value;
    const bankPassword = document.getElementById('bankPassword').value;

    if (!bankSelect) {
        alert('Please select a bank');
        return false;
    }

    if (customerId.trim().length < 3) {
        alert('Please enter a valid Customer ID');
        return false;
    }

    if (bankPassword.length < 4) {
        alert('Please enter a valid password');
        return false;
    }

    return true;
}