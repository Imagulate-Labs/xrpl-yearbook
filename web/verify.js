/* =========================================================================
   PROOF OF CLASS — page logic.
   Loads the sealed Class of 2026, anchors its root, and lets anyone verify
   it (or tamper with it and watch the proof fail).
   ========================================================================= */

const CLASS_2026 = {
  classId: "2026",
  sealedAt: "2026-09-21T00:00:00Z",
  pages: [
    { pageId: "p-anel",   owner: "rAneL7q4...", handle: "Anel",   contentRef: "ipfs://bafy...anel" },
    { pageId: "p-mira",   owner: "rMira22h...", handle: "Mira",   contentRef: "ipfs://bafy...mira" },
    { pageId: "p-okafor", owner: "rOkaf9zz...", handle: "Okafor", contentRef: "ipfs://bafy...okaf" },
    { pageId: "p-cole",   owner: "rCole5kk...", handle: "Cole",   contentRef: "ipfs://bafy...cole" },
    { pageId: "p-vega",   owner: "rVega8mm...", handle: "Vega",   contentRef: "ipfs://bafy...vega" },
    { pageId: "p-hart",   owner: "rHart3nn...", handle: "Hart",   contentRef: "ipfs://bafy...hart" },
  ],
  signatures: [
    { sigId: "s01", pageId: "p-anel",   signer: "Mira",   messageRef: "ipfs://m01", signedAt: "2026-05-02T18:11Z" },
    { sigId: "s02", pageId: "p-anel",   signer: "Cole",   messageRef: "ipfs://m02", signedAt: "2026-05-03T09:24Z" },
    { sigId: "s03", pageId: "p-mira",   signer: "Anel",   messageRef: "ipfs://m03", signedAt: "2026-05-03T21:40Z" },
    { sigId: "s04", pageId: "p-mira",   signer: "Okafor", messageRef: "ipfs://m04", signedAt: "2026-05-05T14:02Z" },
    { sigId: "s05", pageId: "p-okafor", signer: "Vega",   messageRef: "ipfs://m05", signedAt: "2026-05-06T11:33Z" },
    { sigId: "s06", pageId: "p-okafor", signer: "Hart",   messageRef: "ipfs://m06", signedAt: "2026-05-07T19:55Z" },
    { sigId: "s07", pageId: "p-cole",   signer: "Mira",   messageRef: "ipfs://m07", signedAt: "2026-05-08T08:10Z" },
    { sigId: "s08", pageId: "p-vega",   signer: "Anel",   messageRef: "ipfs://m08", signedAt: "2026-05-09T16:46Z" },
    { sigId: "s09", pageId: "p-vega",   signer: "Cole",   messageRef: "ipfs://m09", signedAt: "2026-05-10T13:27Z" },
    { sigId: "s10", pageId: "p-hart",   signer: "Okafor", messageRef: "ipfs://m10", signedAt: "2026-05-11T22:05Z" },
    { sigId: "s11", pageId: "p-hart",   signer: "Vega",   messageRef: "ipfs://m11", signedAt: "2026-05-12T10:18Z" },
    { sigId: "s12", pageId: "p-anel",   signer: "Hart",   messageRef: "ipfs://m12", signedAt: "2026-05-13T20:39Z" },
  ],
};

let ANCHORED_ROOT = null;
const el = (id) => document.getElementById(id);
const shortHash = (h) => h.slice(0, 10) + "…" + h.slice(-8);

function runSelfTest() {
  const known = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
  const ok = hex(sha256Bytes(utf8("abc"))) === known;
  const b = el("selftest");
  b.textContent = ok ? "SHA-256 self-test: PASS" : "SHA-256 self-test: FAIL — serve over localhost";
  b.className = "selftest " + (ok ? "ok" : "bad");
  return ok;
}

function seal() {
  const r = computeClassRoot(CLASS_2026);
  ANCHORED_ROOT = r.rootHex;
  el("anchoredRoot").textContent = r.rootHex;
  el("anchorTx").textContent = "sealClass · XRPL Testnet · tx " + shortHash(r.rootHex).toUpperCase();
  el("pageCount").textContent = CLASS_2026.pages.length;
  el("sigCount").textContent = CLASS_2026.signatures.length;
  el("leafCount").textContent = r.entries.length;
  el("classData").value = JSON.stringify(CLASS_2026, null, 2);

  el("leafSelect").innerHTML = r.entries
    .slice()
    .sort((a, b) => (a.label < b.label ? -1 : 1))
    .map((en) => `<option value="${en.leafHex}">${en.label}</option>`)
    .join("");
}

