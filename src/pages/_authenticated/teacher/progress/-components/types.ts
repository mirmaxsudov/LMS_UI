export interface TeacherProgressOverview {
  attendanceRate: number;
  attendanceTrend: number;
  avgStudentScore: number;
  avgStudentScoreTrend: number;
  curriculumCompletion: number;
  curriculumCompletionTrend: number;
  feedbackRating: number;
  feedbackRatingTrend: number;
  gradingTurnaroundDays: number;
  gradingTurnaroundTrend: number;
  lessonsDelivered: number;
  lessonsPlanned: number;
}

export interface TeachingActivityPoint {
  hoursTaught: number;
  lessonsDelivered: number;
  lessonsPlanned: number;
  period: string;
}

export type CurriculumStatus = 'ahead' | 'behind' | 'on-track';

export interface CurriculumProgressItem {
  color: string;
  groupName: string;
  id: string;
  progress: number;
  status: CurriculumStatus;
  subject: string;
  topicsCompleted: number;
  totalTopics: number;
}

export interface StudentOutcomeTrendPoint {
  attendanceRate: number;
  avgScore: number;
  passRate: number;
  period: string;
}

export interface GradingTurnaroundPoint {
  avgDays: number;
  period: string;
  target: number;
}

export interface TeachingHoursItem {
  color: string;
  hours: number;
  label: string;
}

export interface FeedbackRatingItem {
  count: number;
  rating: string;
  stars: number;
}

export interface SkillRatingPoint {
  centerAverage: number;
  score: number;
  skill: string;
}

export type GoalStatus = 'at-risk' | 'completed' | 'on-track';

export interface TeachingGoalItem {
  description: string;
  dueDate: string;
  id: string;
  progress: number;
  status: GoalStatus;
  title: string;
}
