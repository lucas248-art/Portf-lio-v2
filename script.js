/* =========================================================
   LUCAS.DEV — NOITE ESTRELADA
   Canvas + animações + interação
========================================================= */

const canvas = document.getElementById("starryCanvas");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let dpr = 1;

let mouseX = 0.5;
let mouseY = 0.5;

let targetMouseX = 0.5;
let targetMouseY = 0.5;

let scrollProgress = 0;

const stars = [];
const strokes = [];
const windows = [];


/* =========================================================
   RESIZE
========================================================= */

function resizeCanvas() {

  dpr = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  createStars();
  createStrokes();
  createWindows();
}


/* =========================================================
   RANDOM
========================================================= */

function random(min, max) {
  return Math.random() * (max - min) + min;
}


/* =========================================================
   STARS
========================================================= */

function createStars() {

  stars.length = 0;

  const amount = Math.min(
    150,
    Math.floor((width * height) / 8500)
  );

  for (let i = 0; i < amount; i++) {

    stars.push({

      x: Math.random() * width,

      y: Math.random() * height * .62,

      size: random(.5, 2.2),

      phase: random(0, Math.PI * 2),

      speed: random(.5, 1.8),

      gold: Math.random() > .48

    });

  }

}


/* =========================================================
   ESPIRAIS
========================================================= */

function createStrokes() {

  strokes.length = 0;

  const count = width < 700 ? 12 : 22;

  for (let i = 0; i < count; i++) {

    const cx = random(
      width * .25,
      width * .9
    );

    const cy = random(
      height * .08,
      height * .62
    );

    const radius = random(45, 170);

    strokes.push({

      x: cx,
      y: cy,

      radius,

      rotation: random(0, Math.PI * 2),

      speed: random(.0004, .0012),

      width: random(1.5, 4),

      gold: Math.random() > .42,

      phase: random(0, 10)

    });

  }

}


/* =========================================================
   JANELAS
========================================================= */

function createWindows() {

  windows.length = 0;

  for (let i = 0; i < 100; i++) {

    windows.push({

      x: random(width * .3, width * .95),

      y: random(height * .69, height * .9),

      size: random(1.5, 4),

      phase: random(0, 10)

    });

  }

}


/* =========================================================
   FUNDO
========================================================= */

function drawBackground() {

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      0,
      height
    );

  gradient.addColorStop(
    0,
    "#020b1d"
  );

  gradient.addColorStop(
    .48,
    "#062344"
  );

  gradient.addColorStop(
    1,
    "#020812"
  );

  ctx.fillStyle = gradient;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );

}


/* =========================================================
   ESTRELAS
========================================================= */

function drawStars(time) {

  stars.forEach(star => {

    const pulse =
      .55 +
      Math.sin(
        time * .002 * star.speed +
        star.phase
      ) * .45;

    ctx.save();

    ctx.globalAlpha =
      .35 + pulse * .65;

    ctx.fillStyle =
      star.gold
        ? "#ffd45a"
        : "#d8e9ff";

    ctx.shadowBlur =
      star.size > 1.5
        ? 13
        : 5;

    ctx.shadowColor =
      star.gold
        ? "#f5b92e"
        : "#9dcfff";

    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.size * pulse,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

  });

}


/* =========================================================
   ESTRELAS GRANDES
========================================================= */

function drawBigStars(time) {

  const bigStars = [

    {
      x: width * .30,
      y: height * .13,
      r: 25
    },

    {
      x: width * .43,
      y: height * .37,
      r: 20
    },

    {
      x: width * .47,
      y: height * .55,
      r: 27
    },

    {
      x: width * .70,
      y: height * .28,
      r: 17
    }

  ];

  bigStars.forEach((star, index) => {

    const pulse =
      1 +
      Math.sin(time * .0015 + index) * .06;

    drawStarGlow(
      star.x,
      star.y,
      star.r * pulse
    );

  });

}


