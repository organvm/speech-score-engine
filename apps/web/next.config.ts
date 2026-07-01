import type { NextConfig } from 'next';

// Static export. Every route here is client-rendered — the tracker/editor/library mount the shared
// classic-script engine (public/prototypes/tracker-engine.js) at runtime and read `?score=` from
// window.location — so the whole app exports to plain static files and needs no Node server. It must
// be hosted at a DOMAIN ROOT, because the engine loads its assets by absolute path (/prototypes/…);
// a project-subpath host would 404 every one. `trailingSlash` emits <route>/index.html so a static
// host serves clean URLs without rewrites; images are unoptimized (no server to optimize on export).
const config: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;
