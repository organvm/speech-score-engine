import { TrackerClient } from '@/components/TrackerClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tracker — Speech-Score Engine',
  description: 'Perform a play as a temporal speech-score: voices as lanes, lines as clips.',
};

export default function TrackerPage() {
  return (
    <>
      {/* shared stylesheet served from /public (single source with the standalone HTML) */}
      <link rel="stylesheet" href="/prototypes/tracker.css" />
      <main style={{ position: 'fixed', inset: 0, background: '#101012' }}>
        <TrackerClient />
      </main>
    </>
  );
}
