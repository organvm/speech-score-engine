// Inject a classic <script> once (idempotent by src) and resolve when it has loaded. Used to pull
// the shared engine + score/voice data packs from /public into the Next surfaces at runtime.
export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-sse="${src}"]`)) {
      resolve();
      return;
    }
    const el = document.createElement('script');
    el.src = src;
    el.async = false;
    el.dataset.sse = src;
    el.addEventListener('load', () => resolve());
    el.addEventListener('error', () => reject(new Error(`failed to load ${src}`)));
    document.head.appendChild(el);
  });
}

// Inject a <link rel="stylesheet"> once (idempotent by href) and resolve when it has applied. The
// engine's DOM is styled entirely by /prototypes/tracker.css (scoped under .sse); any surface that
// mounts the engine outside the /tracker route (e.g. the editor's Perform overlay) must load this
// first or it renders as raw, unstyled HTML.
export function loadStylesheet(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`link[data-sse="${href}"]`)) {
      resolve();
      return;
    }
    const el = document.createElement('link');
    el.rel = 'stylesheet';
    el.href = href;
    el.dataset.sse = href;
    el.addEventListener('load', () => resolve());
    el.addEventListener('error', () => reject(new Error(`failed to load ${href}`)));
    document.head.appendChild(el);
  });
}
