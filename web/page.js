/* =========================================================================
   XRP YEARBOOK — personal page ("your page")
   View a page -> sign it -> your mark lands on the wall. The loop, in miniature.
   ========================================================================= */

/* Sample page. In the real app this comes from the ledger + off-chain content. */
const PERSON = {
  name: "Your Name",
  handle: "@yourhandle",
  badges: ["Class of 2026", "XRPL"],
  quote: "We were all here — and we signed to prove it.",
  links: [
    { label: "x.com", href: "#" },
    { label: "the project", href: "#" },
  ],
  // placeholder signers (generic names — real marks replace these on the ledger)
  signers: [
    "A. Rivera", "K. Tanaka", "M. Okafor", "J. Bennett",
    "S. Cole", "L. Marsh", "D. Vega", "R. Nakamura",
    "T. Ellis", "N. Park", "C. Mensah", "B. Hart",
  ],
};

function renderProfile() {
  document.getElementById("pName").textContent = PERSON.name;
  document.getElementById("pHandle").textContent = PERSON.handle;
  document.getElementById("pQuote").textContent = `“${PERSON.quote}”`;
  document.getElementById("signName").textContent = `${PERSON.name}'s page`;

  const badges = document.getElementById("pBadges");
  badges.innerHTML = PERSON.badges.map((b) => `<span class="badge">${b}</span>`).join("");

  const links = document.getElementById("pLinks");
  links.innerHTML = PERSON.links
    .map((l) => `<a href="${l.href}">${l.label} &#8599;</a>`)
    .join("");
}

let signCount = 0;
function setCount(n) {
  signCount = n;
  document.getElementById("signCount").textContent = n;
}

function addNameTile(name) {
  const wall = document.getElementById("wall");
  const tile = document.createElement("div");
  tile.className = "sigtile";
  tile.innerHTML = `<span class="sig-name">${name}</span>`;
  wall.appendChild(tile);
}

function addMarkTile(dataUrl) {
  const wall = document.getElementById("wall");
  const tile = document.createElement("div");
  tile.className = "sigtile sigtile--mark is-new";
  tile.innerHTML = `<img src="${dataUrl}" alt="signature" /><span class="sig-you">you</span>`;
  wall.prepend(tile); // your mark lands at the front
  setCount(signCount + 1);
  tile.scrollIntoView({ behavior: "smooth", block: "center" });
}

function buildWall() {
  PERSON.signers.forEach(addNameTile);
  setCount(PERSON.signers.length);
}

function initPagePad() {
  const canvas = document.getElementById("pageCanvas");
  const pad = document.getElementById("pagePad");
  if (!canvas || !pad) return;

  const sig = new SignaturePad(canvas, pad);
  setupStudio(sig, document.querySelector("[data-studio]"));

  document.getElementById("pageAdd").addEventListener("click", () => {
    if (!sig.hasInk) {
      pad.classList.add("nudge");
      setTimeout(() => pad.classList.remove("nudge"), 450);
      return;
    }
    addMarkTile(sig.export());
    sig.clear();
  });

  // reveal the pad when "Sign this page" is clicked
  const reveal = () => document.getElementById("sign-inline").classList.add("is-open");
  document.getElementById("revealSign").addEventListener("click", reveal);
  document.querySelectorAll('.nav-cta[href="#sign-inline"]').forEach((a) =>
    a.addEventListener("click", reveal)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  buildWall();
  initPagePad();
});
