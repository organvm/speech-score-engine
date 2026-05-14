---
title: Commit-by-commit history
snapshot_commit: d72f5ba
generated_at: 2026-05-14T14:41:39Z
source: "git log --reverse --pretty=format:'%h %ad %s' --date=short"
generated_by: plugin/skills/sse-bootstrap/scripts/snapshot-state.sh
---

# Commit-by-commit history

One entry per commit, in chronological order (`git log --reverse`). For grouped-narrative form see [01-phase-history.md](01-phase-history.md). For deliberation context see [03-plan-log.md](03-plan-log.md).

## bba6f71 — 2026-05-13 — Initial commit: dramaturgist-tuning project recovery archive

- **Full SHA**: `bba6f7152b7f5514663e3ad66c9b503f480b03c7`
- **Files (stat)**:

```
 ...6-05-13-dramaturgist-canvas-recovery-handoff.md |   98 +
 CLAUDE.md                                          |   84 +
 ...26 12\357\274\23207\357\274\23250 AM) (1).html" |    7 +
 canvas-01--tracker-ableton-speech-workstation.md   |  203 +
 dramaturgist-tuning-conversation-inventory.md      |   31 +
 dramaturgist-tuning-conversation-inventory.tsv     |   55 +
 .../dramaturgist-tuning-00--README.md              |   41 +
 ...gist-tuning-00--full-prompt-response-archive.md | 9081 ++++++++++++++++++++
 .../dramaturgist-tuning-00--manifest.json          | 1561 ++++
 .../dramaturgist-tuning-00--metadata.tsv           |   37 +
 ...ical-composition-system--001-prompt-response.md |  176 +
 ...ical-composition-system--002-prompt-response.md |  343 +
 ...ased-performance-system--001-prompt-response.md |  290 +
 ...ased-performance-system--001-prompt-response.md |  288 +
 ...ased-performance-system--002-prompt-response.md |  311 +
 ...ased-performance-system--003-prompt-response.md |  490 ++
 ...ased-performance-system--004-prompt-response.md |  677 ++
 ...ased-performance-system--005-prompt-response.md | 1383 +++
 ...ased-performance-system--006-prompt-response.md | 1104 +++
 ...ap-analysis-and-merging--001-prompt-response.md |  263 +
 ...ap-analysis-and-merging--002-prompt-response.md |  156 +
 ...ap-analysis-and-merging--003-prompt-response.md |  361 +
 ...ap-analysis-and-merging--004-prompt-response.md |   79 +
 ...er-and-ableton-features--001-prompt-response.md |  269 +
 ...er-and-ableton-features--002-prompt-response.md |  299 +
 ...prototype-and-poc-steps--001-prompt-response.md |  164 +
 ...prototype-and-poc-steps--002-prompt-response.md |   68 +
 ...prototype-and-poc-steps--003-prompt-response.md |   82 +
 ...pe-and-proof-of-concept--001-prompt-response.md |  113 +
 ...pe-and-proof-of-concept--002-prompt-response.md |  131 +
 ...pe-and-proof-of-concept--003-prompt-response.md |  230 +
 ...pe-and-proof-of-concept--004-prompt-response.md |  137 +
 ...pe-and-proof-of-concept--005-prompt-response.md |   99 +
 ...pe-and-proof-of-concept--006-prompt-response.md |  101 +
 ...pe-and-proof-of-concept--007-prompt-response.md |  359 +
 ...pe-and-proof-of-concept--008-prompt-response.md |  176 +
 ...pe-and-proof-of-concept--001-prompt-response.md |  113 +
 ...pe-and-proof-of-concept--002-prompt-response.md |  131 +
 ...pe-and-proof-of-concept--003-prompt-response.md |  230 +
 ...pe-and-proof-of-concept--004-prompt-response.md |  137 +
 ...pe-and-proof-of-concept--005-prompt-response.md |   99 +
 ...pe-and-proof-of-concept--006-prompt-response.md |  101 +
 ...pe-and-proof-of-concept--007-prompt-response.md |  359 +
 ...pe-and-proof-of-concept--008-prompt-response.md |  178 +
 ...pe-and-proof-of-concept--009-prompt-response.md |  417 +
 ...screpancy-engine-design--001-prompt-response.md |  375 +
 .../sources/SOURCES-INDEX.md                       |   51 +
 ...AW - Google Search (3_28_2026 12-07-50 AM).html |    7 +
 .../audio-dramaturgical-mvp-specification.md       |  621 ++
 .../sources/dialogue-audio-studio-architecture.md  |  432 +
 .../sources/dialogue-audio-workbench-pitch.md      |  254 +
 .../sources/lexicon-and-style-guide.md             |  466 +
 .../sources/predicting-performance-engine-goals.md |  112 +
 .../repository-blueprint-handoff-package.md        | 1048 +++
 .../sources/speech-performance-engine-concept.md   |  223 +
 .../sources/speech-score-engine-overview.md        |  284 +
 .../sources/speech-score-engine-system.md          |  223 +
 .../sources/speech-score-system-definition.md      |   86 +
 .../sources/speech-score-terminology-charter.md    |  293 +
 .../sources/system-design-package.md               | 1321 +++
 .../sources/tracker-ableton-speech-workstation.md  |  203 +
 lexicon-and-style-guide.md                         |  466 +
 62 files changed, 27577 insertions(+)
```

