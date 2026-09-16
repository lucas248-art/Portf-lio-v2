/* =========================================================
   LUCAS.DEV — NOITE ESTRELADA
   CANVAS + ANIMAÇÕES + INTERAÇÕES
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const canvas =
  document.getElementById("starryCanvas");

const ctx =
  canvas.getContext("2d");

const contactCanvas =
  document.getElementById("contactCanvas");

const contactCtx =
  contactCanvas.getContext("2d");


/* =========================================================
   ESTADO
========================================================= */

let width = 0;
let height = 0;

let dpr = 1;

let time = 0;

let mouseX = 0;
let mouseY = 0;

let targetMouseX = 0;
let targetMouseY = 0;


/* =========================================================
   RANDOM
========================================================= */

function randomSeed(seed) {

  const x =
    Math.sin(seed * 9999.91) *
    43758.5453;

  return x -
    Math.floor(x);

}


/* =========================================================
   RESIZE
========================================================= */

function resizeCanvas() {

  const rect =
    canvas.getBoundingClientRect();

  dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  width =
    rect.width;

  height =
    rect.height;

  canvas.width =
    Math.floor(width * dpr);

  canvas.height =
    Math.floor(height * dpr);

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );


  resizeContact();

  createStars();

}


function resizeContact() {

  const rect =
    contactCanvas.getBoundingClientRect();

  contactCanvas.width =
    Math.floor(rect.width * dpr);

  contactCanvas.height =
    Math.floor(rect.height * dpr);

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
      event.clientX /
      window.innerWidth -
      .5;

    targetMouseY =
      event.clientY /
      window.innerHeight -
      .5;


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


/* =========================================================
   STARS
========================================================= */

const stars = [];


function createStars() {

  stars.length = 0;

  const area =
    width * height;

  const amount =
    Math.floor(
      Math.min(
        220,
        Math.max(
          90,
          area / 6500
        )
      )
    );


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    stars.push({

      x:
        randomSeed(
          i * 3.17
        ) *
        width,

      y:
        randomSeed(
          i * 8.71 + 4
        ) *
        height *
        .64,

      radius:
        .55 +
        randomSeed(
          i * 4.23
        ) *
        2.8,

      phase:
        randomSeed(
          i * 7.32
        ) *
        Math.PI *
        2,

      speed:
        .7 +
        randomSeed(
          i * 2.91
        ) *
        1.8,

      brightness:
        .45 +
        randomSeed(
          i * 6.11
        ) *
        .55

    });

  }

}


/* =========================================================
   ESTRELA
========================================================= */

function drawStar(
  x,
  y,
  radius,
  alpha
) {

  ctx.save();

  const glow =
    ctx.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      radius * 7
    );


  glow.addColorStop(
    0,
    `rgba(255,238,158,${alpha})`
  );

  glow.addColorStop(
    .18,
    `rgba(255,213,83,${alpha * .65})`
  );

  glow.addColorStop(
    1,
    "rgba(255,200,50,0)"
  );


  ctx.fillStyle =
    glow;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius * 7,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /* cruz luminosa */

  ctx.strokeStyle =
    `rgba(255,238,166,${alpha})`;

  ctx.lineWidth =
    Math.max(
      .5,
      radius * .23
    );

  ctx.beginPath();

  ctx.moveTo(
    x - radius * 3,
    y
  );

  ctx.lineTo(
    x + radius * 3,
    y
  );

  ctx.moveTo(
    x,
    y - radius * 3
  );

  ctx.lineTo(
    x,
    y + radius * 3
  );

  ctx.stroke();


  /* núcleo */

  ctx.fillStyle =
    `rgba(255,246,198,${Math.min(
      1,
      alpha + .2
    )})`;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();

}


/* =========================================================
   LUA
========================================================= */

