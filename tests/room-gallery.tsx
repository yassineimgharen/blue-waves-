// Browser fixture only; it is not part of the production entry point or room data.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RoomGallery } from '../src/components/RoomGallery';
import '../src/index.css';
const photos = ['#006194', '#675d4d', '#007cb1'].map((color, index) => ({
  src: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"><rect width="640" height="480" fill="${color}"/></svg>`)}`,
  caption: `Fixture photo ${index + 1}`,
}));
createRoot(document.getElementById('root')!).render(<main className="max-w-3xl mx-auto p-6"><RoomGallery photos={photos} name="Gallery fixture" language="en" /></main>);
