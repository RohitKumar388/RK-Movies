// ============================================
// Navigation Handler for All Pages
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Restore UI state
    if (typeof updateNavigationUI === 'function') {
        updateNavigationUI();
    }

    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            handleNavigation(targetId);
        });
    });

    // Handle Sign In
    const signInLinks = document.querySelectorAll('a[href="#signin"]');
    signInLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showSignInModal();
        });
    });

    // Handle Profile Button
    const profileBtn = document.querySelector('.profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handleProfileClick();
        });
    }

    // Handle Notifications Button
    const notificationsBtn = document.querySelector('.icon-btn[aria-label="Notifications"]');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            // Add shake animation
            this.style.animation = 'shake 0.5s';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);

            showNotificationsModal();
        });
    }
});

function handleNavigation(sectionId) {
    switch (sectionId) {
        case 'about':
            showAboutModal();
            break;
        case 'help':
            showHelpModal();
            break;
        case 'import':
            showImportModal();
            break;
        case 'settings':
            showSettingsModal();
            break;
        case 'feedback':
            showFeedbackModal();
            break;
        case 'bookings':
            scrollToBookings();
            break;
        case 'contact':
            showContactModal();
            break;
        default:
            // Try to scroll to section if it exists on the page
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
    }
}

function scrollToBookings() {
    // If on index page, scroll to bookings section
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('\\')) {
        const bookingsSection = document.getElementById('bookings');
        if (bookingsSection) {
            bookingsSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // Redirect to home page and scroll to bookings
        window.location.href = 'index.html#bookings';
    }
}

// ============================================
// Modal System
// ============================================

