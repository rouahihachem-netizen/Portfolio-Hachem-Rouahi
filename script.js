const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0; else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0; else if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < 180; i++) stars.push(new Star());
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
});

initStars();
animateStars();


// Animation au scroll (apparition fluide des sections)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.8s ease-out";
    observer.observe(section);
});

// Navbar scroll + lien actif
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener("scroll", () => {
    // Scrolled style
    if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Lien actif
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) {
            a.classList.add('active');
        }
    });
});

// EmailJS
emailjs.init("gq5KjgmTmy0A-urzA");

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const btn = document.getElementById("sendBtn");
    const status = document.getElementById("formStatus");
    btn.disabled = true;
    document.getElementById("btnText").textContent = "Envoi en cours...";

    emailjs.send("service_f9wueux", "template_70hndkm", {
        from_name:  document.getElementById("from_name").value,
        from_email: document.getElementById("from_email").value,
        subject:    document.getElementById("subject").value,
        message:    document.getElementById("message").value,
    }).then(() => {
        status.style.display = "block";
        status.style.color = "#00c6ff";
        status.textContent = "✅ Message envoyé avec succès !";
        document.getElementById("contactForm").reset();
        btn.disabled = false;
        document.getElementById("btnText").textContent = "Envoyer le message";
    }).catch((err) => {
        status.style.display = "block";
        status.style.color = "#ff6b6b";
        status.textContent = "❌ Erreur, veuillez réessayer.";
        btn.disabled = false;
        document.getElementById("btnText").textContent = "Envoyer le message";
        console.error("EmailJS error:", err);
    });
});

document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
});