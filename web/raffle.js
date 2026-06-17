/* =========================================================================
   XRP YEARBOOK — The Class Draw (front-end demo)
   Open to all of XRPL. Earn Ink, contribute prizes (with art), transparent
   Contribution Board, multi-winner ceremony, Class Seal (provably fair).
   ========================================================================= */

const COVER_IMG = "../XRP_Yearbook_Brand_Assets_PNG/XRP_Yearbook_Book_Artifact_Concept.png";

const ACTIONS = [
  { id: "claim",  group: "class",  label: "Claim Your Page",        sub: "identity — a big boost",     ink: 80, done: false },
  { id: "sign",   group: "class",  label: "Sign the Ledger",        sub: "showing up is what matters", ink: 50, done: false },
  { id: "crest",  group: "class",  label: "Hold Your Crest",        sub: "+5 Ink/day · 7 days held",   ink: 35, done: false },
  { id: "repost", group: "social", label: "Repost the Class Space", sub: "on X",                       ink: 25, done: false },
  { id: "ig",     group: "social", label: "Share to Instagram",     sub: "story or post",              ink: 15, done: false },
  { id: "fb",     group: "social", label: "Share to Facebook",      sub: "spread it",                  ink: 15, done: false },
  { id: "like",   group: "social", label: "Like the Class post",    sub: "quick one",                  ink: 10, done: false },
];

const STAGES = [
  { t: "What this is", b: "A provably-fair draw, open to everyone on XRPL. Earn Ink by showing up and sharing, win class artifacts. Fun on the surface, fair underneath." },
  { t: "Who can enter", b: "Everyone. You don't need a Yearbook page — any XRPL wallet, any community, is welcome." },
  { t: "Earn Ink", b: "Two ways: Class Actions (claim a page, sign the ledger) and Social Actions (repost, like, share on X, Instagram, Facebook). Each Ink Point = one chance." },
  { t: "Contribute a prize (optional)", b: "Got an NFT? Drop it into the Community Prize Pool with its art. Your collection gets seen by the whole Class, more people win, and you earn Ink for giving back." },
  { t: "Watch the Contribution Board", b: "Everything is public — who contributed prizes, who showed up, and where you stand on Ink. No hidden hands." },
  { t: "Sign in to the draw", b: "Lock your Ink into this round. More Ink, better odds — but everyone in has a real shot." },
  { t: "The Page Flip Ceremony", b: "At the end of the round the draw runs as a ceremony: pages flip, and it lands on multiple winners, weighted by Ink." },
  { t: "The Class Seal", b: "The random seed is anchored to the XRP Ledger. Recompute it and you land on the same winners. No rig, no insider, no take." },
  { t: "Claim & celebrate", b: "Winners' wallets receive the NFTs on XRPL, and we announce every winner on X. Congrats to the whole list." },
];

const NAMES = ["A. Rivera","K. Tanaka","M. Okafor","J. Bennett","S. Cole","L. Marsh","D. Vega","R. Nakamura","T. Ellis","N. Park","C. Mensah","B. Hart","Q. Diaz","F. Lowe","P. Sato","G. Ahmed","H. Boateng","I. Rossi"];
let pool = NAMES.map((name) => ({ name, ink: 30 + ((name.charCodeAt(0) + name.length * 7) % 110) }));
let prizes = [
  { coll: "Reef Wardens", name: "#214",     by: "@reefwardens", img: null },
  { coll: "Ledger Foxes", name: "Gold #07", by: "@ledgerfoxes", img: null },
  { coll: "Night Koi",    name: "#1888",    by: "@nightkoi",    img: null },
];
let youIn = false;
let contribBonus = 0;
let pendingImg = null;
const MILESTONE = 200;
const WINNERS = 12;