function showBanner(ok, recomputed) {
  const banner = el("banner");
  banner.style.display = "block";
  banner.className = "banner " + (ok ? "banner--ok" : "banner--bad");
  banner.innerHTML = ok
    ? `<b>VERIFIED.</b> The recomputed root matches the sealed ledger root. The Class of 2026 is authentic, complete, and unaltered since the seal.<br><span class="mono">${recomputed}</span>`
    : `<b>TAMPERED.</b> The recomputed root does <u>not</u> match the sealed ledger root — something was added, removed, or changed after the seal.<br><span class="mono">${recomputed}</span>`;
}

function verify() {
  let cls;
  try { cls = JSON.parse(el("classData").value); }
  catch (e) { showBanner(false, "invalid JSON — could not parse the class data"); return; }
  const r = computeClassRoot(cls);
  showBanner(r.rootHex === ANCHORED_ROOT, r.rootHex);
}

function tamper() {
  let cls;
  try { cls = JSON.parse(el("classData").value); }
  catch (e) { cls = JSON.parse(JSON.stringify(CLASS_2026)); }
  if (cls.signatures && cls.signatures.length) cls.signatures[0].messageRef += "·edited";
  el("classData").value = JSON.stringify(cls, null, 2);
  verify();
}

function reset() {
  el("classData").value = JSON.stringify(CLASS_2026, null, 2);
  verify();
}

function proveInclusion() {
  const leafHex = el("leafSelect").value;
  const proof = merkleProofFor(CLASS_2026, leafHex);
  const out = el("proofOut");
  if (!proof) { out.innerHTML = `<p class="proof-bad">Leaf not found in the sealed class.</p>`; return; }
  const ok = verifyProof(leafHex, proof, ANCHORED_ROOT);
  const steps = proof
    .map((s, i) => `<li><span class="proof-i">${i + 1}</span> fold <span class="proof-side">${s.side}</span> sibling <span class="mono">${shortHash(s.hash)}</span></li>`)
    .join("");
  out.innerHTML =
    `<p class="${ok ? "proof-ok" : "proof-bad"}">${ok ? "✓ Provably included in the sealed root" : "✗ Not included"} — ${proof.length} hops to the root</p>` +
    `<ol class="proof">${steps}</ol>`;
}

/* ---- Proof of Non-Asset: the asset audit, run in reverse ---- */
const NON_ASSET_VECTORS = [
  { v: "Transferability", why: "Soulbound — membership can't be sent or sold." },
  { v: "Liquidity pool", why: "No pool exists. Nothing to trade against." },
  { v: "Price / market", why: "Never listed, never quoted — a credential, not a quote." },
  { v: "Supply inflation", why: "Fixed supply, black-holed. No mint-on-demand." },
  { v: "Vesting & cliffs", why: "No team or treasury unlock schedule to dump." },
  { v: "Whale concentration", why: "One token per member — no wallet can accumulate." },
  { v: "Dump vector", why: "Non-transferable + no LP = literally nothing to dump." },
  { v: "Farming / activity-power", why: "Signing earns memory, never yield or power. (D-0017)" },
  { v: "Governance accumulation", why: "No weighted voting; recognition is one-person-one-vote. (D-0003)" },
  { v: "Multi-token sprawl", why: "One token, two functions — claim + sign. (D-0004)" },
];

function renderAudit() {
  const host = el("naRows");
  if (!host) return;
  host.innerHTML = NON_ASSET_VECTORS.map((x) =>
    `<div class="na-row"><span class="na-vector">${x.v}</span><span class="na-status">None</span><span class="na-why">${x.why}</span></div>`
  ).join("");
}

function runAudit() {
  const rows = Array.from(document.querySelectorAll(".na-row"));
  const cert = el("naCert");
  if (cert) cert.classList.remove("show");
  rows.forEach((r) => r.classList.remove("cleared"));
  rows.forEach((r, i) => setTimeout(() => r.classList.add("cleared"), 110 * i + 120));
  if (cert) setTimeout(() => cert.classList.add("show"), 110 * rows.length + 350);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!runSelfTest()) return;
  seal();
  verify();
  el("verifyBtn").addEventListener("click", verify);
  el("tamperBtn").addEventListener("click", tamper);
  el("resetBtn").addEventListener("click", reset);
  el("proveBtn").addEventListener("click", proveInclusion);
  renderAudit();
  runAudit();
  el("naRunBtn").addEventListener("click", runAudit);
});
