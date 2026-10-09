import React, { lazy, Suspense } from 'react';
import type { Language } from '../types';
const SurfArchive = lazy(() => import('./SurfArchive'));
export function SurfArchiveSection({ language }: { language: Language }) {
  return <Suspense fallback={null}><SurfArchive language={language} /></Suspense>;
}
