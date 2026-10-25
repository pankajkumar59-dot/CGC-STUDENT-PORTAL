/**
 * Centralized mock data for CGC Mohali Student Portal & Copilot
 */

export interface StudentInfo {
  name: string;
  rollNo: string;
  ptuRegNo: string;
  program: string;
  campus: string;
  semester: string;
  section: string;
  cgpa: number;
  attendanceOverall: number;
  attendedClasses: number;
  totalClasses: number;
  mentor: string;
  hostel: string;
  busRoute: string;
  abcId: string;
  creditsTransferred: number;
  totalRequiredCredits: number;
}

export const CURRENT_STUDENT: StudentInfo = {
  name: 'Aarav Sharma',
  rollNo: '2104928',
  ptuRegNo: '2104928001',
  program: 'B.Tech CSE',
  campus: 'Landran Campus',
  semester: 'Sem 4',
  section: 'Sec B',
  cgpa: 8.64,
  attendanceOverall: 88.2,
  attendedClasses: 93,
  totalClasses: 105,
  mentor: 'Dr. Preetinder Kaur',
  hostel: 'Shivalik Boys Hostel (Rm 208)',
  busRoute: 'Route #14 (Sector 35 Chd)',
  abcId: '7894-3921-9901',
  creditsTransferred: 64,
  totalRequiredCredits: 160,
};

export interface SubjectAttendance {
  code: string;
  name: string;
  attended: number;
  total: number;
  percentage: number;
  safeBunks: number;
}

export const SUBJECT_ATTENDANCE: SubjectAttendance[] = [
  {
    code: 'BTCS-401',
    name: 'Operating Systems',
    attended: 34,
    total: 37,
    percentage: 92,
    safeBunks: 4,
  },
  {
    code: 'BTCS-402',
    name: 'Design & Analysis of Algorithms',
    attended: 30,
    total: 35,
    percentage: 86,
    safeBunks: 3,
  },
  {
    code: 'BTCS-403',
    name: 'Database Management Systems',
    attended: 29,
    total: 33,
    percentage: 88,
    safeBunks: 3,
  },
  {
    code: 'HSMC-122',
    name: 'Universal Human Values & Ethics',
    attended: 17,
    total: 20,
    percentage: 85,
    safeBunks: 1,
  },
];

export interface TimetableSlot {
  time: string;
  subject: string;
  code: string;
  room: string;
  teacher: string;
  type: 'lecture' | 'lab' | 'tutorial' | 'colloquium';
  status: 'completed' | 'current' | 'upcoming';
}

export const TODAY_TIMETABLE: TimetableSlot[] = [
  {
    time: '09:00 AM',
    subject: 'Database Systems Tutorial',
    code: 'BTCS-403',
    room: 'Block 3 • Rm 304',
    teacher: 'Prof. Rajesh Kumar',
    type: 'tutorial',
    status: 'completed',
  },
  {
    time: '11:00 AM',
    subject: 'Operating Systems Lecture',
    code: 'BTCS-401',
    room: 'Block 3 • Rm 402',
    teacher: 'Dr. Preetinder Kaur',
    type: 'lecture',
    status: 'current',
  },
  {
    time: '01:30 PM',
    subject: 'DAA Practical Lab (Batch B1)',
    code: 'BTCS-405',
    room: 'Central Computing Center • Lab 4',
    teacher: 'Dr. Sandeep Singh',
    type: 'lab',
    status: 'upcoming',
  },
  {
    time: '03:30 PM',
    subject: 'Industry Mentorship Session',
    code: 'CRC-401',
    room: 'Seminar Hall 2 • Guest Speaker Amazon',
    teacher: 'Amazon India Team',
    type: 'colloquium',
    status: 'upcoming',
  },
];

export interface NoticeItem {
  id: string;
  category: 'EXAM' | 'PLACEMENT' | 'ACADEMIC' | 'GENERAL';
  title: string;
  summary: string;
  date: string;
  ref: string;
  unread: boolean;
  file?: string;
}

export const CAMPUS_NOTICES: NoticeItem[] = [
  {
    id: 'n1',
    category: 'EXAM',
    title: 'Mid Semester Examination (MST-1) datesheet released for 2nd year',
    summary: 'Exams commence from October 14th across all engineering wings. Check your assigned seating block and admit status on the portal.',
    date: 'Yesterday',
    ref: 'CGC/EXAM/24/109',
    unread: true,
    file: 'MST1_Datesheet_Landran_2024.pdf',
  },
  {
    id: 'n2',
    category: 'PLACEMENT',
    title: 'Campus Placement Drive & Pre-Placement Training Schedule',
    summary: 'Mandatory orientation session for 2026 graduating batch regarding coding assessments, aptitude workshops, and mock technical interviews.',
    date: '3 days ago',
    ref: 'CGC/CRC/24/048',
    unread: true,
  },
  {
    id: 'n3',
    category: 'ACADEMIC',
    title: 'Even Semester PTU Examination Form Submission Notice',
    summary: 'Final date to submit examination fee on PTU portal without late fine is October 20. Verification by department mentor is mandatory.',
    date: '5 days ago',
    ref: 'CGC/ACAD/24/204',
    unread: false,
    file: 'PTU_Exam_Guidelines_2024.pdf',
  },
];
