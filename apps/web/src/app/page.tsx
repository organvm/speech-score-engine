export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '48rem' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>speech-score-engine</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        A dramaturgical-audio workbench. Treats dialogue as polyvocal speech score — text, timing,
        recurrence, vocal distribution, and spatial notation interoperable across analog and digital
        forms.
      </p>

      <p style={{ marginBottom: '2rem' }}>
        <a href="/tracker" style={{ color: '#b58900', fontWeight: 600, textDecoration: 'none' }}>
          ▶ Open the tracker →
        </a>{' '}
        <span style={{ color: '#888' }}>
          — perform Philip Glass, Richard &amp; Anne, or a human+AI duet.
        </span>
      </p>

      <p style={{ marginBottom: '2rem' }}>
        <a href="/editor" style={{ color: '#b58900', fontWeight: 600, textDecoration: 'none' }}>
          ✎ Open the editor →
        </a>{' '}
        <span style={{ color: '#888' }}>— arrange a score: drag clips across lanes and time.</span>
      </p>

      <section>
        <h2>Status</h2>
        <p>
          Scaffold present. Implementation begins with scene parsing — see{' '}
          <code>docs/product/repository-blueprint-handoff-package.md</code> §13 for the build
          sequence.
        </p>
      </section>

      <section>
        <h2>Services</h2>
        <ul>
          <li>
            API health: <code>http://localhost:4000/health</code>
          </li>
          <li>
            Web (this page): <code>http://localhost:3000</code>
          </li>
          <li>
            MinIO console: <code>http://localhost:9001</code>
          </li>
        </ul>
      </section>
    </main>
  );
}
