# RK Movies - Style Guide

## Overview
This style guide defines the visual design system for the RK Movies booking platform, inspired by BookMyShow and District. The design emphasizes a modern, minimal aesthetic with vibrant accents and clear visual hierarchy.

---

## Color Palette

### Primary Colors
- **Primary Red**: `#e50914`
  - Used for: Primary CTAs, active states, highlights
  - Hover: `#c40812`
  - RGB: `rgb(229, 9, 20)`

- **Accent Orange**: `#ff6b35`
  - Used for: Secondary highlights, "Coming Soon" badges
  - RGB: `rgb(255, 107, 53)`

### Neutral Colors
- **Text Primary**: `#1a1a1a`
  - Used for: Headings, primary text
  - RGB: `rgb(26, 26, 26)`

- **Text Secondary**: `#666`
  - Used for: Secondary text, descriptions
  - RGB: `rgb(102, 102, 102)`

- **Text Light**: `#999`
  - Used for: Tertiary text, placeholders
  - RGB: `rgb(153, 153, 153)`

- **Background White**: `#ffffff`
  - Used for: Main background, cards
  - RGB: `rgb(255, 255, 255)`

- **Background Light**: `#f8f9fa`
  - Used for: Section backgrounds, subtle highlights
  - RGB: `rgb(248, 249, 250)`

- **Border Color**: `#e0e0e0`
  - Used for: Borders, dividers
  - RGB: `rgb(224, 224, 224)`

- **Secondary Background**: `#f5f5f5`
  - Used for: Secondary buttons, inactive states
  - RGB: `rgb(245, 245, 245)`

### Status Colors
- **Available Seat**: `#4caf50` (Green)
- **Selected Seat**: `#e50914` (Primary Red)
- **Occupied Seat**: `#e0e0e0` (Gray)
- **Premium Seat**: `#ff9800` (Orange)

---

## Typography

### Font Families
- **Primary Font**: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
  - Used for: Body text, UI elements, buttons
  
- **Heading Font**: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
  - Used for: Headings, titles, emphasis
  - Note: Same family but with different weights

### Font Sizes

#### Desktop
- **Hero Title**: `2.5rem` (40px)
- **Section Title**: `2rem` (32px)
- **Page Title**: `1.8rem` (28.8px)
- **Card Title**: `1.3rem` (20.8px)
- **Movie Title**: `1.1rem` (17.6px)
- **Body Text**: `1rem` (16px)
- **Small Text**: `0.875rem` (14px)
- **Tiny Text**: `0.75rem` (12px)

#### Mobile
- **Hero Title**: `1.8rem` (28.8px)
- **Section Title**: `1.5rem` (24px)
- **Page Title**: `1.5rem` (24px)
- **Card Title**: `1.1rem` (17.6px)
- **Body Text**: `0.95rem` (15.2px)
- **Small Text**: `0.875rem` (14px)

### Font Weights
- **Light**: 300 (not commonly used)
- **Regular**: 400 (body text)
- **Medium**: 500 (navigation, labels)
- **Semi-bold**: 600 (buttons, emphasis)
- **Bold**: 700 (headings, strong emphasis)

### Line Heights
- **Headings**: 1.2
- **Body Text**: 1.6
- **Descriptions**: 1.8

---

## Spacing System

### Base Unit
- **Base**: `1rem` (16px)

### Spacing Scale
- **XS**: `0.25rem` (4px)
- **SM**: `0.5rem` (8px)
- **MD**: `1rem` (16px)
- **LG**: `1.5rem` (24px)
- **XL**: `2rem` (32px)
- **2XL**: `3rem` (48px)
- **3XL**: `4rem` (64px)

### Common Spacing Patterns
- **Card Padding**: `1rem` - `1.5rem`
- **Section Padding**: `2rem` - `3rem`
- **Element Gap**: `1rem` - `1.5rem`
- **Container Max Width**: `1200px`
- **Container Padding**: `20px` (mobile: `15px`)

---

## Components

### Buttons

#### Primary Button
```css
background: #e50914
color: white
padding: 0.75rem 1.5rem
border-radius: 8px
font-weight: 600
```

**States:**
- **Hover**: Darker red (`#c40812`), slight lift (`translateY(-2px)`)
- **Active**: Slightly darker
- **Disabled**: 60% opacity, `cursor: not-allowed`

#### Secondary Button
```css
background: #f5f5f5
color: #1a1a1a
border: 1px solid #e0e0e0
padding: 0.75rem 1.5rem
border-radius: 8px
font-weight: 600
```

**Sizes:**
- **Default**: `0.75rem 1.5rem`
- **Large**: `1rem 2rem`
- **Block**: `width: 100%`

### Cards

#### Movie Card
```css
background: white
border-radius: 12px
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
transition: all 0.3s ease
```

**Hover State:**
- `transform: translateY(-5px)`
- `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15)`

#### Booking Card
```css
background: white
border-radius: 12px
padding: 1.5rem
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
```

### Input Fields

