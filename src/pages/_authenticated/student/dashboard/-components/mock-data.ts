import type {
  AnnouncementItem,
  AssignmentItem,
  AttendanceOverviewItem,
  ContinueLearning,
  CourseProgressItem,
  DashboardOverviewStat,
  PerformanceTrendPoint,
  ScheduleItem,
  WeeklyActivityPoint
} from './types';

export const overviewStat: DashboardOverviewStat = {
  enrolledCourses: 5,
  activeCoursesTrend: 1,
  averageScore: 87,
  averageScoreTrend: 4,
  attendanceRate: 94,
  attendanceTrend: 2,
  pendingAssignments: 4,
  assignmentsDueToday: 1,
  studyStreakDays: 12,
  totalPoints: 2480,
  rank: 3,
  rankSize: 24
};

export const continueLearning: ContinueLearning = {
  courseName: 'Computer Science',
  lessonTitle: 'Database Normalization - Forms 1NF to 3NF',
  teacher: 'Ms. Tosheva',
  progress: 68
};

export const weeklyActivity: WeeklyActivityPoint[] = [
  { day: 'Mon', hours: 2.5, goalHours: 2 },
  { day: 'Tue', hours: 1.8, goalHours: 2 },
  { day: 'Wed', hours: 3.1, goalHours: 2 },
  { day: 'Thu', hours: 2.2, goalHours: 2 },
  { day: 'Fri', hours: 1.5, goalHours: 2 },
  { day: 'Sat', hours: 0.8, goalHours: 2 },
  { day: 'Sun', hours: 2.9, goalHours: 2 }
];

export const performanceTrend: PerformanceTrendPoint[] = [
  { period: 'Jan', you: 76, classAverage: 72 },
  { period: 'Feb', you: 79, classAverage: 73 },
  { period: 'Mar', you: 81, classAverage: 75 },
  { period: 'Apr', you: 80, classAverage: 76 },
  { period: 'May', you: 85, classAverage: 77 },
  { period: 'Jun', you: 87, classAverage: 78 }
];

export const attendanceOverview: AttendanceOverviewItem[] = [
  { label: 'Present', value: 21, color: 'var(--color-success)' },
  { label: 'Late', value: 2, color: 'var(--color-chart-3)' },
  { label: 'Absent', value: 1, color: 'var(--color-destructive)' }
];

export const todaySchedule: ScheduleItem[] = [
  {
    id: '1',
    subject: 'Mathematics',
    topic: 'Quadratic Equations - Review',
    teacher: 'Mr. Aliyev',
    room: 'Room 204',
    startTime: '08:30',
    endTime: '09:15',
    status: 'completed',
    color: 'var(--color-chart-1)'
  },
  {
    id: '2',
    subject: 'English Language',
    topic: 'Essay Workshop: Climate Change',
    teacher: 'Ms. Karimova',
    room: 'Room 110',
    startTime: '09:30',
    endTime: '10:15',
    status: 'completed',
    color: 'var(--color-chart-2)'
  },
  {
    id: '3',
    subject: 'Computer Science',
    topic: 'Database Normalization',
    teacher: 'Ms. Tosheva',
    room: 'Lab 3',
    startTime: '10:30',
    endTime: '11:15',
    status: 'ongoing',
    color: 'var(--color-chart-4)'
  },
  {
    id: '4',
    subject: 'Physics',
    topic: "Newton's Laws - Problem Solving",
    teacher: 'Mr. Yusupov',
    room: 'Room 305',
    startTime: '11:30',
    endTime: '12:15',
    status: 'upcoming',
    color: 'var(--color-chart-3)'
  },
  {
    id: '5',
    subject: 'World History',
    topic: 'Medieval Europe - Discussion',
    teacher: 'Mr. Nazarov',
    room: 'Room 108',
    startTime: '13:00',
    endTime: '13:45',
    status: 'upcoming',
    color: 'var(--color-chart-5)'
  }
];

