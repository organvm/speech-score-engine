---
purpose: Production infrastructure as code — when the system needs deploy-time provisioning.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §2"
status: planned
---

# infrastructure/terraform/

## Purpose

This directory anticipates Terraform modules for production infrastructure: managed Postgres, managed Redis, object storage bucket, secret store, deployment targets for the API and worker.

Nothing yet — the scaffold runs entirely on local Docker (`infrastructure/docker/compose.yaml`). Production provisioning is deferred until there's a real deployment target.

## What might go here

- `modules/postgres/` — Managed Postgres provisioning (RDS, Neon, Supabase, etc.).
- `modules/redis/` — Managed Redis provisioning.
- `modules/object-storage/` — S3 bucket + IAM policies for the worker.
- `envs/production/` — Per-env composition of the modules.
- `envs/staging/`

## What does NOT go here

- Local-dev infra — `infrastructure/docker/`.
- CI/CD pipeline definitions — `.github/workflows/`.
- Application configuration — `packages/config/`.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §2`
- Local infra: `infrastructure/docker/compose.yaml`
