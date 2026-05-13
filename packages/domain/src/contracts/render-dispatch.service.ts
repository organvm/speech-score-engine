// Blueprint §9.3 RenderDispatchService — verbatim TS contract.
import type { RenderScope } from '../scene/scene.types.js';

export interface RequestRenderInput {
  sceneId: string;
  versionId: string;
  requestedByUserId: string;
  renderProfileId?: string;
  renderScope: RenderScope;
  scopeStartLineIndex?: number | null;
  scopeEndLineIndex?: number | null;
}

export interface RequestRenderResult {
  renderId: string;
  renderStatus: 'queued';
}

export interface RenderDispatchService {
  requestRender(input: RequestRenderInput): Promise<RequestRenderResult>;
}
