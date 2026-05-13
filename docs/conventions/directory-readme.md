---
title: Directory anchor README convention
purpose: Every blueprint-anticipated directory carries a README that explains itself; future agents shouldn't have to reverse-engineer purpose from contents.
audience: Anyone creating a directory in this repo that the blueprint anticipates but hasn't fully filled with files yet.
applies_to_paths: ["apps/**", "packages/**", "infrastructure/**", "test/**"]
authority: durable
created_at: "2026-05-13"
relates_to: ["naming.md", "frontmatter.md"]
---

# Directory anchor README convention

## When to use this

A directory needs an anchor README when **either**:

- The blueprint (`docs/product/repository-blueprint-handoff-package.md`) names this directory but the implementation hasn't filled it yet, **or**
- The directory exists primarily as an organizational boundary (purpose isn't obvious from a glance at its contents).

A directory does NOT need an anchor README when:

- It contains a clearly named top-level file (e.g., `migrations/` containing `0001_*.sql`, `0002_*.sql` — the names are self-explanatory).
- It's a build artifact (`dist/`, `.next/`, `node_modules/`).
- Its purpose is universally understood (e.g., `src/` next to a `package.json`).

## Required contents

Every anchor README has at minimum:

1. **Frontmatter** with `purpose`, `status`, and (when applicable) `blueprint_source` + `planned_files`.
2. **A one-paragraph "Purpose" section** restating the directory's role.
3. **A "What goes here" section** with bullet-form file inventory (existing or planned).
4. **A "What does NOT go here" section** when there's a real adjacent directory that could be confused with this one.

Optional:

5. **A "When to implement" or "Build order" section** for blueprint-anticipated dirs that don't have content yet.
6. **A "References" section** pointing back at the blueprint section, related ADRs, or related architecture docs.

## Minimum template

```markdown
---
purpose: "One sentence describing what lives here."
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §X.Y"
status: planned                       # planned | scaffolded | partially-implemented | implemented
planned_files: ["file-a.ts", "file-b.ts"]
---

# {Directory name}

## Purpose

{One paragraph: what role does this directory play, and why does it exist as its own boundary?}

## What goes here

- `file-a.ts` — {one-line description}
- `file-b.ts` — {one-line description}

## What does NOT go here

- Cross-cutting utilities → put in `packages/observability` or `packages/config`.
- HTTP client code → put in `packages/client-sdk`.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §X.Y`
- ADR: `docs/adr/NNNN-related-decision.md`
```

## Status enum semantics

- **`planned`** — the directory exists with only this README; no code yet. The README documents intent.
- **`scaffolded`** — minimal working code exists (e.g., a `package.json`, a single working module), but the surface is sparse. README documents what's intentionally absent.
- **`partially-implemented`** — multiple modules exist; the directory's purpose is partially fulfilled. README points readers at the canonical files.
- **`implemented`** — the directory's full anticipated surface is present. README is now a navigation aid rather than a placeholder.

When status changes, update both the frontmatter and the inventory list. The transition from `planned` → `scaffolded` is the most consequential — that's when actual code lands.

## Why this exists

In the pure no-stubs ethos, an "empty" directory with just a README looks like a stub. It isn't. The README is the artifact. It encodes a decision (this boundary will exist), a source (the blueprint section), and an inventory (what will land here). It's far better than `mkdir foo && touch foo/.gitkeep` because it tells a future agent — or future-you — *why* the directory exists.

A directory anchor README is also a *commit point* in itself: it can be referenced in plan files, in PR descriptions, in commit messages. "Add `apps/api/src/modules/scenes/` per blueprint §4.2" is a meaningful commit; "Add empty dir" is not.