function createModal(title, content) {
    // Remove existing modal if any (triggers cleanup)
    closeModal();

    const modal = document.createElement('div');
    modal.id = 'globalModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close on overlay click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on ESC key (add global named listener)
    if (!window.handleEscKey) {
        window.handleEscKey = function (e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
    }
    document.addEventListener('keydown', window.handleEscKey);
}

// NOTE: closeModal is defined in script.js which overwrites any local definition.
// We are relying on the global closeModal from script.js to handle cleanup.


// ============================================
// About Modal
// ============================================

function showAboutModal() {
    const content = `
        <div class="about-content">
            <div class="about-section">
                <h3><i class="fas fa-info-circle"></i> About RK Movies</h3>
                <p>RK Movies is a modern, user-friendly movie booking platform that brings the best cinematic experiences to your fingertips. We are committed to providing seamless ticket booking services with an intuitive interface and excellent customer support.</p>
            </div>
            <div class="about-section">
                <h3><i class="fas fa-bullseye"></i> Our Mission</h3>
                <p>To make movie ticket booking as simple and enjoyable as watching the movies themselves. We strive to connect movie lovers with their favorite films through an easy-to-use platform.</p>
            </div>
            <div class="about-section">
                <h3><i class="fas fa-star"></i> Why Choose Us</h3>
                <ul>
                    <li>Easy and quick ticket booking</li>
                    <li>Real-time seat availability</li>
                    <li>Multiple payment options</li>
                    <li>24/7 customer support</li>
                    <li>Best prices guaranteed</li>
                </ul>
            </div>
            <div class="about-section">
                <h3><i class="fas fa-building"></i> Company Information</h3>
                <p><strong>Founded:</strong> 2026</p>
                <p><strong>Location:</strong> Pune, Maharashtra, India</p>
                <p><strong>Email:</strong> info@rkmovies.com</p>
                <p><strong>Phone:</strong> +91 123-456-7890</p>
            </div>
        </div>
    `;
    createModal('About Us', content);
}

// ============================================
// Help Modal
// ============================================

function showHelpModal() {
    const content = `
        <div class="help-content">
            <div class="help-section">
                <h3><i class="fas fa-question-circle"></i> Frequently Asked Questions</h3>
                <div class="faq-item">
                    <h4>How do I book tickets?</h4>
                    <p>Simply browse movies on the home page, click "Book Now" on your preferred movie, select date and time, choose your seats, and proceed to payment.</p>
                </div>
                <div class="faq-item">
                    <h4>Can I cancel my booking?</h4>
                    <p>Yes, you can cancel your booking up to 2 hours before the showtime. Go to "My Bookings" and click "Cancel" on your booking.</p>
                </div>
                <div class="faq-item">
                    <h4>What payment methods are accepted?</h4>
                    <p>We accept credit/debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, and Google Pay.</p>
                </div>
                <div class="faq-item">
                    <h4>How do I get my tickets?</h4>
                    <p>After successful payment, you'll receive an email with your e-ticket. You can also view and download tickets from "My Bookings" section.</p>
                </div>
                <div class="faq-item">
                    <h4>What if I don't receive my ticket?</h4>
                    <p>Please check your spam folder. If you still don't see it, contact our support team at support@rkmovies.com or call +91 123-456-7890.</p>
                </div>
            </div>
            <div class="help-section">
                <h3><i class="fas fa-headset"></i> Need More Help?</h3>
                <p>Our customer support team is available 24/7 to assist you.</p>
                <div class="help-contact">
                    <p><i class="fas fa-phone"></i> <strong>Phone:</strong> +91 123-456-7890</p>
                    <p><i class="fas fa-envelope"></i> <strong>Email:</strong> support@rkmovies.com</p>
                    <p><i class="fas fa-clock"></i> <strong>Hours:</strong> 24/7</p>
                </div>
            </div>
        </div>
    `;
    createModal('Help & Support', content);
}

// ============================================
// Settings Modal
// ============================================

function showSettingsModal() {
    const content = `
        <div class="settings-content">
            <div class="settings-section">
                <h3><i class="fas fa-bell"></i> Notifications</h3>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" checked>
                        <span>Email notifications for bookings</span>
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" checked>
                        <span>Promotional offers and updates</span>
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox">
                        <span>SMS notifications</span>
                    </label>
                </div>
            </div>
            <div class="settings-section">
                <h3><i class="fas fa-globe"></i> Language & Region</h3>
                <div class="setting-item">
                    <label>Preferred Language</label>
                    <select class="setting-select">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Marathi</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Default City</label>
                    <select class="setting-select">
                        <option>Pune</option>
                        <option>Mumbai</option>
                        <option>Delhi</option>
                        <option>Bangalore</option>
                    </select>
                </div>
            </div>
            <div class="settings-actions">
                <button class="btn-primary" onclick="saveSettings()">Save Settings</button>
                <button class="btn-secondary" onclick="closeModal()">Cancel</button>
            </div>
        </div>
    `;
    createModal('Settings', content);
}

function saveSettings() {
    alert('Settings saved successfully!');
    closeModal();
}

// ============================================
// Feedback Modal
// ============================================

function showFeedbackModal() {
    const content = `
        <div class="feedback-content">
            <form id="feedbackForm" onsubmit="submitFeedback(event)">
                <div class="form-group">
                    <label>Your Name</label>
                    <input type="text" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Subject</label>
                    <select class="form-input" required>
                        <option value="">Select a subject</option>
                        <option>General Feedback</option>
                        <option>Bug Report</option>
                        <option>Feature Request</option>
                        <option>Complaint</option>
                        <option>Compliment</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Rating</label>
                    <div class="rating-input">
                        <input type="radio" name="rating" value="5" id="rating5">
                        <label for="rating5">⭐⭐⭐⭐⭐</label>
                        <input type="radio" name="rating" value="4" id="rating4">
                        <label for="rating4">⭐⭐⭐⭐</label>
                        <input type="radio" name="rating" value="3" id="rating3">
                        <label for="rating3">⭐⭐⭐</label>
                        <input type="radio" name="rating" value="2" id="rating2">
                        <label for="rating2">⭐⭐</label>
                        <input type="radio" name="rating" value="1" id="rating1">
                        <label for="rating1">⭐</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Your Feedback</label>
                    <textarea class="form-input" rows="5" placeholder="Please share your thoughts..." required></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Submit Feedback</button>
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    createModal('Feedback', content);
}

function submitFeedback(event) {
    event.preventDefault();
    alert('Thank you for your feedback! We appreciate your input.');
    closeModal();
}

// ============================================
// Contact Modal
// ============================================

function showContactModal() {
    const content = `
        <div class="contact-content">
            <div class="contact-section">
                <h3><i class="fas fa-map-marker-alt"></i> Visit Us</h3>
                <p>RK Movies Headquarters<br>
                Pune, Maharashtra, India<br>
                Pin: 411001</p>
            </div>
            <div class="contact-section">
                <h3><i class="fas fa-phone"></i> Call Us</h3>
                <p><strong>Customer Support:</strong><br>
                +91 123-456-7890<br>
                <small>Available 24/7</small></p>
            </div>
            <div class="contact-section">
                <h3><i class="fas fa-envelope"></i> Email Us</h3>
                <p><strong>General Inquiries:</strong><br>
                info@rkmovies.com</p>
                <p><strong>Support:</strong><br>
                support@rkmovies.com</p>
            </div>
            <div class="contact-section">
                <h3><i class="fas fa-comments"></i> Send a Message</h3>
                <form id="contactForm" onsubmit="submitContact(event)">
                    <div class="form-group">
                        <input type="text" class="form-input" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-input" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <textarea class="form-input" rows="4" placeholder="Your Message" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn-primary">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    createModal('Contact Us', content);
}

function submitContact(event) {
    event.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    closeModal();
}

// ============================================
// Sign In Modal
// ============================================

function showSignInModal() {
    const content = `
        <div class="signin-content">
            <div class="signin-header">
                <h2>Welcome Back</h2>
                <p>Sign in to your RK Movies account</p>
            </div>
            <div class="social-signin">
                <button class="google-signin-btn" onclick="handleGoogleSignIn()">
                    <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                </button>
            </div>
            <div class="divider">
                <span>or continue with email</span>
            </div>
            <form id="signinForm" onsubmit="handleSignIn(event)">
                <div class="form-group">
                    <label for="signinEmail">Email or Phone</label>
                    <input type="text" id="signinEmail" class="form-input" placeholder="Enter your email or phone" required>
                </div>
                <div class="form-group">
                    <label for="signinPassword">Password</label>
                    <div class="password-input-container">
                        <input type="password" id="signinPassword" class="form-input" placeholder="Enter your password" required>
                        <button type="button" class="password-toggle" onclick="togglePassword('signinPassword')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="form-group form-row">
                    <label>
                        <input type="checkbox" id="rememberMe">
                        <span>Remember me</span>
                    </label>
                    <a href="#" class="forgot-link" onclick="showForgotPassword()">Forgot Password?</a>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary btn-block">Sign In</button>
                </div>
                <div class="signin-footer">
                    <p>Don't have an account? <a href="#" onclick="showSignUp()">Sign Up</a></p>
                </div>
            </form>
        </div>
    `;
    createModal('Sign In', content);
}

function showSignUp() {
    const content = `
        <div class="signin-content">
            <div class="signin-header">
                <h2>Join RK Movies</h2>
                <p>Create your account to get started</p>
            </div>
            <div class="social-signin">
                <button class="google-signin-btn" onclick="handleGoogleSignIn()">
                    <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign up with Google
                </button>
            </div>
            <div class="divider">
                <span>or create account with email</span>
            </div>
            <form id="signupForm" onsubmit="handleSignUp(event)">
                <div class="form-row">
                    <div class="form-group">
                        <label for="signupName">Full Name</label>
                        <input type="text" id="signupName" class="form-input" placeholder="Enter your full name" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="signupEmail">Email</label>
                        <input type="email" id="signupEmail" class="form-input" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label for="signupPhone">Phone</label>
                        <input type="tel" id="signupPhone" class="form-input" placeholder="Enter your phone" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="signupPassword">Password</label>
                    <div class="password-input-container">
                        <input type="password" id="signupPassword" class="form-input" placeholder="Create a password" required>
                        <button type="button" class="password-toggle" onclick="togglePassword('signupPassword')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="signupConfirmPassword">Confirm Password</label>
                    <div class="password-input-container">
                        <input type="password" id="signupConfirmPassword" class="form-input" placeholder="Confirm your password" required>
                        <button type="button" class="password-toggle" onclick="togglePassword('signupConfirmPassword')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="termsAgree" required>
                        <span>I agree to the <a href="#" style="color: #1a73e8;">Terms of Service</a> and <a href="#" style="color: #1a73e8;">Privacy Policy</a></span>
                    </label>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary btn-block">Create Account</button>
                </div>
                <div class="signin-footer">
                    <p>Already have an account? <a href="#" onclick="showSignInModal()">Sign In</a></p>
                </div>
            </form>
        </div>
    `;
    createModal('Sign Up', content);
}

const ADMIN_EMAIL = 'admin@rkmovies.com';
const ADMIN_PASS = 'admin123';

function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && !/^\d{10}$/.test(email)) {
        alert('Please enter a valid email or phone number.');
        return;
    }

    // Check for Admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
        localStorage.setItem('userSignedIn', 'true');
        localStorage.setItem('isAdmin', 'true');
        alert('Welcome Admin! Import controls enabled.');
    } else {
        // Regular User
        alert('Sign in successful! Welcome back to RK Movies.');
        localStorage.setItem('userSignedIn', 'true');
        localStorage.removeItem('isAdmin'); // Ensure no stray admin rights
    }

    updateNavigationUI();
    closeModal();
}

