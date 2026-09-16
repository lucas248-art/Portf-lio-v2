/* =========================================================
   LUCAS.DEV — NOITE ESTRELADA
   JAVASCRIPT
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

const canvas =
  document.getElementById("starryCanvas");

const ctx =
  canvas.getContext("2d");

const contactCanvas =
  document.getElementById("contactCanvas");

const contactCtx =
  contactCanvas.getContext("2d");


let width = 0;
let height = 0;
let dpr = 1;

let mouseX = 0;
let mouseY = 0;

let targetMouseX = 0;
let targetMouseY = 0;

let scrollY = 0;

let time = 0;


/* =========================================================
   RANDOM SEEDED
========================================================= */

function randomSeed(seed) {

  const x =
    Math.sin(seed * 9999.91) *
    43758.5453;

  return x - Math.floor(x);

}


/* =========================================================
   RESIZE
========================================================= */

function resizeCanvas() {

  const rect =
    canvas.getBoundingClientRect();

  dpr =
    Math.min(window.devicePixelRatio || 1, 2);

  width = rect.width;
  height = rect.height;

  canvas.width =
    width * dpr;

  canvas.height =
    height * dpr;

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

  resizeContactCanvas();

}

function resizeContactCanvas() {

  const rect =
    contactCanvas.getBoundingClientRect();

  contactCanvas.width =
    rect.width * dpr;

  contactCanvas.height =
    rect.height * dpr;

  contactCtx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

}

window.addEventListener(
  "resize",
  resizeCanvas
);


/* =========================================================
   MOUSE
========================================================= */

window.addEventListener(
  "pointermove",
  (event) => {

    targetMouseX =
      event.clientX / window.innerWidth - .5;

    targetMouseY =
      event.clientY / window.innerHeight - .5;

    const glow =
      document.querySelector(
        ".cursor-glow"
      );

    if (glow) {

      glow.style.left =
        `${event.clientX}px`;

      glow.style.top =
        `${event.clientY}px`;

    }

  }
);


window.addEventListener(
  "scroll",
  () => {

    scrollY =
      window.scrollY;

  }
);


/* =========================================================
   INTERPOLAÇÃO
========================================================= */

function lerp(a, b, amount) {

  return a +
    (b - a) * amount;

}


/* =========================================================
   STARS
========================================================= */

const stars = [];

function createStars() {

  stars.length = 0;

  const count =
    Math.floor(
      Math.min(
        190,
        Math.max(
          90,
          width * height / 8000
        )
      )
    );

  for (
    let i = 0;
    i < count;
    i++
  ) {

    stars.push({

      x:
        randomSeed(i * 3.1) *
        width,

      y:
        randomSeed(i * 8.7 + 4) *
        height *
        .62,

      radius:
        .6 +
        randomSeed(i * 4.2) *
        2.5,

      phase:
        randomSeed(i * 7.3) *
        Math.PI * 2,

      speed:
        .7 +
        randomSeed(i * 2.9) *
        1.8,

      brightness:
        .45 +
        randomSeed(i * 6.1) *
        .55

    });

  }

}


/* =========================================================
   STAR GLOW
========================================================= */

