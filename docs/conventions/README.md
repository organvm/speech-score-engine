---
title: Conventions
purpose: Index of repository-wide conventions for naming, frontmatter, and directory anchors.
audience: Anyone (human or agent) adding or modifying files in this repo.
applies_to_paths: ["**/*"]
authority: durable
created_at: "2026-05-13"
---

# Conventions

This directory documents the repository-wide conventions every file should honor.

| Convention | Doc | Scope |
|---|---|---|
| Filename structure | [`naming.md`](./naming.md) | All files in this repo. Especially `dramaturgist-tuning-markdown-archive/` chat-archive files (where prior naming hid information under truncation). |
| YAML frontmatter required fields | [`frontmatter.md`](./frontmatter.md) | All Markdown files under `docs/`, `dramaturgist-tuning-markdown-archive/` (chat-archive only — `sources/` is byte-frozen), and `.claude/plans/`. |
| Directory anchor READMEs | [`directory-readme.md`](./directory-readme.md) | Every directory the blueprint anticipates but hasn't been filled with implementation files yet. |

## Why durable conventions

Conventions encoded in CLAUDE.md drift because that file accumulates other concerns. Conventions encoded in a per-topic doc under `docs/conventions/` are referenceable from a single canonical link, survive CLAUDE.md rewrites, and can be evolved without rebalancing the surrounding text.

## What's NOT a convention here

- **Code style**: governed by `biome.json` at the repo root.
- **TypeScript strictness**: governed by `tsconfig.base.json` at the repo root.
- **Commit-message style**: governed by the global `~/.claude/CLAUDE.md` (imperative mood, <72 char title).
- **Architecture decisions**: live in `docs/adr/` as ADRs, not here.

## Evolution

Add a new convention doc when a pattern is being applied in 3+ places and a future agent could reasonably get it wrong. Don't write conventions for one-off cases.
