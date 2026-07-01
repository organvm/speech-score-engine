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
