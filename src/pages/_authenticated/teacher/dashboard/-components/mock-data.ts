import type {
  AttendanceOverviewItem,
  ClassPerformanceTrendPoint,
  GradingItem,
  GroupOverviewItem,
  GroupPerformanceItem,
  NotificationItem,
  ScheduleItem,
  TeacherOverviewStat,
  TopStudentItem,
  WeeklyLessonsPoint
} from './types';

export const overviewStat: TeacherOverviewStat = {
  totalStudents: 86,
  totalStudentsTrend: 4,
  activeGroups: 5,
  activeGroupsTrend: 1,
  lessonsThisWeek: 18,
  lessonsToday: 3,
  pendingGrading: 12,
  gradingDueToday: 3,
  attendanceRate: 91,
  attendanceTrend: 2,
  avgGroupScore: 82,
  avgGroupScoreTrend: 3
};

export const weeklyLessons: WeeklyLessonsPoint[] = [
  { day: 'Mon', lessons: 4, plannedLessons: 4 },
  { day: 'Tue', lessons: 3, plannedLessons: 3 },
  { day: 'Wed', lessons: 4, plannedLessons: 4 },
  { day: 'Thu', lessons: 2, plannedLessons: 3 },
  { day: 'Fri', lessons: 3, plannedLessons: 3 },
  { day: 'Sat', lessons: 2, plannedLessons: 2 },
  { day: 'Sun', lessons: 0, plannedLessons: 0 }
];

export const classPerformanceTrend: ClassPerformanceTrendPoint[] = [
  { period: 'Jan', averageScore: 74, attendanceRate: 88 },
  { period: 'Feb', averageScore: 76, attendanceRate: 89 },
  { period: 'Mar', averageScore: 78, attendanceRate: 90 },
  { period: 'Apr', averageScore: 79, attendanceRate: 87 },
  { period: 'May', averageScore: 81, attendanceRate: 92 },
  { period: 'Jun', averageScore: 82, attendanceRate: 91 }
];

export const attendanceOverview: AttendanceOverviewItem[] = [
  { label: 'Present', value: 312, color: 'var(--color-success)' },
  { label: 'Late', value: 24, color: 'var(--color-chart-3)' },
  { label: 'Absent', value: 18, color: 'var(--color-destructive)' }
];

export const groupPerformance: GroupPerformanceItem[] = [
  { group: 'IELTS Advanced', averageScore: 88, attendanceRate: 95, color: 'var(--color-chart-1)' },
  { group: 'Web Dev Bootcamp', averageScore: 84, attendanceRate: 92, color: 'var(--color-chart-2)' },
  { group: 'SAT Math Prep', averageScore: 79, attendanceRate: 89, color: 'var(--color-chart-3)' },
  { group: 'General English B1', averageScore: 75, attendanceRate: 88, color: 'var(--color-chart-4)' },
  { group: 'Beginner Coding', averageScore: 81, attendanceRate: 90, color: 'var(--color-chart-5)' }
];

export const todaySchedule: ScheduleItem[] = [
  {
    id: '1',
    groupName: 'IELTS Advanced',
    topic: 'Writing Task 2 - Argumentative Essays',
    room: 'Room 204',
    startTime: '08:30',
    endTime: '09:50',
    studentsCount: 14,
    status: 'completed',
    color: 'var(--color-chart-1)'
  },
  {
    id: '2',
    groupName: 'Beginner Coding',
    topic: 'Introduction to JavaScript Functions',
    room: 'Lab 2',
    startTime: '10:00',
    endTime: '11:20',
    studentsCount: 18,
    status: 'completed',
    color: 'var(--color-chart-5)'
  },
  {
    id: '3',
    groupName: 'Web Dev Bootcamp',
    topic: 'React Hooks - useState & useEffect',
    room: 'Lab 3',
    startTime: '13:00',
    endTime: '14:30',
    studentsCount: 16,
    status: 'ongoing',
    color: 'var(--color-chart-2)'
  },
  {
    id: '4',
    groupName: 'General English B1',
    topic: 'Speaking Practice - Daily Routines',
    room: 'Room 110',
    startTime: '15:00',
    endTime: '16:15',
    studentsCount: 20,
    status: 'upcoming',
    color: 'var(--color-chart-4)'
  },
  {
    id: '5',
    groupName: 'SAT Math Prep',
    topic: 'Algebra Review - Quadratic Functions',
    room: 'Room 305',
    startTime: '16:30',
    endTime: '17:45',
    studentsCount: 18,
    status: 'upcoming',
    color: 'var(--color-chart-3)'
  }
];

