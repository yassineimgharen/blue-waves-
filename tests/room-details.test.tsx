import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ACCOMMODATIONS } from '../src/data/accommodations';
import { RoomCard } from '../src/components/RoomCard';
import { RoomDetailView } from '../src/views/RoomDetailView';

const folders: Record<string, string> = { azemmour: 'azemmur', tafoukt: 'tafukt', amlal: 'appartement' };
const hash = (url: URL) => createHash('sha256').update(readFileSync(url)).digest('hex');
for (const room of ACCOMMODATIONS) {
  test(`${room.name}: complete assigned album, dedicated links and room information`, () => {
    const folder = new URL(`../src/images/${folders[room.id] ?? room.id}/`, import.meta.url);
    const expected = new Set(readdirSync(folder).map(file => hash(new URL(file, folder))));
    const photos = room.gallery!;
    assert.ok(photos.length > 1);
    assert.equal(room.image, photos[0].src);
    for (const photo of photos) {
      assert.ok(photo.src.startsWith(folder.href));
      assert.ok(existsSync(new URL(photo.src)));
    }
    assert.deepEqual(new Set(photos.map(photo => hash(new URL(photo.src)))), expected);
    assert.equal(photos.length, expected.size, 'Do not repeat byte-identical photos');
    const card = renderToStaticMarkup(<RoomCard room={room} language="en" onBook={() => {}} />);
    assert.ok(card.includes(`href="#rooms/${room.id}"`));
    const detail = renderToStaticMarkup(<RoomDetailView room={room} language="en" onBook={() => {}} />);
    for (const label of ['Price per night', 'Capacity', 'Bed Configuration', 'Bathroom', 'View', 'Included Room Amenities', 'Book Now']) assert.ok(detail.includes(label));
    assert.ok(!detail.includes('Room size'), 'Unconfirmed size should not appear as a fact');
  });
}
