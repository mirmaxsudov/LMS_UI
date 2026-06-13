export interface ProgressOverviewStat {
  averageScore: number;
  averageScoreTrend: number;
  attendanceRate: number;
  attendanceTrend: number;
  completedLessons: number;
  totalLessons: number;
  homeworkCompletionRate: number;
  homeworkTrend: number;
  classRank: number;
  classSize: number;
}

export interface PerformanceTrendPoint {
  period: string;
  average: number;
  attendance: number;
}

export interface SubjectProgress {
  id: string;
  name: string;
  teacher: string;
  averageScore: number;
  attendanceRate: number;
  completedLessons: number;
  totalLessons: number;
  trend: 'down' | 'flat' | 'up';
  color: string;
}

export interface AttendanceBreakdown {
  label: string;
  value: number;
  color: string;
}

export type GradeType = 'exam' | 'homework' | 'project' | 'quiz';

export interface RecentGrade {
  id: string;
  subject: string;
  title: string;
  type: GradeType;
  score: number;
  maxScore: number;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'award' | 'crown' | 'flame' | 'medal' | 'star' | 'target' | 'trophy' | 'zap';
  earnedAt: string | null;
}

export type ActivityType = 'achievement' | 'attendance' | 'grade' | 'lesson';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
}
