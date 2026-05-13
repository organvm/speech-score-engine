---
purpose: Authorization policies — who can do what to which resource.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.2"
status: planned
planned_files:
  - project.policy.ts
  - scene.policy.ts
  - version.policy.ts
  - render.policy.ts
  - share.policy.ts
---

# apps/api/src/policies/

## Purpose

Authorization decisions live here, isolated from both handlers and services. A policy answers questions like "can this user read this project?" or "can this user create a version against this scene?" — and returns a boolean (or throws a structured error).

Separating policy from logic means:

- Authorization rules can be reviewed and audited in one place.
- The same policy can be invoked from multiple call sites (HTTP handler, queue handler, scheduled job) without duplication.
- Permission changes don't require touching the surrounding logic.

## What goes here

One file per resource family, named `<resource>.policy.ts`. Each exports pure functions:

```ts
canReadProject(user: AuthenticatedUser, project: Project): boolean;
canEditScene(user: AuthenticatedUser, scene: Scene): boolean;
canCreateVersion(user: AuthenticatedUser, scene: Scene): boolean;
canRevokeShare(user: AuthenticatedUser, share: ShareLink): boolean;
```

Policies receive **fully-loaded entities**, not IDs. The repository or service caller is responsible for loading the entity first; the policy reasons over its fields. This keeps policies pure and testable.

## What does NOT go here

- Authentication (who the user is). That's `server/middleware/auth.ts`.
- Token verification. That's `server/middleware/auth.ts`.
- Business logic that gates on properties other than user/role (e.g., "can't create version if scene is empty"). That's the domain service's invariant check.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.2`
- (When implemented) ADR on the authorization model.
