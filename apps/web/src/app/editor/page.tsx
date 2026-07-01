import { EditorClient } from '@/components/EditorClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editor — Speech-Score Engine',
  description:
    'Arrange a play as a speech-score: drag clips across lanes and time, then perform it.',
};

export default function EditorPage() {
  return <EditorClient />;
}