function drawStar(
  x,
  y,
  radius,
  alpha,
  rotation = 0
) {

  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(rotation);

  const glow =
    ctx.createRadialGradient(
      0,
      0,
      0,
      0,
      0,
      radius * 6
    );

  glow.addColorStop(
    0,
    `rgba(255,231,140,${alpha})`
  );

  glow.addColorStop(
    .2,
    `rgba(255,211,90,${alpha * .7})`
  );

  glow.addColorStop(
    1,
    "rgba(255,210,80,0)"
  );

  ctx.fillStyle = glow;

  ctx.beginPath();

  ctx.arc(
    0,
    0,
    radius * 6,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.strokeStyle =
    `rgba(255,237,161,${alpha})`;

  ctx.lineWidth =
    Math.max(.5, radius * .25);

  ctx.beginPath();

  ctx.moveTo(
    -radius * 3,
    0
  );

  ctx.lineTo(
    radius * 3,
    0
  );

  ctx.moveTo(
    0,
    -radius * 3
  );

  ctx.lineTo(
    0,
    radius * 3
  );

  ctx.stroke();


  ctx.fillStyle =
    `rgba(255,244,190,${Math.min(1, alpha + .2)})`;

  ctx.beginPath();

  ctx.arc(
    0,
    0,
    radius,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();

}


/* =========================================================
   MOON
========================================================= */

function drawMoon() {

  const baseX =
    width * .76;

  const baseY =
    height * .18;

  const parallaxX =
    mouseX * 18;

  const parallaxY =
    mouseY * 10;

  const x =
    baseX + parallaxX;

  const y =
    baseY + parallaxY;

  const radius =
    Math.min(width, height) *
    .075;


  /* outer glow */

  const glow =
    ctx.createRadialGradient(
      x,
      y,
      radius * .2,
      x,
      y,
      radius * 3
    );

  glow.addColorStop(
    0,
    "rgba(255,211,87,.35)"
  );

  glow.addColorStop(
    .3,
    "rgba(255,190,60,.12)"
  );

  glow.addColorStop(
    1,
    "rgba(255,190,60,0)"
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


  /* moon */

  const moon =
    ctx.createRadialGradient(
      x - radius * .3,
      y - radius * .3,
      radius * .05,
      x,
      y,
      radius
    );

  moon.addColorStop(
    0,
    "#fff3a9"
  );

  moon.addColorStop(
    .55,
    "#f4c94f"
  );

  moon.addColorStop(
    1,
    "#d78929"
  );

  ctx.fillStyle = moon;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /* moon texture */

  for (
    let i = 0;
    i < 12;
    i++
  ) {

    const angle =
      randomSeed(i + 20) *
      Math.PI * 2;

    const distance =
      randomSeed(i + 30) *
      radius * .65;

    const cx =
      x +
      Math.cos(angle) *
      distance;

    const cy =
      y +
      Math.sin(angle) *
      distance;

    const r =
      2 +
      randomSeed(i + 40) *
      radius * .08;

    ctx.fillStyle =
      "rgba(172,105,28,.15)";

    ctx.beginPath();

    ctx.arc(
      cx,
      cy,
      r,
      0,
      Math.PI * 2
    );

    ctx.fill();

  }

}


/* =========================================================
   SWIRLING SKY
========================================================= */

function drawSwirl(
  cx,
  cy,
  radius,
  turns,
  color,
  lineWidth,
  speed,
  offset = 0
) {

  ctx.save();

  ctx.translate(
    mouseX * 15,
    mouseY * 8
  );

  ctx.rotate(
    time * speed +
    offset
  );


  ctx.strokeStyle = color;

  ctx.lineWidth =
    lineWidth;

  ctx.lineCap =
    "round";

  ctx.beginPath();


  const points =
    130;

  for (
    let i = 0;
    i <= points;
    i++
  ) {

    const p =
      i / points;

    const angle =
      p *
      Math.PI *
      2 *
      turns;

    const r =
      radius *
      p;

    const wave =
      Math.sin(
        p * Math.PI * 6 +
        time * .8
      ) *
      7;

    const x =
      cx +
      Math.cos(angle) *
      (r + wave);

    const y =
      cy +
      Math.sin(angle) *
      (r * .42 + wave * .4);

    if (i === 0) {

      ctx.moveTo(x, y);

    } else {

      ctx.lineTo(x, y);

    }

  }

  ctx.stroke();

  ctx.restore();

}


/* =========================================================
   SKY
========================================================= */

function drawSky() {

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      0,
      height
    );

  gradient.addColorStop(
    0,
    "#020c25"
  );

  gradient.addColorStop(
    .35,
    "#0b2f62"
  );

  gradient.addColorStop(
    .67,
    "#154b78"
  );

  gradient.addColorStop(
    1,
    "#071a35"
  );

  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );


  /* huge blue paint bands */

  drawSwirl(
    width * .32,
    height * .28,
    width * .43,
    1.8,
    "rgba(51,120,169,.52)",
    26,
    .05,
    0
  );

  drawSwirl(
    width * .43,
    height * .32,
    width * .30,
    2.1,
    "rgba(24,81,131,.8)",
    18,
    -.04,
    2
  );

  drawSwirl(
    width * .17,
    height * .13,
    width * .25,
    1.7,
    "rgba(43,101,153,.6)",
    14,
    .03,
    1
  );

  drawSwirl(
    width * .59,
    height * .16,
    width * .25,
    1.6,
    "rgba(35,99,153,.6)",
    17,
    -.035,
    3
  );


  /* gold currents */

  drawSwirl(
    width * .53,
    height * .26,
    width * .21,
    1.5,
    "rgba(238,180,57,.65)",
    8,
    .04,
    1
  );

  drawSwirl(
    width * .69,
    height * .29,
    width * .17,
    1.7,
    "rgba(241,193,66,.48)",
    7,
    -.03,
    4
  );

  drawSwirl(
    width * .80,
    height * .38,
    width * .18,
    1.5,
    "rgba(232,176,50,.45)",
    8,
    .03,
    2
  );

}


/* =========================================================
   PAINT BRUSH STROKES
========================================================= */

function drawBrushTexture() {

  ctx.save();

  ctx.globalAlpha =
    .14;

  for (
    let i = 0;
    i < 110;
    i++
  ) {

    const x =
      randomSeed(i * 10.2) *
      width;

    const y =
      randomSeed(i * 5.4 + 90) *
      height *
      .65;

    const length =
      15 +
      randomSeed(i * 4.2) *
      75;

    const angle =
      Math.sin(
        x * .008 +
        time
      ) *
      .4;

    ctx.strokeStyle =
      i % 3 === 0
        ? "#f2c653"
        : "#4a8bb4";

    ctx.lineWidth =
      1 +
      randomSeed(i * 8) *
      3;

    ctx.beginPath();

    ctx.moveTo(
      x,
      y
    );

    ctx.lineTo(
      x +
      Math.cos(angle) *
      length,

      y +
      Math.sin(angle) *
      length
    );

    ctx.stroke();

  }

  ctx.restore();

}


/* =========================================================
   HILLS
========================================================= */

function drawHills() {

  const horizon =
    height * .64;

  ctx.fillStyle =
    "#0b2947";

  ctx.beginPath();

  ctx.moveTo(
    0,
    horizon + 70
  );

  ctx.bezierCurveTo(
    width * .15,
    horizon - 10,
    width * .28,
    horizon + 70,
    width * .43,
    horizon + 5
  );

  ctx.bezierCurveTo(
    width * .58,
    horizon - 50,
    width * .72,
    horizon + 45,
    width,
    horizon - 20
  );

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


  /* golden hill */

  ctx.fillStyle =
    "#b37b32";

  ctx.globalAlpha =
    .28;

  ctx.beginPath();

  ctx.moveTo(
    0,
    horizon + 35
  );

  ctx.bezierCurveTo(
    width * .25,
    horizon - 10,
    width * .37,
    horizon + 55,
    width * .58,
    horizon + 15
  );

  ctx.bezierCurveTo(
    width * .73,
    horizon - 10,
    width * .86,
    horizon + 25,
    width,
    horizon
  );

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

  ctx.globalAlpha = 1;

}


/* =========================================================
   VILLAGE
========================================================= */

function drawHouse(
  x,
  y,
  w,
  h,
  seed
) {

  ctx.fillStyle =
    "#08182c";

  ctx.fillRect(
    x,
    y - h,
    w,
    h
  );


  /* roof */

  ctx.beginPath();

  ctx.moveTo(
    x - 5,
    y - h
  );

  ctx.lineTo(
    x + w / 2,
    y - h - w * .32
  );

  ctx.lineTo(
    x + w + 5,
    y - h
  );

  ctx.closePath();

  ctx.fill();


  /* windows */

  const windows =
    Math.max(
      1,
      Math.floor(w / 25)
    );

  for (
    let i = 0;
    i < windows;
    i++
  ) {

    const wx =
      x +
      9 +
      i * 20;

    const wy =
      y -
      h +
      18;

    const flicker =
      .65 +
      Math.sin(
        time * 2 +
        seed * i
      ) *
      .12;

    ctx.fillStyle =
      `rgba(255,191,68,${flicker})`;

    ctx.fillRect(
      wx,
      wy,
      7,
      9
    );

  }

}


/* =========================================================
   VILLAGE SCENE
========================================================= */

function drawVillage() {

  const ground =
    height * .75;

  const scale =
    Math.max(
      .7,
      Math.min(
        1.2,
        width / 1300
      )
    );


  const houses = [
    [width * .20, ground, 55 * scale, 70 * scale],
    [width * .27, ground + 3, 45 * scale, 55 * scale],
    [width * .33, ground - 2, 62 * scale, 82 * scale],
    [width * .41, ground + 4, 43 * scale, 55 * scale],
    [width * .46, ground, 70 * scale, 75 * scale],
    [width * .54, ground + 4, 48 * scale, 57 * scale],
    [width * .60, ground - 2, 60 * scale, 70 * scale],
    [width * .68, ground + 4, 52 * scale, 62 * scale]
  ];


  houses.forEach(
    (house, index) => {

      drawHouse(
        house[0],
        house[1],
        house[2],
        house[3],
        index
      );

    }
  );


  /* church */

  const churchX =
    width * .53;

  const churchY =
    ground + 2;

  ctx.fillStyle =
    "#07152a";

  ctx.fillRect(
    churchX,
    churchY - 130 * scale,
    90 * scale,
    130 * scale
  );


  /* church roof */

  ctx.beginPath();

  ctx.moveTo(
    churchX - 8,
    churchY - 130 * scale
  );

  ctx.lineTo(
    churchX + 45 * scale,
    churchY - 165 * scale
  );

  ctx.lineTo(
    churchX + 98 * scale,
    churchY - 130 * scale
  );

  ctx.closePath();

  ctx.fill();


  /* tower */

  ctx.fillRect(
    churchX + 30 * scale,
    churchY - 225 * scale,
    30 * scale,
    225 * scale
  );


  /* tower roof */

  ctx.beginPath();

  ctx.moveTo(
    churchX + 25 * scale,
    churchY - 225 * scale
  );

  ctx.lineTo(
    churchX + 45 * scale,
    churchY - 270 * scale
  );

  ctx.lineTo(
    churchX + 65 * scale,
    churchY - 225 * scale
  );

  ctx.closePath();

  ctx.fill();


  /* church windows */

  ctx.fillStyle =
    "rgba(246,190,68,.8)";

  ctx.fillRect(
    churchX + 38 * scale,
    churchY - 205 * scale,
    14 * scale,
    22 * scale
  );

}


/* =========================================================
   CYPRESS TREE
========================================================= */

function drawCypress() {

  const baseX =
    width * .075;

  const baseY =
    height;

  const treeHeight =
    Math.min(
      height * .76,
      760
    );

  const parallax =
    mouseX * -28;

  ctx.save();

  ctx.translate(
    parallax,
    mouseY * -8
  );


  /* dark silhouette */

  const gradient =
    ctx.createLinearGradient(
      baseX,
      baseY - treeHeight,
      baseX,
      baseY
    );

  gradient.addColorStop(
    0,
    "#020b17"
  );

  gradient.addColorStop(
    .5,
    "#06151d"
  );

  gradient.addColorStop(
    1,
    "#010811"
  );

  ctx.fillStyle =
    gradient;

  ctx.beginPath();

  ctx.moveTo(
    baseX,
    baseY
  );

  ctx.bezierCurveTo(
    baseX - 55,
    baseY - treeHeight * .2,
    baseX - 22,
    baseY - treeHeight * .34,
    baseX - 30,
    baseY - treeHeight * .52
  );

  ctx.bezierCurveTo(
    baseX - 5,
    baseY - treeHeight * .68,
    baseX - 35,
    baseY - treeHeight * .78,
    baseX + 3,
    baseY - treeHeight
  );

  ctx.bezierCurveTo(
    baseX + 45,
    baseY - treeHeight * .78,
    baseX + 30,
    baseY - treeHeight * .6,
    baseX + 42,
    baseY - treeHeight * .4
  );

  ctx.bezierCurveTo(
    baseX + 55,
    baseY - treeHeight * .18,
    baseX + 38,
    baseY - treeHeight * .06,
    baseX + 52,
    baseY
  );

  ctx.closePath();

  ctx.fill();


  /* painterly branches */

  for (
    let i = 0;
    i < 70;
    i++
  ) {

    const p =
      i / 70;

    const y =
      baseY -
      treeHeight *
      (.08 + p * .87);

    const center =
      baseX +
      Math.sin(
        p * 9 +
        time * .15
      ) *
      20;

    const spread =
      (1 - p) *
      50 +
      8;

    ctx.strokeStyle =
      i % 3 === 0
        ? "rgba(17,51,47,.9)"
        : "rgba(5,25,29,.9)";

    ctx.lineWidth =
      3 +
      randomSeed(i) *
      8;

    ctx.beginPath();

    ctx.moveTo(
      center,
      y
    );

    ctx.quadraticCurveTo(
      center - spread,
      y - 10,
      center - spread * .3,
      y - 25
    );

    ctx.stroke();

  }

  ctx.restore();

}


/* =========================================================
   GROUND BRUSHES
========================================================= */

function drawGroundTexture() {

  const start =
    height * .75;

  ctx.save();

  for (
    let i = 0;
    i < 90;
    i++
  ) {

    const x =
      randomSeed(i * 3) *
      width;

    const y =
      start +
      randomSeed(i * 7) *
      height *
      .25;

    const length =
      15 +
      randomSeed(i * 8) *
      80;

    ctx.strokeStyle =
      i % 4 === 0
        ? "rgba(203,146,47,.35)"
        : "rgba(24,67,82,.5)";

    ctx.lineWidth =
      1 +
      randomSeed(i * 2) *
      3;

    ctx.beginPath();

    ctx.moveTo(
      x,
      y
    );

    ctx.lineTo(
      x + length,
      y - 3
    );

    ctx.stroke();

  }

  ctx.restore();

}


/* =========================================================
   DRAW SCENE
========================================================= */

function drawScene() {

  ctx.clearRect(
    0,
    0,
    width,
    height
  );

  drawSky();

  /* estrelas */

  stars.forEach(
    (star) => {

      const pulse =
        .72 +
        Math.sin(
          time *
          star.speed +
          star.phase
        ) *
        .28;

      const x =
        star.x +
        mouseX *
        (10 + star.radius * 5);

      const y =
        star.y +
        mouseY *
        5;

      drawStar(
        x,
        y,
        star.radius,
        star.brightness *
        pulse
      );

    }
  );


  drawMoon();

  drawBrushTexture();

  drawHills();

  drawVillage();

  drawGroundTexture();

  drawCypress();

}


/* =========================================================
   CONTACT CANVAS
========================================================= */

function drawContactScene() {

  const w =
    contactCanvas.width / dpr;

  const h =
    contactCanvas.height / dpr;

  contactCtx.clearRect(
    0,
    0,
    w,
    h
  );


  for (
    let i = 0;
    i < 18;
    i++
  ) {

    const y =
      h *
      (.15 + i * .045);

    const amplitude =
      15 +
      i * 2;

    contactCtx.beginPath();

    for (
      let x = -20;
      x <= w + 20;
      x += 10
    ) {

      const wave =
        Math.sin(
          x * .008 +
          time * (.2 + i * .015) +
          i
        ) *
        amplitude;

      const yy =
        y + wave;

      if (x === -20) {

        contactCtx.moveTo(
          x,
          yy
        );

      } else {

        contactCtx.lineTo(
          x,
          yy
        );

      }

    }

    contactCtx.strokeStyle =
      i % 3 === 0
        ? "rgba(243,201,95,.12)"
        : "rgba(34,100,153,.16)";

    contactCtx.lineWidth =
      4 +
      Math.sin(i) *
      2;

    contactCtx.stroke();

  }

}


/* =========================================================
   ANIMATION
========================================================= */

function animate() {

  time += .016;

  mouseX =
    lerp(
      mouseX,
      targetMouseX,
      .045
    );

  mouseY =
    lerp(
      mouseY,
      targetMouseY,
      .045
    );

  drawScene();

  drawContactScene();

  requestAnimationFrame(
    animate
  );

}


/* =========================================================
   HEADER SCROLL
========================================================= */

const header =
  document.getElementById(
    "header"
  );

function updateHeader() {

  if (
    window.scrollY > 40
  ) {

    header.classList.add(
      "scrolled"
    );

  } else {

    header.classList.remove(
      "scrolled"
    );

  }

}

window.addEventListener(
  "scroll",
  updateHeader
);


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
  document.getElementById(
    "menuButton"
  );

const nav =
  document.getElementById(
    "nav"
  );

menuButton.addEventListener(
  "click",
  () => {

    nav.classList.toggle(
      "open"
    );

  }
);


document
  .querySelectorAll(".nav-link")
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove(
            "open"
          );

        }
      );

    }
  );


