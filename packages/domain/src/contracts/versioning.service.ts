// Blueprint §9.3 VersioningService — verbatim TS contract.
export interface CreateSceneVersionInput {
  sceneId: string;
  createdByUserId: string;
  versionLabel?: string;
}

export interface CreateSceneVersionResult {
  versionId: string;
  sceneId: string;
  estimatedDurationMs: number | null;
  createdAt: string;
}

export interface VersioningService {
  createVersion(input: CreateSceneVersionInput): Promise<CreateSceneVersionResult>;
  restoreVersion(sceneId: string, versionId: string, restoredByUserId: string): Promise<void>;
}
