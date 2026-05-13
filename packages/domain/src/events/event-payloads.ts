// Event payload type definitions. Each event in event-names.ts has a payload
// shape declared here, plus a union map (`EventPayloadMap`) that lets typed
// consumers narrow on the event name.

import type {
  EVENT_DIAGNOSTICS_GENERATED,
  EVENT_RENDER_CANCELLED,
  EVENT_RENDER_COMPLETED,
  EVENT_RENDER_FAILED,
  EVENT_RENDER_REQUESTED,
  EVENT_RENDER_STARTED,
  EVENT_SCENE_CREATED,
  EVENT_SCENE_PARSED,
  EVENT_SHARE_ACCESSED,
  EVENT_SHARE_CREATED,
  EVENT_SHARE_REVOKED,
  EVENT_VERSION_CREATED,
  EVENT_VERSION_RESTORED,
} from './event-names.js';

export interface VersionCreatedPayload {
  versionId: string;
  sceneId: string;
  createdByUserId: string;
  versionLabel: string | null;
  estimatedDurationMs: number | null;
}

export interface VersionRestoredPayload {
  sceneId: string;
  fromVersionId: string;
  restoredByUserId: string;
}

export interface RenderRequestedPayload {
  renderId: string;
  versionId: string;
  sceneId: string;
  requestedByUserId: string;
  renderProfileId: string | null;
}

export interface RenderStartedPayload {
  renderId: string;
  versionId: string;
  startedAt: string;
}

export interface RenderCompletedPayload {
  renderId: string;
  versionId: string;
  durationMs: number;
  audioUri: string;
  waveformUri: string | null;
  completedAt: string;
}

export interface RenderFailedPayload {
  renderId: string;
  versionId: string;
  errorMessage: string;
  failedAt: string;
}

export interface RenderCancelledPayload {
  renderId: string;
  versionId: string;
  cancelledByUserId: string | null;
  cancelledAt: string;
}

export interface DiagnosticsGeneratedPayload {
  reportId: string;
  versionId: string;
  sceneId: string;
  flagCount: number;
}

export interface ShareCreatedPayload {
  shareId: string;
  versionId: string;
  sceneId: string;
  createdByUserId: string;
  expiresAt: string | null;
}

export interface ShareRevokedPayload {
  shareId: string;
  versionId: string;
  revokedByUserId: string;
  revokedAt: string;
}

export interface ShareAccessedPayload {
  shareId: string;
  versionId: string;
  accessedAt: string;
  // user_agent / ip intentionally NOT in the payload — leave that to access logs.
}

export interface SceneCreatedPayload {
  sceneId: string;
  projectId: string;
  createdByUserId: string;
}

export interface SceneParsedPayload {
  sceneId: string;
  lineCount: number;
  speakerCount: number;
}

export interface EventPayloadMap {
  [EVENT_VERSION_CREATED]: VersionCreatedPayload;
  [EVENT_VERSION_RESTORED]: VersionRestoredPayload;
  [EVENT_RENDER_REQUESTED]: RenderRequestedPayload;
  [EVENT_RENDER_STARTED]: RenderStartedPayload;
  [EVENT_RENDER_COMPLETED]: RenderCompletedPayload;
  [EVENT_RENDER_FAILED]: RenderFailedPayload;
  [EVENT_RENDER_CANCELLED]: RenderCancelledPayload;
  [EVENT_DIAGNOSTICS_GENERATED]: DiagnosticsGeneratedPayload;
  [EVENT_SHARE_CREATED]: ShareCreatedPayload;
  [EVENT_SHARE_REVOKED]: ShareRevokedPayload;
  [EVENT_SHARE_ACCESSED]: ShareAccessedPayload;
  [EVENT_SCENE_CREATED]: SceneCreatedPayload;
  [EVENT_SCENE_PARSED]: SceneParsedPayload;
}
