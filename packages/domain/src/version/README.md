---
purpose: SceneVersion / VersionLine domain types beyond what's currently in scene.types.ts.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §5.1"
status: planned
---

# packages/domain/src/version/

## Purpose

Domain types specific to the version model. `SceneVersion` and `VersionLine` interfaces currently live in `scene/scene.types.ts`; this directory exists for the deeper version-specific artifacts:

- `version.types.ts` — typed wrappers for version operations (input types for `createVersion`, transition states, etc.).
- `version.schemas.ts` — zod runtime validators.
- `version.logic.ts` — pure helper functions for version comparison, content-hash computation, line-diff alignment.

When the first version-comparison logic lands, the type promotion + helper functions come here.

## References

- Architecture: `docs/architecture/004-versioning-model.md`
- ADR: `docs/adr/0004-scene-version-immutability.md`
