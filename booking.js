// ============================================
// Seat Selection Functionality
// ============================================
let selectedSeats = [];
let selectedSnacks = [];
let regularPrice = 250;
let premiumPrice = 500;
const convenienceFeeAmount = 30;

// Snack prices
const snackPrices = {
    'popcorn-regular': 150,
    'popcorn-large': 220,
    'nachos': 180,
    'hot-dog': 120,
    'coke': 80,
    'sprite': 80,
    'chips': 50,
    'chocolate': 60
};

let currentStep = 1; // 1 = seats, 2 = snacks

document.addEventListener('DOMContentLoaded', function () {

    const bookingData = sessionStorage.getItem('currentBooking');
    if (bookingData) {
        const booking = JSON.parse(bookingData);
        if (booking?.theater?.pricing) {
            regularPrice = booking.theater.pricing.regular;
            premiumPrice = booking.theater.pricing.premium;
        }
    }

    const convenienceFee = document.getElementById('convenienceFee');
    if (convenienceFee) convenienceFee.textContent = convenienceFeeAmount;

    const seats = document.querySelectorAll('.seat.available');
    const MAX_SEATS = 10;

    seats.forEach(seat => {
        seat.setAttribute('tabindex', '0');

        seat.addEventListener('click', function () {
            const seatId = this.dataset.seat;
            const isPremium = this.classList.contains('premium');

            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedSeats = selectedSeats.filter(s => s.id !== seatId);
            } else {
                if (selectedSeats.length >= MAX_SEATS) {
                    alert(`You can select a maximum of ${MAX_SEATS} seats.`);
                    return;
                }
                this.classList.add('selected');
                selectedSeats.push({ id: seatId, premium: isPremium });
            }

            updateBookingSummary();
        });

        seat.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                seat.click();
            }
        });

        seat.addEventListener('mouseenter', () => {
            if (!seat.classList.contains('selected')) {
                seat.style.transform = 'scale(1.1)';
            }
        });

        seat.addEventListener('mouseleave', () => {
            seat.style.transform = 'scale(1)';
        });
    });

    // ============================================
    // Snacks Selection Functionality
    // ============================================
    const snackItems = document.querySelectorAll('.snack-item');

    snackItems.forEach(item => {
        const snackId = item.dataset.snack;
        const quantityElement = item.querySelector('.quantity');
        const decreaseBtn = item.querySelector('[data-action="decrease"]');
        const increaseBtn = item.querySelector('[data-action="increase"]');

        decreaseBtn.addEventListener('click', () => {
            const currentQty = parseInt(quantityElement.textContent);
            if (currentQty > 0) {
                quantityElement.textContent = currentQty - 1;
                updateSnackSelection(snackId, currentQty - 1);
                item.classList.toggle('selected', currentQty - 1 > 0);
            }
        });

        increaseBtn.addEventListener('click', () => {
            const currentQty = parseInt(quantityElement.textContent);
            quantityElement.textContent = currentQty + 1;
            updateSnackSelection(snackId, currentQty + 1);
            item.classList.add('selected');
        });
    });

    const proceedBtn = document.getElementById('proceedBtn');
    // ============================================
    // Step Navigation
    // ============================================
    const backBtn = document.getElementById('backBtn');
    const seatSelection = document.querySelector('.seat-selection');
    const snacksSection = document.getElementById('snacksSection');

    if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
            if (currentStep === 1) {
                // Move to snacks step
                if (!selectedSeats.length) return;

                seatSelection.style.display = 'none';
                snacksSection.style.display = 'block';
                backBtn.style.display = 'block';
                proceedBtn.textContent = 'Proceed to Payment';
                currentStep = 2;
                updateProgressStep(2);
                updateBookingSummary();
            } else if (currentStep === 2) {
                // Proceed to payment
                const baseTotal = selectedSeats.reduce(
                    (sum, s) => sum + (s.premium ? premiumPrice : regularPrice),
                    0
                );

                const snacksTotal = selectedSnacks.reduce(
                    (sum, snack) => sum + (snackPrices[snack.id] * snack.quantity),
                    0
                );

                const total = baseTotal + snacksTotal + selectedSeats.length * convenienceFeeAmount;

                sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                sessionStorage.setItem('selectedSnacks', JSON.stringify(selectedSnacks));
                sessionStorage.setItem('ticketCount', selectedSeats.length);
                sessionStorage.setItem('snacksTotal', snacksTotal);
                sessionStorage.setItem('ticketPrice', baseTotal);
                sessionStorage.setItem('totalPrice', total);

                // Navigate to payment page
                window.location.href = 'payment.html';
            }
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Go back to seats step
            snacksSection.style.display = 'none';
            seatSelection.style.display = 'block';
            backBtn.style.display = 'none';
            proceedBtn.textContent = 'Proceed to Snacks';
            currentStep = 1;
            updateProgressStep(1);
            updateBookingSummary();
        });
    }

    // ✅ SINGLE booking summary observer (correct)
    const bookingSummary = document.querySelector('.booking-summary');
    const selectedSeatsContainer = document.getElementById('selectedSeats');

    if (bookingSummary && selectedSeatsContainer) {
        const observer = new MutationObserver(() => {
            bookingSummary.style.animation = 'pulse 0.3s';
            setTimeout(() => bookingSummary.style.animation = '', 300);
        });
        observer.observe(selectedSeatsContainer, { childList: true });
    }

    // Initial update
    updateBookingSummary();
});

