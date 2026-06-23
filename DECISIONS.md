# DECISIONS — XRP Yearbook

Append-only. Decisions are historical facts. Never rewrite — only supersede.
*(The system is the append: decisions accrete, they are never overwritten.)*

---

**D-0001 · The product is the artifact, not the loop**
The sealed annual Yearbook is the product. "Sign the Ledger" is the participation engine that feeds it. Protect this distinction above all — the moment the mechanism becomes the point, it dies like every other engagement app.
Status: LOCKED

**D-0002 · Three things kept distinct**
Mission = preserve the people/stories/culture. Product = the sealed annual artifact. Engine = Sign the Ledger. "What are you building?" → an annual historical record. "How do people participate?" → they Sign the Ledger. Two different answers to two different questions.
Status: LOCKED

**D-0003 · Timestamp, not a verdict**
The Yearbook is a snapshot of what people chose to preserve, never "the official truth." Historical projects die when they become political. It's fun, it's about reminiscing, the roasting is affection. This is a governance decision, not a tone note.
Status: LOCKED

**D-0004 · Token = membership in a Class**
The token is membership in a specific year, not platform access and not a speculation play. Narrative role first; on-chain mechanics are implementation. One token, two functions (claim + sign) — not two tokens. Lore-friendly fixed supply, black-holed (candidate: 589,000).
Status: LOCKED (supply/details deferred — does not block concept)

**D-0005 · NFT + physical book pairing**
NFT = provenance (sealed, verifiable, scarce). Physical = emotion (the object kept for decades). Each covers the other's weakness. Physical ships as a limited pre-order run tied to the sealed class — print to demand, no inventory risk.
Status: LOCKED

**D-0006 · Earned vs. paid line**
Recognition (superlatives, event photos, the record) is earned and free/cheap — the soul. Personal pages are the paid premium — the funding. Never tilt all the way to paid, or it becomes an ad directory nobody opens twice.
Status: LOCKED

**D-0007 · Governance = the proven yearbook mix**
Not invented. The hundred-year committee model: photographers document all year → committee votes → community votes within each group → some popularity, some editorial. Multiple on-ramps = nobody gatekept, everybody includable.
Status: LOCKED

**D-0008 · Per-community sections under one cover**
Each community gets its own section, its own superlatives voted by its own people, contributing to one shared volume. The shared artifact is "everyone showed up the same year," not a merged popularity contest. Keeps cross-community energy as content, not a fight.
Status: LOCKED

**D-0009 · Community-driven; founder convenes, doesn't carry**
People volunteer for yearbooks because they want to be in them. The community is the engine, not the cost. Founder role = convene + steward (the connector). Reward layer aligns contribution with recognition. REQUIRES clear roles/voting rules/trusted gatekeepers from day one (our proven community playbook) — that's where drama lives otherwise.
Status: LOCKED

**D-0010 · Built to be handed off**
Each class graduates; the next committee inherits the institution. Designed to survive succession — answers "what happens when the founder steps back" and gives the artifact its long-term weight (unbroken run = proof it was a real institution). Institution mindset, not startup mindset.
Status: LOCKED

**D-0011 · There is only one first edition**
Class of 2026 is unrepeatable — one first cover artist, one first signing class, one first sealed edition. The first edition only happens once → do it right, start now while the energy is live.
Status: LOCKED

**D-0012 · XRP-first framing (Make Waves)**
Keep XRP at the center; neighboring chains are the expansion signal, never the opening frame. Judges must read it as XRPL-native without question. (Cross-community is real and a strength — but framed as XRP-ecosystem-out, not pan-crypto-in.)
Status: LOCKED

**D-0013 · Vision big, build small**
The institution/ecosystem framing is for the pitch and the long game. The hackathon build is ONE loop: claim page → sign page → sealed page. Do not expand v1 until the loop works. Class of 2026 earns Class of 2027 by existing, not by perfect day-one governance.
Status: LOCKED