function handleSignUp(event) {
    event.preventDefault();

    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    alert('Sign up successful! Please check your email for verification.');
    closeModal();
}

function handleGoogleSignIn() {
    // In a real application, this would integrate with Google OAuth
    alert('Google sign-in successful! Welcome to RK Movies.');
    localStorage.setItem('userSignedIn', 'true');
    localStorage.removeItem('isAdmin');
    updateNavigationUI();
    closeModal();
}

function updateNavigationUI() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const navMenu = document.getElementById('navMenu');

    // Check if Import link exists
    let importLink = document.querySelector('a[href="#import"]');

    if (isAdmin) {
        // Add Import link if not present
        if (!importLink) {
            importLink = document.createElement('a');
            importLink.href = '#import';
            importLink.className = 'nav-link';
            importLink.textContent = 'Import';

            // Insert before Sign In (which is usually the last one)
            const signInLink = document.querySelector('a[href="#signin"]');
            if (signInLink && navMenu) {
                navMenu.insertBefore(importLink, signInLink);
            }

            // Add click listener
            importLink.addEventListener('click', function (e) {
                e.preventDefault();
                showImportModal();
            });
        }
    } else {
        // Remove Import link if present
        if (importLink) {
            importLink.remove();
        }
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.nextElementSibling;
    const icon = toggleBtn.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function showForgotPassword() {
    const content = `
        <div class="signin-content">
            <div class="signin-header">
                <h2>Reset Password</h2>
                <p>Enter your email address and we'll send you a link to reset your password</p>
            </div>
            <form id="forgotPasswordForm" onsubmit="handleForgotPassword(event)">
                <div class="form-group">
                    <label for="resetEmail">Email Address</label>
                    <input type="email" id="resetEmail" class="form-input" placeholder="Enter your email address" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary btn-block">Send Reset Link</button>
                </div>
                <div class="signin-footer">
                    <p>Remember your password? <a href="#" onclick="showSignInModal()">Sign In</a></p>
                </div>
            </form>
        </div>
    `;
    createModal('Forgot Password', content);
}

function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value;
    alert(`Password reset link sent to ${email}. Please check your email.`);
    closeModal();
}

