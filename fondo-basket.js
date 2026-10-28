/* Fondo animado de pelotas de básquet - Rapibasket Cañete
   Uso: <script src="fondo-basket.js" defer></script> antes de </body> */
(function () {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>" +
    "<circle cx='50' cy='50' r='47' fill='#F26B1D'/>" +
    "<g fill='none' stroke='#1a0d05' stroke-width='3'>" +
    "<circle cx='50' cy='50' r='47'/>" +
    "<path d='M50 3V97M3 50H97'/>" +
    "<path d='M16 16C35 33 35 67 16 84M84 16C65 33 65 67 84 84'/>" +
    "</g></svg>";
  const url = "url(\"data:image/svg+xml," + encodeURIComponent(svg) + "\")";

  const css = `
    #basket-bg{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none}
    #basket-bg .bb{position:absolute;left:0;will-change:translate;
      animation:bbx linear infinite}
    #basket-bg .bi{width:100%;height:100%;background:${url} center/contain no-repeat;
      animation:bbspin linear infinite, bbbob ease-in-out infinite alternate}
    @keyframes bbx{from{translate:-20vw 0}to{translate:120vw 0}}
    @keyframes bbspin{from{rotate:0deg}to{rotate:720deg}}
    @keyframes bbbob{from{transform:translateY(-14px)}to{transform:translateY(14px)}}
    /* secciones que tenían fondo sólido y tapaban las pelotas */
    html{background:#070D24 !important}
    body{background:transparent !important}
    #resultados, main.bg-surface{background:transparent !important}
    @media (prefers-reduced-motion: reduce){
      #basket-bg .bb,#basket-bg .bi{animation:none}
      #basket-bg .bb{translate:var(--x,40vw) 0}
    }`;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const layer = document.createElement("div");
  layer.id = "basket-bg";
  layer.setAttribute("aria-hidden", "true");

  const rand = (a, b) => a + Math.random() * (b - a);
  const N = window.innerWidth < 640 ? 7 : 12;

  for (let i = 0; i < N; i++) {
    const size = rand(36, 120);
    const dur = rand(28, 60);
    const op = 0.08 + (size / 120) * 0.12; // más grande = más visible
    const ball = document.createElement("div");
    ball.className = "bb";
    ball.style.cssText =
      `top:${rand(2, 92)}%;width:${size}px;height:${size}px;` +
      `opacity:${op.toFixed(2)};` +
      (size < 55 ? "filter:blur(1.5px);" : "") +
      `animation-duration:${dur}s;animation-delay:-${rand(0, dur)}s;` +
      `--x:${rand(0, 100)}vw;`;

    const inner = document.createElement("div");
    inner.className = "bi";
    inner.style.animationDuration = `${rand(14, 30)}s, ${rand(3, 6)}s`;
    ball.appendChild(inner);
    layer.appendChild(ball);
  }

  document.body.prepend(layer);
})();