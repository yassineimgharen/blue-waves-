import type { RoomItem } from '../types';

/**
 * Owner-supplied room albums. First photo is used on the room card.
 * Import files from ../images and assign them only once the owner confirms
 * which room they belong to. Unassigned UUID files must not be guessed.
 * Existing catalog photos remain visible until an album is supplied.
 */
export const roomImages: Record<string, NonNullable<RoomItem['gallery']>> = {};
