import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBunkAttendance,
  calculateSgpa,
  filterNotes,
  calculateCurriculumProgress,
  NoteItem,
  GradeItem,
} from './academicCalculations';

test('calculateBunkAttendance computes accurate percentage and safe bunks', () => {
  // 93 attended out of 105 total classes
  const result = calculateBunkAttendance(93, 105, 0);
  assert.equal(result.percentage, 88.6);
  assert.equal(result.isSafe, true);
  assert.equal(result.status, 'SAFE');
  assert.ok(result.safeBunksRemaining > 0);

  // Simulate missing 20 more classes: 93 / 125 = 74.4% (< 75%)
  const dippedResult = calculateBunkAttendance(93, 105, 20);
  assert.equal(dippedResult.percentage, 74.4);
  assert.equal(dippedResult.isSafe, false);
  assert.equal(dippedResult.status, 'CRITICAL');
});

test('calculateSgpa computes weighted credits properly', () => {
  const grades: GradeItem[] = [
    { courseCode: 'BTCS-301', credits: 4, grade: 'A+' }, // 4 * 9 = 36
    { courseCode: 'BTCS-302', credits: 4, grade: 'O' },  // 4 * 10 = 40
    { courseCode: 'BTEC-301', credits: 3, grade: 'A' },  // 3 * 8 = 24
  ];
  // Total: 100 / 11 credits = 9.09
  const sgpa = calculateSgpa(grades);
  assert.equal(sgpa, 9.09);
});

test('filterNotes handles search text and category filtering', () => {
  const mockNotes: NoteItem[] = [
    {
      id: '1',
      title: 'Operating Systems Process Sync & Semaphores',
      code: 'BTCS-401',
      category: 'OS',
      size: '4.2 MB',
      pages: 142,
      rating: 4.9,
      downloads: '1.4k',
      verified: true,
      bookmarked: true,
    },
    {
      id: '2',
      title: 'DAA Dynamic Programming Cheat Sheet',
      code: 'BTCS-402',
      category: 'DAA',
      size: '2.8 MB',
      pages: 64,
      rating: 4.8,
      downloads: '890',
      verified: true,
      bookmarked: false,
    },
  ];

  // Category filter
  const osNotes = filterNotes(mockNotes, '', 'OS');
  assert.equal(osNotes.length, 1);
  assert.equal(osNotes[0].code, 'BTCS-401');

  // Search filter
  const searchResult = filterNotes(mockNotes, 'Dynamic', 'ALL');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, '2');

  // Favorites filter
  const bookmarked = filterNotes(mockNotes, '', 'ALL', true);
  assert.equal(bookmarked.length, 1);
  assert.equal(bookmarked[0].id, '1');
});

test('calculateCurriculumProgress calculates unit progress', () => {
  const units = [
    { completed: true },
    { completed: true },
    { completed: false, inProgress: true },
    { completed: false },
    { completed: false },
  ];
  // 2.5 / 5 = 50%
  assert.equal(calculateCurriculumProgress(units), 50);
});
