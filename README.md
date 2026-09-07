# PulseCore Hospital — Multi-Page Website

**Industry:** Healthcare (Hospital)

**Objective:** A modern, responsive, multi-page hospital website built for the SuuSri AI
Week 2 web development task, with separate pages for each section and smooth tab-style
transitions between them.

## Technologies Used
- HTML5 — semantic structure, 7 separate pages
- CSS3 — Flexbox & Grid layout, responsive design, custom properties
- JavaScript (ES6+) — mobile menu, testimonial slider, counters, form validation, page transitions
- GSAP + ScrollTrigger — hero/page-header entrance animation and scroll-based reveals

## Pages
| Page | File | Contents |
|---|---|---|
| Home | `index.html` | Hero, Why Choose Us, Testimonials, CTA banner |
| About | `about.html` | About text, animated stats, mission/approach/promise |
| Departments | `departments.html` | Services grid + Facilities grid |
| Doctors | `doctors.html` | Doctor profile cards |
| Packages | `packages.html` | Health check-up pricing cards |
| Appointment | `appointment.html` | Appointment form with validation |
| Contact | `contact.html` | Contact info + embedded map |

## Features
- Shared navbar across all pages with an active-page indicator
- Smooth fade transition when switching between pages (no jarring page reloads)
- Sticky navbar with mobile hamburger menu
- Animated statistic counters (About page)
- Auto-playing testimonial slider with clickable dots (Home page)
- Appointment form with client-side validation (name, phone, department, date)
- Back-to-top button on every page
- Fully responsive: Desktop → Tablet → Mobile

## GSAP Animations Used
- Hero / page-header fade-slide entrance on load
- Scroll-triggered fade-in-up reveal for cards and content blocks (`ScrollTrigger`)

## How It Works — Page Transitions
Clicking any internal nav link fades the current page out (`fade-out` class), waits
300ms, then navigates to the new page. Each page fades back in on load (`loaded` class
added on `DOMContentLoaded`). This is done with plain CSS `opacity` transitions and a
small JS listener in `script.js` — no external library needed.

## How to Run
1. Download this folder.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox).
3. Click through the nav tabs — no build step or server required.

## Folder Structure
```
pulsecore-site/
├── index.html
├── about.html
├── departments.html
├── doctors.html
├── packages.html
├── appointment.html
├── contact.html
├── style.css
├── script.js
└── README.md
```

## Developer Info
- Developer: Mohini
- Task: SuuSri AI Week 2 — Industry-Based Website Development (Healthcare track)
