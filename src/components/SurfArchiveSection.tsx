import dynamic from 'next/dynamic';
import type { Language } from '../types';
const SurfArchive = dynamic(() => import('./SurfArchive'));
export function SurfArchiveSection({ language }: { language: Language }) {
  return <SurfArchive language={language} />;
}
