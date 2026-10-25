import test from 'node:test';
import assert from 'node:assert/strict';
import { findCampusPlace, filterLostFound, LostFoundItem } from './campusData';

test('findCampusPlace resolves recognized campus landmarks and rooms', () => {
  const block3 = findCampusPlace('Block 3');
  assert.ok(block3);
  assert.equal(block3?.code, 'Block 3');
  assert.equal(block3?.walkMinutes, 3);

  const library = findCampusPlace('library');
  assert.ok(library);
  assert.equal(library?.type, 'facility');

  const lab4 = findCampusPlace('Lab 4');
  assert.ok(lab4);
  assert.equal(lab4?.floor, '3rd Floor, West Wing');

  const unknown = findCampusPlace('Mars Colony');
  assert.equal(unknown, null);
});

test('filterLostFound filters by kind and search query', () => {
  const items: LostFoundItem[] = [
    {
      id: '1',
      kind: 'Lost',
      title: 'Lavender earbuds case',
      cat: 'Electronics',
      place: 'Near library',
      details: 'Small case with sticker',
      date: 'Today',
    },
    {
      id: '2',
      kind: 'Found',
      title: 'Blue steel water bottle',
      cat: 'Personal items',
      place: 'Academic Block 2',
      details: 'Found after afternoon class',
      date: 'Yesterday',
    },
  ];

  // Kind filter
  const lostOnly = filterLostFound(items, 'Lost');
  assert.equal(lostOnly.length, 1);
  assert.equal(lostOnly[0].title, 'Lavender earbuds case');

  // Query filter
  const water = filterLostFound(items, 'all', 'bottle');
  assert.equal(water.length, 1);
  assert.equal(water[0].kind, 'Found');
});