// ============================================
// Profile and Notifications
// ============================================

function handleProfileClick() {
    // Check if user is signed in (in a real app, this would check authentication status)
    const isSignedIn = localStorage.getItem('userSignedIn') === 'true';

    if (isSignedIn) {
        showProfileModal();
    } else {
        showSignInModal();
    }
}

function showProfileModal() {
    // In a real app, this would fetch user data from backend
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        joinDate: 'January 2024',
        totalBookings: 12,
        favoriteGenre: 'Action'
    };

    const content = `
        <div class="profile-content">
            <div class="profile-header">
                <div class="profile-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="profile-info">
                    <h3>${userData.name}</h3>
                    <p>${userData.email}</p>
                </div>
            </div>
            
            <div class="profile-details">
                <div class="profile-section">
                    <h4><i class="fas fa-user"></i> Personal Information</h4>
                    <div class="profile-item">
                        <span class="label">Phone:</span>
                        <span class="value">${userData.phone}</span>
                    </div>
                    <div class="profile-item">
                        <span class="label">Member Since:</span>
                        <span class="value">${userData.joinDate}</span>
                    </div>
                </div>
                
                <div class="profile-section">
                    <h4><i class="fas fa-ticket-alt"></i> Booking Statistics</h4>
                    <div class="profile-item">
                        <span class="label">Total Bookings:</span>
                        <span class="value">${userData.totalBookings}</span>
                    </div>
                    <div class="profile-item">
                        <span class="label">Favorite Genre:</span>
                        <span class="value">${userData.favoriteGenre}</span>
                    </div>
                </div>
            </div>
            
            <div class="profile-actions">
                <button class="btn-secondary" onclick="editProfile()">Edit Profile</button>
                <button class="btn-secondary" onclick="viewBookingHistory()">Booking History</button>
                <button class="btn-danger" onclick="signOut()">Sign Out</button>
            </div>
        </div>
    `;
    createModal('My Profile', content);
}

