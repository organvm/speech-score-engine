// Parsing contracts — input/output shapes for the scene parser service.
// Blueprint §9.3 SceneParserService is the source for these signatures.
import type { ParsedSceneState } from '../scene/scene.types.js';

export interface ParseSceneInput {
  rawText: string;
}

export type ParseSceneResult = ParsedSceneState;

export interface SceneParserService {
  parse(input: ParseSceneInput): Promise<ParseSceneResult>;
}