/* =========================================================
   REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );

const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold: .12
    }
  );


revealElements.forEach(
  (element) => {

    observer.observe(
      element
    );

  }
);


/* =========================================================
   ACTIVE NAV
========================================================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".nav-link"
  );


const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            navLinks.forEach(
              (link) => {

                link.classList.remove(
                  "active"
                );

                if (
                  link.getAttribute(
                    "href"
                  ) ===
                  `#${entry.target.id}`
                ) {

                  link.classList.add(
                    "active"
                  );

                }

              }
            );

          }

        }
      );

    },
    {
      threshold: .45
    }
  );


sections.forEach(
  (section) => {

    sectionObserver.observe(
      section
    );

  }
);


/* =========================================================
   PROJECT CARD 3D
========================================================= */

const projectCards =
  document.querySelectorAll(
    ".project-card"
  );


if (
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  projectCards.forEach(
    (card) => {

      card.addEventListener(
        "pointermove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;

          const rotateY =
            (x / rect.width - .5) *
            8;

          const rotateX =
            (y / rect.height - .5) *
            -8;

          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

        }
      );


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.transform =
            "";

        }
      );

    }
  );

}


/* =========================================================
   HERO TEXT PARALLAX
========================================================= */

const heroContent =
  document.querySelector(
    ".hero-content"
  );


window.addEventListener(
  "pointermove",
  () => {

    if (
      window.innerWidth < 700
    ) {

      return;

    }

    heroContent.style.transform =
      `translate(
        ${mouseX * -10}px,
        ${mouseY * -7}px
      )`;

  }
);


/* =========================================================
   INITIALIZE
========================================================= */

resizeCanvas();

createStars();

updateHeader();

animate();
