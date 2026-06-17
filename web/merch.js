/* =========================================================================
   XRP YEARBOOK — Class Merch (front-end demo store)
   Buy direct on the site. Mock cart, no real checkout yet.
   ========================================================================= */

const PRODUCTS = [
  { id: "jacket", name: "Class Jacket", desc: "Letterman — black + gold trim", price: 120 },
  { id: "hoodie", name: "Class Hoodie", desc: "Heavyweight, ringed-X crest",   price: 65 },
  { id: "cap",    name: "Dad Cap",      desc: "Low profile, embroidered X",     price: 35 },
  { id: "tee",    name: "Class Tee",    desc: "The mark, front and center",     price: 30 },
];

const cart = {}; // id -> qty
const el = (id) => document.getElementById(id);
const phImg = `<span class="rf-img-ph"><img class="rf-ph-mark" src="../XRP_Yearbook_Brand_Assets_PNG/XRP_Yearbook_SignatureX_Mark_transparent.png" alt="" aria-hidden="true"><span>Class Merch</span></span>`;

function renderProducts() {
  el("mcGrid").innerHTML = PRODUCTS.map((p) => `
    <div class="mc-card">
      <div class="mc-card-img">${phImg}</div>
      <div class="mc-card-body">
        <h3>${p.name}</h3>
        <p class="mc-desc">${p.desc}</p>
        <div class="mc-card-foot">
          <span class="mc-price">$${p.price}</span>
          <button type="button" class="btn btn-ghost btn-sm" data-add="${p.id}">Add</button>
        </div>
      </div>
    </div>`).join("");
  el("mcGrid").querySelectorAll("[data-add]").forEach((b) =>
    b.addEventListener("click", () => addToCart(b.dataset.add)));
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCart();
}

function updateCart() {
  let count = 0, total = 0;
  for (const id in cart) {
    const p = PRODUCTS.find((x) => x.id === id);
    count += cart[id];
    total += cart[id] * p.price;
  }
  el("cartPill").textContent = `Cart · ${count}`;
  el("mcTotal").textContent = `$${total}`;
  el("mcCount").textContent = `· ${count} item${count === 1 ? "" : "s"}`;
}

function checkout() {
  const count = Object.values(cart).reduce((n, q) => n + q, 0);
  el("mcNote").textContent = count === 0
    ? "Your cart is empty — add something first."
    : `Demo only — in the real store this checks out ${count} item${count === 1 ? "" : "s"} with card or XRP.`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCart();
  el("mcCheckoutBtn").addEventListener("click", checkout);
});
