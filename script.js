const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const themeToggle = document.getElementById("themeToggle");

// Navbar
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
});

// Menu mobile
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  menuBtn.textContent = mobileMenu.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

// Alternância de atmosfera
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("day");
});

// Animações ao entrar na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

// Navegação ativa
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".desktop-nav a");

window.addEventListener("scroll", () => {
  let current = "inicio";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );
  });
});

// Parallax das pinceladas
const hero = document.querySelector(".hero");
const swirls = document.querySelectorAll(".swirl");
const cypress = document.querySelector(".cypress");

hero.addEventListener("pointermove", (event) => {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  swirls.forEach((swirl, index) => {
    swirl.style.marginLeft = `${x * (index + 1) * 4}px`;
    swirl.style.marginTop = `${y * (index + 1) * 2}px`;
  });

  cypress.style.translate = `${x * -8}px ${y * -3}px`;
});

hero.addEventListener("pointerleave", () => {
  swirls.forEach(swirl => {
    swirl.style.marginLeft = "";
    swirl.style.marginTop = "";
  });

  cypress.style.translate = "";
});

// Efeito 3D nos cards
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("pointermove", (event) => {
    if (window.innerWidth < 760) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform =
      `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg) translateY(-8px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
