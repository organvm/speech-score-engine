#!/usr/bin/env bash
#
# snapshot-state.sh — regenerate the historical references in the sse-bootstrap skill,
# pinning each to the host repo's current HEAD.
#
# The plugin documents the speech-score-engine repo's own bootstrap history at three
# granularities:
#   references/01-phase-history.md  — human-curated narrative (this script only touches frontmatter)
#   references/02-commit-log.md     — git-log dump (regenerated wholesale)
#   references/03-plan-log.md       — .claude/plans/ inventory (regenerated wholesale)
#
# The host repo is the speech-score-engine git working tree that contains this plugin/.
# Run from anywhere inside that tree; the script resolves paths relative to itself.
#
# Flags:
#   (no flag)            equivalent to --check
#   --check              compare snapshot_commit: in each reference to git HEAD; exit 1 on drift
#   --rewrite            regenerate refs 02 and 03; update snapshot_commit: in all three
#   --verify-archive     re-compute SHA-1 prefixes for every file under
#                        dramaturgist-tuning-markdown-archive/sources/ and compare against
#                        the prefixes listed in SOURCES-INDEX.md; exit 1 on mismatch.

set -euo pipefail

# Resolve the plugin root, the host repo root, and the reference directory.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_ROOT="$(cd "${SCRIPT_DIR}/../../.." && pwd)"
REPO_ROOT="$(cd "${PLUGIN_ROOT}/.." && pwd)"
REF_DIR="${SCRIPT_DIR}/../references"

REF_01="${REF_DIR}/01-phase-history.md"
REF_02="${REF_DIR}/02-commit-log.md"
REF_03="${REF_DIR}/03-plan-log.md"

# Sanity: must be inside a git working tree.
if ! git -C "${REPO_ROOT}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "error: ${REPO_ROOT} is not a git working tree" >&2
  exit 2
fi

HEAD_SHA="$(git -C "${REPO_ROOT}" rev-parse --short HEAD)"
GENERATED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

mode="${1:---check}"

read_snapshot_commit() {
  local file="$1"
  if [[ ! -f "${file}" ]]; then
    echo ""
    return
  fi
  awk '/^snapshot_commit:/ { print $2; exit }' "${file}"
}

write_frontmatter_snapshot() {
  # Update snapshot_commit: <sha> in the YAML frontmatter, preserving body.
  local file="$1"
  local sha="$2"
  if [[ ! -f "${file}" ]]; then
    return
  fi
  local tmp
  tmp="$(mktemp)"
  awk -v sha="${sha}" -v gen="${GENERATED_AT}" '
    BEGIN { in_fm = 0; fm_count = 0; sha_written = 0; gen_written = 0 }
    /^---$/ {
      if (in_fm == 0) { in_fm = 1; fm_count = 1; print; next }
      if (in_fm == 1) {
        if (!sha_written) print "snapshot_commit: " sha
        if (!gen_written) print "generated_at: " gen
        in_fm = 2; print; next
      }
    }
    in_fm == 1 && /^snapshot_commit:/ { print "snapshot_commit: " sha; sha_written = 1; next }
    in_fm == 1 && /^generated_at:/    { print "generated_at: "    gen; gen_written = 1; next }
    { print }
  ' "${file}" > "${tmp}"
  mv "${tmp}" "${file}"
}

