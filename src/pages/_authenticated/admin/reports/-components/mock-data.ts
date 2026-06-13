import type {
  AttendanceSliceItem,
  AttendanceTrendPoint,
  EnrollmentTrendPoint,
  GradeDistributionItem,
  GroupPerformanceItem,
  OutstandingPaymentRow,
  PaymentStatusItem,
  RevenueTrendPoint,
  SummaryStat,
  TeacherWorkloadItem,
  TopGroupRow,
  TopTeacherRow
} from './types';

export const summaryStat: SummaryStat = {
  totalStudents: 842,
  studentsTrend: 6,
  totalTeachers: 48,
  teachersTrend: 2,
  activeGroups: 96,
  groupsTrend: 4,
  monthlyRevenue: 184500000,
  revenueTrend: 8,
  avgAttendanceRate: 91,
  attendanceTrend: 1,
  avgPerformance: 78,
  performanceTrend: 3,
  outstandingPayments: 12400000,
  outstandingTrend: -5,
  newEnrollments: 57,
  enrollmentsTrend: 12
};

export const enrollmentTrend: EnrollmentTrendPoint[] = [
  { period: 'Jan', newStudents: 38, withdrawals: 6 },
  { period: 'Feb', newStudents: 42, withdrawals: 8 },
  { period: 'Mar', newStudents: 51, withdrawals: 5 },
  { period: 'Apr', newStudents: 47, withdrawals: 9 },
  { period: 'May', newStudents: 60, withdrawals: 7 },
  { period: 'Jun', newStudents: 57, withdrawals: 4 }
];

export const revenueTrend: RevenueTrendPoint[] = [
  { period: 'Jan', collected: 142000000, expected: 158000000 },
  { period: 'Feb', collected: 151000000, expected: 162000000 },
  { period: 'Mar', collected: 163000000, expected: 170000000 },
  { period: 'Apr', collected: 158000000, expected: 175000000 },
  { period: 'May', collected: 172000000, expected: 180000000 },
  { period: 'Jun', collected: 184500000, expected: 196900000 }
];

export const attendanceDistribution: AttendanceSliceItem[] = [
  { label: 'Present', value: 6420, color: 'var(--color-success)' },
  { label: 'Late', value: 412, color: 'var(--color-chart-3)' },
  { label: 'Absent', value: 318, color: 'var(--color-destructive)' },
  { label: 'Excused', value: 186, color: 'var(--color-chart-4)' }
];

export const attendanceTrend: AttendanceTrendPoint[] = [
  { period: 'Jan', rate: 89 },
  { period: 'Feb', rate: 90 },
  { period: 'Mar', rate: 88 },
  { period: 'Apr', rate: 92 },
  { period: 'May', rate: 90 },
  { period: 'Jun', rate: 91 }
];

export const groupPerformance: GroupPerformanceItem[] = [
  { group: 'Math - Advanced A', averageScore: 91, color: 'var(--color-chart-1)' },
  { group: 'English - IELTS B2', averageScore: 87, color: 'var(--color-chart-2)' },
  { group: 'Physics - Grade 10', averageScore: 83, color: 'var(--color-chart-3)' },
  { group: 'Computer Science - Intro', averageScore: 79, color: 'var(--color-chart-4)' },
  { group: 'History - Grade 9', averageScore: 71, color: 'var(--color-chart-5)' },
  { group: 'Chemistry - Grade 11', averageScore: 64, color: 'var(--color-destructive)' }
];

export const gradeDistribution: GradeDistributionItem[] = [
  { label: 'Excellent (90-100)', value: 168, color: 'var(--color-success)' },
  { label: 'Good (75-89)', value: 312, color: 'var(--color-chart-1)' },
  { label: 'Average (60-74)', value: 254, color: 'var(--color-chart-3)' },
  { label: 'Needs support (<60)', value: 108, color: 'var(--color-destructive)' }
];

export const paymentStatus: PaymentStatusItem[] = [
  { label: 'Paid', value: 712, color: 'var(--color-success)' },
  { label: 'Pending', value: 94, color: 'var(--color-chart-3)' },
  { label: 'Overdue', value: 36, color: 'var(--color-destructive)' }
];