const el = (id) => document.getElementById(id);
const yourInk = () => ACTIONS.filter((a) => a.done).reduce((n, a) => n + a.ink, 0) + contribBonus;
const poolInk = () => pool.reduce((n, p) => n + p.ink, 0);
const phImg = (label) => `<span class="rf-img-ph"><img class="rf-ph-mark" src="../XRP_Yearbook_Brand_Assets_PNG/XRP_Yearbook_SignatureX_Mark_transparent.png" alt="" aria-hidden="true"><span>${label}</span></span>`;

/* ---- actions ---- */
function renderTasks() {
  const draw = (group, host) => {
    el(host).innerHTML = ACTIONS.filter((a) => a.group === group).map((a) => `
      <button type="button" class="rf-task" data-task="${a.id}">
        <span class="rf-check" aria-hidden="true"></span>
        <span class="rf-task-main"><b>${a.label}</b><i>${a.sub}</i></span>
        <span class="rf-task-pts">+${a.ink} Ink</span>
      </button>`).join("");
    el(host).querySelectorAll(".rf-task").forEach((b) =>
      b.addEventListener("click", () => toggleAction(b.dataset.task, b)));
  };
  draw("class", "rfClassTasks");
  draw("social", "rfSocialTasks");
}

function toggleAction(id, btn) {
  if (youIn) return;
  const a = ACTIONS.find((x) => x.id === id);
  a.done = !a.done;
  btn.classList.toggle("is-done", a.done);
  inkSplash(a.done ? a.ink : -a.ink);
  updateInk();
  updateButton();
}

function inkSplash(amount) {
  const bar = document.querySelector(".rf-inkbar");
  const s = document.createElement("span");
  s.className = "rf-splash" + (amount < 0 ? " neg" : "");
  s.textContent = (amount > 0 ? "+" : "") + amount + " Ink";
  bar.appendChild(s);
  setTimeout(() => s.remove(), 900);
}

function updateInk() {
  el("yourInk").textContent = yourInk();
  el("inkFill").style.width = Math.min(100, (yourInk() / MILESTONE) * 100) + "%";
}

function updateButton() {
  const btn = el("rfEnterBtn"), note = el("rfNote");
  if (youIn) {
    btn.textContent = "You're in this Class Draw"; btn.disabled = true;
    note.textContent = `${yourInk()} Ink Points locked for this round. Everyone in has a real shot — more ink, better odds.`;
  } else if (yourInk() > 0) {
    btn.textContent = "Sign In to the Draw"; btn.disabled = false;
    note.textContent = `Your Ink: ${yourInk()} chances this round.`;
  } else {
    btn.textContent = "Earn Ink to Join"; btn.disabled = false;
    note.textContent = "Claiming and signing are worth the most — showing up is the whole point.";
  }
}

function signIn() {
  if (youIn) return;
  if (yourInk() === 0) { el("rfClassTasks").scrollIntoView({ behavior: "smooth", block: "center" }); return; }
  pool.unshift({ name: "You", ink: yourInk(), you: true });
  youIn = true;
  renderPool(); renderBoard(); updateButton();
  document.querySelectorAll(".rf-task").forEach((b) => b.classList.add("is-locked"));
}

/* ---- pool + prizes + board ---- */
function renderPool() {
  el("poolInk").textContent = poolInk().toLocaleString();
  el("poolPeople").textContent = pool.length.toLocaleString();
}

function renderPrizes(newFirst) {
  el("poolGrid").innerHTML = prizes.map((p, i) => `
    <div class="rf-pool-card${newFirst && i === 0 ? " is-new" : ""}">
      <div class="rf-pc-img">${p.img ? `<img src="${p.img}" alt="${p.coll} ${p.name}">` : phImg("no preview yet")}</div>
      <div class="rf-pc-name">${p.name}</div>
      <div class="rf-pc-coll">${p.coll}</div>
      <div class="rf-pc-by">added by ${p.by}</div>
    </div>`).join("");
}

