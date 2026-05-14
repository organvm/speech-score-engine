---
description: Replay the speech-score-engine bootstrap SOP into a target directory
argument-hint: "[target-dir]"
allowed-tools: ["Read", "Write", "Bash", "Skill", "TodoWrite", "AskUserQuestion"]
---

# Replay bootstrap SOP

The `sse-bootstrap` skill orchestrates a six-phase procedure that bootstraps a TypeScript pnpm-workspace monorepo from a ChatGPT design corpus. This command is a thin entry point — it runs a drift-check on the plugin's reference snapshots, then hands control to the skill.

## Steps

1. **Drift-check.** Run `bash ${CLAUDE_PLUGIN_ROOT}/skills/sse-bootstrap/scripts/snapshot-state.sh --check`. If exit code is non-zero, surface the drift to the user — references 02 (commit-log) and 03 (plan-log) are stale relative to the plugin's host repo. The user can run `--rewrite` to refresh, or proceed knowing the historical references describe an older state.

2. **Resolve target directory.** Take the target from `$ARGUMENTS`. If empty, ask the user where to bootstrap. The target must be an empty directory (or a non-existent path that can be `mkdir -p`'d).

3. **Invoke the `sse-bootstrap` skill.** Load `${CLAUDE_PLUGIN_ROOT}/skills/sse-bootstrap/SKILL.md` and follow the procedure. Pass the target directory as the working location.

## Sharp edges

- **This plugin replays the bootstrap into a NEW target.** Running it against the speech-score-engine repo itself is undefined behavior — the skill's preconditions name an empty target.
- **The skill requires ChatGPT browser-session access** for Phase A (canvas recovery). If the user doesn't have a design corpus to recover from, the procedure starts at Phase D (scaffold generation) and the skill's "Recovery from common deviations" section names the alternative entry points.
- **Drift-check failure is informational, not fatal.** Stale references describe an older snapshot of this repo's history; the reproducible procedure in SKILL.md is independent.

## Argument

Target directory: `$ARGUMENTS`
