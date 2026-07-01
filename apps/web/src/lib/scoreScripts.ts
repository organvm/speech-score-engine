// The one list of score data files. Each self-registers into window.SSE_SCORES when loaded as a
// classic <script>. Both the tracker and the library import this — add a play in ONE place here.
// (The standalone HTML keeps its own <script> tags; tools/build-standalone.mjs inlines whatever it
// references, so a new play is: this list + a tag in the shell + a rendered voice pack.)
export const SCORE_SCRIPTS = [
  '/prototypes/scores/philip-glass.js',
  '/prototypes/scores/richard-and-anne.js',
  '/prototypes/scores/earnest-duet.js',
  '/prototypes/scores/macbeth-witches.js',
] as const;

export const ENGINE_SCRIPT = '/prototypes/tracker-engine.js';
