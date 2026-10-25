/**
 * Academic calculation utilities for CGC Mohali student portal
 */

export interface GradeItem {
  courseCode: string;
  credits: number;
  grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'P' | 'F';
}

export const GRADE_POINTS: Record<GradeItem['grade'], number> = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'P': 4,
  'F': 0,
};

export interface BunkResult {
  attended: number;
  total: number;
  percentage: number;
  isSafe: boolean;
  safeBunksRemaining: number;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
}

/**
 * Calculates current or simulated attendance and remaining safe bunks above 75% PTU threshold.
 */
export function calculateBunkAttendance(
  attended: number,
  total: number,
  extraMissed: number = 0
): BunkResult {
  const newTotal = total + extraMissed;
  const percentage = newTotal > 0 ? Number(((attended / newTotal) * 100).toFixed(1)) : 100;
  const isSafe = percentage >= 75.0;

  // Max additional missed lectures before dropping below 75%:
  // attended / (total + x) >= 0.75  ==> total + x <= attended / 0.75 ==> x <= (attended / 0.75) - total
  const maxPossibleTotal = Math.floor(attended / 0.75);
  const safeBunksRemaining = Math.max(0, maxPossibleTotal - newTotal);

  let status: 'SAFE' | 'WARNING' | 'CRITICAL' = 'SAFE';
  if (percentage < 75.0) {
    status = 'CRITICAL';
  } else if (percentage < 78.0) {
    status = 'WARNING';
  }

  return {
    attended,
    total: newTotal,
    percentage,
    isSafe,
    safeBunksRemaining,
    status,
  };
}

/**
 * Calculates weighted SGPA based on credits and letter grades.
 */
export function calculateSgpa(grades: GradeItem[]): number {
  if (grades.length === 0) return 0;
  let totalCredits = 0;
  let weightedPoints = 0;

  for (const item of grades) {
    const pts = GRADE_POINTS[item.grade] ?? 0;
    weightedPoints += pts * item.credits;
    totalCredits += item.credits;
  }

  return totalCredits > 0 ? Number((weightedPoints / totalCredits).toFixed(2)) : 0;
}

export interface NoteItem {
  id: string;
  title: string;
  code: string;
  category: 'OS' | 'DAA' | 'DBMS' | 'MATHS' | 'PYQ';
  size: string;
  pages: number;
  rating: number;
  downloads: string;
  verified: boolean;
  bookmarked?: boolean;
}

/**
 * Filters a list of study notes based on search text and category.
 */
export function filterNotes(
  notes: NoteItem[],
  searchTerm: string,
  categoryFilter: string,
  onlyBookmarked: boolean = false
): NoteItem[] {
  const term = searchTerm.trim().toLowerCase();

  return notes.filter((note) => {
    if (onlyBookmarked && !note.bookmarked) return false;
    if (categoryFilter !== 'ALL' && note.category !== categoryFilter) return false;

    if (!term) return true;
    return (
      note.title.toLowerCase().includes(term) ||
      note.code.toLowerCase().includes(term) ||
      note.category.toLowerCase().includes(term)
    );
  });
}

/**
 * Calculates curriculum completion percentage across units.
 */
export function calculateCurriculumProgress(
  units: { completed: boolean; inProgress?: boolean }[]
): number {
  if (units.length === 0) return 0;
  let score = 0;
  for (const u of units) {
    if (u.completed) score += 1;
    else if (u.inProgress) score += 0.5;
  }
  return Math.round((score / units.length) * 100);
}
