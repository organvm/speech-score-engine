// Canonical event name constants. All audit_event.event_type values and all
// internal pub/sub event names live here so producers and consumers stay in
// sync. New events get added here first; downstream code references the
// constants rather than string literals.
//
// Naming convention: dotted, lower-case, past-tense for state-change events
// (`version.created`), present-tense imperative for command-style internal
// events (rare; prefer state-change names).
//
// Per docs/architecture/002-domain-model.md "audit_event" + blueprint §5.1.

export const EVENT_VERSION_CREATED = 'version.created' as const;
export const EVENT_VERSION_RESTORED = 'version.restored' as const;

export const EVENT_RENDER_REQUESTED = 'render.requested' as const;
export const EVENT_RENDER_STARTED = 'render.started' as const;
export const EVENT_RENDER_COMPLETED = 'render.completed' as const;
export const EVENT_RENDER_FAILED = 'render.failed' as const;
export const EVENT_RENDER_CANCELLED = 'render.cancelled' as const;

export const EVENT_DIAGNOSTICS_GENERATED = 'diagnostics.generated' as const;

export const EVENT_SHARE_CREATED = 'share.created' as const;
export const EVENT_SHARE_REVOKED = 'share.revoked' as const;
export const EVENT_SHARE_ACCESSED = 'share.accessed' as const;

export const EVENT_SCENE_CREATED = 'scene.created' as const;
export const EVENT_SCENE_PARSED = 'scene.parsed' as const;

export const ALL_EVENT_NAMES = [
  EVENT_VERSION_CREATED,
  EVENT_VERSION_RESTORED,
  EVENT_RENDER_REQUESTED,
  EVENT_RENDER_STARTED,
  EVENT_RENDER_COMPLETED,
  EVENT_RENDER_FAILED,
  EVENT_RENDER_CANCELLED,
  EVENT_DIAGNOSTICS_GENERATED,
  EVENT_SHARE_CREATED,
  EVENT_SHARE_REVOKED,
  EVENT_SHARE_ACCESSED,
  EVENT_SCENE_CREATED,
  EVENT_SCENE_PARSED,
] as const;

export type EventName = (typeof ALL_EVENT_NAMES)[number];
