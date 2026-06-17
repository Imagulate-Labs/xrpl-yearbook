# BUILD — for the team

**The target: one loop, working, demoable.**

> claim a page → sign someone's page → view the sealed page

If that runs end to end on-chain for Class of 2026, we have a submission. Everything
else is roadmap. Read `DECISIONS.md` for the locked calls and `SPEC.md` for
the on-chain shape.

---

## Suggested ownership (3 builders + founder)

**Contract / on-chain** — the three actions in `SPEC.md`: `claimPage`, `signPage`, `sealClass`. The signature must be a real ledger event. This is the spine.

**Frontend / app** — three screens, that's it for v1:
1. Claim your page (handle, image, bio, links)
2. View a page + sign it (leave a message → fires the on-chain signature)
3. View the sealed class (read-only, the artifact)

**Content / community** — the Class of 2026 starter set: round up the first members from our own communities, the events that already happened (24hr Spaces, Vegas), wire up the committee in Discord. The book is only as good as who's in it.

**Founder (Alex)** — convene the team + community, the pitch/narrative, the connector work that nobody else can do. (See D-0009.)

---

## Explicitly OUT of v1
Cover-artist contest · superlative voting · paid pages · photo tiers · sponsor/dev directory · merch · alumni pages · multi-community sections · physical print run.

All real, all in the roadmap/parking-lot in the README. None of them ship until the core loop works. (D-0013.)

---

## Definition of done (hackathon)
- [ ] A member can claim a page (token-gated)
- [ ] Another member can sign that page — and the signature is a verifiable on-chain event
- [ ] The class can be sealed, producing a verifiable `sealHash`
- [ ] A sealed page is viewable and clearly frozen
- [ ] README pitch + this loop = the submission

That's it. Ship the loop.