function showNotificationsModal() {
    const notifications = [
        {
            id: 1,
            type: 'booking',
            title: 'Booking Confirmed',
            message: 'Your tickets for "The Dark Knight" have been confirmed.',
            time: '2 hours ago',
            read: false
        },
        {
            id: 2,
            type: 'reminder',
            title: 'Show Reminder',
            message: 'Your movie "Inception" starts in 30 minutes.',
            time: '30 minutes ago',
            read: false
        },
        {
            id: 3,
            type: 'offer',
            title: 'Special Offer',
            message: 'Get 20% off on your next booking with code MOVIE20.',
            time: '1 day ago',
            read: true
        },
        {
            id: 4,
            type: 'update',
            title: 'Movie Update',
            message: '"Interstellar" showtime has been changed to 8:00 PM.',
            time: '2 days ago',
            read: true
        }
    ];

    const notificationItems = notifications.map(notification => `
        <div class="notification-item ${notification.read ? 'read' : 'unread'}">
            <div class="notification-icon">
                <i class="fas fa-${getNotificationIcon(notification.type)}"></i>
            </div>
            <div class="notification-content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <span class="notification-time">${notification.time}</span>
            </div>
            ${!notification.read ? '<div class="notification-dot"></div>' : ''}
        </div>
    `).join('');

    const content = `
        <div class="notifications-content">
            <div class="notifications-header">
                <h3>Notifications</h3>
                <button class="btn-link" onclick="markAllAsRead()">Mark all as read</button>
            </div>
            <div class="notifications-list">
                ${notificationItems}
            </div>
            <div class="notifications-footer">
                <button class="btn-link" onclick="viewAllNotifications()">View All Notifications</button>
            </div>
        </div>
    `;
    createModal('Notifications', content);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'booking': return 'ticket-alt';
        case 'reminder': return 'clock';
        case 'offer': return 'gift';
        case 'update': return 'info-circle';
        default: return 'bell';
    }
}

function editProfile() {
    alert('Edit profile functionality would open an edit form.');
}

function viewBookingHistory() {
    alert('Booking history would show detailed booking records.');
}

