import type {
  Achievement,
  ActivityItem,
  AttendanceBreakdown,
  AttendanceRecord,
  PerformanceTrendPoint,
  ProgressOverviewStat,
  RecentGrade,
  SubjectProgress
} from './types';

export const overviewStat: ProgressOverviewStat = {
  averageScore: 87,
  averageScoreTrend: 4,
  attendanceRate: 94,
  attendanceTrend: 2,
  completedLessons: 86,
  totalLessons: 120,
  homeworkCompletionRate: 91,
  homeworkTrend: -3,
  classRank: 3,
  classSize: 24
};

export const performanceTrend: PerformanceTrendPoint[] = [
  { period: 'Jan', average: 76, attendance: 88 },
  { period: 'Feb', average: 79, attendance: 90 },
  { period: 'Mar', average: 81, attendance: 92 },
  { period: 'Apr', average: 80, attendance: 89 },
  { period: 'May', average: 85, attendance: 95 },
  { period: 'Jun', average: 87, attendance: 94 }
];

export const subjectProgress: SubjectProgress[] = [
  {
    id: 'math',
    name: 'Mathematics',
    teacher: 'Mr. Aliyev',
    averageScore: 92,
    attendanceRate: 97,
    completedLessons: 24,
    totalLessons: 28,
    trend: 'up',
    color: 'var(--color-chart-1)'
  },
  {
    id: 'english',
    name: 'English Language',
    teacher: 'Ms. Karimova',
    averageScore: 88,
    attendanceRate: 95,
    completedLessons: 22,
    totalLessons: 28,
    trend: 'up',
    color: 'var(--color-chart-2)'
  },
  {
    id: 'physics',
    name: 'Physics',
    teacher: 'Mr. Yusupov',
    averageScore: 79,
    attendanceRate: 91,
    completedLessons: 18,
    totalLessons: 24,
    trend: 'down',
    color: 'var(--color-chart-3)'
  },
  {
    id: 'it',
    name: 'Computer Science',
    teacher: 'Ms. Tosheva',
    averageScore: 95,
    attendanceRate: 98,
    completedLessons: 20,
    totalLessons: 22,
    trend: 'up',
    color: 'var(--color-chart-4)'
  },
  {
    id: 'history',
    name: 'World History',
    teacher: 'Mr. Nazarov',
    averageScore: 83,
    attendanceRate: 90,
    completedLessons: 17,
    totalLessons: 22,
    trend: 'flat',
    color: 'var(--color-chart-5)'
  }
];

export const attendanceBreakdown: AttendanceBreakdown[] = [
  { label: 'Present', value: 94, color: 'var(--color-success)' },
  { label: 'Late', value: 4, color: 'var(--color-chart-3)' },
  { label: 'Absent', value: 2, color: 'var(--color-destructive)' }
];

export const recentGrades: RecentGrade[] = [
  {
    id: '1',
    subject: 'Mathematics',
    title: 'Quadratic Equations - Unit Test',
    type: 'exam',
    score: 95,
    maxScore: 100,
    date: '2026-06-10'
  },
  {
    id: '2',
    subject: 'Computer Science',
    title: 'Database Design Project',
    type: 'project',
    score: 47,
    maxScore: 50,
    date: '2026-06-08'
  },
  {
    id: '3',
    subject: 'English Language',
    title: 'Essay: Climate Change',
    type: 'homework',
    score: 18,
    maxScore: 20,
    date: '2026-06-06'
  },
  {
    id: '4',
    subject: 'Physics',
    title: 'Newton’s Laws Quiz',
    type: 'quiz',
    score: 14,
    maxScore: 20,
    date: '2026-06-04'
  },
  {
    id: '5',
    subject: 'World History',
    title: 'Ancient Civilizations Homework',
    type: 'homework',
    score: 19,
    maxScore: 20,
    date: '2026-06-02'
  },
  {
    id: '6',
    subject: 'Mathematics',
    title: 'Trigonometry Practice Set',
    type: 'homework',
    score: 16,
    maxScore: 20,
    date: '2026-05-30'
  }
];

export const achievements: Achievement[] = [
  {
    id: 'perfect-week',
    title: 'Perfect Attendance',
    description: 'Attended every lesson for 4 consecutive weeks',
    icon: 'medal',
    earnedAt: '2026-06-01'
  },
  {
    id: 'top-scorer',
    title: 'Top Scorer',
    description: 'Ranked in the top 3 of the class this month',
    icon: 'trophy',
    earnedAt: '2026-05-28'
  },
  {
    id: 'homework-streak',
    title: 'Homework Streak',
    description: 'Submitted homework on time 10 times in a row',
    icon: 'flame',
    earnedAt: '2026-05-15'
  },
  {
    id: 'fast-learner',
    title: 'Fast Learner',
    description: 'Completed a course module ahead of schedule',
    icon: 'zap',
    earnedAt: '2026-04-20'
  },
  {
    id: 'star-student',
    title: 'Star Student',
    description: 'Received outstanding feedback from a teacher',
    icon: 'star',
    earnedAt: null
  },
  {
    id: 'subject-master',
    title: 'Subject Master',
    description: 'Score above 90% average in a subject for a full term',
    icon: 'crown',
    earnedAt: null
  }
];

export const recentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'grade',
    title: 'New grade posted',
    description: 'Mathematics - Quadratic Equations Unit Test: 95/100',
    date: '2026-06-10'
  },
  {
    id: '2',
    type: 'achievement',
    title: 'Achievement unlocked',
    description: 'Earned the "Perfect Attendance" badge',
    date: '2026-06-09'
  },
  {
    id: '3',
    type: 'lesson',
    title: 'Lesson completed',
    description: 'Computer Science - Database Normalization',
    date: '2026-06-08'
  },
  {
    id: '4',
    type: 'attendance',
    title: 'Marked late',
    description: 'Physics lesson - arrived 10 minutes late',
    date: '2026-06-05'
  },
  {
    id: '5',
    type: 'grade',
    title: 'New grade posted',
    description: 'English Language - Essay: Climate Change: 18/20',
    date: '2026-06-06'
  }
];

export const attendanceHistory: AttendanceRecord[] = [
  {
    id: '1',
    date: '2026-06-10',
    subject: 'Mathematics',
    topic: 'Quadratic Equations - Unit Test',
    status: 'present'
  },
  {
    id: '2',
    date: '2026-06-09',
    subject: 'Computer Science',
    topic: 'Database Normalization',
    status: 'present'
  },
  {
    id: '3',
    date: '2026-06-08',
    subject: 'World History',
    topic: 'Ancient Civilizations',
    status: 'present'
  },
  {
    id: '4',
    date: '2026-06-05',
    subject: 'Physics',
    topic: "Newton's Laws Quiz",
    status: 'late'
  },
  {
    id: '5',
    date: '2026-06-04',
    subject: 'English Language',
    topic: 'Essay Workshop',
    status: 'present'
  },
  {
    id: '6',
    date: '2026-06-02',
    subject: 'Mathematics',
    topic: 'Trigonometry Practice',
    status: 'absent'
  },
  {
    id: '7',
    date: '2026-06-01',
    subject: 'World History',
    topic: 'Medieval Europe',
    status: 'excused'
  }
];
