import type {
  CurriculumProgressItem,
  FeedbackRatingItem,
  GradingTurnaroundPoint,
  SkillRatingPoint,
  StudentOutcomeTrendPoint,
  TeacherProgressOverview,
  TeachingActivityPoint,
  TeachingGoalItem,
  TeachingHoursItem
} from './types';

export const progressOverview: TeacherProgressOverview = {
  curriculumCompletion: 68,
  curriculumCompletionTrend: 5,
  lessonsDelivered: 214,
  lessonsPlanned: 232,
  avgStudentScore: 82,
  avgStudentScoreTrend: 3,
  attendanceRate: 91,
  attendanceTrend: 2,
  gradingTurnaroundDays: 1.4,
  gradingTurnaroundTrend: -12,
  feedbackRating: 4.6,
  feedbackRatingTrend: 4
};

export const teachingActivity: TeachingActivityPoint[] = [
  { period: 'Jan', lessonsDelivered: 32, lessonsPlanned: 34, hoursTaught: 48 },
  { period: 'Feb', lessonsDelivered: 30, lessonsPlanned: 32, hoursTaught: 45 },
  { period: 'Mar', lessonsDelivered: 35, lessonsPlanned: 36, hoursTaught: 52 },
  { period: 'Apr', lessonsDelivered: 34, lessonsPlanned: 38, hoursTaught: 51 },
  { period: 'May', lessonsDelivered: 37, lessonsPlanned: 40, hoursTaught: 55 },
  { period: 'Jun', lessonsDelivered: 18, lessonsPlanned: 20, hoursTaught: 27 }
];

export const curriculumProgress: CurriculumProgressItem[] = [
  {
    id: 'ielts',
    groupName: 'IELTS Advanced',
    subject: 'English',
    topicsCompleted: 33,
    totalTopics: 40,
    progress: 82,
    status: 'ahead',
    color: 'var(--color-chart-1)'
  },
  {
    id: 'webdev',
    groupName: 'Web Dev Bootcamp',
    subject: 'Computer Science',
    topicsCompleted: 26,
    totalTopics: 40,
    progress: 64,
    status: 'on-track',
    color: 'var(--color-chart-2)'
  },
  {
    id: 'sat-math',
    groupName: 'SAT Math Prep',
    subject: 'Mathematics',
    topicsCompleted: 18,
    totalTopics: 32,
    progress: 58,
    status: 'behind',
    color: 'var(--color-chart-3)'
  },
  {
    id: 'general-english',
    groupName: 'General English B1',
    subject: 'English',
    topicsCompleted: 15,
    totalTopics: 32,
    progress: 47,
    status: 'behind',
    color: 'var(--color-chart-4)'
  },
  {
    id: 'beginner-coding',
    groupName: 'Beginner Coding',
    subject: 'Computer Science',
    topicsCompleted: 22,
    totalTopics: 32,
    progress: 70,
    status: 'on-track',
    color: 'var(--color-chart-5)'
  }
];

export const studentOutcomeTrend: StudentOutcomeTrendPoint[] = [
  { period: 'Jan', avgScore: 74, attendanceRate: 88, passRate: 81 },
  { period: 'Feb', avgScore: 76, attendanceRate: 89, passRate: 83 },
  { period: 'Mar', avgScore: 78, attendanceRate: 90, passRate: 85 },
  { period: 'Apr', avgScore: 79, attendanceRate: 87, passRate: 86 },
  { period: 'May', avgScore: 81, attendanceRate: 92, passRate: 89 },
  { period: 'Jun', avgScore: 82, attendanceRate: 91, passRate: 90 }
];

export const gradingTurnaround: GradingTurnaroundPoint[] = [
  { period: 'Jan', avgDays: 2.4, target: 2 },
  { period: 'Feb', avgDays: 2.1, target: 2 },
  { period: 'Mar', avgDays: 1.9, target: 2 },
  { period: 'Apr', avgDays: 1.7, target: 2 },
  { period: 'May', avgDays: 1.5, target: 2 },
  { period: 'Jun', avgDays: 1.4, target: 2 }
];

export const teachingHours: TeachingHoursItem[] = [
  { label: 'IELTS Advanced', hours: 64, color: 'var(--color-chart-1)' },
  { label: 'Web Dev Bootcamp', hours: 58, color: 'var(--color-chart-2)' },
  { label: 'SAT Math Prep', hours: 42, color: 'var(--color-chart-3)' },
  { label: 'General English B1', hours: 38, color: 'var(--color-chart-4)' },
  { label: 'Beginner Coding', hours: 36, color: 'var(--color-chart-5)' }
];

export const feedbackRatings: FeedbackRatingItem[] = [
  { rating: '5 stars', stars: 5, count: 64 },
  { rating: '4 stars', stars: 4, count: 22 },
  { rating: '3 stars', stars: 3, count: 8 },
  { rating: '2 stars', stars: 2, count: 3 },
  { rating: '1 star', stars: 1, count: 1 }
];

export const skillRatings: SkillRatingPoint[] = [
  { skill: 'Lesson planning', score: 92, centerAverage: 84 },
  { skill: 'Engagement', score: 88, centerAverage: 81 },
  { skill: 'Assessment quality', score: 85, centerAverage: 80 },
  { skill: 'Classroom management', score: 90, centerAverage: 83 },
  { skill: 'Communication', score: 94, centerAverage: 85 },
  { skill: 'Punctuality', score: 96, centerAverage: 88 }
];

export const teachingGoals: TeachingGoalItem[] = [
  {
    id: '1',
    title: 'Finish IELTS Advanced Module 5',
    description: 'Complete remaining listening and writing units before the mock exam.',
    progress: 80,
    dueDate: '2026-06-30',
    status: 'on-track'
  },
  {
    id: '2',
    title: 'Keep grading turnaround under 24h',
    description: 'Maintain same-day feedback for homework and quizzes across all groups.',
    progress: 75,
    dueDate: '2026-06-30',
    status: 'on-track'
  },
  {
    id: '3',
    title: 'Raise Web Dev Bootcamp average to 88%',
    description: 'Add extra practice sessions for state management and React Router topics.',
    progress: 45,
    dueDate: '2026-07-15',
    status: 'at-risk'
  },
  {
    id: '4',
    title: 'Reach 95% attendance across all groups',
    description: 'Follow up with students who missed two or more sessions this month.',
    progress: 92,
    dueDate: '2026-06-30',
    status: 'on-track'
  }
];