// ============================================
// Booking Summary Update
// ============================================

function updateSnackSelection(snackId, quantity) {
    const existingSnack = selectedSnacks.find(s => s.id === snackId);

    if (quantity > 0) {
        if (existingSnack) {
            existingSnack.quantity = quantity;
        } else {
            selectedSnacks.push({ id: snackId, quantity: quantity });
        }
    } else {
        selectedSnacks = selectedSnacks.filter(s => s.id !== snackId);
    }

    updateBookingSummary();
}

function updateBookingSummary() {
    const selectedSeatsContainer = document.getElementById('selectedSeats');
    const selectedSnacksContainer = document.getElementById('selectedSnacks');
    const snacksSummary = document.getElementById('snacksSummary');
    const snacksPriceRow = document.getElementById('snacksPriceRow');
    const ticketCount = document.getElementById('ticketCount');
    const ticketPrice = document.getElementById('ticketPrice');
    const snacksPrice = document.getElementById('snacksPrice');
    const totalPrice = document.getElementById('totalPrice');
    const proceedBtn = document.getElementById('proceedBtn');

    if (!selectedSeatsContainer || !ticketCount || !ticketPrice || !totalPrice || !proceedBtn) return;

    const count = selectedSeats.length;

    selectedSeatsContainer.innerHTML = count
        ? selectedSeats.map(s => `<span class="selected-seat">${s.id}</span>`).join('')
        : '<span class="no-seats">No seats selected</span>';

    // Update snacks display
    if (selectedSnacksContainer && snacksSummary && snacksPriceRow) {
        const snacksCount = selectedSnacks.reduce((sum, s) => sum + s.quantity, 0);
        selectedSnacksContainer.innerHTML = snacksCount
            ? selectedSnacks.map(s => `<span class="selected-snack">${s.quantity}x ${formatSnackName(s.id)}</span>`).join('')
            : '<span class="no-snacks">No snacks selected</span>';

        if (snacksCount > 0) {
            snacksSummary.style.display = 'block';
            snacksPriceRow.style.display = 'flex';
        } else {
            snacksSummary.style.display = 'none';
            snacksPriceRow.style.display = 'none';
        }
    }

    const baseTotal = selectedSeats.reduce(
        (sum, s) => sum + (s.premium ? premiumPrice : regularPrice),
        0
    );

    const snacksTotal = selectedSnacks.reduce(
        (sum, snack) => sum + (snackPrices[snack.id] * snack.quantity),
        0
    );

    ticketCount.textContent = count;
    ticketPrice.textContent = baseTotal;
    if (snacksPrice) snacksPrice.textContent = snacksTotal;
    totalPrice.textContent = baseTotal + snacksTotal + count * convenienceFeeAmount;

    // Update button state based on current step
    if (currentStep === 1) {
        proceedBtn.disabled = count === 0;
        proceedBtn.textContent = 'Proceed to Snacks';
    } else if (currentStep === 2) {
        proceedBtn.disabled = false;
        proceedBtn.textContent = 'Proceed to Payment';
    }

    proceedBtn.style.opacity = proceedBtn.disabled ? '0.6' : '1';
    proceedBtn.style.cursor = proceedBtn.disabled ? 'not-allowed' : 'pointer';
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
// Progress Steps
// ============================================
function updateProgressStep(stepNumber) {
    document.querySelectorAll('.step').forEach((step, i) =>
        step.classList.toggle('active', i < stepNumber)
    );

    document.querySelectorAll('.step-line').forEach((line, i) =>
        line.style.background = i < stepNumber - 1
            ? 'var(--primary-color)'
            : 'var(--border-color)'
    );
}

updateProgressStep(1);

// ============================================
// Pulse Animation
// ============================================
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0%,100%{transform:scale(1)}
    50%{transform:scale(1.02)}
}`;
document.head.appendChild(style);
