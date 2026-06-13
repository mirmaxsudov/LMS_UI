export interface TeacherOverviewStat {
  activeGroups: number;
  activeGroupsTrend: number;
  attendanceRate: number;
  attendanceTrend: number;
  avgGroupScore: number;
  avgGroupScoreTrend: number;
  gradingDueToday: number;
  lessonsThisWeek: number;
  lessonsToday: number;
  pendingGrading: number;
  totalStudents: number;
  totalStudentsTrend: number;
}

export interface WeeklyLessonsPoint {
  day: string;
  lessons: number;
  plannedLessons: number;
}

export interface ClassPerformanceTrendPoint {
  attendanceRate: number;
  averageScore: number;
  period: string;
}

export interface AttendanceOverviewItem {
  color: string;
  label: string;
  value: number;
}

export interface GroupPerformanceItem {
  attendanceRate: number;
  averageScore: number;
  color: string;
  group: string;
}

export interface GroupOverviewItem {
  averageScore: number;
  color: string;
  completedLessons: number;
  id: string;
  name: string;
  nextLesson: string;
  nextLessonDate: string;
  progress: number;
  studentsCount: number;
  subject: string;
  totalLessons: number;
}

export type ScheduleStatus = 'completed' | 'ongoing' | 'upcoming';

export interface ScheduleItem {
  color: string;
  endTime: string;
  groupName: string;
  id: string;
  room: string;
  startTime: string;
  status: ScheduleStatus;
  studentsCount: number;
  topic: string;
}

export type GradingType = 'exam' | 'homework' | 'project' | 'quiz';
export type GradingStatus = 'overdue' | 'pending';

export interface GradingItem {
  dueDate: string;
  group: string;
  id: string;
  status: GradingStatus;
  submittedCount: number;
  title: string;
  totalCount: number;
  type: GradingType;
}

export interface TopStudentItem {
  attendanceRate: number;
  averageScore: number;
  group: string;
  id: string;
  initials: string;
  name: string;
  trend: number;
}

export type NotificationType = 'alert' | 'info' | 'reminder';

export interface NotificationItem {
  date: string;
  description: string;
  id: string;
  title: string;
  type: NotificationType;
}