export const groupsOverview: GroupOverviewItem[] = [
  {
    id: 'ielts',
    name: 'IELTS Advanced',
    subject: 'English',
    studentsCount: 14,
    progress: 82,
    completedLessons: 41,
    totalLessons: 50,
    averageScore: 88,
    nextLesson: 'Listening Practice - Section 3 & 4',
    nextLessonDate: '2026-06-15',
    color: 'var(--color-chart-1)'
  },
  {
    id: 'webdev',
    name: 'Web Dev Bootcamp',
    subject: 'Computer Science',
    studentsCount: 16,
    progress: 64,
    completedLessons: 32,
    totalLessons: 50,
    averageScore: 84,
    nextLesson: 'React Router & Navigation',
    nextLessonDate: '2026-06-16',
    color: 'var(--color-chart-2)'
  },
  {
    id: 'sat-math',
    name: 'SAT Math Prep',
    subject: 'Mathematics',
    studentsCount: 18,
    progress: 58,
    completedLessons: 23,
    totalLessons: 40,
    averageScore: 79,
    nextLesson: 'Geometry - Circles & Angles',
    nextLessonDate: '2026-06-14',
    color: 'var(--color-chart-3)'
  },
  {
    id: 'general-english',
    name: 'General English B1',
    subject: 'English',
    studentsCount: 20,
    progress: 47,
    completedLessons: 19,
    totalLessons: 40,
    averageScore: 75,
    nextLesson: 'Speaking Practice - Daily Routines',
    nextLessonDate: '2026-06-13',
    color: 'var(--color-chart-4)'
  },
  {
    id: 'beginner-coding',
    name: 'Beginner Coding',
    subject: 'Computer Science',
    studentsCount: 18,
    progress: 70,
    completedLessons: 28,
    totalLessons: 40,
    averageScore: 81,
    nextLesson: 'Arrays & Loops Practice',
    nextLessonDate: '2026-06-17',
    color: 'var(--color-chart-5)'
  }
];

export const pendingGrading: GradingItem[] = [
  {
    id: '1',
    title: 'Writing Task 2 - Essay Submissions',
    group: 'IELTS Advanced',
    type: 'homework',
    submittedCount: 12,
    totalCount: 14,
    dueDate: '2026-06-13',
    status: 'pending'
  },
  {
    id: '2',
    title: 'React State Management Quiz',
    group: 'Web Dev Bootcamp',
    type: 'quiz',
    submittedCount: 16,
    totalCount: 16,
    dueDate: '2026-06-13',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Algebra Practice Test',
    group: 'SAT Math Prep',
    type: 'exam',
    submittedCount: 17,
    totalCount: 18,
    dueDate: '2026-06-12',
    status: 'overdue'
  },
  {
    id: '4',
    title: 'Portfolio Project - Milestone 2',
    group: 'Web Dev Bootcamp',
    type: 'project',
    submittedCount: 14,
    totalCount: 16,
    dueDate: '2026-06-11',
    status: 'overdue'
  },
  {
    id: '5',
    title: 'Vocabulary Quiz - Unit 6',
    group: 'General English B1',
    type: 'quiz',
    submittedCount: 18,
    totalCount: 20,
    dueDate: '2026-06-14',
    status: 'pending'
  }
];

export const topStudents: TopStudentItem[] = [
  {
    id: '1',
    name: 'Madina Yusupova',
    group: 'IELTS Advanced',
    averageScore: 96,
    attendanceRate: 100,
    trend: 3,
    initials: 'MY'
  },
  {
    id: '2',
    name: 'Sardor Aliyev',
    group: 'Web Dev Bootcamp',
    averageScore: 94,
    attendanceRate: 98,
    trend: 2,
    initials: 'SA'
  },
  {
    id: '3',
    name: 'Dilnoza Karimova',
    group: 'SAT Math Prep',
    averageScore: 91,
    attendanceRate: 95,
    trend: 1,
    initials: 'DK'
  },
  {
    id: '4',
    name: 'Javlon Nazarov',
    group: 'Beginner Coding',
    averageScore: 90,
    attendanceRate: 97,
    trend: 4,
    initials: 'JN'
  },
  {
    id: '5',
    name: 'Nilufar Tosheva',
    group: 'IELTS Advanced',
    averageScore: 89,
    attendanceRate: 93,
    trend: -1,
    initials: 'NT'
  }
];

export const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Parent-teacher meeting scheduled',
    description: 'Meeting with parents of General English B1 group on June 20 at 16:00.',
    date: '2026-06-12',
    type: 'reminder'
  },
  {
    id: '2',
    title: 'New student joined Web Dev Bootcamp',
    description: 'Jasur Rakhimov has been enrolled and added to your group roster.',
    date: '2026-06-12',
    type: 'info'
  },
  {
    id: '3',
    title: '2 assignments are overdue for grading',
    description: 'Algebra Practice Test and Portfolio Project Milestone 2 need your attention.',
    date: '2026-06-12',
    type: 'alert'
  },
  {
    id: '4',
    title: 'Lesson materials uploaded',
    description: 'New slides for "React Hooks" lesson are available in the resource library.',
    date: '2026-06-11',
    type: 'info'
  }
];
