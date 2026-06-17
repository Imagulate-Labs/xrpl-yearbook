# contracts/

On-chain integration for the v1 loop lives here. No code yet — scaffold only.

Per [D-0015](../DECISIONS.md), Yearbook v1 targets **XRPL native (Testnet)**:

- **Pages** → XLS-20 NFTs (`NFTokenMint`)
- **Signatures** → `Payment` transactions carrying a Memo — the real, verifiable ledger event
- **Seal** → a final transaction carrying the `sealHash`

The on-chain shape is specified in [../SPEC.md](../SPEC.md).
