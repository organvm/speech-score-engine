# Materialize blueprint artifacts + filename + frontmatter reform

**Trigger:** User screenshot of Finder showing `dramaturgist-tuning-08--branch-prot...-concept--009-prompt-response.md`-style filenames truncating uselessly in column view. User: "we should be able to derive exactly what it is without clicking into itself." Plus: "create each and every item/element/artifact alluded to in those chat sessions."

**Scope confinement (per same user turn):** Stay strictly inside `/Users/4jp/Code/speech-score-engine`. Nothing outside this repo is in scope.

**Date:** 2026-05-13

## Diagnosis

Two distinct problems collapsed into one ask:

1. **Filename information density** — the existing chat-pair filenames are dominated by the redundant `dramaturgist-tuning-` prefix (already implied by parent dir name) and the redundant `-prompt-response.md` suffix (every file is one). The actually-useful middle (conversation title) gets ellipsized in Finder's column view at any reasonable width. Result: from a flat file list, the only legible information is the index numbers.

2. **Sparse materialization** — the design corpus (14 canvases + 36 prompt-response pairs) names many specific artifacts (file paths, ADRs, architecture docs, package layouts, contract names) that don't yet exist on disk. The scaffold commit `f8305cb` materialized a *minimum* skeleton; the user wants the full anticipated surface.

## Decisions

### 1. Naming convention (durable)

| Current | Proposed | Rationale |
|---|---|---|
| `dramaturgist-tuning-08--branch-prot...-concept--009-prompt-response.md` | `dt-08-009--prompt-governance-charter.md` | Drop the parent-dir-name prefix; drop the redundant `-prompt-response` suffix; use the existing `pair_id` from frontmatter (`dt-NN-MMM`) as the structural anchor; add a derived prompt-topic slug. |
| `dramaturgist-tuning-00--README.md` | `00-README.md` | Same prefix-drop. |
| `dramaturgist-tuning-00--manifest.json` | `00-manifest.json` | Same. |
| `dramaturgist-tuning-00--metadata.tsv` | `00-metadata.tsv` | Same. |
| `dramaturgist-tuning-00--full-prompt-response-archive.md` | `00-full-archive.md` | Same. |

The `dt-` prefix on chat-pair files is the kebab-form of the project's archive ID and resolves the "what kind of file is this" question at a glance.

Documented in: `docs/conventions/naming.md`.

### 2. Frontmatter standard (durable)

Codex already wrote good frontmatter on each chat-pair file (`pair_id`, `conversation_index`, `conversation_id`, `source_shard`, `assistant_models`, `content_sha256`, etc.). What's missing is:

- A documented standard so future agents know what fields are required vs. optional vs. forbidden.
- Frontmatter on `docs/product/*.md` copies (the canvas content currently has no frontmatter on the copies).
- A `directory_readme` convention: every blueprint-anticipated directory gets a `README.md` with structured frontmatter declaring purpose, blueprint-source-section, status (planned/scaffolded/implemented), and the file inventory.

Documented in: `docs/conventions/frontmatter.md`.

### 3. Materialization scope

The blueprint (`docs/product/repository-blueprint-handoff-package.md`) is the structured source. Every directory/file it names that doesn't currently exist gets created. Files come in three flavors based on what the blueprint actually asks for:

- **Code artifacts the blueprint specifies content for**: created as real working code (e.g., `client-sdk/src/http.ts` is a real Fetch wrapper, not a stub).
- **Directories the blueprint names but doesn't fill**: created with a `README.md` documenting purpose + blueprint-source + planned file inventory. No empty TS stubs.
- **Docs the blueprint names by title**: created with derived content from the source canvases (e.g., `docs/architecture/002-domain-model.md` content comes from the domain modeling sections of the system-design-package canvas).

Hard rule: no file in this pass contains `throw new Error("not implemented")`, `TODO`, or `// implement me`. Every file is genuinely useful as it is.

## Execution waves

### Wave A — Conventions (must come first; later waves reference these)
1. `docs/conventions/README.md` — points at the three conventions docs
2. `docs/conventions/naming.md` — full naming spec
3. `docs/conventions/frontmatter.md` — full frontmatter spec  
4. `docs/conventions/directory-readme.md` — what every directory README contains

### Wave B — Chat-archive renames + manifest sync
1. Derive topic slug for each of 36 pair files (already extracted prompt-line for each via awk)
2. `git mv` each pair file to `dt-NN-MMM--{topic-slug}.md`
3. `git mv` four index files to `00-{name}`
4. Rewrite `00-metadata.tsv` with new filenames + recomputed SHA-256s (since content unchanged, hashes don't change — but I'll re-hash to verify)
5. Rewrite `00-manifest.json` — update `flat_hierarchy_pattern` field, drop "dramaturgist-tuning-" from any per-conversation file lists if present
6. Update `00-README.md` to reference the new convention + add link to `docs/conventions/naming.md`