function signOut() {
    localStorage.removeItem('userSignedIn');
    localStorage.removeItem('isAdmin');
    alert('You have been signed out successfully.');
    updateNavigationUI();
    closeModal();
    // In a real app, you might redirect to home page or update UI
}

function markAllAsRead() {
    alert('All notifications marked as read.');
    closeModal();
}

function viewAllNotifications() {
    alert('View all notifications functionality.');
}

// ============================================
// Ticket Details Modal
// ============================================

function viewTicket(movieTitle, theater, dateTime, seats, type) {
    const bookingId = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const qrCode = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(`Booking ID: ${bookingId}\nMovie: ${movieTitle}\nTheater: ${theater}\nDate/Time: ${dateTime}\nSeats: ${seats}`);

    const content = `
        <div class="ticket-content">
            <div class="ticket-header">
                <h2><i class="fas fa-ticket-alt"></i> Movie Ticket</h2>
                <div class="booking-status ${type === 'upcoming' ? 'upcoming' : 'past'}">
                    ${type === 'upcoming' ? '<i class="fas fa-clock"></i> Upcoming' : '<i class="fas fa-check-circle"></i> Completed'}
                </div>
            </div>
            
            <div class="ticket-details">
                <div class="ticket-movie-info">
                    <h3>${movieTitle}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${theater}</p>
                    <p><i class="fas fa-calendar"></i> ${dateTime}</p>
                    <p><i class="fas fa-chair"></i> Seats: ${seats}</p>
                    <p><i class="fas fa-id-card"></i> Booking ID: ${bookingId}</p>
                </div>
                
                <div class="ticket-qr">
                    <img src="${qrCode}" alt="QR Code" class="qr-code">
                    <p class="qr-text">Scan to verify ticket</p>
                </div>
            </div>
            
            <div class="ticket-actions">
                <button class="btn-primary" onclick="downloadTicket('${movieTitle}', '${bookingId}')">
                    <i class="fas fa-download"></i> Download Ticket
                </button>
                ${type === 'upcoming' ? '<button class="btn-secondary" onclick="cancelBooking(\'' + bookingId + '\')"><i class="fas fa-times"></i> Cancel Booking</button>' : ''}
            </div>
            
            <div class="ticket-notes">
                <h4><i class="fas fa-info-circle"></i> Important Notes</h4>
                <ul>
                    <li>Please arrive at the theater 30 minutes before showtime</li>
                    <li>Bring a valid ID proof for verification</li>
                    <li>Tickets are non-transferable</li>
                    ${type === 'upcoming' ? '<li>Cancellation allowed up to 2 hours before showtime</li>' : '<li>This booking has been completed</li>'}
                </ul>
            </div>
        </div>
    `;
    createModal('Ticket Details', content);
}

function downloadTicket(movieTitle, bookingId) {
    // Simple download simulation - in a real app, this would generate a PDF
    alert(`Downloading ticket for "${movieTitle}" (Booking ID: ${bookingId})`);
}

function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
        alert(`Booking ${bookingId} has been cancelled. Refund will be processed within 5-7 business days.`);
        closeModal();
        // In a real app, this would refresh the bookings list
        location.reload();
    }
}

// ============================================
// Import Modal (Admin)
// ============================================

const DEFAULT_API_KEY = 'f518331f'; // Hardcoded API Key

function showImportModal() {
    const savedApiKey = localStorage.getItem('omdb_api_key') || DEFAULT_API_KEY;

    const content = `
        <div class="import-content">
            <div class="import-header">
                <h2>Import Movie from IMDb</h2>
                <p>Enter details to fetch movie data via OMDb API</p>
            </div>
            
            <div class="form-group">
                <label>OMDb API Key <small>(<a href="http://www.omdbapi.com/apikey.aspx" target="_blank">Get Key</a>)</small></label>
                <div class="input-group">
                    <input type="text" id="omdbApiKey" class="form-input" value="${savedApiKey}" placeholder="Enter your OMDb API Key">
                    <button class="btn-secondary" onclick="saveApiKey()">Save Key</button>
                </div>
            </div>

            <div class="form-group">
                <label>IMDb ID (e.g., tt0468569)</label>
                <div class="input-group">
                    <input type="text" id="imdbId" class="form-input" placeholder="Enter IMDb ID">
                    <button class="btn-primary" onclick="fetchMovieFromOMDb()">Fetch Data</button>
                </div>
            </div>

            <div id="importPreview" class="import-preview hidden">
                <!-- Preview content will be injected here -->
            </div>
        </div>
    `;
    createModal('Import Movie', content);
}