function drawMoon() {

  const x =
    width * .76 +
    mouseX * 18;

  const y =
    height * .19 +
    mouseY * 10;

  const radius =
    Math.min(
      width,
      height
    ) * .075;


  /* brilho */

  const glow =
    ctx.createRadialGradient(
      x,
      y,
      radius * .15,
      x,
      y,
      radius * 3.4
    );


  glow.addColorStop(
    0,
    "rgba(255,221,93,.38)"
  );

  glow.addColorStop(
    .3,
    "rgba(255,195,50,.13)"
  );

  glow.addColorStop(
    1,
    "rgba(255,190,40,0)"
  );


  ctx.fillStyle =
    glow;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius * 3.4,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /* lua */

  const moon =
    ctx.createRadialGradient(
      x - radius * .35,
      y - radius * .35,
      radius * .05,
      x,
      y,
      radius
    );


  moon.addColorStop(
    0,
    "#fff5ad"
  );

  moon.addColorStop(
    .55,
    "#f5ca51"
  );

  moon.addColorStop(
    1,
    "#d98527"
  );


  ctx.fillStyle =
    moon;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /* manchas */

  for (
    let i = 0;
    i < 14;
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
      "rgba(160,95,23,.13)";

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
   ESPIRAIS
========================================================= */

function drawSwirl(
  cx,
  cy,
  radius,
  turns,
  color,
  lineWidth,
  speed,
  offset
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


  ctx.strokeStyle =
    color;

  ctx.lineWidth =
    lineWidth;

  ctx.lineCap =
    "round";


  ctx.beginPath();


  const points =
    150;


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

    const radiusNow =
      radius * p;

    const wave =
      Math.sin(
        p * Math.PI * 7 +
        time * .8
      ) *
      7;


    const x =
      cx +
      Math.cos(angle) *
      (radiusNow + wave);

    const y =
      cy +
      Math.sin(angle) *
      (radiusNow * .43 + wave * .4);


    if (i === 0) {

      ctx.moveTo(
        x,
        y
      );

    } else {

      ctx.lineTo(
        x,
        y
      );

    }

  }


  ctx.stroke();

  ctx.restore();

}


/* =========================================================
   CÉU
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
    "#020b22"
  );

  gradient.addColorStop(
    .3,
    "#0b2d61"
  );

  gradient.addColorStop(
    .58,
    "#15507e"
  );

  gradient.addColorStop(
    1,
    "#071a34"
  );


  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );


  /* grandes pinceladas azuis */

  drawSwirl(
    width * .30,
    height * .27,
    width * .47,
    1.8,
    "rgba(48,119,169,.52)",
    28,
    .05,
    0
  );


  drawSwirl(
    width * .42,
    height * .30,
    width * .34,
    2.1,
    "rgba(22,78,130,.75)",
    19,
    -.04,
    2
  );


  drawSwirl(
    width * .12,
    height * .12,
    width * .28,
    1.7,
    "rgba(39,101,156,.62)",
    15,
    .035,
    1
  );


  drawSwirl(
    width * .60,
    height * .15,
    width * .27,
    1.7,
    "rgba(38,104,160,.58)",
    18,
    -.03,
    3
  );


  /* espirais douradas */

  drawSwirl(
    width * .53,
    height * .25,
    width * .23,
    1.55,
    "rgba(240,185,52,.62)",
    9,
    .04,
    1
  );


  drawSwirl(
    width * .69,
    height * .29,
    width * .19,
    1.7,
    "rgba(242,195,68,.48)",
    8,
    -.03,
    4
  );


  drawSwirl(
    width * .80,
    height * .39,
    width * .18,
    1.5,
    "rgba(236,180,50,.43)",
    8,
    .03,
    2
  );

}


/* =========================================================
   TEXTURA DE PINCEL
========================================================= */

