/* =========================================================================
   XRP YEARBOOK — home page
   Hero memory-flow + the Sign-the-Ledger pad.
   (SignaturePad lives in sigpad.js, loaded first.)
   ========================================================================= */

/* --- The moving memory-flow ----------------------------------------------
   SWAP THESE for the Las Vegas photos: drop the shots in web/assets/hero/
   and list their paths here. The brand renders stand in for now.          */
const HERO_IMAGES = [
  "../XRP_Yearbook_Brand_Assets_PNG/XRP_Yearbook_Book_Artifact_Concept.png",
  "../XRP_Yearbook_Brand_Assets_PNG/XRP_Yearbook_Hero_Concept.png",
  "../XRP_Yearbook_Brand_Assets_PNG/XRP_Yearbook_Merch_Concept.png",
  "../XRP_Yearbook_Brand_Assets_PNG/XRP_Yearbook_SignatureX_Mark_black.png",
];

const HOLD_MS = 6000; // how long each image rests before the next fades in

function buildFlow() {
  const flow = document.getElementById("flow");
  if (!flow) return;

  const layers = HERO_IMAGES.map((src, i) => {
    const el = document.createElement("div");
    el.className = "layer";
    el.style.backgroundImage = `url("${src}")`;
    el.style.animationDelay = `${i * -5}s`;
    flow.appendChild(el);
    return el;
  });
  if (!layers.length) return;

  let idx = 0;
  layers[0].classList.add("is-visible");
  setInterval(() => {
    layers[idx].classList.remove("is-visible");
    idx = (idx + 1) % layers.length;
    layers[idx].classList.add("is-visible");
  }, HOLD_MS);
}

/* --- Sign the Ledger pad --------------------------------------------------- */
function initPad() {
  const canvas = document.getElementById("sigCanvas");
  const pad = document.getElementById("pad");
  if (!canvas || !pad) return;

  const sig = new SignaturePad(canvas, pad);
  setupStudio(sig, document.querySelector("[data-studio]"));

  document.getElementById("saveBtn").addEventListener("click", () => {
    if (!sig.hasInk) {
      pad.classList.add("nudge");
      setTimeout(() => pad.classList.remove("nudge"), 450);
      return;
    }
    const a = document.createElement("a");
    a.href = sig.export();
    a.download = "my-mark.png";
    a.click();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildFlow();
  initPad();
});
