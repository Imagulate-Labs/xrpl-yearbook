/* =========================================================================
   Shared SIGNATURE STUDIO — gel-pen colors, a calligraphy nib, stamps,
   eraser, undo, and a thickness slider. The frame stays premium; the ink
   runs wild. Used by the home "Sign the Ledger" section and each page.
   ========================================================================= */

const INKS = [
  "#C9A24E", "#FFC80A", "#F4ECD6", "#FFFFFF", // brand golds + white gel
  "#FF4FA3", "#FF5C8A", "#9B5DE5", "#6C5CE7", // pinks + purples
  "#3A86FF", "#22C3E6", "#06D6A0", "#57CC57", // blues + greens
  "#C2F261", "#FFE14D", "#FF924C", "#FF5C5C", // limes + warms
];
const STAMPS = ["★", "☆", "✦", "✧", "✶", "♥", "❀", "♛", "☼", "❉", "✕", "✺"];

class SignaturePad {
  constructor(canvas, pad) {
    this.canvas = canvas;
    this.pad = pad;
    this.ctx = canvas.getContext("2d", { willReadFrequently: true });
    this.tool = "pen";        // 'pen' | 'calligraphy' | 'eraser' | 'stamp'
    this.ink = "#C9A24E";
    this.lineWidth = 3.4;
    this.eraserWidth = 24;
    this.nibWidth = 12;
    this.nibAngle = Math.PI * 0.25; // 45° calligraphy nib
    this.stampGlyph = "★";
    this.drawing = false;
    this.last = null;
    this.hasInk = false;
    this.history = [];        // ImageData snapshots, for undo
    this.maxHistory = 30;

    this._resize();
    window.addEventListener("resize", () => this._resize());
    this._bind();
  }

