---
purpose: Application startup wiring — instantiate dependencies, inject into the Fastify app, register graceful-shutdown hooks.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.2"
status: planned
planned_files:
  - build-dependencies.ts
  - register-shutdown.ts
---

# apps/api/src/bootstrap/

## Purpose

This directory owns the **composition root** — the single place where concrete classes are instantiated, wired together, and handed off to the HTTP framework. Everywhere else in the API depends on interfaces from `@sse/domain` and receives instances via injection.

The bootstrap layer is the one place that knows: "the SceneParserService implementation is the regex-based one in `services/`; the VoiceProviderAdapter is the mock for tests / ElevenLabs in prod; the database pool comes from `@sse/database/createPool`."

## What goes here

- `build-dependencies.ts` — Reads `loadEnv()`, constructs the pg pool, instantiates each service class, returns a typed `Deps` object.
- `register-shutdown.ts` — Wires `SIGINT` / `SIGTERM` handlers to close the Fastify app, drain the pg pool, and disconnect any other resources cleanly.

## Pattern

```ts
// build-dependencies.ts (planned)
import { loadEnv } from '@sse/config';
import { createPool } from '@sse/database';
import { ScenePArser } from '../services/scene-parser.service.js';

export interface Deps {
  env: Env;
  pool: Pool;
  sceneParser: SceneParserService;
  versioning: VersioningService;
  // ...
}

export function buildDependencies(): Deps {
  const env = loadEnv();
  const pool = createPool({ connectionString: env.DATABASE_URL });
  return {
    env,
    pool,
    sceneParser: new SceneParser(),
    versioning: new VersioningServiceImpl(pool),
    // ...
  };
}
```

## What does NOT go here

- Any business logic. Bootstrap only wires things; it does not decide things.
- Test-specific dependency setup. Tests bring their own composition root (mocked adapters, in-memory repositories) in `test/`.

## When to implement

When the first service that has real construction parameters lands (likely `VersioningService` or `SceneParserService`). Until then, `server.ts` inlines a minimal pool + Fastify directly.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.2`
- ADR 0001 (monorepo decision) — the per-package boundary that makes this composition root meaningful.
