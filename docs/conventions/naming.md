---
title: File and directory naming convention
purpose: Make every filename self-describing without opening the file.
audience: Anyone adding or renaming files in this repo.
applies_to_paths: ["**/*"]
authority: durable
created_at: "2026-05-13"
relates_to: ["frontmatter.md", "directory-readme.md"]
---

# File and directory naming convention

## Principle

**A filename should answer "what is this?" without the reader clicking into it.** The test: a flat-list file browser at any reasonable column width still shows the topic-bearing tokens, not just structural noise.

Filenames are also the most-encountered surface of any file. They appear in `git log`, `find`, IDE tabs, autocomplete, Finder, search results. Investing in their density pays compounding interest.

## Rule set

### Rule 1 — No redundancy with parent directory

If the parent directory's name is `dramaturgist-tuning-markdown-archive`, no child file should repeat `dramaturgist-tuning-` in its filename. The information is already present in the path.

**Wrong:** `dramaturgist-tuning-markdown-archive/dramaturgist-tuning-01--theatrical-musical-composition-system--001-prompt-response.md`
**Right:** `dramaturgist-tuning-markdown-archive/dt-01-001--predict-system-from-photos.md`

### Rule 2 — No redundant suffix that applies to every sibling

If every `.md` file in a directory is a "prompt-response" pair, the suffix `-prompt-response` adds no information. Drop it; let the parent directory's purpose carry the semantic.

### Rule 3 — Topic slug derived from content, not just position

A positional index alone (e.g., `001`, `002`, `003`) tells the reader nothing about what's in the file. Pair the index with a 2-5-word kebab-case slug derived from the file's actual subject.

**Wrong:** `dt-03-006.md`
**Right:** `dt-03-006--repository-blueprint-handoff.md`

### Rule 4 — Use a separator that signals structure

This repo uses `--` (double dash) to separate **structural fields** within a filename, and `-` (single dash) inside a field for kebab-casing. This makes the field boundaries scannable.

**Pattern:** `{structural-id}--{topic-slug}.md`

### Rule 5 — Index/metadata files use a 00- prefix in archive contexts

Sort-order matters when a directory holds both index files and content files. Index files (README, manifest, metadata) get `00-` prefix so they float to the top alphabetically.

**Right (in `dramaturgist-tuning-markdown-archive/`):**
- `00-README.md`
- `00-manifest.json`
- `00-metadata.tsv`
- `00-full-archive.md`
- `dt-01-001--predict-system-from-photos.md`
- `dt-01-002--formalize-system-concept.md`
- ...

### Rule 6 — Length budget

Aim for filenames under ~70 characters total (including extension). This is the column width at which Finder, VS Code's file tab, and `ls -l` start eliding. Hard ceiling: 100 characters. If you can't fit the topic slug, the slug is too verbose — compress it.

### Rule 7 — Slug derivation rules

When deriving a topic slug from prose:

- Take the user-facing subject, not the verb. ("Convert this into a repository blueprint" → `repository-blueprint`, not `convert-into-blueprint`.)
- Use the name of the artifact being produced if the prompt is "turn X into Y". ("turn this into a $TERMINOLOGY_CHARTER" → `terminology-charter`.)
- Drop articles, auxiliary verbs, and pleasantries.
- Lowercase kebab-case. ASCII only.
- 2-5 tokens. Prefer 3.

## Specific conventions by directory

### `dramaturgist-tuning-markdown-archive/`

| File class | Pattern |
|---|---|
| Index files | `00-{name}.{ext}` |
| Chat-pair files | `dt-NN-MMM--{topic-slug}.md` where NN is conversation index (01-09) and MMM is per-conversation pair index (001+) |
| Auxiliary tools (Codex inventory etc.) | `{tool-or-source}-{purpose}.{ext}` |

The pair-id prefix `dt-NN-MMM` matches the existing `pair_id` field in each file's YAML frontmatter — so the filename and the frontmatter cross-reference cleanly.

### `dramaturgist-tuning-markdown-archive/sources/`

**Do not rename.** Files here are SHA-1-tracked by `SOURCES-INDEX.md` and represent verbatim provenance. The existing names mirror the ChatGPT-side panel titles in kebab-case — they're already self-describing.

### `docs/adr/`

`NNNN-{kebab-slug}.md` where NNNN is a zero-padded 4-digit sequence (`0001`, `0002`, ...). The slug describes the decision, not the question.

### `docs/architecture/`

`NNN-{kebab-slug}.md` where NNN is a 3-digit sequence. The slug describes the architectural concern (`system-context`, `domain-model`, `render-pipeline`).

### `docs/conventions/`

`{topic}.md`. No numeric prefix — these aren't sequenced.

### `.claude/plans/`

`YYYY-MM-DD-{kebab-slug}.md` (global universal rule). Never overwrite — revisions get `-v2`, `-v3` suffixes.

### Source code

Standard JS/TS conventions: `kebab-case.ts` for module files, `PascalCase.tsx` for React components, `camelCase` for variables and functions inside files. Test files: `{module}.test.ts` next to the module.

### Migration files

`NNNN_{snake_case_description}.sql` (4-digit zero-padded, snake_case after the prefix). This is a deviation from the kebab-case norm — but SQL filename conventions in the Postgres ecosystem use snake_case, and matching the ecosystem matters more than internal consistency here.

## Renames

When renaming files that other files reference (manifests, metadata.tsv, internal links), update the references in the same change-set. A rename without reference sync is an incomplete rename.

If you `git mv`, git's similarity heuristic should detect the move (rather than recording delete + add), keeping `git log --follow` useful.

## What this convention is NOT

It is not a content style guide (see `frontmatter.md` for the structured-data side and individual READMEs for prose style). It governs filename density and structure only.
