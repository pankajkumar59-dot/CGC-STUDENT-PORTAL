/**
 * Campus place and route resolution logic + Lost & Found helpers
 */

export interface CampusPlace {
  id: string;
  name: string;
  code: string;
  type: 'academic' | 'facility' | 'hostel' | 'amenity';
  block: string;
  floor: string;
  coordinates: [number, number]; // [lat, lng]
  description: string;
  directions: string;
  walkMinutes: number;
}

export const CAMPUS_PLACES: CampusPlace[] = [
  {
    id: 'block-3',
    name: 'Block 3 - Computer Science & Engineering',
    code: 'Block 3',
    type: 'academic',
    block: 'Block 3',
    floor: 'Ground to 4th Floor',
    coordinates: [30.68114, 76.60584],
    description: 'Houses CSE faculty cabins, AI/ML labs, and lecture halls 401-415.',
    directions: 'From Main Gate, walk past Block 1 and turn left across the central fountain lawn. Block 3 is on the north-east side.',
    walkMinutes: 3,
  },
  {
    id: 'block-1',
    name: 'Block 1 - College of Engineering (COE)',
    code: 'Block 1',
    type: 'academic',
    block: 'Block 1',
    floor: 'Ground to 3rd Floor',
    coordinates: [30.6805, 76.6050],
    description: 'Dean office, Mechanical workshops, ECE & Civil labs, Admin helpdesk.',
    directions: 'Immediate right after the campus security checkpoint at Gate 1.',
    walkMinutes: 1,
  },
  {
    id: 'block-2',
    name: 'Block 2 - CBSA & Applied Sciences',
    code: 'Block 2',
    type: 'academic',
    block: 'Block 2',
    floor: 'Ground to 3rd Floor',
    coordinates: [30.6818, 76.6062],
    description: 'Business school, MBA/BBA lecture theaters, Physics and Chemistry laboratories.',
    directions: 'North-west quadrant, adjacent to the administrative lawn.',
    walkMinutes: 4,
  },
  {
    id: 'library',
    name: 'Central Knowledge Resource Library',
    code: 'Library',
    type: 'facility',
    block: 'Central Block',
    floor: '1st & 2nd Floor',
    coordinates: [30.6813, 76.6055],
    description: 'Over 120,000+ volumes, 24/7 reading halls, and IEEE digital search terminals.',
    directions: 'Opposite Block 2 main entrance, above the central student amphitheater.',
    walkMinutes: 2,
  },
  {
    id: 'food-court',
    name: 'CGC Central Food Court & Cafeteria',
    code: 'Food Court',
    type: 'amenity',
    block: 'Student Activity Center',
    floor: 'Ground Floor',
    coordinates: [30.6822, 76.6048],
    description: 'Multi-cuisine food stalls, Nescafe kiosk, and shaded student lounge.',
    directions: 'Behind Block 3 and adjacent to the hostel sports ground.',
    walkMinutes: 4,
  },
  {
    id: 'auditorium',
    name: 'CGC Main Auditorium (Audi 1 & 2)',
    code: 'Auditorium',
    type: 'facility',
    block: 'Cultural Complex',
    floor: 'Ground Floor',
    coordinates: [30.6808, 76.6042],
    description: '1,500-seat plenary hall for convocations, TechFest, and CRC recruitment drives.',
    directions: 'Left of Main Gate, opposite the campus dispensary.',
    walkMinutes: 2,
  },
  {
    id: 'hostel',
    name: 'Shivalik Boys Hostel & Sukhna Girls Hostel',
    code: 'Hostel',
    type: 'hostel',
    block: 'Residential Wing',
    floor: 'Block A, B, C',
    coordinates: [30.6830, 76.6068],
    description: 'Student residential dormitories with indoor gymnasium and recreation rooms.',
    directions: 'North gate perimeter, follow the avenue past the cricket pavilion.',
    walkMinutes: 6,
  },
  {
    id: 'lab-4',
    name: 'Central Computing Center - Lab 4',
    code: 'Lab 4',
    type: 'academic',
    block: 'Block 3',
    floor: '3rd Floor, West Wing',
    coordinates: [30.68114, 76.60584],
    description: 'High-performance Linux lab designated for DAA, OS, and Data Science lab sessions.',
    directions: 'Take elevator in Block 3 to 3rd floor, turn right down the CSE practical corridor.',
    walkMinutes: 4,
  },
];

/**
 * Searches campus places by query string
 */
export function findCampusPlace(query: string): CampusPlace | null {
  const clean = query.trim().toLowerCase();
  if (!clean) return null;

  // Exact or prefix match
  const match = CAMPUS_PLACES.find((p) => {
    const name = p.name.toLowerCase();
    const code = p.code.toLowerCase();
    const block = p.block.toLowerCase();
    return name.includes(clean) || code === clean || block.includes(clean);
  });

  return match || null;
}

export interface LostFoundItem {
  id: string;
  kind: 'Lost' | 'Found';
  title: string;
  cat: 'Personal items' | 'Books & stationery' | 'Electronics' | 'Other';
  place: string;
  details: string;
  date: string;
  contact?: string;
}

export function filterLostFound(
  items: LostFoundItem[],
  filterKind: 'all' | 'Lost' | 'Found',
  searchQuery: string = ''
): LostFoundItem[] {
  const q = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    if (filterKind !== 'all' && item.kind !== filterKind) return false;
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.place.toLowerCase().includes(q) ||
      item.cat.toLowerCase().includes(q) ||
      item.details.toLowerCase().includes(q)
    );
  });
}
