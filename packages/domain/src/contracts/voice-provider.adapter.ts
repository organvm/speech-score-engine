// Blueprint §9.3 VoiceProviderAdapter — TS contract.
// Refinement: blueprint specified `Buffer` for audioBuffer; we use `Uint8Array`
// so @sse/domain stays runtime-neutral (consumed by Next.js web app). Node's
// Buffer extends Uint8Array, so worker-side returns still satisfy this type.
export interface VoiceRenderLine {
  speakerLabel: string | null;
  textContent: string;
  voiceProviderKey: string;
  providerVoiceKey: string;
  speechRate?: number;
  pauseAfterMs?: number | null;
  isStageDirection: boolean;
}

export interface VoiceRenderRequest {
  lines: VoiceRenderLine[];
}

export interface VoiceRenderArtifact {
  audioBuffer: Uint8Array;
  durationMs: number;
}

export interface VoiceProviderAdapter {
  render(request: VoiceRenderRequest): Promise<VoiceRenderArtifact>;
}
