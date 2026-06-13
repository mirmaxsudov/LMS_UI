import type { CoursesOverviewStat, StudentCourse } from './types';

export const studentCourses: StudentCourse[] = [
  {
    id: 'math',
    title: 'Mathematics',
    description:
      'Algebra, geometry and trigonometry fundamentals with weekly problem-solving workshops.',
    level: 'INTERMEDIATE',
    status: 'active',
    color: 'var(--color-chart-1)',
    groupName: 'Math Group A',
    teacher: { name: 'Mr. Aliyev', initials: 'AA' },
    schedule: { days: ['Mon', 'Wed', 'Fri'], startTime: '08:30', endTime: '09:15', room: 'Room 204' },
    progress: 86,
    completedLessons: 24,
    totalLessons: 28,
    classmatesCount: 22,
    nextLesson: { title: 'Trigonometric Identities', date: '2026-06-15' }
  },
  {
    id: 'english',
    title: 'English Language',
    description: 'Reading comprehension, grammar and persuasive writing for academic English.',
    level: 'INTERMEDIATE',
    status: 'active',
    color: 'var(--color-chart-2)',
    groupName: 'English Group B',
    teacher: { name: 'Ms. Karimova', initials: 'MK' },
    schedule: { days: ['Tue', 'Thu'], startTime: '09:30', endTime: '10:15', room: 'Room 110' },
    progress: 79,
    completedLessons: 22,
    totalLessons: 28,
    classmatesCount: 18,
    nextLesson: { title: 'Persuasive Writing Techniques', date: '2026-06-16' }
  },
  {
    id: 'physics',
    title: 'Physics',
    description: 'Mechanics, energy and motion explored through theory and lab experiments.',
    level: 'ADVANCED',
    status: 'active',
    color: 'var(--color-chart-3)',
    groupName: 'Physics Group A',
    teacher: { name: 'Mr. Yusupov', initials: 'BY' },
    schedule: { days: ['Mon', 'Wed', 'Fri'], startTime: '11:30', endTime: '12:15', room: 'Room 305' },
    progress: 75,
    completedLessons: 18,
    totalLessons: 24,
    classmatesCount: 20,
    nextLesson: { title: "Newton's Third Law Lab", date: '2026-06-13' }
  },
  {
    id: 'cs',
    title: 'Computer Science',
    description: 'Database design, SQL and software engineering fundamentals with hands-on labs.',
    level: 'ADVANCED',
    status: 'active',
    color: 'var(--color-chart-4)',
    groupName: 'CS Group A',
    teacher: { name: 'Ms. Tosheva', initials: 'NT' },
    schedule: { days: ['Tue', 'Thu'], startTime: '10:30', endTime: '11:15', room: 'Lab 3' },
    progress: 91,
    completedLessons: 20,
    totalLessons: 22,
    classmatesCount: 16,
    nextLesson: { title: 'Indexing & Query Optimization', date: '2026-06-14' }
  },
  {
    id: 'history',
    title: 'World History',
    description: 'A survey of major world events from antiquity to the modern era.',
    level: 'BEGINNER',
    status: 'active',
    color: 'var(--color-chart-5)',
    groupName: 'History Group C',
    teacher: { name: 'Mr. Nazarov', initials: 'SN' },
    schedule: { days: ['Wed'], startTime: '13:00', endTime: '13:45', room: 'Room 108' },
    progress: 77,
    completedLessons: 17,
    totalLessons: 22,
    classmatesCount: 24,
    nextLesson: { title: 'The Renaissance - Origins', date: '2026-06-17' }
  },
  {
    id: 'biology',
    title: 'Biology',
    description: 'Cell biology, genetics and ecosystems, completed last term with a final exam.',
    level: 'BEGINNER',
    status: 'completed',
    color: 'var(--color-chart-1)',
    groupName: 'Biology Group A',
    teacher: { name: 'Mrs. Yusupova', initials: 'DY' },
    schedule: { days: ['Mon', 'Thu'], startTime: '14:00', endTime: '14:45', room: 'Lab 1' },
    progress: 100,
    completedLessons: 20,
    totalLessons: 20,
    classmatesCount: 19
  }
];

export const coursesOverviewStat: CoursesOverviewStat = {
  totalCourses: studentCourses.length,
  activeCourses: studentCourses.filter((course) => course.status === 'active').length,
  completedCourses: studentCourses.filter((course) => course.status === 'completed').length,
  averageProgress: Math.round(
    studentCourses.reduce((sum, course) => sum + course.progress, 0) / studentCourses.length
  )
};