## 7437f80 — 2026-05-13 — Resolve root-level stray files post-recovery

- **Full SHA**: `7437f800a5acfc935439afee9c6b31fea4a94150`
- **Files (stat)**:

```
 CLAUDE.md                                          |  15 +-
 canvas-01--tracker-ableton-speech-workstation.md   | 203 ---------
 .../codex-conversation-inventory.md                |   0
 .../codex-conversation-inventory.tsv               |   0
 .../sources/SOURCES-INDEX.md                       |   5 +-
 ...ch (3_28_2026 12-07-50 AM).singlefile-full.html |   0
 lexicon-and-style-guide.md                         | 466 ---------------------
 7 files changed, 10 insertions(+), 679 deletions(-)
```

## f8305cb — 2026-05-13 — Scaffold: monorepo skeleton tracking blueprint §16

- **Full SHA**: `f8305cb4f1f8958e3b122222dce8940e67b40ad7`
- **Files (stat)**:

```
 .../plans/2026-05-13-scaffold-implementation.md    |  109 ++
 .env.example                                       |   28 +
 .github/workflows/ci.yml                           |   82 +
 .gitignore                                         |   27 +
 CLAUDE.md                                          |   72 +-
 README.md                                          |   86 +
 apps/api/package.json                              |   23 +
 apps/api/src/server.ts                             |   36 +
 apps/api/tsconfig.json                             |    9 +
 apps/web/next-env.d.ts                             |    6 +
 apps/web/next.config.ts                            |    7 +
 apps/web/package.json                              |   23 +
 apps/web/src/app/layout.tsx                        |   15 +
 apps/web/src/app/page.tsx                          |   36 +
 apps/web/tsconfig.json                             |   19 +
 apps/worker/package.json                           |   23 +
 apps/worker/src/index.ts                           |   40 +
 apps/worker/src/queues.ts                          |   13 +
 apps/worker/tsconfig.json                          |    9 +
 biome.json                                         |   44 +
 docs/adr/0001-monorepo-decision.md                 |   38 +
 docs/product/README.md                             |   24 +
 docs/product/dialogue-audio-studio-architecture.md |  432 +++++
 docs/product/dialogue-audio-workbench-pitch.md     |  254 +++
 docs/product/lexicon-and-style-guide.md            |  466 +++++
 docs/product/mvp-spec.md                           |  621 +++++++
 .../product/predicting-performance-engine-goals.md |  112 ++
 .../repository-blueprint-handoff-package.md        | 1048 ++++++++++++
 docs/product/speech-performance-engine-concept.md  |  223 +++
 docs/product/speech-score-engine-overview.md       |  284 ++++
 docs/product/speech-score-engine-system.md         |  223 +++
 docs/product/speech-score-system-definition.md     |   86 +
 docs/product/speech-score-terminology-charter.md   |  293 ++++
 docs/product/system-design-package.md              | 1321 +++++++++++++++
 docs/product/tracker-ableton-speech-workstation.md |  203 +++
 infrastructure/docker/compose.yaml                 |   50 +
 package.json                                       |   27 +
 packages/config/package.json                       |   21 +
 packages/config/src/env.ts                         |   41 +
 packages/config/src/index.ts                       |    1 +
 packages/config/tsconfig.json                      |    9 +
 .../migrations/0001_init_users_projects_scenes.sql |   38 +
 .../0002_add_speakers_voice_profiles.sql           |   30 +
 .../0003_add_scene_versions_version_lines.sql      |   32 +
 .../0004_add_render_profiles_playback_renders.sql  |   33 +
 .../0005_add_diagnostic_reports_share_links.sql    |   28 +
 .../database/migrations/0006_add_audit_events.sql  |   17 +
 packages/database/package.json                     |   24 +
 packages/database/src/client.ts                    |   12 +
 packages/database/src/index.ts                     |    1 +
 packages/database/src/migrate.ts                   |   51 +
 packages/database/tsconfig.json                    |    8 +
 packages/domain/package.json                       |   23 +
 .../domain/src/contracts/diagnostics.service.ts    |   22 +
 packages/domain/src/contracts/index.ts             |    4 +
 .../src/contracts/render-dispatch.service.ts       |   21 +
 .../domain/src/contracts/versioning.service.ts     |   18 +
 .../domain/src/contracts/voice-provider.adapter.ts |   26 +
 packages/domain/src/index.ts                       |    3 +
 packages/domain/src/parsing/index.ts               |   13 +
 packages/domain/src/scene/index.ts                 |    2 +
 packages/domain/src/scene/scene.schemas.ts         |   34 +
 packages/domain/src/scene/scene.types.ts           |   74 +
 packages/domain/tsconfig.json                      |    8 +
 pnpm-lock.yaml                                     | 1776 ++++++++++++++++++++
 pnpm-workspace.yaml                                |    3 +
 tsconfig.base.json                                 |   21 +
 turbo.json                                         |   18 +
 68 files changed, 8806 insertions(+), 18 deletions(-)
```