#### Search Input
```css
border: none
border-radius: 50px (container)
padding: 0.75rem 1rem
font-size: 1rem
```

#### Select Dropdown
```css
border: 1px solid #e0e0e0
border-radius: 8px
padding: 0.5rem 1rem
background: white
```

### Badges

#### Rating Badge
```css
background: rgba(0, 0, 0, 0.7)
color: white
padding: 0.25rem 0.75rem
border-radius: 20px
font-size: 0.875rem
font-weight: 600
```

#### Genre Tag
```css
background: rgba(0, 0, 0, 0.7)
color: white
padding: 0.25rem 0.5rem
border-radius: 4px
font-size: 0.75rem
```

---

## Layout

### Grid System
- **Container Max Width**: `1200px`
- **Grid Columns**: Responsive (1-3 columns based on breakpoint)
- **Gap**: `1rem` - `2rem`

### Breakpoints
- **Mobile**: `max-width: 768px`
- **Tablet**: `max-width: 968px`
- **Desktop**: `min-width: 969px`

### Common Layouts

#### Header
- **Height**: Auto (sticky)
- **Padding**: `1rem 0`
- **Background**: White with shadow

#### Hero Section
- **Height**: `500px` (desktop), `400px` (mobile)
- **Overlay**: Gradient from transparent to dark

#### Movie Carousel
- **Card Width**: `220px` (desktop), `180px` (mobile)
- **Gap**: `1.5rem`
- **Scroll**: Horizontal with smooth behavior

---

## Shadows

### Elevation Levels
- **Level 1**: `0 2px 8px rgba(0, 0, 0, 0.1)`
  - Used for: Cards, buttons at rest
  
- **Level 2**: `0 4px 16px rgba(0, 0, 0, 0.15)`
  - Used for: Cards on hover, elevated elements
  
- **Level 3**: `0 4px 20px rgba(0, 0, 0, 0.2)`
  - Used for: Search overlay, modals

---

## Transitions & Animations

### Standard Transition
```css
transition: all 0.3s ease
```

### Common Animations
- **Hover Lift**: `translateY(-2px)` to `translateY(-5px)`
- **Scale on Hover**: `scale(1)` to `scale(1.1)`
- **Fade In**: `opacity: 0` to `opacity: 1`
- **Carousel Slide**: `opacity` transition over `0.8s`

### Animation Durations
- **Fast**: `0.2s`
- **Standard**: `0.3s`
- **Slow**: `0.5s` - `0.8s`

---

## Icons

### Icon Library
- **Font Awesome 6.4.0**
- **Size**: `1rem` - `1.5rem` (context-dependent)

### Common Icons
- **Search**: `fa-search`
- **User**: `fa-user-circle`
- **Notifications**: `fa-bell`
- **Location**: `fa-map-marker-alt`
- **Calendar**: `fa-calendar`
- **Seats**: `fa-chair`
- **Social**: `fa-facebook`, `fa-instagram`, `fa-twitter`

---

## Accessibility

### Color Contrast
- **Text on White**: Meets WCAG AA standards
- **Text on Dark**: White text on dark backgrounds
- **Interactive Elements**: Clear focus states

### Focus States
```css
outline: 2px solid #e50914
outline-offset: 2px
```

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order follows visual hierarchy
- Enter/Space activate buttons and links

---

## Responsive Design Principles

### Mobile First
- Base styles target mobile devices
- Progressive enhancement for larger screens

### Breakpoint Strategy
1. **Mobile** (`< 768px`): Single column, stacked layout
2. **Tablet** (`768px - 968px`): 2-column layouts where appropriate
3. **Desktop** (`> 968px`): Full multi-column layouts

### Touch Targets
- Minimum size: `40px × 40px`
- Adequate spacing between interactive elements
- Swipe gestures for carousels

---

## Logo & Branding

### Logo Design
- **Text**: "RK"
- **Style**: Minimal, flat design
- **Color**: Primary red (`#e50914`)
- **Font**: Bold, letter-spacing: `2px`
- **Size**: `1.8rem` (desktop)

---

## Best Practices

### Do's
✅ Use consistent spacing from the spacing scale
✅ Maintain color consistency across components
✅ Ensure sufficient contrast for readability
✅ Use semantic HTML elements
✅ Provide hover and focus states
✅ Test on multiple devices and screen sizes

### Don'ts
❌ Mix different shadow styles inconsistently
❌ Use colors outside the defined palette
❌ Create custom spacing values
❌ Skip hover/focus states
❌ Ignore mobile experience
❌ Use low contrast text

---

## File Structure

```
rk/
├── index.html          # Home page
├── movie-detail.html   # Movie detail page
├── booking.html        # Booking/seat selection page
├── styles.css          # Main stylesheet
├── script.js           # General JavaScript
├── booking.js          # Booking-specific JavaScript
└── STYLE_GUIDE.md      # This file
```

---

## Version
**1.0.0** - Initial Style Guide
**Last Updated**: December 2024