**D-0014 · Familiar social model is the moat**
Not NFTs/signatures/XRPL — the weapon is that nobody needs the model explained. Digitizing century-old behavior, not inventing new mechanics. Purpose requiring governance (not governance looking for purpose) is why it won't fail like other DAOs.
Status: LOCKED

**D-0015 · Platform = XRPL native (Testnet) for v1**
v1 runs on XRPL native Testnet — no Hooks, no sidechain, no custom contracts. Pages = XLS-20 NFTs (`NFTokenMint`). Signatures = `Payment` transactions carrying a Memo — the real, verifiable ledger event, the heartbeat of the loop. Seal = a final ledger transaction carrying the `sealHash`. Chosen because v1 exists to *demonstrate the loop* (claim → sign → sealed page), and native primitives are the simplest, lowest-risk, most obviously XRPL-aligned way for a judge to watch a real signature hit the ledger. Reduces implementation complexity, minimizes delivery risk, maximizes demo clarity, reinforces XRPL-native identity (D-0012), and obeys build-small (D-0013). Alternatives considered — Hooks, XRPL EVM sidechain, custom contract systems — may return for later token-gating/governance/enforcement, but none are required to validate the core concept. Doctrine: build the smallest complete loop that proves it; boring infrastructure keeps the attention on the people, the signatures, the artifact.
Status: LOCKED

**D-0016 · The public repo contains only Yearbook concepts**
The public repository contains only Yearbook concepts — the loop, the artifact, the doctrine, the historical-preservation philosophy. Any underlying or partner infrastructure (archival, provenance, identity, verification, ecosystem integration) stays external and optional, and its internal or brand names never appear in public-facing files. The Yearbook must read as a standalone institution that still stands if any single underlying project changes, rebrands, or disappears — reinforcing the hand-off (D-0010) and first-edition (D-0011) doctrine. Test: a judge understands the repo in thirty seconds with no tour guide. Scrubbing internal proper nouns is not hiding — it is institution-first presentation: the Yearbook is bigger than any one project, so it must not look dependent on one.
Status: LOCKED

**D-0017 · Authenticity over metrics — never optimize for signatures**
Signatures are evidence of participation, not the objective. The purpose is preserving people; the signature count (and the active-account count, and any metric) is a byproduct, never a target. Never optimize for signatures at the expense of authenticity — the moment the count becomes the point, sybils and bots follow and the artifact rots (reaffirms D-0001, the artifact-not-the-loop line). This is also the competitive read on the Make Waves prize board: chase real humans, not volume — volume is a bot knife-fight, users are hard to fake. Authenticity is simultaneously the soul *and* the sybil defense: 300 real faces with pages read differently than 300 farmed wallets, to a jury and to the platform alike. We win the active-user prizes precisely by refusing to farm them.
Status: LOCKED

**D-0018 · The technical spark = a cryptographically verifiable sealed Class ("proof-of-class")**
v1's one piece of real innovation, aimed squarely at the jury axis (innovation / execution / impact — the merit prize the coalition can't buy; the user-count prizes are won by community). Make `sealClass` produce a *structured* `sealHash`: every page and every signature is a leaf, rolled up into a single Merkle root anchored on the XRPL at seal time. Ship a public "Verify this Class" page — anyone recomputes the root from the preserved content and confirms it matches the ledger: authentic, complete, and unaltered since the seal, with no trusted middleman. This is not new scope — it hardens the seal step already locked in D-0015 and makes the provenance half of the artifact (D-0005) literally true. Rejected: confidential / privacy tech (e.g. Midnight-style hidden amounts) — a yearbook's soul is being *seen and remembered*, so tech that hides who did what argues against the thesis; never bolt on a buzzword that contradicts "a timestamp of who was here." Deferred to roadmap (not v1): sealed time-capsule messages revealed to a future Class (commit-reveal).
Status: LOCKED

