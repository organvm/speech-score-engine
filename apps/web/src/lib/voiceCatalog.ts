// Curated catalog of neural voices a lane can be cast with. These are Microsoft Edge neural TTS
// voice ids (what tools/render-voices.mjs renders — local, free, no key). L4's next tier is cloning
// a *specific real person* from a ~10s reference read; that swaps the voice id for a cloned model.
export interface VoiceOption {
  id: string;
  label: string;
}

export const VOICE_CATALOG: VoiceOption[] = [
  { id: 'en-US-AriaNeural', label: 'Aria — US · warm F' },
  { id: 'en-US-JennyNeural', label: 'Jenny — US · F' },
  { id: 'en-US-AnaNeural', label: 'Ana — US · young F' },
  { id: 'en-US-AndrewNeural', label: 'Andrew — US · measured M' },
  { id: 'en-US-GuyNeural', label: 'Guy — US · M' },
  { id: 'en-GB-SoniaNeural', label: 'Sonia — UK · F' },
  { id: 'en-GB-LibbyNeural', label: 'Libby — UK · F' },
  { id: 'en-GB-RyanNeural', label: 'Ryan — UK · M' },
  { id: 'en-GB-ThomasNeural', label: 'Thomas — UK · M' },
  { id: 'en-AU-NatashaNeural', label: 'Natasha — AU · F' },
  { id: 'en-AU-WilliamNeural', label: 'William — AU · M' },
  { id: 'en-IE-EmilyNeural', label: 'Emily — IE · F' },
  { id: 'en-IN-NeerjaNeural', label: 'Neerja — IN · F' },
  { id: 'en-IN-PrabhatNeural', label: 'Prabhat — IN · M' },
];
