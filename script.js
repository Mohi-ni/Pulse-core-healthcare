// @ts-nocheck
// ===============================
// PulseCore Hospital - script.js
// Shared across all pages
// ===============================

// ----- Page fade-in on load -----
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

// ----- Smooth page transitions between tabs -----
document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // ignore links that open in a new tab or point outside the site
    if (this.target === "_blank" || href.startsWith("http")) return;

    e.preventDefault();
    document.body.classList.remove("loaded");
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
});

// ----- Mobile Menu Toggle -----
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// ----- Navbar + Back to top button -----
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (backToTop) {
    if (window.scrollY > 60) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ----- Animated Counters (About page) -----
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function startCounters() {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    const increment = target / 80;

    const update = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current).toLocaleString();
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    update();
  });
}

if (counters.length > 0) {
  const statsSection = document.querySelector(".about-stats");
  window.addEventListener("scroll", () => {
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 100;
    if (inView && !countersStarted) {
      countersStarted = true;
      startCounters();
    }
  });
}

// ----- Testimonial Slider (Home page) -----
const track = document.getElementById("testimonialTrack");
const dotsWrap = document.getElementById("testimonialDots");

if (track && dotsWrap) {
  const slides = document.querySelectorAll(".testimonial-card");
  let currentSlide = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });

  const dots = document.querySelectorAll(".testimonial-dots span");

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }

  setInterval(nextSlide, 5000);
}

// ----- Appointment Form Validation + Confirmation (Appointment page) -----
const form = document.getElementById("appointmentForm");

// duty doctor and available hours per department — used to populate the
// confirmation card once a booking is submitted
const dutyRoster = {
  "Cardiology": { doctor: "Dr. Ananya Sharma", schedule: "Mon, Wed, Fri • 10:00 AM – 1:00 PM" },
  "Neurology": { doctor: "Dr. Rohit Verma", schedule: "Tue, Thu, Sat • 11:00 AM – 2:00 PM" },
  "Orthopedics": { doctor: "Dr. Arjun Mehta", schedule: "Mon–Sat • 9:00 AM – 12:00 PM" },
  "Gynecology": { doctor: "Dr. Priya Nair", schedule: "Mon, Tue, Thu • 2:00 PM – 5:00 PM" },
  "Pediatrics": { doctor: "Dr. Meera Iyer", schedule: "Mon–Sat • 4:00 PM – 7:00 PM" },
  "General Medicine": { doctor: "Dr. Sanjay Kapoor", schedule: "All Days • 9:00 AM – 8:00 PM" },
};

if (form) {
  const confirmationCard = document.getElementById("confirmationCard");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const department = document.getElementById("department");
    const date = document.getElementById("date");

    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    const deptError = document.getElementById("deptError");
    const dateError = document.getElementById("dateError");

    [nameError, phoneError, deptError, dateError].forEach((el) => (el.textContent = ""));

    if (name.value.trim().length < 3) {
      nameError.textContent = "Please enter your full name.";
      isValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone.value.trim())) {
      phoneError.textContent = "Enter a valid 10-digit phone number.";
      isValid = false;
    }

    if (department.value === "") {
      deptError.textContent = "Please select a department.";
      isValid = false;
    }

    if (date.value === "") {
      dateError.textContent = "Please choose a preferred date.";
      isValid = false;
    }

    if (!isValid) return;

    // format the date nicely, e.g. "Saturday, September 12, 2026"
    const [year, month, day] = date.value.split("-").map(Number);
    const prettyDate = new Date(year, month - 1, day).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const roster = dutyRoster[department.value];

    document.getElementById("confirmName").textContent = name.value.trim();
    document.getElementById("confirmDate").textContent = prettyDate;
    document.getElementById("confirmDept").textContent = department.value;
    document.getElementById("confirmDoctor").textContent = roster.doctor;
    document.getElementById("confirmSchedule").textContent = roster.schedule;

    form.hidden = true;
    confirmationCard.hidden = false;

    if (typeof gsap !== "undefined") {
      gsap.from(confirmationCard, { opacity: 0, y: 16, duration: 0.5 });
    }
  });

  const bookAnotherBtn = document.getElementById("bookAnotherBtn");
  if (bookAnotherBtn) {
    bookAnotherBtn.addEventListener("click", () => {
      confirmationCard.hidden = true;
      form.hidden = false;
      form.reset();
    });
  }
}

// ----- FAQ Accordion -----
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    faqItems.forEach((other) => other.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// ----- Doctor Department Filter (Doctors page) -----
const filterPills = document.querySelectorAll(".filter-pill");
const doctorCards = document.querySelectorAll(".doctor-card");

if (filterPills.length > 0 && doctorCards.length > 0) {
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      const selected = pill.getAttribute("data-filter");
      doctorCards.forEach((card) => {
        const matches = selected === "all" || card.getAttribute("data-department") === selected;
        card.classList.toggle("hidden-by-filter", !matches);
      });
    });
  });
}

// ----- GSAP Animations -----
gsap.registerPlugin(ScrollTrigger);

// One orchestrated hero entrance sequence (home page only) — a single
// timeline instead of scattered fade-ins, so it reads as one deliberate moment.
if (document.querySelector(".hero")) {
  const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });
  heroTl
    .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.5 })
    .from(".hero-text h1", { opacity: 0, y: 24, duration: 0.6 }, "-=0.3")
    .from(".hero-desc", { opacity: 0, y: 20, duration: 0.5 }, "-=0.35")
    .from(".hero-btns", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
    .from(".hero-visual .blob", { scale: 0.8, opacity: 0, duration: 0.7 }, "-=0.6")
    .from(".hero-visual img", { opacity: 0, duration: 0.6 }, "-=0.5")
    .from(".hero-badge", { opacity: 0, y: 16, duration: 0.4 }, "-=0.2");
}

// inner-page header — a quieter version of the same idea
if (document.querySelector(".page-header")) {
  gsap.from(".page-header h1", { opacity: 0, y: 18, duration: 0.55 });
  gsap.from(".page-header p", { opacity: 0, y: 18, duration: 0.55, delay: 0.1 });
}

// The one scroll-triggered moment on the page: the About stats count up
// as the row scrolls into view (this doubles as the counter start signal
// so the numbers and the motion happen together, not decoration on top).
if (document.querySelector(".about-stats")) {
  gsap.from(".about-stats .stat", {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.08,
    scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
  });
}