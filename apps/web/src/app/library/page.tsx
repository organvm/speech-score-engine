import { LibraryClient } from '@/components/LibraryClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Library — Speech-Score Engine',
  description: 'Every score the engine can perform: pick a piece to open it in the tracker.',
};

export default function LibraryPage() {
  return <LibraryClient />;
}