function drawStarGlow(x, y, radius) {

  const glow =
    ctx.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      radius * 2.8
    );

  glow.addColorStop(
    0,
    "rgba(255,214,91,.95)"
  );

  glow.addColorStop(
    .15,
    "rgba(255,203,64,.7)"
  );

  glow.addColorStop(
    .5,
    "rgba(255,190,50,.12)"
  );

  glow.addColorStop(
    1,
    "transparent"
  );

  ctx.fillStyle = glow;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius * 2.8,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /* núcleo */

  ctx.fillStyle = "#ffe68b";

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius * .42,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /* pinceladas */

  ctx.save();

  ctx.strokeStyle =
    "rgba(255,221,105,.8)";

  ctx.lineWidth = 2;

  for (let i = 0; i < 8; i++) {

    const angle =
      (Math.PI * 2 / 8) * i;

    const inner = radius * .55;
    const outer = radius * 1.3;

    ctx.beginPath();

    ctx.moveTo(
      x + Math.cos(angle) * inner,
      y + Math.sin(angle) * inner
    );

    ctx.lineTo(
      x + Math.cos(angle) * outer,
      y + Math.sin(angle) * outer
    );

    ctx.stroke();

  }

  ctx.restore();

}


/* =========================================================
   LUA
========================================================= */

function drawMoon(time) {

  const x = width * .84;
  const y = height * .16;

  const radius =
    Math.min(width, height) * .075;

  const pulse =
    1 +
    Math.sin(time * .001) * .025;

  const glow =
    ctx.createRadialGradient(
      x,
      y,
      radius * .3,
      x,
      y,
      radius * 3
    );

  glow.addColorStop(
    0,
    "rgba(255,211,76,.45)"
  );

  glow.addColorStop(
    .4,
    "rgba(255,188,40,.15)"
  );

  glow.addColorStop(
    1,
    "transparent"
  );

  ctx.fillStyle = glow;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius * 3,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /* lua */

  const moonGradient =
    ctx.createRadialGradient(
      x - radius * .2,
      y - radius * .2,
      radius * .1,
      x,
      y,
      radius
    );

  moonGradient.addColorStop(
    0,
    "#fff2a7"
  );

  moonGradient.addColorStop(
    .45,
    "#ffd65b"
  );

  moonGradient.addColorStop(
    1,
    "#d9951e"
  );

  ctx.fillStyle = moonGradient;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius * pulse,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /* textura */

  ctx.save();

  ctx.globalAlpha = .35;

  ctx.fillStyle = "#c78c20";

  for (let i = 0; i < 35; i++) {

    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      Math.random() * radius * .7;

    ctx.beginPath();

    ctx.arc(
      x + Math.cos(angle) * distance,
      y + Math.sin(angle) * distance,
      random(1, 4),
      0,
      Math.PI * 2
    );

    ctx.fill();

  }

  ctx.restore();

}


/* =========================================================
   ESPIRAIS DO CÉU
========================================================= */

