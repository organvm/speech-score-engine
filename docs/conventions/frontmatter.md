---
title: YAML frontmatter standard
purpose: Define the minimum required and recommended YAML frontmatter for Markdown files in this repo.
audience: Anyone writing or modifying Markdown files under docs/, dramaturgist-tuning-markdown-archive/ (chat-archive only), or .claude/plans/.
applies_to_paths:
  - "docs/**/*.md"
  - "dramaturgist-tuning-markdown-archive/*.md"
  - ".claude/plans/*.md"
authority: durable
created_at: "2026-05-13"
relates_to: ["naming.md", "directory-readme.md"]
---

# YAML frontmatter standard

## Principle

**Frontmatter is queryable structured data.** A future agent doing repo-wide search ("which docs are durable conventions?", "which canvases originated in conversation 03?", "which plans are still active?") needs that information to be machine-readable, not buried in prose.

The frontmatter standard differs by document **type**. Identify the type first, then apply the type's required fields. Optional fields are encouraged but not enforced.

## Field types

| Type | Used in | Example |
|---|---|---|
| `string` | Most fields | `"My title"` |
| `string array` | `applies_to_paths`, `relates_to`, lists of IDs | `["docs/**", "src/**"]` |
| `ISO 8601 date` | `created_at`, `updated_at`, conversation timestamps | `"2026-05-13"` or `"2026-05-13T12:34:56Z"` |
| `enum` | `authority`, `status` | One of a small enumerated set |
| `nested object` | Rare — message counts, structured stats | `omitted_message_counts: { omitted_system: 5 }` |

## Document types

### Type: conventions doc (`docs/conventions/*.md`)

```yaml
---
title: "Human-readable title"
purpose: "One sentence explaining what this convention solves."
audience: "Who needs to read this."
applies_to_paths: ["glob pattern", ...]
authority: durable               # enum: durable | provisional | deprecated
created_at: "YYYY-MM-DD"
relates_to: ["other-convention.md", ...]   # optional
---
```

### Type: ADR (`docs/adr/NNNN-*.md`)

```yaml
---
adr_id: "0001"
title: "Decision description in active voice"
status: accepted                  # enum: proposed | accepted | superseded | deprecated
date: "YYYY-MM-DD"
supersedes: ["0000-*.md"]          # optional; ADRs this one replaces
superseded_by: ["NNNN-*.md"]       # optional; set when this ADR is replaced
deciders: ["Anthony Padavano"]     # optional; humans who made the call
---
```

### Type: architecture doc (`docs/architecture/NNN-*.md`)

```yaml
---
title: "Architectural concern"
authority: derived                  # enum: derived (from blueprint canvases) | authoritative (the doc IS the source)
derives_from: ["docs/product/*.md", ...]   # required when authority=derived
status: current                     # enum: current | obsolete | wip
last_validated_against_code: "YYYY-MM-DD"
---
```

### Type: product canvas copy (`docs/product/*.md`)

These are COPIES of files in `dramaturgist-tuning-markdown-archive/sources/`. The sources are SHA-1-tracked and byte-frozen. The docs/product copies carry the frontmatter:

```yaml
---
title: "Panel title from ChatGPT Sources panel"
source_path: "dramaturgist-tuning-markdown-archive/sources/{filename}.md"
source_sha1: "{12-char SHA-1 prefix from SOURCES-INDEX.md}"
project_save_id: "ProjectSave_..."     # when known; some canvases truncated before capture
conversation_id: "uuid"                # source conversation in chat-export
recovered_at: "2026-05-13"
canvas_index: NN                       # position in SOURCES-INDEX.md table
note: "Optional: byte-identical duplicate / etc."
---
```

### Type: chat-pair archive (`dramaturgist-tuning-markdown-archive/dt-NN-MMM--*.md`)

These already carry rich frontmatter from the Codex archive build. The fields are:

```yaml
---
archive_id: "dramaturgist-tuning"
pair_id: "dt-NN-MMM"
global_pair_index: N
conversation_index: N
conversation_pair_index: N
conversation_title: "..."
conversation_id: "uuid"
source_shard: "conversations-019.json"
project_key: "g-p-..."
share_anchor_url: ""
conversation_created_utc: "ISO 8601"
conversation_updated_utc: "ISO 8601"
generated_at_utc: "ISO 8601"
prompt_message_ids: ["uuid", ...]
response_message_ids: ["uuid", ...]
assistant_models: ["gpt-5-4-thinking"]
attachment_count: N
omitted_message_counts:
  omitted_system: N
  omitted_total: N
content_sha256: "..."
cleaning: "visible user/assistant path only; ..."
---
```

**Do not modify these fields without re-running the archive build script.** They cross-reference `00-metadata.tsv`. If you regenerate the archive, the script will produce fresh frontmatter; don't hand-edit.

### Type: plan (`.claude/plans/YYYY-MM-DD-*.md`)

Plans don't currently require frontmatter (convention is the dated filename + H1 + body sections like "## Goal", "## Decisions", "## Execution waves"). If you want to add structured frontmatter to a plan, optional fields:

```yaml
---
plan_date: "YYYY-MM-DD"
status: active                        # enum: active | superseded | archived
supersedes: ["YYYY-MM-DD-*.md"]        # optional
---
```

### Type: directory anchor README (`*/README.md`)

See `directory-readme.md` for the full spec — short version:

```yaml
---
purpose: "What lives in this directory."
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §X.Y"   # optional; reference if blueprint-anticipated
status: scaffolded                   # enum: planned | scaffolded | partially-implemented | implemented
planned_files: ["file1.ts", "file2.ts", ...]  # optional
---
```

## What frontmatter must NOT contain

- **Secrets** (API keys, tokens, passwords). Never. Period.
- **Long prose**. Frontmatter is structured data. Multi-paragraph descriptions belong in the body.
- **Information that changes more than weekly** (e.g., "last edited by X"). Git knows already.
- **Information duplicated elsewhere**. If `created_at: 2026-05-13` is also in `git log`, only put it in frontmatter if structured-search queries need it.

## Tooling

There's no automated validator yet. When one is needed (likely when >50 docs exist), add a CI step that parses each markdown's frontmatter via `gray-matter` (or similar) and validates against a per-type schema.

## Evolution

Add a new doc-type schema when a doc-type appears 3+ times and the fields differ from existing types. Don't pre-define schemas for hypothetical doc types.
