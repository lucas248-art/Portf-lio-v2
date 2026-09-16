const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const themeToggle = document.getElementById("themeToggle");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
});

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

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("day");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".desktop-nav a");

window.addEventListener("scroll", () => {
  let current = "inicio";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

const hero = document.querySelector(".hero");
hero.addEventListener("pointermove", (e) => {
  const x = (e.clientX / window.innerWidth - .5);
  const y = (e.clientY / window.innerHeight - .5);

  document.querySelectorAll(".swirl").forEach((el, i) => {
    const factor = (i + 1) * 4;
    el.style.marginLeft = `${x * factor}px`;
    el.style.marginTop = `${y * factor}px`;
  });

  document.querySelector(".cypress").style.transform =
    `translate(${x * -8}px, ${y * -4}px)`;
});

hero.addEventListener("pointerleave", () => {
  document.querySelectorAll(".swirl").forEach(el => {
    el.style.marginLeft = "";
    el.style.marginTop = "";
  });
  document.querySelector(".cypress").style.transform = "";
});