function renderBoard() {
  el("boardContributors").innerHTML = prizes.map((p) => `
    <div class="rf-brow${p.by === "you" ? " is-you" : ""}">
      <span class="rf-brow-who">${p.by}</span>
      <span class="rf-brow-what">${p.coll} · ${p.name}</span>
    </div>`).join("");

  const ranked = pool.slice().sort((a, b) => b.ink - a.ink);
  const top = ranked.slice(0, 10);
  if (youIn && !top.some((p) => p.you)) { const you = ranked.find((p) => p.you); if (you) top.push(you); }
  el("boardStandings").innerHTML = top.map((p) => `
    <div class="rf-brow${p.you ? " is-you" : ""}">
      <span class="rf-brow-rank">${ranked.indexOf(p) + 1}</span>
      <span class="rf-brow-who">${p.name}</span>
      <span class="rf-brow-ink">${p.ink} Ink</span>
    </div>`).join("");
}

/* ---- ceremony (multi-winner, deterministic from the seal seed) ---- */
function pickWinners(seed, count) {
  let working = pool.map((p) => ({ ...p }));
  const winners = [];
  let s = seed;
  for (let k = 0; k < count && working.length; k++) {
    const total = working.reduce((n, p) => n + p.ink, 0);
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    let r = s % total;
    let idx = working.findIndex((p) => (r -= p.ink) < 0);
    if (idx < 0) idx = 0;
    winners.push(working[idx]);
    working.splice(idx, 1);
  }
  return winners;
}

function prizeFor(i) {
  if (i === 0) return "Sealed Cover — Grand Prize";
  const p = prizes[i - 1];
  return p ? `${p.coll} ${p.name}` : "Honor Roll Badge";
}
function prizeImgFor(i) {
  if (i === 0) return COVER_IMG;
  const p = prizes[i - 1];
  return p && p.img ? p.img : null;
}

function ceremony() {
  const total = poolInk();
  if (!total) return;
  const seed = Math.floor(Math.random() * 1e9);
  const winners = pickWinners(seed, Math.min(WINNERS, pool.length));

  const stage = el("rfStage");
  el("rfDrawBtn").disabled = true;
  el("rfSeal").innerHTML = "";

  const reel = [];
  for (let i = 0; i < 12; i++) reel.push(pool[(seed + i * 7) % pool.length]);

  let i = 0;
  (function flip() {
    const p = reel[i];
    stage.innerHTML = `<div class="rf-page"><span class="rf-page-name">${p.name}</span><span class="rf-page-ink">${p.ink} Ink</span></div>`;
    i++;
    if (i < reel.length) setTimeout(flip, 70 + i * i * 2.6);
    else setTimeout(() => revealWinners(winners, seed, total), 450);
  })();
}

