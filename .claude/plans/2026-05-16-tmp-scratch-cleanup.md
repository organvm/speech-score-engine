---
type: plan
title: /tmp scratch cleanup — smoke targets + ontology-derivation orphans
date: 2026-05-16
status: closed
predecessor_closeout: .claude/plans/2026-05-16-closeout-sse-bootstrap-sop-plugin.md
governance_section: CLAUDE.md "Cross-cluster artifact drift" + "Etiquette for future spillover"
---

# /tmp scratch cleanup — smoke targets + ontology-derivation orphans

Post-closeout cleanup of `/tmp/sse-*` artifacts that accumulated across the plugin-replay smoke testing and the earlier 2026-05-13 ontology-extraction session. Recorded here as a **worked example** of the cluster-spillover etiquette codified in CLAUDE.md ("verify before deleting", "SHA-256 match against durable sibling required for any file with content"). Not in the closeout's scope because it post-dates `324c6bc`.

## What was deleted

### Smoke targets (two directories)

| Path | Origin | Authorization |
|---|---|---|
| `/tmp/sse-replay-2026-05-16/` | This session's in-seat replay exercise (Phase D step 1 reproduction against fresh empty target) | User: "clean up the smoke targets" |
| `/tmp/sse-smoke-2026-05-16/` | Previous session's plugin smoke test (commit `324c6bc` closeout § Outputs) | Same |

Both contained only scaffold files I hand-authored from the SKILL.md prose: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `biome.json`, `tsconfig.base.json`, `docs/conventions/directory-readme.md`, `infrastructure/docker/compose.yaml`, plus empty `apps/{web,api,worker}/` and `packages/{domain,database,config,client-sdk,ui,observability}/` directories. **Disposable by design** — the procedure that produced them is preserved in the plugin's SKILL.md, deterministically reproducible.

### Ontology-derivation orphans (four files)

| Path | SHA-256 | Bytes | Durable sibling |
|---|---|---|---|
| `/tmp/sse-ontology-era1.md` | `e38236ba76e94679…` | 55156 | `dramaturgist-tuning-markdown-archive/derived/sse-ontology-era1.md` |
| `/tmp/sse-ontology-era2.md` | `f5be5231defac644…` | 40102 | `dramaturgist-tuning-markdown-archive/derived/sse-ontology-era2.md` |
| `/tmp/sse-ontology-era3.md` | `14805bab476f1066…` | 38007 | `dramaturgist-tuning-markdown-archive/derived/sse-ontology-era3.md` |
| `/tmp/sse-tokens.txt` | `faa226c12420e647…` | 9732 | `dramaturgist-tuning-markdown-archive/derived/sse-tokens.txt` |

These four files were created by a 2026-05-13 ontology-extraction pass against `dramaturgist-tuning-markdown-archive/sources/` (`dt-NN-MMM--*.md` per-pair files). Their durable counterparts were committed in `6adde86` ("Reframe CLAUDE.md as cluster-aware; archive SSE-ontology derivations") and pushed. **The `/tmp` copies are byte-identical** to the committed siblings — `diff -q` returned silent, SHA-256s match to the full digest. Qualified for deletion per cluster-spillover rule #2.

## How each item qualified for deletion

The CLAUDE.md cluster-spillover etiquette (§ "Etiquette for future spillover" rule #2) is explicit:

> "Verify before deleting. SOP §4.2 requires SHA-256 match against the archive counterpart. Empty files (0 bytes) are safe to delete; anything with content needs hash verification against at least one durable sibling."

**Smoke targets**: classification by recency and intent — they were ephemeral by design, created during this session arc, named in `2026-05-16-closeout-sse-bootstrap-sop-plugin.md` § Pending as "Smoke target … remains as evidence of Phase D execution. Disposable." No durable-sibling check needed because no claim of durable content was ever made.

**Ontology files**: required SHA-256 verification against `dramaturgist-tuning-markdown-archive/derived/`. All four hashes matched exactly. The durable copies remain on disk and are pushed to `origin/main` — deleting the `/tmp` copies removes redundancy, not data.

## Worked-example value

This cleanup is the first execution of the cluster-spillover protocol on real orphan files since the protocol was codified in `6adde86`. Two things worth carrying forward:

1. **Shell-pipeline subshell gotcha**: my first SHA sweep used `find … | while read f; do … done` and produced a false negative — the `echo MATCH` ran in a subshell whose output didn't propagate. Switching to direct `diff -q` and per-file `shasum -a 256` against the explicit derived/ path confirmed byte-identity. **Lesson**: for SHA-sweep correctness in zsh, use process substitution (`while read; do …; done < <(find …)`) so the loop body executes in the parent shell, or simplify to per-file checks when the durable-sibling path is known.

2. **The verify-before-delete principle catches a real risk**: had I taken the user's conditional ("if they qualify for deletion") as a directive to delete, the four ontology files would have been at risk if the durable siblings hadn't been committed. The protocol's SHA-256 requirement protects against agents reading "scratch path" and confusing it with "ephemeral content."

## Final /tmp state

```
$ ls /tmp/sse-*
(no /tmp/sse-* remain)
```

## Artifact

This plan itself is the artifact. No commits-of-changes (the deletions are outside the git tree); only this record. Authoring + committing this file is the durable trace.
