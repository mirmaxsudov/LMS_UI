export interface SummaryStat {
  totalStudents: number;
  studentsTrend: number;
  totalTeachers: number;
  teachersTrend: number;
  activeGroups: number;
  groupsTrend: number;
  monthlyRevenue: number;
  revenueTrend: number;
  avgAttendanceRate: number;
  attendanceTrend: number;
  avgPerformance: number;
  performanceTrend: number;
  outstandingPayments: number;
  outstandingTrend: number;
  newEnrollments: number;
  enrollmentsTrend: number;
}

export interface EnrollmentTrendPoint {
  period: string;
  newStudents: number;
  withdrawals: number;
}

export interface RevenueTrendPoint {
  period: string;
  collected: number;
  expected: number;
}

export interface AttendanceSliceItem {
  label: string;
  value: number;
  color: string;
}

export interface AttendanceTrendPoint {
  period: string;
  rate: number;
}

export interface GroupPerformanceItem {
  group: string;
  averageScore: number;
  color: string;
}

export interface GradeDistributionItem {
  label: string;
  value: number;
  color: string;
}

export interface PaymentStatusItem {
  label: string;
  value: number;
  color: string;
}

export interface TeacherWorkloadItem {
  teacher: string;
  lessons: number;
  color: string;
}

export type TopGroupStatus = 'active' | 'completed' | 'paused';

export interface TopGroupRow {
  id: string;
  name: string;
  course: string;
  students: number;
  averageScore: number;
  attendanceRate: number;
  status: TopGroupStatus;
}

export interface TopTeacherRow {
  id: string;
  name: string;
  initials: string;
  groups: number;
  students: number;
  averageScore: number;
  rating: number;
  lessonsTaught: number;
}

export type PaymentStatus = 'overdue' | 'pending';

export interface OutstandingPaymentRow {
  id: string;
  student: string;
  initials: string;
  group: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
}
