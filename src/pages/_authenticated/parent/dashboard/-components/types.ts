export interface ParentOverviewStat {
  averageAttendance: number;
  averageAttendanceTrend: number;
  averagePerformance: number;
  averagePerformanceTrend: number;
  pendingPaymentsAmount: number;
  pendingPaymentsCount: number;
  totalChildren: number;
  unreadMessages: number;
  upcomingMeetings: number;
}

export type ChildStatus = 'active' | 'on-leave';

export interface ChildSummary {
  attendanceRate: number;
  attendanceTrend: number;
  averageScore: number;
  averageScoreTrend: number;
  color: string;
  enrolledCourses: number;
  grade: string;
  id: string;
  name: string;
  overallProgress: number;
  pendingAssignments: number;
  status: ChildStatus;
}

export interface AttendanceComparisonItem {
  absent: number;
  late: number;
  name: string;
  present: number;
}

export interface PerformanceTrendPoint {
  [childId: string]: number | string;
  period: string;
}

export interface SubjectPerformancePoint {
  [childId: string]: number | string;
  subject: string;
}

export type ScheduleStatus = 'completed' | 'ongoing' | 'upcoming';

export interface ParentScheduleItem {
  childColor: string;
  childName: string;
  endTime: string;
  id: string;
  room: string;
  startTime: string;
  status: ScheduleStatus;
  subject: string;
  teacher: string;
  topic: string;
}

export type PaymentStatus = 'overdue' | 'paid' | 'pending';

export interface PaymentItem {
  amount: number;
  childName: string;
  description: string;
  dueDate: string;
  id: string;
  paidDate?: string;
  status: PaymentStatus;
}

export type AssignmentType = 'exam' | 'homework' | 'project' | 'quiz';
export type AssignmentStatus = 'graded' | 'overdue' | 'pending' | 'submitted';

export interface ParentAssignmentItem {
  childColor: string;
  childName: string;
  dueDate: string;
  id: string;
  maxScore?: number;
  score?: number;
  status: AssignmentStatus;
  subject: string;
  title: string;
  type: AssignmentType;
}

export type AnnouncementPriority = 'important' | 'normal' | 'urgent';

export interface AnnouncementItem {
  author: string;
  date: string;
  description: string;
  id: string;
  priority: AnnouncementPriority;
  title: string;
}