### Wave C — Blueprint architecture docs (`docs/architecture/`)
1. `001-system-context.md` — system context diagram (text) + boundary
2. `002-domain-model.md` — entities + relationships derived from migrations + domain types
3. `003-render-pipeline.md` — render-job lifecycle
4. `004-versioning-model.md` — the mutable-scene + immutable-version-snapshot split
5. `005-api-contracts.md` — pointer to TS contracts in `@sse/domain/contracts`

### Wave D — Remaining ADRs
1. `0002-postgres-jsonb-snapshots.md`
2. `0003-async-render-worker.md`
3. `0004-scene-version-immutability.md`

### Wave E — Blueprint-anticipated shared packages
1. `packages/client-sdk/` — package.json, tsconfig, src/index.ts, src/http.ts (real Fetch wrapper)
2. `packages/ui/` — package.json, tsconfig, src/index.ts (empty exports, ready for components)
3. `packages/observability/` — package.json, tsconfig, src/index.ts, src/logger.ts (real pino factory)

### Wave F — Directory anchors (README.md in each anticipated dir)
- apps/api/src/{server,modules,services,repositories,policies,contracts,bootstrap}/README.md
- apps/worker/src/{bootstrap,jobs,providers,pipelines,services,telemetry}/README.md
- apps/web/src/{components,hooks,lib,state,styles,types}/README.md
- packages/database/{seeds, src/{schema,queries,repositories,transactions}}/README.md (seeds gets a README PLUS real seed files)
- infrastructure/{terraform,scripts}/README.md
- test/{fixtures,integration,e2e}/README.md
- packages/domain/src/{speaker,version,render,diagnostics,share,events}/README.md
- Plus: `packages/domain/src/events/event-names.ts` + `event-payloads.ts` — real string constants and type unions (the blueprint specifies these contents)

### Wave G — Real seed SQL
- `packages/database/seeds/voice_profiles.seed.sql` — 3-5 mock voice profiles
- `packages/database/seeds/sample_project.seed.sql` — one user + project + scene + speakers
- Add `pnpm db:seed` script to root `package.json` and seed runner in `@sse/database`

### Wave H — `docs/product/*.md` frontmatter
Add YAML frontmatter to each canvas copy (13 files) noting: source path in `sources/`, SHA-1 of source, ProjectSave ID, conversation_id from `SOURCES-INDEX.md`. Frontmatter on the COPIES only — `sources/` files stay byte-frozen for provenance.

### Wave I — CLAUDE.md update
Re-document the new layout (new package count, new conventions/ dir, new architecture/ dir, renamed archive files). Add a "naming conventions" pointer.

### Wave J — Smoke test + commit + push
- `pnpm install` (may not be needed; only if new packages added deps)
- `pnpm typecheck` — must stay green
- `pnpm lint` — must stay green
- `pnpm build` — must stay green
- One commit per wave OR one big commit. Default: ONE commit, since these all serve the same user-request unit. Title: "Materialize blueprint-anticipated artifacts + filename + frontmatter conventions"

## Risks

- **Renaming preserves content SHA-256, but the metadata.tsv's `filename` column will be stale until updated in the same commit.** Always update metadata.tsv in the same change-set as the renames.
- **Adding directory READMEs to e.g. `apps/web/src/components/` creates the directory.** If Next.js or Turbo's caching gets confused by suddenly-present dirs that didn't exist, build could break. Mitigation: each new dir has at least one file (the README), which is enough for git tracking; Next.js doesn't autoload from arbitrary subdirs of src.
- **`packages/observability` and `packages/ui` adding deps without consumers using them is fine, but installing real runtime packages just for "looks complete" is waste.** Each new package should ship something genuinely useful — pino factory for observability, a single styled-jsx-or-similar primitive for ui. If neither is genuine yet, defer that package.
- **Sequencing matters for conventions docs** — Wave A first, otherwise wave-F README.md anchors get written ad-hoc and the standard gets retrofit pressure.

## Out of scope (user direction: "another agent session")

- Anything outside `/Users/4jp/Code/speech-score-engine`
- Implementing the scene parser
- Implementing the version-creation transaction
- Implementing the voice-provider adapter
- The MVP-spec's screen designs (mockup work)
- Any of the deeper artifact-level work that would change the *semantics* of an existing file (vs. metadata reform)