export const teacherWorkload: TeacherWorkloadItem[] = [
  { teacher: 'Mr. Aliyev', lessons: 32, color: 'var(--color-chart-1)' },
  { teacher: 'Ms. Karimova', lessons: 30, color: 'var(--color-chart-2)' },
  { teacher: 'Ms. Tosheva', lessons: 28, color: 'var(--color-chart-3)' },
  { teacher: 'Mr. Yusupov', lessons: 26, color: 'var(--color-chart-4)' },
  { teacher: 'Mr. Nazarov', lessons: 22, color: 'var(--color-chart-5)' }
];

export const topGroups: TopGroupRow[] = [
  {
    id: '1',
    name: 'Math - Advanced A',
    course: 'Mathematics',
    students: 18,
    averageScore: 91,
    attendanceRate: 96,
    status: 'active'
  },
  {
    id: '2',
    name: 'English - IELTS B2',
    course: 'English Language',
    students: 22,
    averageScore: 87,
    attendanceRate: 94,
    status: 'active'
  },
  {
    id: '3',
    name: 'Physics - Grade 10',
    course: 'Physics',
    students: 20,
    averageScore: 83,
    attendanceRate: 90,
    status: 'active'
  },
  {
    id: '4',
    name: 'Computer Science - Intro',
    course: 'Computer Science',
    students: 24,
    averageScore: 79,
    attendanceRate: 92,
    status: 'active'
  },
  {
    id: '5',
    name: 'Chemistry - Grade 11',
    course: 'Chemistry',
    students: 19,
    averageScore: 64,
    attendanceRate: 81,
    status: 'paused'
  }
];

export const topTeachers: TopTeacherRow[] = [
  {
    id: '1',
    name: 'Ms. Tosheva',
    initials: 'MT',
    groups: 5,
    students: 96,
    averageScore: 89,
    rating: 4.9,
    lessonsTaught: 28
  },
  {
    id: '2',
    name: 'Mr. Aliyev',
    initials: 'MA',
    groups: 6,
    students: 104,
    averageScore: 86,
    rating: 4.8,
    lessonsTaught: 32
  },
  {
    id: '3',
    name: 'Ms. Karimova',
    initials: 'MK',
    groups: 4,
    students: 88,
    averageScore: 85,
    rating: 4.7,
    lessonsTaught: 30
  },
  {
    id: '4',
    name: 'Mr. Yusupov',
    initials: 'MY',
    groups: 4,
    students: 76,
    averageScore: 80,
    rating: 4.6,
    lessonsTaught: 26
  },
  {
    id: '5',
    name: 'Mr. Nazarov',
    initials: 'MN',
    groups: 3,
    students: 64,
    averageScore: 74,
    rating: 4.4,
    lessonsTaught: 22
  }
];

export const outstandingPayments: OutstandingPaymentRow[] = [
  {
    id: '1',
    student: 'Aziz Rakhimov',
    initials: 'AR',
    group: 'Math - Advanced A',
    amount: 850000,
    dueDate: '2026-06-05',
    status: 'overdue'
  },
  {
    id: '2',
    student: 'Madina Yusupova',
    initials: 'MY',
    group: 'English - IELTS B2',
    amount: 1200000,
    dueDate: '2026-06-08',
    status: 'overdue'
  },
  {
    id: '3',
    student: 'Jasur Tashkentov',
    initials: 'JT',
    group: 'Physics - Grade 10',
    amount: 750000,
    dueDate: '2026-06-18',
    status: 'pending'
  },
  {
    id: '4',
    student: 'Dilnoza Karimova',
    initials: 'DK',
    group: 'Computer Science - Intro',
    amount: 900000,
    dueDate: '2026-06-20',
    status: 'pending'
  },
  {
    id: '5',
    student: 'Sardor Nazarov',
    initials: 'SN',
    group: 'Chemistry - Grade 11',
    amount: 650000,
    dueDate: '2026-06-02',
    status: 'overdue'
  }
];