## e36a88f — 2026-05-13 — Materialize blueprint-anticipated artifacts; reform filenames + frontmatter

- **Full SHA**: `e36a88fe6029275f798336a23f29f0904388eec4`
- **Files (stat)**:

```
 .../2026-05-13-materialize-blueprint-artifacts.md  | 128 ++++++++++++++++
 CLAUDE.md                                          |  47 ++++--
 apps/api/src/bootstrap/README.md                   |  64 ++++++++
 apps/api/src/contracts/README.md                   |  28 ++++
 apps/api/src/modules/README.md                     |  58 ++++++++
 apps/api/src/policies/README.md                    |  47 ++++++
 apps/api/src/repositories/README.md                |  47 ++++++
 apps/api/src/server/README.md                      |  47 ++++++
 apps/api/src/services/README.md                    |  45 ++++++
 apps/web/src/components/README.md                  |  42 ++++++
 apps/web/src/hooks/README.md                       |  27 ++++
 apps/web/src/lib/README.md                         |  27 ++++
 apps/web/src/state/README.md                       |  35 +++++
 apps/web/src/styles/README.md                      |  25 ++++
 apps/web/src/types/README.md                       |  19 +++
 apps/worker/src/bootstrap/README.md                |  30 ++++
 apps/worker/src/jobs/README.md                     |  42 ++++++
 apps/worker/src/pipelines/README.md                |  26 ++++
 apps/worker/src/providers/README.md                |  48 ++++++
 apps/worker/src/services/README.md                 |  28 ++++
 apps/worker/src/telemetry/README.md                |  28 ++++
 docs/adr/0002-postgres-jsonb-snapshots.md          | 107 ++++++++++++++
 docs/adr/0003-async-render-worker.md               | 105 +++++++++++++
 docs/adr/0004-scene-version-immutability.md        | 102 +++++++++++++
 docs/architecture/001-system-context.md            | 100 +++++++++++++
 docs/architecture/002-domain-model.md              | 161 ++++++++++++++++++++
 docs/architecture/003-render-pipeline.md           | 139 ++++++++++++++++++
 docs/architecture/004-versioning-model.md          | 145 ++++++++++++++++++
 docs/architecture/005-api-contracts.md             | 107 ++++++++++++++
 docs/conventions/README.md                         |  33 +++++
 docs/conventions/directory-readme.md               |  85 +++++++++++
 docs/conventions/frontmatter.md                    | 162 +++++++++++++++++++++
 docs/conventions/naming.md                         | 120 +++++++++++++++
 docs/product/dialogue-audio-studio-architecture.md |  11 ++
 docs/product/dialogue-audio-workbench-pitch.md     |  11 ++
 docs/product/lexicon-and-style-guide.md            |   9 ++
 docs/product/mvp-spec.md                           |  11 ++
 .../product/predicting-performance-engine-goals.md |  11 ++
 .../repository-blueprint-handoff-package.md        |  11 ++
 docs/product/speech-performance-engine-concept.md  |  12 ++
 docs/product/speech-score-engine-overview.md       |  11 ++
 docs/product/speech-score-engine-system.md         |  12 ++
 docs/product/speech-score-system-definition.md     |  11 ++
 docs/product/speech-score-terminology-charter.md   |  11 ++
 docs/product/system-design-package.md              |  11 ++
 docs/product/tracker-ableton-speech-workstation.md |  11 ++
 dramaturgist-tuning-markdown-archive/00-README.md  | 104 +++++++++++++
 ...ompt-response-archive.md => 00-full-archive.md} |   0
 ...t-tuning-00--manifest.json => 00-manifest.json} | 108 +++++++-------
 .../00-metadata.tsv                                |  37 +++++
 .../dramaturgist-tuning-00--README.md              |  41 ------
 .../dramaturgist-tuning-00--metadata.tsv           |  37 -----
 ...md => dt-01-001--predict-system-from-photos.md} |   0
 ...e.md => dt-01-002--formalize-system-concept.md} |   0
 ...md => dt-02-001--predict-system-from-photos.md} |   0
 ...md => dt-03-001--predict-system-from-photos.md} |   0
 ...d => dt-03-002--dramaturgical-product-frame.md} |   0
 ...se.md => dt-03-003--user-types-mvp-boundary.md} |   0
 ...t-response.md => dt-03-004--formal-mvp-spec.md} |   0
 ...> dt-03-005--product-design-systems-package.md} |   0
 ... => dt-03-006--repository-blueprint-handoff.md} |   0
 ...nse.md => dt-04-001--gap-analysis-and-merge.md} |   0
 ... => dt-04-002--canonical-project-definition.md} |   0
 ...sponse.md => dt-04-003--terminology-charter.md} |   0
 ...se.md => dt-04-004--lexicon-and-style-guide.md} |   0
 ...e.md => dt-05-001--tracker-ableton-features.md} |   0
 ...05-002--pattern-session-arrangement-screens.md} |   0
 ...nse.md => dt-06-001--prototype-and-poc-path.md} |   0
 ...d => dt-06-002--poc-build-spec-four-screens.md} |   0
 ...dt-06-003--tracker-time-sequences-essential.md} |   0
 ...nse.md => dt-07-001--prototype-and-poc-path.md} |   0
 ...t-07-002--max-msp-supercollider-feasibility.md} |   0
 ...=> dt-07-003--dialogue-cluster-tracker-demo.md} |   0
 ...=> dt-07-004--voice-synthesis-injectability.md} |   0
 ...> dt-07-005--voice-clone-audio-requirements.md} |   0
 ... dt-07-006--theatre-company-voice-on-travel.md} |   0
 ...d => dt-07-007--theatre-voice-capture-sheet.md} |   0
 ...> dt-07-008--preconsidered-prompt-readiness.md} |   0
 ...nse.md => dt-08-001--prototype-and-poc-path.md} |   0
 ...t-08-002--max-msp-supercollider-feasibility.md} |   0
 ...=> dt-08-003--dialogue-cluster-tracker-demo.md} |   0
 ...=> dt-08-004--voice-synthesis-injectability.md} |   0
 ...> dt-08-005--voice-clone-audio-requirements.md} |   0
 ... dt-08-006--theatre-company-voice-on-travel.md} |   0
 ...d => dt-08-007--theatre-voice-capture-sheet.md} |   0
 ...e.md => dt-08-008--prompt-freedom-reduction.md} |   0
 ....md => dt-08-009--prompt-governance-charter.md} |   0
 ....md => dt-09-001--discrepancy-engine-design.md} |   0
 infrastructure/scripts/README.md                   |  30 ++++
 infrastructure/terraform/README.md                 |  32 ++++
 package.json                                       |   1 +
 packages/client-sdk/package.json                   |  20 +++
 packages/client-sdk/src/http.ts                    | 108 ++++++++++++++
 packages/client-sdk/src/index.ts                   |   1 +
 packages/client-sdk/tsconfig.json                  |   9 ++
 packages/database/package.json                     |   3 +-
 packages/database/seeds/README.md                  |  36 +++++
 packages/database/seeds/sample_project.seed.sql    |  79 ++++++++++
 packages/database/seeds/voice_profiles.seed.sql    |  21 +++
 packages/database/src/queries/README.md            |  18 +++
 packages/database/src/repositories/README.md       |  23 +++
 packages/database/src/schema/README.md             |  27 ++++
 packages/database/src/seed.ts                      |  36 +++++
 packages/database/src/transactions/README.md       |  54 +++++++
 packages/domain/src/diagnostics/README.md          |  25 ++++
 packages/domain/src/events/event-names.ts          |  46 ++++++
 packages/domain/src/events/event-payloads.ts       | 127 ++++++++++++++++
 packages/domain/src/events/index.ts                |   2 +
 packages/domain/src/index.ts                       |   1 +
 packages/domain/src/render/README.md               |  19 +++
 packages/domain/src/share/README.md                |  33 +++++
 packages/domain/src/speaker/README.md              |  24 +++
 packages/domain/src/version/README.md              |  22 +++
 packages/observability/package.json                |  21 +++
 packages/observability/src/index.ts                |   1 +
 packages/observability/src/logger.ts               |  38 +++++
 packages/observability/tsconfig.json               |   9 ++
 packages/ui/package.json                           |  23 +++
 packages/ui/src/cn.ts                              |  33 +++++
 packages/ui/src/index.ts                           |   1 +
 packages/ui/tsconfig.json                          |  10 ++
 pnpm-lock.yaml                                     |  71 +++++++++
 test/README.md                                     |  40 +++++
 test/e2e/README.md                                 |  30 ++++
 test/fixtures/README.md                            |  31 ++++
 test/integration/README.md                         |  31 ++++
 126 files changed, 3714 insertions(+), 146 deletions(-)
```