function drawSwirls(time) {

  strokes.forEach((stroke, index) => {

    const rotation =
      stroke.rotation +
      time * stroke.speed;

    const parallaxX =
      (mouseX - .5) * 20;

    const parallaxY =
      (mouseY - .5) * 15;

    ctx.save();

    ctx.translate(
      stroke.x + parallaxX,
      stroke.y + parallaxY
    );

    ctx.rotate(rotation);

    ctx.beginPath();

    const turns = 1.8;

    for (
      let angle = 0;
      angle < Math.PI * 2 * turns;
      angle += .08
    ) {

      const radius =
        stroke.radius *
        (angle / (Math.PI * 2 * turns));

      const x =
        Math.cos(angle) * radius;

      const y =
        Math.sin(angle) *
        radius *
        .58;

      if (angle === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

    }

    ctx.strokeStyle =
      stroke.gold
        ? "rgba(239,187,55,.45)"
        : "rgba(48,113,171,.5)";

    ctx.lineWidth = stroke.width;

    ctx.lineCap = "round";

    ctx.stroke();

    ctx.restore();

  });

}


/* =========================================================
   PINCELADAS EXTRAS
========================================================= */

function drawBrushTexture(time) {

  ctx.save();

  for (let i = 0; i < 230; i++) {

    const x =
      ((i * 97) % width);

    const y =
      ((i * 53) % (height * .67));

    const wave =
      Math.sin(
        y * .012 +
        time * .0003
      );

    const length =
      7 + Math.sin(i) * 4;

    ctx.strokeStyle =
      i % 3 === 0
        ? "rgba(240,190,52,.28)"
        : "rgba(35,105,164,.32)";

    ctx.lineWidth =
      random(.5, 2);

    ctx.beginPath();

    ctx.moveTo(
      x,
      y
    );

    ctx.lineTo(
      x + length,
      y + wave * 5
    );

    ctx.stroke();

  }

  ctx.restore();

}


/* =========================================================
   MONTANHAS
========================================================= */

function drawMountains() {

  ctx.save();

  ctx.fillStyle = "#06172a";

  ctx.beginPath();

  ctx.moveTo(
    0,
    height * .68
  );

  for (
    let x = 0;
    x <= width;
    x += 30
  ) {

    const y =
      height * .58 +
      Math.sin(x * .008) * 55 +
      Math.sin(x * .021) * 25;

    ctx.lineTo(
      x,
      y
    );

  }

  ctx.lineTo(
    width,
    height
  );

  ctx.lineTo(
    0,
    height
  );

  ctx.closePath();

  ctx.fill();


  /* montanha azul */

  ctx.strokeStyle =
    "rgba(39,99,151,.65)";

  ctx.lineWidth = 6;

  ctx.beginPath();

  for (
    let x = 0;
    x <= width;
    x += 20
  ) {

    const y =
      height * .61 +
      Math.sin(x * .012) * 35 +
      Math.sin(x * .03) * 12;

    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

  }

  ctx.stroke();

  ctx.restore();

}


/* =========================================================
   VILAREJO
========================================================= */

function drawVillage() {

  const baseY = height * .82;

  const houseCount =
    width < 600 ? 20 : 40;

  for (let i = 0; i < houseCount; i++) {

    const x =
      (i / houseCount) *
      width;

    const houseWidth =
      random(20, 55);

    const houseHeight =
      random(35, 90);

    const y =
      baseY -
      houseHeight;

    ctx.fillStyle =
      i % 2
        ? "#07162a"
        : "#091d32";

    ctx.fillRect(
      x,
      y,
      houseWidth,
      houseHeight
    );


    /* telhado */

    ctx.fillStyle =
      "#0b2038";

    ctx.beginPath();

    ctx.moveTo(
      x - 5,
      y
    );

    ctx.lineTo(
      x + houseWidth / 2,
      y - random(10, 25)
    );

    ctx.lineTo(
      x + houseWidth + 5,
      y
    );

    ctx.closePath();

    ctx.fill();

  }


  /* janelas */

  windows.forEach((win, index) => {

    const flicker =
      .65 +
      Math.sin(
        performance.now() * .002 +
        win.phase
      ) * .25;

    ctx.globalAlpha = flicker;

    ctx.fillStyle =
      index % 4 === 0
        ? "#ffd86a"
        : "#eeb53c";

    ctx.fillRect(
      win.x,
      win.y,
      win.size,
      win.size * 1.7
    );

  });

  ctx.globalAlpha = 1;

}


/* =========================================================
   IGREJA
========================================================= */

function drawChurch() {

  const x = width * .60;

  const baseY = height * .82;

  const churchWidth = 75;

  const churchHeight = 110;

  ctx.fillStyle = "#071a30";

  ctx.fillRect(
    x,
    baseY - churchHeight,
    churchWidth,
    churchHeight
  );


  /* telhado */

  ctx.beginPath();

  ctx.moveTo(
    x - 12,
    baseY - churchHeight
  );

  ctx.lineTo(
    x + churchWidth / 2,
    baseY - churchHeight - 32
  );

  ctx.lineTo(
    x + churchWidth + 12,
    baseY - churchHeight
  );

  ctx.closePath();

  ctx.fill();


  /* torre */

  ctx.beginPath();

  ctx.moveTo(
    x + 27,
    baseY - churchHeight
  );

  ctx.lineTo(
    x + churchWidth / 2,
    baseY - churchHeight - 150
  );

  ctx.lineTo(
    x + 48,
    baseY - churchHeight
  );

  ctx.closePath();

  ctx.fillStyle = "#09203a";

  ctx.fill();


  /* luz */

  ctx.fillStyle = "#f5c94e";

  ctx.fillRect(
    x + 30,
    baseY - 68,
    7,
    10
  );

}


/* =========================================================
   CIPRESTE
========================================================= */

function drawCypress() {

  const baseX =
    width < 700
      ? width * .13
      : width * .30;

  const baseY =
    height;

  const treeHeight =
    height *
    (width < 700 ? .58 : .82);

  ctx.save();

  ctx.translate(
    baseX,
    baseY
  );


  /* sombra principal */

  const gradient =
    ctx.createLinearGradient(
      0,
      -treeHeight,
      0,
      0
    );

  gradient.addColorStop(
    0,
    "#02080b"
  );

  gradient.addColorStop(
    .5,
    "#03100f"
  );

  gradient.addColorStop(
    1,
    "#061713"
  );

  ctx.fillStyle = gradient;

  ctx.beginPath();

  ctx.moveTo(0, 0);

  const steps = 45;

  for (let i = 0; i <= steps; i++) {

    const p = i / steps;

    const y =
      -treeHeight * p;

    const spread =
      Math.pow(p, .7) *
      (width < 700 ? 90 : 170);

    const wobble =
      Math.sin(p * 30) * 25;

    ctx.lineTo(
      -spread + wobble,
      y
    );

  }

  for (let i = steps; i >= 0; i--) {

    const p = i / steps;

    const y =
      -treeHeight * p;

    const spread =
      Math.pow(p, .7) *
      (width < 700 ? 90 : 170);

    const wobble =
      Math.sin(p * 27 + 2) * 25;

    ctx.lineTo(
      spread + wobble,
      y
    );

  }

  ctx.closePath();

  ctx.fill();


  /* pinceladas do cipreste */

  for (let i = 0; i < 85; i++) {

    const y =
      -Math.random() *
      treeHeight;

    const p =
      Math.abs(y) /
      treeHeight;

    const spread =
      p * 150;

    const x =
      random(-spread, spread);

    ctx.strokeStyle =
      Math.random() > .45
        ? "rgba(75,94,37,.55)"
        : "rgba(180,128,35,.28)";

    ctx.lineWidth =
      random(1, 4);

    ctx.beginPath();

    ctx.moveTo(
      x,
      y
    );

    ctx.lineTo(
      x + random(-8, 8),
      y + random(15, 45)
    );

    ctx.stroke();

  }

  ctx.restore();

}


/* =========================================================
   CHÃO
========================================================= */

function drawGround() {

  const y = height * .86;

  const gradient =
    ctx.createLinearGradient(
      0,
      y,
      0,
      height
    );

  gradient.addColorStop(
    0,
    "#071426"
  );

  gradient.addColorStop(
    1,
    "#01050c"
  );

  ctx.fillStyle = gradient;

  ctx.fillRect(
    0,
    y,
    width,
    height - y
  );


  /* pinceladas */

  ctx.save();

  for (let i = 0; i < 70; i++) {

    const x =
      random(0, width);

    const yy =
      random(y, height);

    ctx.strokeStyle =
      i % 2
        ? "rgba(35,81,117,.35)"
        : "rgba(197,148,41,.2)";

    ctx.lineWidth =
      random(1, 3);

    ctx.beginPath();

    ctx.moveTo(
      x,
      yy
    );

    ctx.lineTo(
      x + random(5, 30),
      yy + random(-2, 2)
    );

    ctx.stroke();

  }

  ctx.restore();

}


/* =========================================================
   ANIMAÇÃO PRINCIPAL
========================================================= */

function animate(time = 0) {

  mouseX +=
    (targetMouseX - mouseX) * .035;

  mouseY +=
    (targetMouseY - mouseY) * .035;


  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  drawBackground();

  drawStars(time);

  drawBigStars(time);

  drawMoon(time);

  drawSwirls(time);

  drawBrushTexture(time);

  drawMountains();

  drawVillage();

  drawChurch();

  drawGround();

  drawCypress();


  requestAnimationFrame(animate);

}


/* =========================================================
   MOUSE PARALLAX
========================================================= */

window.addEventListener(
  "pointermove",
  event => {

    targetMouseX =
      event.clientX /
      window.innerWidth;

    targetMouseY =
      event.clientY /
      window.innerHeight;

  }
);


/* =========================================================
   SCROLL
========================================================= */

window.addEventListener(
  "scroll",
  () => {

    const max =
      document.documentElement.scrollHeight -
      window.innerHeight;

    scrollProgress =
      max > 0
        ? window.scrollY / max
        : 0;

    document
      .querySelector(".navbar")
      .classList.toggle(
        "scrolled",
        window.scrollY > 30
      );

  }
);


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton =
  document.getElementById("menuButton");

const navLinks =
  document.querySelector(".nav-links");

menuButton.addEventListener(
  "click",
  () => {

    navLinks.classList.toggle("open");

  }
);


document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        navLinks.classList.remove("open");

      }
    );

  });