regenerate_commit_log() {
  local out="$1"
  local sha="$2"
  {
    cat <<EOF
---
title: Commit-by-commit history
snapshot_commit: ${sha}
generated_at: ${GENERATED_AT}
source: "git log --reverse --pretty=format:'%h %ad %s' --date=short"
generated_by: plugin/skills/sse-bootstrap/scripts/snapshot-state.sh
---

# Commit-by-commit history

One entry per commit, in chronological order (\`git log --reverse\`). For grouped-narrative form see [01-phase-history.md](01-phase-history.md). For deliberation context see [03-plan-log.md](03-plan-log.md).

EOF
    git -C "${REPO_ROOT}" log --reverse --pretty=format:'%H%x09%h%x09%ad%x09%s' --date=short | \
      while IFS=$'\t' read -r full short date subject; do
        printf '## %s — %s — %s\n\n' "${short}" "${date}" "${subject}"
        printf -- '- **Full SHA**: `%s`\n' "${full}"
        printf -- '- **Files (stat)**:\n\n'
        printf '```\n'
        git -C "${REPO_ROOT}" show --stat --format='' "${full}" | sed '/^$/d'
        printf '```\n\n'
      done
  } > "${out}"
}

regenerate_plan_log() {
  local out="$1"
  local sha="$2"
  {
    cat <<EOF
---
title: Plan-by-plan log
snapshot_commit: ${sha}
generated_at: ${GENERATED_AT}
source: ".claude/plans/*.md (frontmatter + first body lines)"
generated_by: plugin/skills/sse-bootstrap/scripts/snapshot-state.sh
---

# Plan-by-plan log

One entry per plan file under \`.claude/plans/\`, ordered by filename. Each entry captures the plan's authored date, its type/status frontmatter (if present), and the opening paragraph as a one-shot context anchor.

EOF
    if [[ -d "${REPO_ROOT}/.claude/plans" ]]; then
      for plan in "${REPO_ROOT}"/.claude/plans/*.md; do
        [[ -f "${plan}" ]] || continue
        local name
        name="$(basename "${plan}")"
        printf '## %s\n\n' "${name}"
        # Extract frontmatter type, title, date, status if present.
        local type title date status
        type="$(awk '/^type:/    { print $2; exit }' "${plan}" || true)"
        title="$(awk '/^title:/  { sub(/^title:[[:space:]]*/, ""); print; exit }' "${plan}" || true)"
        date="$(awk '/^date:/    { print $2; exit }' "${plan}" || true)"
        status="$(awk '/^status:/{ print $2; exit }' "${plan}" || true)"
        [[ -n "${type}"   ]] && printf -- '- **Type**: %s\n'   "${type}"
        [[ -n "${title}"  ]] && printf -- '- **Title**: %s\n'  "${title}"
        [[ -n "${date}"   ]] && printf -- '- **Date**: %s\n'   "${date}"
        [[ -n "${status}" ]] && printf -- '- **Status**: %s\n' "${status}"
        # First 10 non-empty body lines (skip YAML frontmatter if present).
        printf -- '- **Opening**:\n\n'
        printf '```\n'
        awk '
          BEGIN { in_fm = 0; lines = 0 }
          NR == 1 && /^---$/ { in_fm = 1; next }
          in_fm == 1 && /^---$/ { in_fm = 0; next }
          in_fm == 1 { next }
          NF > 0 && lines < 10 { print; lines++ }
        ' "${plan}"
        printf '```\n\n'
      done
    fi
  } > "${out}"
}

verify_archive() {
  # Re-compute SHA-1 short prefixes for each file under
  # dramaturgist-tuning-markdown-archive/sources/ and compare against SOURCES-INDEX.md.
  local sources_dir="${REPO_ROOT}/dramaturgist-tuning-markdown-archive/sources"
  local index="${sources_dir}/SOURCES-INDEX.md"
  if [[ ! -d "${sources_dir}" ]]; then
    echo "skip: ${sources_dir} not present"
    return 0
  fi
  if [[ ! -f "${index}" ]]; then
    echo "error: ${index} missing" >&2
    return 1
  fi
  local fail=0
  while IFS= read -r -d '' f; do
    local base
    base="$(basename "${f}")"
    local actual
    actual="$(shasum -a 1 "${f}" | awk '{print substr($1, 1, 12)}')"
    # Look for the actual SHA prefix in the index, or list the basename and check both directions.
    if ! grep -q "${actual}" "${index}"; then
      printf 'MISMATCH: %s computed=%s not found in SOURCES-INDEX.md\n' "${base}" "${actual}"
      fail=1
    fi
  done < <(find "${sources_dir}" -type f \( -name '*.md' -o -name '*.html' \) ! -name 'SOURCES-INDEX.md' -print0)
  if [[ "${fail}" -eq 0 ]]; then
    echo "ok: all source-file SHA-1 prefixes present in SOURCES-INDEX.md"
  fi
  return "${fail}"
}

case "${mode}" in
  --check)
    drift=0
    for ref in "${REF_01}" "${REF_02}" "${REF_03}"; do
      [[ -f "${ref}" ]] || { printf 'missing: %s\n' "${ref}"; drift=1; continue; }
      pinned="$(read_snapshot_commit "${ref}")"
      if [[ "${pinned}" != "${HEAD_SHA}" ]]; then
        printf 'drift: %s pinned=%s head=%s\n' "$(basename "${ref}")" "${pinned:-<none>}" "${HEAD_SHA}"
        drift=1
      else
        printf 'fresh: %s pinned=%s\n' "$(basename "${ref}")" "${pinned}"
      fi
    done
    exit "${drift}"
    ;;
  --rewrite)
    regenerate_commit_log "${REF_02}" "${HEAD_SHA}"
    regenerate_plan_log   "${REF_03}" "${HEAD_SHA}"
    write_frontmatter_snapshot "${REF_01}" "${HEAD_SHA}"
    printf 'rewrote: %s\n' "$(basename "${REF_02}")"
    printf 'rewrote: %s\n' "$(basename "${REF_03}")"
    printf 'repinned frontmatter: %s\n' "$(basename "${REF_01}")"
    printf 'snapshot_commit: %s\n' "${HEAD_SHA}"
    ;;
  --verify-archive)
    verify_archive
    ;;
  -h|--help)
    sed -n '2,/^set -euo pipefail/p' "$0" | sed '$d'
    ;;
  *)
    printf 'unknown flag: %s\n' "${mode}" >&2
    printf 'usage: %s [--check|--rewrite|--verify-archive]\n' "$0" >&2
    exit 2
    ;;
esac
