export interface ProgressOverviewStat {
  attendanceRate: number;
  attendanceTrend: number;
  averageScore: number;
  averageScoreTrend: number;
  classRank: number;
  classSize: number;
  completedLessons: number;
  homeworkCompletionRate: number;
  homeworkTrend: number;
  totalLessons: number;
}

export interface PerformanceTrendPoint {
  attendance: number;
  average: number;
  period: string;
}

export interface SubjectProgress {
  attendanceRate: number;
  averageScore: number;
  color: string;
  completedLessons: number;
  id: string;
  name: string;
  teacher: string;
  totalLessons: number;
  trend: 'down' | 'flat' | 'up';
}

export interface AttendanceBreakdown {
  color: string;
  label: string;
  value: number;
}

export type GradeType = 'exam' | 'homework' | 'project' | 'quiz';

export interface RecentGrade {
  date: string;
  id: string;
  maxScore: number;
  score: number;
  subject: string;
  title: string;
  type: GradeType;
}

export interface Achievement {
  description: string;
  earnedAt: string | null;
  icon: 'award' | 'crown' | 'flame' | 'medal' | 'star' | 'target' | 'trophy' | 'zap';
  id: string;
  title: string;
}

export type ActivityType = 'achievement' | 'attendance' | 'grade' | 'lesson';

export interface ActivityItem {
  date: string;
  description: string;
  id: string;
  title: string;
  type: ActivityType;
}

export type AttendanceRecordStatus = 'absent' | 'excused' | 'late' | 'present';

export interface AttendanceRecord {
  date: string;
  id: string;
  status: AttendanceRecordStatus;
  subject: string;
  topic: string;
}