/* =========================================================
   REVEAL
========================================================= */

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

        }

      });

    },

    {
      threshold: .12
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach(element => {

    revealObserver.observe(element);

  });


/* =========================================================
   ACTIVE NAV
========================================================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navAnchors =
  document.querySelectorAll(
    ".nav-links a"
  );

const sideDots =
  document.querySelectorAll(
    ".side-dot"
  );


const sectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        const id =
          entry.target.id;


        navAnchors.forEach(anchor => {

          anchor.classList.toggle(
            "active",
            anchor.getAttribute("href") === `#${id}`
          );

        });


        sideDots.forEach(dot => {

          dot.classList.toggle(
            "active",
            dot.getAttribute("href") === `#${id}`
          );

        });

      });

    },

    {
      threshold: .45
    }
  );


sections.forEach(section => {

  sectionObserver.observe(section);

});


/* =========================================================
   TILT DOS PROJETOS
========================================================= */

document
  .querySelectorAll(".project-card")
  .forEach(card => {

    card.addEventListener(
      "pointermove",
      event => {

        if (window.innerWidth < 800) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateY =
          ((x / rect.width) - .5) * 7;

        const rotateX =
          ((y / rect.height) - .5) * -7;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-8px)`;

      }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        card.style.transform = "";

      }
    );

  });


/* =========================================================
   CONTACT CANVAS
========================================================= */

const contactCanvas =
  document.getElementById("contactCanvas");

const contactCtx =
  contactCanvas.getContext("2d");


function resizeContact() {

  contactCanvas.width =
    window.innerWidth *
    Math.min(window.devicePixelRatio || 1, 2);

  contactCanvas.height =
    contactCanvas.offsetHeight *
    Math.min(window.devicePixelRatio || 1, 2);

}


function drawContact(time) {

  const w =
    contactCanvas.width;

  const h =
    contactCanvas.height;

  contactCtx.clearRect(
    0,
    0,
    w,
    h
  );

  contactCtx.save();

  contactCtx.lineWidth = 2;

  for (let i = 0; i < 12; i++) {

    contactCtx.beginPath();

    const y =
      h * (.15 + i * .07);

    for (
      let x = 0;
      x <= w;
      x += 15
    ) {

      const wave =
        Math.sin(
          x * .004 +
          time * .0004 +
          i
        ) * 25;

      if (x === 0) {

        contactCtx.moveTo(
          x,
          y + wave
        );

      } else {

        contactCtx.lineTo(
          x,
          y + wave
        );

      }

    }

    contactCtx.strokeStyle =
      i % 2
        ? "rgba(245,200,76,.15)"
        : "rgba(42,105,158,.2)";

    contactCtx.stroke();

  }

  contactCtx.restore();

  requestAnimationFrame(
    drawContact
  );

}


/* =========================================================
   THEME / ATMOSFERA
========================================================= */

const themeButton =
  document.getElementById("themeButton");

let warmMode = false;

themeButton.addEventListener(
  "click",
  () => {

    warmMode =
      !warmMode;

    document.body.classList.toggle(
      "warm-mode",
      warmMode
    );

  }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

resizeCanvas();

resizeContact();

window.addEventListener(
  "resize",
  () => {

    resizeCanvas();

    resizeContact();

  }
);

animate();

drawContact();