## 916472c — 2026-05-13 — Add session closeout summary

- **Full SHA**: `916472c4688a5a3d37ad17927d7654c99e31c15d`
- **Files (stat)**:

```
 .claude/plans/2026-05-13-closeout.md | 90 ++++++++++++++++++++++++++++++++++++
 1 file changed, 90 insertions(+)
```

## 672ecf3 — 2026-05-13 — Add plan for §13 vertical slice (scene CRUD + parser)

- **Full SHA**: `672ecf3199399af1bfe6d661cbe600e48e58911d`
- **Files (stat)**:

```
 .../2026-05-13-scene-crud-and-parser-slice.md      | 220 +++++++++++++++++++++
 1 file changed, 220 insertions(+)
```

## b18469c — 2026-05-13 — Add objects/subjects inventory derived from raw transcripts

- **Full SHA**: `b18469c0c541d4e045044f931be088790b7e7d70`
- **Files (stat)**:

```
 .../objects-and-subjects-inventory.md              | 1463 ++++++++++++++++++++
 1 file changed, 1463 insertions(+)
```

## 6074094 — 2026-05-13 — Implement Wave 1 of §13 slice: domain contracts

- **Full SHA**: `60740942e04b6adff557fa6ab5ebfddf0e90111d`
- **Files (stat)**:

```
 packages/domain/package.json                    |  2 ++
 packages/domain/src/index.ts                    |  2 ++
 packages/domain/src/project/index.ts            |  3 +++
 packages/domain/src/project/project.requests.ts | 18 +++++++++++++
 packages/domain/src/project/project.schemas.ts  | 12 +++++++++
 packages/domain/src/project/project.types.ts    | 11 ++++++++
 packages/domain/src/scene/index.ts              |  1 +
 packages/domain/src/scene/scene.requests.ts     | 34 +++++++++++++++++++++++++
 packages/domain/src/scene/scene.schemas.ts      | 16 ++++++++++++
 packages/domain/src/user/index.ts               |  2 ++
 packages/domain/src/user/user.schemas.ts        | 11 ++++++++
 packages/domain/src/user/user.types.ts          | 12 +++++++++
 12 files changed, 124 insertions(+)
```

## 6bbd5dc — 2026-05-13 — Track prior session closeout-v2 and Serena project config

- **Full SHA**: `6bbd5dc9ac68f3fd22d7e4232bff1c59bf591285`
- **Files (stat)**:

```
 .claude/plans/2026-05-13-closeout-v2.md |  54 +++++++++++++
 .serena/.gitignore                      |   2 +
 .serena/project.yml                     | 132 ++++++++++++++++++++++++++++++++
 3 files changed, 188 insertions(+)
```

