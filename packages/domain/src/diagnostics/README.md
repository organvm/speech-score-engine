---
purpose: Diagnostics-domain types — DiagnosticReport, metric definitions, flag taxonomy.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §5.1"
status: planned
---

# packages/domain/src/diagnostics/

## Purpose

Type definitions for diagnostic reports and the metric/flag taxonomy. Currently:

- `DiagnosticsFlag` and `GenerateDiagnosticsResult` interfaces live in `contracts/diagnostics.service.ts`.
- The full `DiagnosticReport` entity type (matching the DB row shape) will land here once the generator is implemented.

Planned files:

- `diagnostics.types.ts` — `DiagnosticReport`, `DiagnosticMetric`, `DiagnosticFlagType` (string-enum union).
- `diagnostics.schemas.ts` — zod schemas.
- `flag-taxonomy.ts` — the canonical list of flag types with display labels (`long_monologue_run`, `silence_anomaly`, etc.). New flag types get added here first.

## References

- Architecture: `docs/architecture/002-domain-model.md` (diagnostic_report section)
- Contract: `packages/domain/src/contracts/diagnostics.service.ts`
