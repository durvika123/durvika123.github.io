// ==============================
// AOS Animation Initialization
// ==============================

AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ==============================
// Typing Animation
// ==============================

var typed = new Typed(".typing", {
    strings: [
        "Information Technology Graduate",
        "Web Developer",
        "Android Developer",
        "Java Programmer",
        "Software Developer"
    ],
    typeSpeed: 70,
    backSpeed: 45,
    backDelay: 1800,
    loop: true
});

// ==============================
// Scroll To Top Button
// ==============================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "flex";
        topBtn.style.alignItems = "center";
        topBtn.style.justifyContent = "center";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

// ==============================
// Navbar Background on Scroll
// ==============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.style.background = "rgba(8,10,25,0.95)";
        header.style.boxShadow = "0 8px 20px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(10,15,30,.80)";
        header.style.boxShadow = "none";

    }

});

// ==============================
// Mobile Menu
// ==============================

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("show");

});

// ==============================
// Close Mobile Menu
// ==============================

document.querySelectorAll("nav ul li a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

    });

});

// ==============================
// Smooth Scroll
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ==============================
// Active Navbar Link
// ==============================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// ==============================
// Project Card Hover Animation
// ==============================

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0) scale(1)";

    });

});

// ==============================
// Skill Card Icon Animation
// ==============================

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        const icon = card.querySelector("i");

        if (icon) {

            icon.style.transform = "rotate(10deg) scale(1.15)";
            icon.style.transition = ".4s";

        }

    });

    card.addEventListener("mouseleave", () => {

        const icon = card.querySelector("i");

        if (icon) {

            icon.style.transform = "rotate(0deg) scale(1)";

        }

    });

});

// ==============================
// Education Card Animation
// ==============================

const educationCards = document.querySelectorAll(".education-card");

educationCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});

// ==============================
// Certificate Card Animation
// ==============================

const certificateCards = document.querySelectorAll(".certificate-card");

certificateCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});

// ==============================
// Footer Year
// ==============================

const footerYear = document.querySelector(".footer-content p");

if (footerYear) {

    footerYear.innerHTML =
        `© ${new Date().getFullYear()} Durvika Wadhe. All Rights Reserved.`;

}

// ==============================
// Console Message
// ==============================

console.log(
    "%cWelcome to Durvika Wadhe's Portfolio 🚀",
    "color:#7c3aed;font-size:18px;font-weight:bold;"
);