function saveApiKey() {
    const key = document.getElementById('omdbApiKey').value.trim();
    if (key) {
        localStorage.setItem('omdb_api_key', key);
        alert('API Key saved successfully!');
    } else {
        alert('Please enter a valid API Key.');
    }
}

async function fetchMovieFromOMDb() {
    const apiKey = document.getElementById('omdbApiKey').value.trim();
    const imdbId = document.getElementById('imdbId').value.trim();
    const previewContainer = document.getElementById('importPreview');

    if (!apiKey || !imdbId) {
        alert('Please enter both API Key and IMDb ID.');
        return;
    }

    // Basic UI feedback
    previewContainer.innerHTML = '<p class="loading-text">Fetching data...</p>';
    previewContainer.classList.remove('hidden');

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}&plot=full`);
        const data = await response.json();

        if (data.Response === 'True') {
            displayImportPreview(data);
        } else {
            previewContainer.innerHTML = `<p class="error-text">Error: ${data.Error}</p>`;
        }
    } catch (error) {
        console.error('Error fetching movie:', error);
        previewContainer.innerHTML = '<p class="error-text">Network error occurred. Please try again.</p>';
    }
}

function displayImportPreview(data) {
    const previewContainer = document.getElementById('importPreview');

    // Store data temporarily for adding
    window.currentImportData = data;

    previewContainer.innerHTML = `
        <div class="movie-preview-card">
            <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" alt="Poster" class="preview-poster" style="width: 100px; float: left; margin-right: 15px;">
            <div class="preview-details">
                <h3>${data.Title} (${data.Year})</h3>
                <p><strong>Genre:</strong> ${data.Genre}</p>
                <p><strong>Director:</strong> ${data.Director}</p>
                <p><strong>Plot:</strong> ${data.Plot.substring(0, 150)}...</p>
                
                <div class="form-group mt-3">
                    <label>Trailer URL (YouTube Embed):</label>
                    <input type="text" id="trailerUrl" class="form-input" placeholder="https://www.youtube.com/embed/..." style="margin-bottom: 10px;">
                    <small style="color: #666; display: block; margin-bottom: 10px;">Format: https://www.youtube.com/embed/VIDEO_ID</small>
                </div>

                <div class="form-group mt-3">
                    <label>Set Status on Website:</label>
                    <div class="radio-group" style="display: flex; gap: 15px; margin-top: 5px;">
                        <label><input type="radio" name="movieStatus" value="now-showing" checked> Now Showing</label>
                        <label><input type="radio" name="movieStatus" value="upcoming"> Upcoming</label>
                    </div>
                </div>

                <button class="btn-primary btn-block mt-3" onclick="confirmAddMovie()" style="margin-top: 15px; width: 100%;">Add to Website</button>
            </div>
            <div style="clear: both;"></div>
        </div>
    `;
}

function confirmAddMovie() {
    if (!window.currentImportData) {
        alert("No data to add");
        return;
    }

    const data = window.currentImportData;
    const statusRadio = document.querySelector('input[name="movieStatus"]:checked');
    const status = statusRadio ? statusRadio.value : 'now-showing';
    const trailerUrl = document.getElementById('trailerUrl').value.trim();

    // Clean durations like "142 min" -> 142
    const duration = parseInt(data.Runtime) || 0;

    const newMovie = {
        id: data.imdbID, // Use imdbID as unique ID
        imdbID: data.imdbID, // Explicitly add imdbID field
        title: data.Title,
        poster: data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Poster',
        thumbnail: data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Poster',
        rating: parseFloat(data.imdbRating) || 0,
        genres: data.Genre.split(',').map(g => g.trim()),
        duration: duration,
        year: parseInt(data.Year) || new Date().getFullYear(),
        language: data.Language.split(',').map(l => l.trim()),
        synopsis: data.Plot,
        cast: data.Actors.split(',').map(a => a.trim()),
        status: status,
        trailer: getYouTubeEmbedUrl(trailerUrl), // Save the trailer URL
        releaseDate: data.Released
    };

    // Save to localStorage
    const storedMovies = JSON.parse(localStorage.getItem('custom_movies') || '[]');

    // Check for duplicates
    if (storedMovies.some(m => m.id === newMovie.id)) {
        alert('This movie is already in your library!');
        return;
    }

    storedMovies.push(newMovie);
    localStorage.setItem('custom_movies', JSON.stringify(storedMovies));

    alert(`"${newMovie.title}" added successfully to ${status === 'now-showing' ? 'Now Showing' : 'Upcoming'}!`);

    // Reload page to reflect changes
    window.location.reload();
}

// ============================================
// Edit Modal (Admin)
// ============================================

function showEditModal(movieId) {
    const storedMovies = JSON.parse(localStorage.getItem('custom_movies') || '[]');
    const movie = storedMovies.find(m => m.id === movieId);

    if (!movie) {
        alert("Cannot edit this movie. It might be a hardcoded movie.");
        return;
    }

    // Store editing ID
    window.editingMovieId = movieId;

    const content = `
        <div class="import-content">
            <div class="import-header">
                <h2>Edit Movie Details</h2>
                <p>Update details for "${movie.title}"</p>
            </div>
            
            <div class="form-group">
                <label>Poster Image URL</label>
                <input type="text" id="editPoster" class="form-input" value="${movie.poster}" placeholder="https://...">
            </div>

            <div class="form-group">
                <label>Trailer URL (YouTube Embed)</label>
                <input type="text" id="editTrailer" class="form-input" value="${movie.trailer || ''}" placeholder="https://www.youtube.com/embed/...">
                <small style="color: #666; display: block; margin-top: 5px;">Format: https://www.youtube.com/embed/VIDEO_ID</small>
            </div>

            <button class="btn-primary btn-block mt-3" onclick="updateMovieData()" style="margin-top: 20px; width: 100%;">Save Changes</button>
        </div>
    `;
    createModal('Edit Movie', content);
}

function updateMovieData() {
    if (!window.editingMovieId) return;

    const poster = document.getElementById('editPoster').value.trim();
    const trailer = document.getElementById('editTrailer').value.trim();

    const storedMovies = JSON.parse(localStorage.getItem('custom_movies') || '[]');
    const movieIndex = storedMovies.findIndex(m => m.id === window.editingMovieId);

    if (movieIndex !== -1) {
        storedMovies[movieIndex].poster = poster;
        storedMovies[movieIndex].thumbnail = poster; // Update both for consistency
        storedMovies[movieIndex].trailer = getYouTubeEmbedUrl(trailer);

        localStorage.setItem('custom_movies', JSON.stringify(storedMovies));
        alert("Movie details updated successfully!");
        window.location.reload();
    } else {
        alert("Error updating movie.");
    }
}

function getYouTubeEmbedUrl(url) {
    if (!url) return '';

    // Handle already correct embed URLs
    if (url.includes('youtube.com/embed/')) {
        return url;
    }

    let videoId = '';

    // Handle youtu.be short links (e.g. https://youtu.be/VIDEO_ID)
    if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    // Handle standard watch URLs (e.g. https://www.youtube.com/watch?v=VIDEO_ID)
    else if (url.includes('youtube.com/watch')) {
        const urlParams = new URL(url).searchParams;
        videoId = urlParams.get('v');
    }

    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }

    return url; // Return original if pattern doesn't match (fallback)
}
