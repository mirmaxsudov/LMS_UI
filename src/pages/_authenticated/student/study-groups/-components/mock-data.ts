import type { StudyGroup, StudyGroupsOverviewStat } from './types';

export const studyGroups: StudyGroup[] = [
  {
    id: 'math',
    name: 'Mathematics - Advanced',
    subject: 'Mathematics',
    description: 'Algebra, trigonometry, and exam preparation for the final term assessment.',
    teacher: 'Mr. Aliyev',
    teacherInitials: 'AA',
    color: 'var(--color-chart-1)',
    schedule: { days: ['Mon', 'Wed', 'Fri'], startTime: '08:30', endTime: '09:15', room: 'Room 204' },
    progress: 86,
    completedLessons: 24,
    totalLessons: 28,
    nextLesson: { topic: 'Trigonometric Identities', date: '2026-06-15' },
    totalMembers: 18,
    members: [
      { id: '1', name: 'Sardor Aliyev', initials: 'SA' },
      { id: '2', name: 'Dilnoza Karimova', initials: 'DK' },
      { id: '3', name: 'Javlon Nazarov', initials: 'JN' },
      { id: '4', name: 'Nilufar Tosheva', initials: 'NT' },
      { id: '5', name: 'Madina Yusupova', initials: 'MY' }
    ]
  },
  {
    id: 'english',
    name: 'English Language - B2',
    subject: 'English Language',
    description: 'Reading, writing, and speaking practice focused on academic English.',
    teacher: 'Ms. Karimova',
    teacherInitials: 'MK',
    color: 'var(--color-chart-2)',
    schedule: { days: ['Tue', 'Thu'], startTime: '09:30', endTime: '10:50', room: 'Room 110' },
    progress: 79,
    completedLessons: 22,
    totalLessons: 28,
    nextLesson: { topic: 'Persuasive Writing Techniques', date: '2026-06-16' },
    totalMembers: 20,
    members: [
      { id: '6', name: 'Jasur Rakhimov', initials: 'JR' },
      { id: '7', name: 'Zarina Yoldosheva', initials: 'ZY' },
      { id: '8', name: 'Bekzod Qodirov', initials: 'BQ' },
      { id: '9', name: 'Madina Yusupova', initials: 'MY' }
    ]
  },
  {
    id: 'physics',
    name: 'Physics - Mechanics',
    subject: 'Physics',
    description: "Newtonian mechanics with weekly lab sessions and problem-solving workshops.",
    teacher: 'Mr. Yusupov',
    teacherInitials: 'BY',
    color: 'var(--color-chart-3)',
    schedule: { days: ['Mon', 'Wed'], startTime: '11:30', endTime: '12:50', room: 'Room 305' },
    progress: 75,
    completedLessons: 18,
    totalLessons: 24,
    nextLesson: { topic: "Newton's Third Law Lab", date: '2026-06-13' },
    totalMembers: 16,
    members: [
      { id: '10', name: 'Otabek Rashidov', initials: 'OR' },
      { id: '11', name: 'Sevinch Abdullayeva', initials: 'SA' },
      { id: '12', name: 'Diyor Xolmatov', initials: 'DX' }
    ]
  },
  {
    id: 'cs',
    name: 'Computer Science - Databases',
    subject: 'Computer Science',
    description: 'Relational database design, SQL, and query optimization.',
    teacher: 'Ms. Tosheva',
    teacherInitials: 'NT',
    color: 'var(--color-chart-4)',
    schedule: { days: ['Tue', 'Thu', 'Sat'], startTime: '10:30', endTime: '11:50', room: 'Lab 3' },
    progress: 91,
    completedLessons: 20,
    totalLessons: 22,
    nextLesson: { topic: 'Indexing & Query Optimization', date: '2026-06-14' },
    totalMembers: 15,
    members: [
      { id: '13', name: 'Aziz Tursunov', initials: 'AT' },
      { id: '14', name: 'Komila Saidova', initials: 'KS' },
      { id: '15', name: 'Sardor Aliyev', initials: 'SA' },
      { id: '16', name: 'Dilnoza Karimova', initials: 'DK' },
      { id: '17', name: 'Javlon Nazarov', initials: 'JN' },
      { id: '18', name: 'Otabek Rashidov', initials: 'OR' }
    ]
  },
  {
    id: 'history',
    name: 'World History - Modern Era',
    subject: 'World History',
    description: 'Key events and turning points from the Renaissance to the 20th century.',
    teacher: 'Mr. Nazarov',
    teacherInitials: 'JN',
    color: 'var(--color-chart-5)',
    schedule: { days: ['Fri'], startTime: '13:00', endTime: '13:45', room: 'Room 108' },
    progress: 77,
    completedLessons: 17,
    totalLessons: 22,
    nextLesson: { topic: 'The Renaissance - Origins', date: '2026-06-17' },
    totalMembers: 22,
    members: [
      { id: '19', name: 'Zarina Yoldosheva', initials: 'ZY' },
      { id: '20', name: 'Bekzod Qodirov', initials: 'BQ' },
      { id: '21', name: 'Sevinch Abdullayeva', initials: 'SA' },
      { id: '22', name: 'Aziz Tursunov', initials: 'AT' }
    ]
  }
];

export const studyGroupsOverview: StudyGroupsOverviewStat = {
  totalGroups: studyGroups.length,
  totalClassmates: studyGroups.reduce((sum, group) => sum + group.totalMembers, 0),
  sessionsThisWeek: studyGroups.reduce((sum, group) => sum + group.schedule.days.length, 0),
  averageProgress: Math.round(
    studyGroups.reduce((sum, group) => sum + group.progress, 0) / studyGroups.length
  )
};
