# THE CLASS DRAW

A provably-fair, multi-winner draw open to **all of XRPL**. Earn **Ink Points** by showing up; win **class artifacts**. Fun on the surface, fair underneath.

> Live demo: `web/raffle.html`

## The loop
earn ink → (optional) contribute a prize → watch the Contribution Board → sign in → Page Flip Ceremony → Class Seal → claim & announce

## Ink Points — ways to earn

| Path | Examples | Tracked by |
|---|---|---|
| **Class Actions** | claim a page, sign the ledger, hold your crest | on-chain indexer |
| **Social Actions** | repost / like / share on X, Instagram, Facebook | platform OAuth |
| **Contribution** | add an NFT to the pool, or pitch in XRP | on-chain indexer |

Each Ink Point = one chance. More ink, better odds — but everyone in has a real shot.

## Tracking — nobody does it by hand

The pain in most raffles is a human checking wallets one by one. Split the data and automate both halves:

**On-chain → an XRPL indexer reads it automatically**
- Token holdings — snapshot balances at a chosen ledger index
- NFT ownership / purchases — account NFTs + sale transactions
- Contributions — watch the prize-pool wallet for incoming NFTs / XRP
- Signing a page — already a transaction, already indexed

**Off-chain social → OAuth**
- Repost / like / share verified via the platform API once the user connects their account (the Galxe / Zealy model). No screenshots, no manual checks.

**Ink = indexer (on-chain) + OAuth (social), totaled automatically.** The only thing a human does is open the round.

## Fairness — the Class Seal
- The random seed is a **future XRPL ledger index** — unknowable in advance, public after.
- Winners are derived **deterministically** from that seed (weighted by Ink, no repeats), so a human never picks them.
- Seed + ledger reference are published in the UI **and** an on-chain memo. Anyone recomputes the same winners, in the same order.
- An **entries snapshot** (hash of wallet→ink) is committed on-chain before the draw — tamper-evident. Same proof DNA as Proof of Class.

## Prizes
- **Grand prize:** the sealed-class cover (on-chain NFT + physical first print).
- **Community Prize Pool:** any project or wallet contributes NFTs — discovery for their collection, more winners for the Class.
- **Multi-winner:** ~10–15 winners per monthly round, announced on X.

## Keep it a sweepstakes, not a lottery
Always keep the **free** entry path (Class + Social Actions) front and center. Paying — XRP or buying an NFT — is **optional, never required**. That "no purchase necessary / free alternative method of entry" structure is what keeps a sweepstakes clean. Confirm specifics for the operating jurisdiction before going live.

## Status
Front-end demo today (`web/raffle.html`): ink, contribution board, multi-winner ceremony, Class Seal, NFT art + upload, XRP contribution, how-it-works guide. Next: real indexer hookup, X OAuth verification, avatars, on-chain seed + memo.