**D-0019 · One token — and it's provably not an asset**
The Yearbook token is exactly ONE token: a soulbound, non-transferable membership credential earned by participation (claim + sign — D-0004). Rejected for good: the multi-token governance spec (ink / sticker / pen-tip / governance tokens) — soulbound fixes transferability, not sprawl or farming, so it still violates D-0004 (one token), D-0017 (activity must never buy power), and D-0014 (governance is downstream of caring, not a token parliament). No Yearbook-branded financial token either: funding is sales → treasury (pages, merch, sponsors — D-0006); any real financial asset lives OUTSIDE the Yearbook namespace. Inks, stickers, pen tips, calligraphy = cosmetic expression / metadata, never tokens, never votes. Because the architecture is pure, it is provable: the public site carries a **Proof of Non-Asset** — the same kind of engine that audits asset launches, run in reverse, certifying that every financial vector (LP, transferability, price, supply inflation, vesting, dump, whale, farming, governance-accumulation, multi-token sprawl) reads NONE. The certificate forces the architecture to stay pure: add any vector and it turns RED. Hooks deferred to v2 (D-0015).
Status: LOCKED

**D-0020 · The Honest Launch — fairness as the product (Proof of Fair Launch)**
The financial layer launches on one principle: *provable* fairness, not promised fairness. The market wants to spend but is tired of being robbed — rugs, team dumps, snipes, wash trading — so the product is the launch where the buyer gets an on-chain receipt proving they weren't robbed. Two tokens, two proofs, cleanly split: the soulbound membership artifact carries **Proof of Non-Asset** (D-0019); the separate financial **launch token** (outside the Yearbook namespace) carries **Proof of Fair Launch** — liquidity locked (verifiable), team allocation disclosed + time-locked (verifiable), fair open (no pre-mine snipe), transparent volume (no wash). Same fail-closed, verification-first DNA as Proof of Class (D-0018). The founders get paid via a **disclosed, locked, vested allocation shown in the open** — transparency is the reason people buy, never a tax on earnings; integrity is the moat *and* the money. The Yearbook is a real business: founders profit, fairly (see [[feedback_yearbook_is_a_business]]). Revenue: the launch token + cover/artifact NFTs (primary + perpetual royalties) + paid soulbound page claims + physical at margin + sponsors, recurring annually. Make Waves fit: innovation = first provably-fair anti-rug launch primitive on the XRPL; impact = fixes the space's core trust problem; execution = the certifier + proof primitives already exist. Full plan in `HONEST_LAUNCH.md`. Numbers (supply, allocation %, locks, fair-open mechanic, prices) deferred to the team.
Status: LOCKED

**D-0021 · The Commons Pool — fund the community, never pay holders**
The Yearbook does not pay people for *holding*. It funds the community for *showing up*. A separate **Commons Pool** is funded by disclosed portions of **net** Yearbook surplus (real costs paid first) plus sponsorships, merch, paid pages, donations, and approved contributions. It exists to fund community *activity* — meetups, event-house rentals, travel/access grants, creator support, media coverage, launch parties, contests, cultural preservation — awarded by **published criteria** (application, need, contribution, event role, or verified-member raffle), never by financial ownership. The Commons Pool creates **no** holder yield, profit rights, dividends, equity, governance, or claim on Yearbook income — that is the line that keeps it out of investment-contract (Howey) territory. Membership stays a non-asset memory artifact (D-0019). Any tradeable token (D-0020) stays separate, carries only **soft** utility (merch discount, raffle/Ink entry, cosmetic flair, non-binding signal, waitlist priority), and can never promise treasury income. This **replaces** the earlier holder-yield "flywheel" sketch — *community pool over holder yield*. Starting split of net surplus (adjust later): 50% operations/next-edition · 25% Commons Pool · 15% Access Grants · 10% reserve. Year-one treasury is boring on purpose: separate wallet/account, conservative (bank / T-bill-style, no DeFi / LP / leverage), interest belongs to the pool, monthly public receipts. **Not legal advice:** entity structure (internal restricted fund now; 501(c)(7)/(3) only much later) and treasury get real securities-counsel + CPA review before launch. The line: *the Yearbook does not pay people for holding — it funds the community for showing up.*
Status: LOCKED
