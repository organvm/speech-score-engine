---
purpose: Worker-side telemetry — metrics, traces, structured logs specific to render lifecycles.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.3"
status: planned
---

# apps/worker/src/telemetry/

## Purpose

Worker-specific telemetry instrumentation: per-job timing histograms, queue-depth gauges, provider-call latencies, error counters by failure class. Generic logging utilities live in `@sse/observability`; this directory has the worker-specific gauges and counters that aren't reusable.

## What might go here

- `metrics.ts` — Prometheus-style metric registrations specific to render lifecycles.
- `tracing.ts` — OpenTelemetry span helpers if/when distributed tracing is added.

## What does NOT go here

- General structured logging — `@sse/observability` owns that.
- Metric *transport* (Prometheus scrape endpoint, OTel exporter config) — that's bootstrap-level wiring.

If this directory has no real content after the first round of operationalization, fold it back into `bootstrap/` — the directory's existence is provisional pending real use.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.3`
- Observability: `packages/observability/`