function revealWinners(winners, seed, total) {
  const cards = winners.map((w, i) => {
    const img = prizeImgFor(i);
    const thumb = img ? `<img class="rf-wthumb" src="${img}" alt="">` : `<span class="rf-wthumb rf-wthumb-ph"></span>`;
    return `<div class="rf-wcard${i === 0 ? " is-grand" : ""}${w.you ? " is-you" : ""}">
        ${thumb}
        <div class="rf-wtext"><div class="rf-wname">${w.name}</div><div class="rf-wprize">${prizeFor(i)}</div></div>
      </div>`;
  }).join("");

  el("rfStage").innerHTML = `
    <div class="rf-winners">
      <div class="rf-winners-title">Congratulations to this month's winners</div>
      <div class="rf-winners-sub">${winners.length} winners · drawn from ${total.toLocaleString()} Ink across the Class</div>
      <div class="rf-wgrid">${cards}</div>
      <button type="button" class="btn btn-gold btn-sm rf-announce" id="announceBtn">Announce on X</button>
    </div>`;

  const tweet = encodeURIComponent(`Congratulations to this month's XRP Yearbook Class Draw winners 🎓\n\n${winners.length} winners, drawn fair and sealed on the XRP Ledger. Earn your ink, win the cover.`);
  el("announceBtn").addEventListener("click", () => window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank", "noopener"));

  const ledger = 89000000 + (seed % 900000);
  el("rfSeal").innerHTML = `
    <button type="button" class="rf-sealbadge" id="sealBadge">✦ Class Seal · verify fairness</button>
    <div class="rf-sealbody" id="sealBody">
      <div class="rf-sealrow"><span>Seed</span><span class="mono">0x${seed.toString(16)}</span></div>
      <div class="rf-sealrow"><span>Source</span><span class="mono">XRPL ledger #${ledger.toLocaleString()}</span></div>
      <div class="rf-sealrow"><span>Method</span><span class="mono">winners = seed → weighted, no repeats</span></div>
      <p>Anchored to the XRP Ledger. The Class Seal is your verifiable seed — recompute it and you land on the same winners, in the same order. Fun on the surface, fair underneath.</p>
    </div>`;
  el("sealBadge").addEventListener("click", () => el("sealBody").classList.toggle("show"));
  el("rfDrawBtn").textContent = "Run it again";
  el("rfDrawBtn").disabled = false;
}

/* ---- modals + upload ---- */
const openModal = (id) => { el(id).hidden = false; };
const closeModal = (id) => { el(id).hidden = true; };
function renderStages() {
  el("howStages").innerHTML = STAGES.map((s) => `<li><b>${s.t}</b><p>${s.b}</p></li>`).join("");
}
function handleImageFile(e) {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = () => { pendingImg = reader.result; el("cPreview").innerHTML = `<img src="${pendingImg}" alt="preview">`; };
  reader.readAsDataURL(f);
}
function contribute() {
  const coll = el("cCollection").value.trim() || "Your Collection";
  const name = el("cName").value.trim() || "#1";
  prizes.unshift({ coll, name, by: "you", img: pendingImg });
  renderPrizes(true); renderBoard();
  contribBonus += 20;
  updateInk(); updateButton(); inkSplash(20);
  el("cCollection").value = ""; el("cName").value = ""; el("cImage").value = "";
  el("cPreview").innerHTML = ""; pendingImg = null;
  closeModal("contribModal");
}

function contributeXRP() {
  const sel = el("xrpAmount");
  const ink = parseInt(sel.options[sel.selectedIndex].dataset.ink, 10);
  const xrp = sel.value;
  contribBonus += ink;
  updateInk(); updateButton(); inkSplash(ink);
  el("rfNote").textContent = `Thanks — ${xrp} XRP contributed for +${ink} Ink. The free quests always stay open.`;
}

/* ---- countdown ---- */
function startCountdown() {
  const target = new Date("2026-09-21T00:00:00Z").getTime();
  const tick = () => {
    const d = target - Date.now();
    el("rfCountdown").textContent = d <= 0 ? "now" : `${Math.floor(d / 86400000)}d ${Math.floor((d % 86400000) / 3600000)}h`;
  };
  tick(); setInterval(tick, 60000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderTasks(); renderPool(); renderPrizes(false); renderBoard(); renderStages();
  updateInk(); updateButton(); startCountdown();

  el("rfEnterBtn").addEventListener("click", signIn);
  el("rfDrawBtn").addEventListener("click", ceremony);
  el("howBtn").addEventListener("click", () => openModal("howModal"));
  el("howClose").addEventListener("click", () => closeModal("howModal"));
  el("contribBtn").addEventListener("click", () => openModal("contribModal"));
  el("contribClose").addEventListener("click", () => closeModal("contribModal"));
  el("contribSubmit").addEventListener("click", contribute);
  el("cImage").addEventListener("change", handleImageFile);
  el("xrpContribBtn").addEventListener("click", contributeXRP);
  document.querySelectorAll(".rf-modal").forEach((m) =>
    m.addEventListener("click", (e) => { if (e.target === m) m.hidden = true; }));
});