  _resize() {
    const r = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(r.width * dpr);
    this.canvas.height = Math.round(r.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.history = [];
    this.hasInk = false;
    this.pad.classList.remove("is-drawn");
  }

  _pos(e) {
    const r = this.canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  _snapshot() {
    try {
      this.history.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
      if (this.history.length > this.maxHistory) this.history.shift();
    } catch (e) { /* tainted canvas — skip */ }
  }

  _bind() {
    const down = (e) => {
      this.canvas.setPointerCapture?.(e.pointerId);
      this._snapshot();              // snapshot BEFORE the action, so undo can step back
      this.hasInk = true;
      this.pad.classList.add("is-drawn");
      if (this.tool === "stamp") { this._placeStamp(this._pos(e)); return; }
      this.drawing = true;
      this.last = this._pos(e);
    };
    const move = (e) => {
      if (!this.drawing) return;
      e.preventDefault();
      const p = this._pos(e);
      this._stroke(this.last, p);
      this.last = p;
    };
    const up = () => { this.drawing = false; this.last = null; };
    this.canvas.addEventListener("pointerdown", down);
    this.canvas.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    this.canvas.addEventListener("pointercancel", up);
  }

  _stroke(a, b) {
    if (this.tool === "calligraphy") { this._calligStroke(a, b); return; }
    const c = this.ctx;
    if (this.tool === "eraser") {
      c.globalCompositeOperation = "destination-out";
      c.lineWidth = this.eraserWidth;
      c.shadowBlur = 0;
      c.strokeStyle = "rgba(0,0,0,1)";
    } else {
      c.globalCompositeOperation = "source-over";
      c.lineWidth = this.lineWidth;
      c.strokeStyle = this.ink;
      c.shadowColor = this.ink;     // faint gel-pen glow
      c.shadowBlur = 6;
    }
    c.beginPath();
    c.moveTo(a.x, a.y);
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    c.quadraticCurveTo(a.x, a.y, mx, my);
    c.lineTo(b.x, b.y);
    c.stroke();
  }

  /* calligraphy: a flat nib at a fixed angle → thick down-strokes, thin cross-strokes */
  _nibPoints(p) {
    const h = this.nibWidth / 2;
    const dx = Math.cos(this.nibAngle) * h, dy = Math.sin(this.nibAngle) * h;
    return [{ x: p.x - dx, y: p.y - dy }, { x: p.x + dx, y: p.y + dy }];
  }

  _calligStroke(a, b) {
    const c = this.ctx;
    c.globalCompositeOperation = "source-over";
    c.fillStyle = this.ink;
    c.strokeStyle = this.ink;
    c.shadowColor = this.ink;
    c.shadowBlur = 2;
    const [a1, a2] = this._nibPoints(a);
    const [b1, b2] = this._nibPoints(b);
    c.beginPath();
    c.moveTo(a1.x, a1.y); c.lineTo(a2.x, a2.y);
    c.lineTo(b2.x, b2.y); c.lineTo(b1.x, b1.y);
    c.closePath();
    c.fill();
    // bridge the joint so corners stay solid
    c.lineWidth = 1; c.lineCap = "round";
    c.beginPath(); c.moveTo(b1.x, b1.y); c.lineTo(b2.x, b2.y); c.stroke();
  }

  _placeStamp(p) {
    const c = this.ctx;
    c.save();
    c.globalCompositeOperation = "source-over";
    c.fillStyle = this.ink;
    c.shadowColor = this.ink;
    c.shadowBlur = 8;
    c.font = '40px "Segoe UI Symbol", "Apple Symbols", serif';
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(this.stampGlyph, p.x, p.y);
    c.restore();
  }

  setTool(t) { this.tool = t; }
  setInk(hex) { this.ink = hex; if (this.tool === "eraser") this.tool = "pen"; }
  setStamp(g) { this.stampGlyph = g; this.tool = "stamp"; }
  setSize(v) {
    this.lineWidth = v;
    this.nibWidth = v * 3.0 + 3;
    this.eraserWidth = Math.max(14, v * 6);
  }

  undo() {
    if (!this.history.length) return;
    this.ctx.putImageData(this.history.pop(), 0, 0);
    this.hasInk = this.history.length > 0;
    if (!this.hasInk) this.pad.classList.remove("is-drawn");
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.history = [];
    this.hasInk = false;
    this.pad.classList.remove("is-drawn");
  }

  export() { return this.canvas.toDataURL("image/png"); }
}

/* Build + wire the studio toolbar inside `root` for a given pad.
   `root` needs [data-strip], [data-tray], [data-size] and [data-tool]/[data-act] buttons. */
function setupStudio(pad, root) {
  if (!root) return;
  const strip = root.querySelector("[data-strip]");
  const tray = root.querySelector("[data-tray]");
  const tools = root.querySelectorAll("[data-tool]");
  const setTool = (name) => tools.forEach((t) => t.classList.toggle("is-active", t.dataset.tool === name));

  if (strip) {
    strip.innerHTML = INKS.map((c, i) =>
      `<button type="button" class="chip${i === 0 ? " is-active" : ""}" data-ink="${c}" style="--c:${c}" aria-label="ink ${c}"></button>`
    ).join("");
    strip.querySelectorAll(".chip").forEach((b) =>
      b.addEventListener("click", () => {
        strip.querySelectorAll(".chip").forEach((x) => x.classList.remove("is-active"));
        b.classList.add("is-active");
        pad.setInk(b.dataset.ink);
        setTool(pad.tool === "stamp" ? "stamps" : pad.tool); // keep pen/calligraphy when recoloring
      })
    );
  }

  if (tray) {
    tray.innerHTML = STAMPS.map((s) => `<button type="button" class="stamp" data-stamp="${s}">${s}</button>`).join("");
    tray.querySelectorAll(".stamp").forEach((b) =>
      b.addEventListener("click", () => {
        tray.querySelectorAll(".stamp").forEach((x) => x.classList.remove("is-active"));
        b.classList.add("is-active");
        pad.setStamp(b.dataset.stamp);
        setTool("stamps");
      })
    );
  }

  root.querySelector('[data-tool="pen"]')?.addEventListener("click", () => { pad.setTool("pen"); setTool("pen"); });
  root.querySelector('[data-tool="calligraphy"]')?.addEventListener("click", () => { pad.setTool("calligraphy"); setTool("calligraphy"); });
  root.querySelector('[data-tool="eraser"]')?.addEventListener("click", () => { pad.setTool("eraser"); setTool("eraser"); });
  root.querySelector('[data-tool="stamps"]')?.addEventListener("click", () => { tray?.classList.toggle("is-open"); });
  root.querySelector('[data-act="undo"]')?.addEventListener("click", () => pad.undo());
  root.querySelector('[data-act="clear"]')?.addEventListener("click", () => pad.clear());

  const sizer = root.querySelector("[data-size]");
  if (sizer) {
    sizer.addEventListener("input", () => pad.setSize(parseFloat(sizer.value)));
    pad.setSize(parseFloat(sizer.value));
  }
  setTool("pen");
}
