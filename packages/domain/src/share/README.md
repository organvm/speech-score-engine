---
purpose: Share-link domain types and the contract for token issuance / verification.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §5.1"
status: planned
planned_files:
  - share.types.ts
  - share.schemas.ts
  - share-link.service.ts
---

# packages/domain/src/share/

## Purpose

Domain types and service contract for the share-link feature.

- `share.types.ts` — `ShareLink` entity, `ShareAccessMode` (currently `'read_only'` only), `ShareTokenHashing` interface.
- `share.schemas.ts` — zod schemas.
- `share-link.service.ts` — `ShareLinkService` contract (create / revoke / verify-token).

## Why token storage is hashed

The `share_link.token_hash` column never stores the plaintext token. When the user is shown a share URL, the URL contains the plaintext token; the database stores only the hash. On access, the server hashes the incoming token and looks it up.

This means:
- A database leak does not give attackers usable share tokens.
- A revoked or expired share link cannot be reactivated (the plaintext is never recoverable).

## References

- Architecture: `docs/architecture/002-domain-model.md` (share_link section)
- Migration: `packages/database/migrations/0005_add_diagnostic_reports_share_links.sql`
- ADR: ADR 0004 (immutability is what makes share-by-version safe)
