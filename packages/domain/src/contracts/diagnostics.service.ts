// Blueprint §9.3 DiagnosticsService — verbatim TS contract.
export interface GenerateDiagnosticsInput {
  sceneId: string;
  versionId: string;
}

export interface DiagnosticsFlag {
  flagType: string;
  lineRange: [number, number];
  message: string;
}

export interface GenerateDiagnosticsResult {
  reportId: string;
  summary: string;
  metrics: Record<string, unknown>;
  flags: DiagnosticsFlag[];
}

export interface DiagnosticsService {
  generate(input: GenerateDiagnosticsInput): Promise<GenerateDiagnosticsResult>;
}
