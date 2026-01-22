# RK Movies - Movie Booking Website

A modern, user-friendly movie booking website UI inspired by BookMyShow and District. Built with clean HTML, CSS, and JavaScript.

## Features
![iconassembly11](https://github.com/user-attachments/assets/3aa9c664-ba10-451c-a20b-35fb6460d7d1)

### 🎬 Home Page
- **Sticky Header** with logo, navigation, and user icons
- **Hero Carousel** with auto-scrolling movie posters
- **Search Bar** overlaying the carousel
- **Location Selector** with city dropdown
- **Filter Options** (Genre, Date, Language, Rating)
- **Now Showing** section with horizontally scrollable movie cards
- **Upcoming Releases** section
- **My Bookings** dashboard with upcoming and past bookings
- **Footer** with contact info, links, and social icons
<img width="2816" height="1536" alt="icon assembly (1)" src="https://github.com/user-attachments/assets/c5723257-1650-48a7-9ef8-53c570078abf" />

### 🎭 Movie Detail Page
- Large movie poster with rating
- Movie information (synopsis, cast, duration, genre)
- Date selector for showtimes
- Theater listings with amenities
- Time slot selection
- Pricing information


### 🎫 Booking Page
- Progress indicator (Select Seats → Snacks → Payment)
- Interactive seat map with visual indicators
- Seat selection with real-time price calculation
- Booking summary sidebar
- Support for regular and premium seats

## Design Highlights

- **Modern & Minimal**: Clean aesthetic with effective use of whitespace
- **Vibrant Accents**: Warm red/orange color scheme for CTAs
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Interactions**: Hover effects, transitions, and animations
- **Accessible**: Keyboard navigation and proper focus states

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process needed.

### File Structure

```
rk/
├── index.html          # Home page
├── movie-detail.html   # Movie detail page
├── booking.html        # Booking/seat selection page
├── styles.css          # Main stylesheet
├── script.js           # General JavaScript functionality
├── booking.js          # Booking-specific JavaScript
├── STYLE_GUIDE.md      # Design system documentation
└── README.md           # This file
```

## Usage

### Navigation
- Click on navigation links in the header to navigate between sections
- Use the hamburger menu on mobile devices
- Click "Book Now" on any movie card to view details

### Booking Flow
1. Browse movies on the home page
2. Click "Book Now" on a movie
3. Select date and time on the movie detail page
4. Choose seats on the booking page
5. Review summary and proceed to payment

### Interactive Features
- **Carousel**: Auto-plays, pause on hover, manual navigation with arrows/indicators
- **Movie Cards**: Hover effects and click to view details
- **Seat Selection**: Click to select/deselect, visual feedback, price calculation
- **Filters**: Dropdown filters for genre, date, language, and rating
- **Tabs**: Switch between upcoming and past bookings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #e50914;
    --accent-color: #ff6b35;
    /* ... */
}
```

### Content
- Update movie data in HTML files
- Replace placeholder images with actual movie posters
- Modify navigation links as needed

### Functionality
- Add backend integration in `script.js` and `booking.js`
- Connect search functionality to a database
- Implement actual payment processing

## Design System

See `STYLE_GUIDE.md` for complete documentation on:
- Color palette
- Typography
- Spacing system
- Component styles
- Responsive breakpoints

## Future Enhancements

- [ ] User authentication
- [ ] Payment gateway integration
- [ ] Movie search with backend
- [ ] User reviews and ratings
- [ ] Watchlist functionality
- [ ] Email notifications
- [ ] Mobile app version

## Credits

- **Icons**: Font Awesome 6.4.0
- **Images**: Unsplash (placeholder images)
- **Design Inspiration**: BookMyShow, District

## License

This project is open source and available for personal and commercial use.

---

**Built with ❤️ for modern movie booking experiences**