export const upcomingAssignments: AssignmentItem[] = [
  {
    id: '1',
    subject: 'Physics',
    title: "Newton's Laws Problem Set",
    type: 'homework',
    dueDate: '2026-06-13',
    status: 'pending'
  },
  {
    id: '2',
    subject: 'Computer Science',
    title: 'Database Design Project - Final Submission',
    type: 'project',
    dueDate: '2026-06-15',
    status: 'pending'
  },
  {
    id: '3',
    subject: 'World History',
    title: 'Medieval Europe Reading Quiz',
    type: 'quiz',
    dueDate: '2026-06-16',
    status: 'pending'
  },
  {
    id: '4',
    subject: 'Mathematics',
    title: 'Trigonometry Practice Set',
    type: 'homework',
    dueDate: '2026-06-11',
    status: 'overdue'
  },
  {
    id: '5',
    subject: 'English Language',
    title: 'Essay: Climate Change',
    type: 'homework',
    dueDate: '2026-06-08',
    status: 'graded',
    score: 18,
    maxScore: 20
  },
  {
    id: '6',
    subject: 'Mathematics',
    title: 'Quadratic Equations - Unit Test',
    type: 'exam',
    dueDate: '2026-06-10',
    status: 'submitted'
  }
];

export const announcements: AnnouncementItem[] = [
  {
    id: '1',
    title: 'Final exams schedule published',
    description: 'Check the schedule page for your updated exam dates and rooms for this term.',
    author: 'Academic Office',
    date: '2026-06-12',
    priority: 'urgent'
  },
  {
    id: '2',
    title: 'Computer Science lab moved to Lab 3',
    description: "Tomorrow's lesson will be held in Lab 3 instead of Lab 1 due to maintenance.",
    author: 'Ms. Tosheva',
    date: '2026-06-12',
    priority: 'important'
  },
  {
    id: '3',
    title: 'New study materials uploaded',
    description: 'Physics revision notes for Newton’s Laws are now available in course materials.',
    author: 'Mr. Yusupov',
    date: '2026-06-10',
    priority: 'normal'
  },
  {
    id: '4',
    title: 'Parent-teacher meeting on June 20',
    description: 'Reminder to share the meeting invitation with your parents or guardians.',
    author: 'Academic Office',
    date: '2026-06-09',
    priority: 'normal'
  }
];

export const courseProgress: CourseProgressItem[] = [
  {
    id: 'math',
    name: 'Mathematics',
    teacher: 'Mr. Aliyev',
    progress: 86,
    completedLessons: 24,
    totalLessons: 28,
    nextLesson: 'Trigonometric Identities',
    nextLessonDate: '2026-06-15',
    color: 'var(--color-chart-1)'
  },
  {
    id: 'english',
    name: 'English Language',
    teacher: 'Ms. Karimova',
    progress: 79,
    completedLessons: 22,
    totalLessons: 28,
    nextLesson: 'Persuasive Writing Techniques',
    nextLessonDate: '2026-06-16',
    color: 'var(--color-chart-2)'
  },
  {
    id: 'physics',
    name: 'Physics',
    teacher: 'Mr. Yusupov',
    progress: 75,
    completedLessons: 18,
    totalLessons: 24,
    nextLesson: "Newton's Third Law Lab",
    nextLessonDate: '2026-06-13',
    color: 'var(--color-chart-3)'
  },
  {
    id: 'it',
    name: 'Computer Science',
    teacher: 'Ms. Tosheva',
    progress: 91,
    completedLessons: 20,
    totalLessons: 22,
    nextLesson: 'Indexing & Query Optimization',
    nextLessonDate: '2026-06-14',
    color: 'var(--color-chart-4)'
  },
  {
    id: 'history',
    name: 'World History',
    teacher: 'Mr. Nazarov',
    progress: 77,
    completedLessons: 17,
    totalLessons: 22,
    nextLesson: 'The Renaissance - Origins',
    nextLessonDate: '2026-06-17',
    color: 'var(--color-chart-5)'
  }
];