## 47451d7 — 2026-05-13 — Add session closeout (v3): Wave 1 of §13 slice shipped

- **Full SHA**: `47451d77a4e08cd0a0b14cc6a86cdc4f42f444b9`
- **Files (stat)**:

```
 .claude/plans/2026-05-13-closeout-v3.md | 121 ++++++++++++++++++++++++++++++++
 1 file changed, 121 insertions(+)
```

## 6adde86 — 2026-05-14 — Reframe CLAUDE.md as cluster-aware; archive SSE-ontology derivations

- **Full SHA**: `6adde8696c21f0f474094cade69c0c59ca64606d`
- **Files (stat)**:

```
 ...6-05-13-claudemd-reconcile-and-strays-triage.md |  99 ++++
 ...oute-speech-score-strays-into-agent-ontology.md | 125 +++++
 CLAUDE.md                                          |  39 +-
 .../derived/README.md                              |  45 ++
 .../derived/sse-ontology-era1.md                   | 330 +++++++++++++
 .../derived/sse-ontology-era2.md                   | 253 ++++++++++
 .../derived/sse-ontology-era3.md                   | 228 +++++++++
 .../derived/sse-tokens.txt                         | 526 +++++++++++++++++++++
 8 files changed, 1636 insertions(+), 9 deletions(-)
```

## fb910cd — 2026-05-14 — plugin: scaffold sse-bootstrap-sop with SKILL.md, references, snapshot script

- **Full SHA**: `fb910cd835a1ccd6e4529903bd3bfacd744805da`
- **Files (stat)**:

```
 plugin/.claude-plugin/plugin.json                  |  20 ++
 plugin/commands/replay.md                          |  27 ++
 plugin/skills/sse-bootstrap/SKILL.md               | 268 ++++++++++++++
 .../sse-bootstrap/references/01-phase-history.md   | 184 ++++++++++
 .../sse-bootstrap/references/02-commit-log.md      | 384 +++++++++++++++++++++
 .../skills/sse-bootstrap/references/03-plan-log.md | 176 ++++++++++
 .../skills/sse-bootstrap/scripts/snapshot-state.sh | 227 ++++++++++++
 7 files changed, 1286 insertions(+)
```

## 8594dab — 2026-05-14 — plugin: repin sse-bootstrap-sop references to post-scaffold HEAD (fb910cd)

- **Full SHA**: `8594dab20e124d6b68525dac8952e32839dd5b74`
- **Files (stat)**:

```
 .../sse-bootstrap/references/01-phase-history.md    |  4 ++--
 .../sse-bootstrap/references/02-commit-log.md       | 21 +++++++++++++++++++--
 .../skills/sse-bootstrap/references/03-plan-log.md  |  4 ++--
 3 files changed, 23 insertions(+), 6 deletions(-)
```

