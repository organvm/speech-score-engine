// Scene domain types — the conceptual heart, per blueprint §5.1.
// Shapes mirror the database schema in packages/database/migrations/.

export type SceneStatus = 'draft' | 'in_review' | 'finalized' | 'archived';

export type RenderStatus = 'queued' | 'in_progress' | 'completed' | 'failed' | 'cancelled';

export type RenderScope = 'full_scene' | 'line_range' | 'single_line';

export type ShareAccessMode = 'read_only';

export interface Scene {
  sceneId: string;
  projectId: string;
  title: string;
  rawTextCurrent: string;
  parsedStateCurrent: ParsedSceneState | null;
  workingSettingsCurrent: Record<string, unknown> | null;
  estimatedDurationMsCurrent: number | null;
  sceneStatus: SceneStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Speaker {
  speakerId: string;
  sceneId: string;
  displayLabel: string;
  sortOrder: number;
  defaultVoiceProfileId: string | null;
  defaultPacingProfile: Record<string, unknown> | null;
  createdAt: string;
}

export interface ParsedSceneSpeaker {
  displayLabel: string;
}

export interface ParsedSceneLine {
  lineIndex: number;
  speakerLabel: string | null;
  textContent: string;
  isStageDirection: boolean;
}

export interface ParsedSceneState {
  speakers: ParsedSceneSpeaker[];
  lines: ParsedSceneLine[];
}

export interface SceneVersion {
  versionId: string;
  sceneId: string;
  versionLabel: string | null;
  rawTextSnapshot: string;
  parsedStateSnapshot: ParsedSceneState;
  settingsSnapshot: Record<string, unknown>;
  estimatedDurationMs: number | null;
  createdByUserId: string;
  createdAt: string;
}

export interface VersionLine {
  versionLineId: string;
  versionId: string;
  speakerId: string | null;
  lineIndex: number;
  textContent: string;
  isStageDirection: boolean;
  pauseAfterMs: number | null;
  emphasisHint: string | null;
  estimatedDurationMs: number | null;
  structuralTags: Record<string, unknown> | null;
}