function drawBrushTexture() {

  ctx.save();

  ctx.globalAlpha =
    .12;


  for (
    let i = 0;
    i < 130;
    i++
  ) {

    const x =
      randomSeed(
        i * 10.2
      ) *
      width;

    const y =
      randomSeed(
        i * 5.4 + 90
      ) *
      height *
      .65;

    const length =
      15 +
      randomSeed(
        i * 4.2
      ) *
      80;

    const angle =
      Math.sin(
        x * .008 +
        time
      ) *
      .4;


    ctx.strokeStyle =
      i % 3 === 0
        ? "#f2c653"
        : "#4c91b8";


    ctx.lineWidth =
      1 +
      randomSeed(
        i * 8
      ) *
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
   COLINAS
========================================================= */

function drawHills() {

  const horizon =
    height * .64;


  ctx.fillStyle =
    "#0a2947";

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


  /* colina dourada */

  ctx.globalAlpha =
    .3;

  ctx.fillStyle =
    "#b47b2d";

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

  ctx.globalAlpha =
    1;

}


/* =========================================================
   CASAS
========================================================= */

function drawHouse(
  x,
  y,
  w,
  h,
  seed
) {

  ctx.fillStyle =
    "#07172a";

  ctx.fillRect(
    x,
    y - h,
    w,
    h
  );


  /* telhado */

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


  /* janelas */

  const amount =
    Math.max(
      1,
      Math.floor(w / 25)
    );


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const wx =
      x + 9 + i * 20;

    const wy =
      y - h + 18;

    const flicker =
      .67 +
      Math.sin(
        time * 2 +
        seed * i
      ) *
      .12;


    ctx.fillStyle =
      `rgba(255,191,65,${flicker})`;

    ctx.fillRect(
      wx,
      wy,
      7,
      9
    );

  }

}


/* =========================================================
   VILA
========================================================= */

function drawVillage() {

  const ground =
    height * .75;

  const scale =
    Math.max(
      .65,
      Math.min(
        1.15,
        width / 1300
      )
    );


  const houses = [

    [width * .19, ground, 55 * scale, 70 * scale],

    [width * .26, ground + 3, 45 * scale, 55 * scale],

    [width * .32, ground - 2, 62 * scale, 82 * scale],

    [width * .40, ground + 4, 43 * scale, 55 * scale],

    [width * .45, ground, 70 * scale, 75 * scale],

    [width * .53, ground + 4, 48 * scale, 57 * scale],

    [width * .59, ground - 2, 60 * scale, 70 * scale],

    [width * .67, ground + 4, 52 * scale, 62 * scale]

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


  /* igreja */

  const churchX =
    width * .52;

  const churchY =
    ground + 2;


  ctx.fillStyle =
    "#061429";

  ctx.fillRect(
    churchX,
    churchY - 130 * scale,
    90 * scale,
    130 * scale
  );


  /* telhado */

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


  /* torre */

  ctx.fillRect(
    churchX + 30 * scale,
    churchY - 225 * scale,
    30 * scale,
    225 * scale
  );


  /* ponta da torre */

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


  /* janela da igreja */

  ctx.fillStyle =
    "rgba(247,192,69,.8)";

  ctx.fillRect(
    churchX + 38 * scale,
    churchY - 205 * scale,
    14 * scale,
    22 * scale
  );

}


/* =========================================================
   CIPRESTE
========================================================= */

function drawCypress() {

  const baseX =
    width * .075;

  const baseY =
    height;

  const treeHeight =
    Math.min(
      height * .78,
      780
    );


  ctx.save();


  ctx.translate(
    mouseX * -25,
    mouseY * -7
  );


  /* corpo principal */

  const gradient =
    ctx.createLinearGradient(
      baseX,
      baseY - treeHeight,
      baseX,
      baseY
    );


  gradient.addColorStop(
    0,
    "#010711"
  );

  gradient.addColorStop(
    .5,
    "#06151e"
  );

  gradient.addColorStop(
    1,
    "#01080e"
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


  /* pinceladas */

  for (
    let i = 0;
    i < 75;
    i++
  ) {

    const p =
      i / 75;

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
        ? "rgba(20,61,52,.9)"
        : "rgba(4,25,29,.95)";


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
   TEXTURA DO CHÃO
========================================================= */

function drawGroundTexture() {

  const start =
    height * .75;


  for (
    let i = 0;
    i < 100;
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
        ? "rgba(203,146,47,.32)"
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

}


/* =========================================================
   CENA PRINCIPAL
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
          time * star.speed +
          star.phase
        ) *
        .28;


      const x =
        star.x +
        mouseX *
        (8 + star.radius * 5);


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
   CANVAS DO CONTATO
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
    i < 22;
    i++
  ) {

    const y =
      h *
      (.12 + i * .043);

    const amplitude =
      13 +
      i * 2;


    contactCtx.beginPath();


    for (
      let x = -30;
      x <= w + 30;
      x += 10
    ) {

      const wave =
        Math.sin(
          x * .008 +
          time *
          (.2 + i * .015) +
          i
        ) *
        amplitude;


      const yy =
        y + wave;


      if (x === -30) {

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
        ? "rgba(242,198,79,.11)"
        : "rgba(34,100,153,.16)";


    contactCtx.lineWidth =
      4 +
      Math.sin(i) *
      2;


    contactCtx.stroke();

  }

}


/* =========================================================
   ANIMAÇÃO
========================================================= */

function animate() {

  time +=
    .016;


  mouseX =
    mouseX +
    (targetMouseX - mouseX) *
    .045;


  mouseY =
    mouseY +
    (targetMouseY - mouseY) *
    .045;


  drawScene();

  drawContactScene();


  requestAnimationFrame(
    animate
  );

}


/* =========================================================
   HEADER
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
   MENU MOBILE
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

    const open =
      nav.classList.toggle(
        "open"
      );

    menuButton.setAttribute(
      "aria-expanded",
      open
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

          menuButton.setAttribute(
            "aria-expanded",
            "false"
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


const revealObserver =
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

            revealObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold:
        .12
    }
  );


revealElements.forEach(
  (element) => {

    revealObserver.observe(
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
      threshold:
        .45
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
   3D DOS PROJETOS
========================================================= */

const cards =
  document.querySelectorAll(
    ".project-card"
  );


if (
  window.matchMedia(
    "(pointer:fine)"
  ).matches
) {

  cards.forEach(
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
            7;


          const rotateX =
            (y / rect.height - .5) *
            -7;


          card.style.transform =
            `
              perspective(900px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              translateY(-5px)
            `;

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
   PARALLAX DO HERO
========================================================= */

const heroContent =
  document.querySelector(
    ".hero-content"
  );


window.addEventListener(
  "pointermove",
  () => {

    if (
      window.innerWidth <= 700
    ) {

      heroContent.style.transform =
        "";

      return;

    }


    heroContent.style.transform =
      `
        translate(
          ${mouseX * -10}px,
          ${mouseY * -7}px
        )
      `;

  }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function initialize() {

  resizeCanvas();

  updateHeader();

  animate();

}


if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initialize
  );

} else {

  initialize();

    }
