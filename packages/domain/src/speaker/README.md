---
purpose: Speaker domain types, schemas, value objects.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §5.1"
status: planned
planned_files:
  - speaker.types.ts
  - speaker.schemas.ts
---

# packages/domain/src/speaker/

## Purpose

Speaker-specific TS types and zod schemas. The `Speaker` interface lives in `scene.types.ts` for now (because the domain split between scene and speaker is shallow at scaffold time); this directory exists for the deeper artifacts the blueprint anticipates:

- `speaker.types.ts` — `Speaker`, `VoiceProfile`, `PacingProfile`, and value objects like `SpeakerDisplayLabel`.
- `speaker.schemas.ts` — zod schemas for runtime validation.

When the first per-speaker logic lands (defaulting voices, validating display labels for uniqueness), promote the types out of `scene/` into here.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §5.1`
- Architecture: `docs/architecture/002-domain-model.md`
