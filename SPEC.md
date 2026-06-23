# Contract / On-Chain Spec — the v1 loop

**Scope: exactly three actions. Nothing else ships in v1.**

> claim a page → sign someone's page → seal the class

Everything below is the minimum to make that loop real on-chain. Cover contests,
superlative voting, paid tiers, merch, directory — all OUT of v1 (see roadmap).

---

## Entities

**Class**
- `classId` (e.g. `2026`)
- `state`: `OPEN` → `SEALED` (one-way, never reopens)
- `sealedAt` (timestamp, set on seal)
- `sealHash` (hash over all pages + signatures at seal time — the provenance anchor)

**Page** (one per member per class)
- `pageId`
- `classId`
- `owner` (wallet)
- `handle` / display name
- `contentRef` (pointer to off-chain page content — image, bio, links)
- `createdAt`

**Signature** (the on-chain participation event)
- `sigId`
- `pageId` (whose page was signed)
- `signer` (wallet)
- `messageRef` (pointer to the signature message/roast — off-chain content, on-chain pointer)
- `signedAt`

---

## Actions (the only three)

### 1. `claimPage(classId, handle, contentRef)`
- requires: class is `OPEN`, caller holds membership token, caller has no existing page in this class
- effect: mints/records a Page owned by caller
- emits: `PageClaimed`

### 2. `signPage(pageId, messageRef)`
- requires: class is `OPEN`, target page exists, signer holds membership token
- effect: records a Signature — **this is the real ledger event** (the heartbeat of the whole project)
- emits: `PageSigned`

### 3. `sealClass(classId)`
- requires: caller is committee/authority, class is `OPEN`
- effect: compute `sealHash` over all pages + signatures, set state `SEALED`, set `sealedAt`
- after seal: no new pages, no new signatures, no edits — **frozen forever**
- emits: `ClassSealed`

---

## Design notes
- **Content is off-chain, pointers are on-chain.** Pages and signature messages live off-chain (cheap, rich); the chain holds the pointer + the event + the seal hash. This keeps it affordable and keeps the *provenance* on-ledger.
- **Seal = the artifact.** The `sealHash` is what makes the sealed class verifiable forever — anyone can recompute it from the preserved content and confirm nothing was altered. This is the NFT/provenance half of the artifact.
- **Token gates participation, doesn't speculate.** Holding membership is the requirement to claim/sign. (See D-0004.)
- **Roast permanence (D-0003 caution):** consider storing the community-facing roast and the sealed-permanent message as separate `messageRef`s, so the permanent record is the dignified version and the fun lives in a full-context layer. Decide before seal, not after.

## The `sealHash` construction (normative — D-0018)

The seal is a Merkle root over every page and every signature. It is defined
precisely here so **anyone can reimplement it in any language and get the
identical root** — that independence is the whole point of "no trusted
middleman." Reference implementation: [`web/seal.js`](web/seal.js).

**Hashing.** SHA-256 throughout, with domain separation so a leaf and an
internal node can never be confused (the standard Merkle second-preimage
defence, RFC-6962 style):
- `leaf  = SHA256( 0x00 ‖ canonical(entry) )`
- `node  = SHA256( 0x01 ‖ left ‖ right )`

**Canonical entry encoding (injective).** Each entry is the concatenation of
its fields, where every field is `uint32 big-endian byte-length ‖ utf8(value)`.
The length prefix makes the encoding injective — no value can contain a
delimiter that forges a field boundary or merges two distinct entries.
- Page: `field("PAGE") ‖ field(pageId) ‖ field(owner) ‖ field(handle) ‖ field(contentRef)`
- Signature: `field("SIG") ‖ field(sigId) ‖ field(pageId) ‖ field(signer) ‖ field(messageRef) ‖ field(signedAt)`

**Tree.**
- Leaves are sorted ascending by their hex leaf hash, so the root is independent
  of insertion order (the root proves the *set* of distinct entries).
- Building each level: pair `(2i, 2i+1)` → `node`. If a level has an odd count,
  the final lone node is **promoted unchanged** to the next level — it is never
  hashed with itself (avoids the CVE-2012-2459 duplicate ambiguity).
- The single remaining node is the `sealHash`.

**Note (count is not bound).** Because leaves are a sorted set, two byte-identical
entries collapse to one leaf — the root binds the *set*, not the signature count.
That is intentional and on-doctrine (D-0017: never optimise for counts); if a
future Class ever needs to bind the count, add an explicit length-commitment leaf.

**Anchoring (the open half).** Computing the root proves *data ⇒ root*. The trust
loop only closes when that exact root is written to the XRPL at seal time (per
D-0015, a final tx carrying the `sealHash` in a Memo) and the public Verify page
**fetches that on-chain tx and compares**. Until that wiring lands, the Verify
page demonstrates the recomputation but anchors to a locally-derived root — label
it as illustrative so the honesty posture (HONEST_LAUNCH) stays exact.

## Platform choice (team decision)
The above is deliberately language-agnostic. Targets to evaluate:
- XRPL native (NFTs for pages, memos/transactions for signatures)
- XRPL Hooks / sidechain if richer logic is needed
Pick based on what demos cleanest for Make Waves — the judge needs to *see* a real on-chain signature happen.
