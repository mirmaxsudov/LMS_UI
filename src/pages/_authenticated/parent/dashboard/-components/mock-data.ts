import type {
  AnnouncementItem,
  AttendanceComparisonItem,
  ChildSummary,
  ParentAssignmentItem,
  ParentOverviewStat,
  ParentScheduleItem,
  PaymentItem,
  PerformanceTrendPoint,
  SubjectPerformancePoint
} from './types';

export const overviewStat: ParentOverviewStat = {
  totalChildren: 3,
  averageAttendance: 93,
  averageAttendanceTrend: 2,
  averagePerformance: 85,
  averagePerformanceTrend: 4,
  pendingPaymentsAmount: 970000,
  pendingPaymentsCount: 2,
  unreadMessages: 3,
  upcomingMeetings: 1
};

export const children: ChildSummary[] = [
  {
    id: 'diyora',
    name: 'Diyora Karimova',
    grade: 'Grade 9 · Group A',
    color: 'var(--color-chart-1)',
    attendanceRate: 97,
    attendanceTrend: 1,
    averageScore: 91,
    averageScoreTrend: 3,
    overallProgress: 82,
    pendingAssignments: 1,
    enrolledCourses: 5,
    status: 'active'
  },
  {
    id: 'sardor',
    name: 'Sardor Karimov',
    grade: 'Grade 6 · Group B',
    color: 'var(--color-chart-2)',
    attendanceRate: 88,
    attendanceTrend: -3,
    averageScore: 76,
    averageScoreTrend: 2,
    overallProgress: 64,
    pendingAssignments: 3,
    enrolledCourses: 6,
    status: 'active'
  },
  {
    id: 'madina',
    name: 'Madina Karimova',
    grade: 'Grade 3 · Group C',
    color: 'var(--color-chart-3)',
    attendanceRate: 95,
    attendanceTrend: 4,
    averageScore: 88,
    averageScoreTrend: 5,
    overallProgress: 74,
    pendingAssignments: 2,
    enrolledCourses: 4,
    status: 'active'
  }
];

export const attendanceComparison: AttendanceComparisonItem[] = [
  { name: 'Diyora', present: 27, late: 1, absent: 0 },
  { name: 'Sardor', present: 23, late: 2, absent: 3 },
  { name: 'Madina', present: 26, late: 1, absent: 1 }
];

export const performanceTrend: PerformanceTrendPoint[] = [
  { period: 'Jan', diyora: 86, sardor: 70, madina: 81 },
  { period: 'Feb', diyora: 88, sardor: 72, madina: 83 },
  { period: 'Mar', diyora: 87, sardor: 71, madina: 84 },
  { period: 'Apr', diyora: 89, sardor: 74, madina: 85 },
  { period: 'May', diyora: 90, sardor: 75, madina: 87 },
  { period: 'Jun', diyora: 91, sardor: 76, madina: 88 }
];

export const subjectPerformance: SubjectPerformancePoint[] = [
  { subject: 'Mathematics', diyora: 93, sardor: 72, madina: 90 },
  { subject: 'Science', diyora: 88, sardor: 78, madina: 85 },
  { subject: 'Language', diyora: 95, sardor: 70, madina: 92 },
  { subject: 'History', diyora: 84, sardor: 68, madina: 80 },
  { subject: 'Arts', diyora: 90, sardor: 82, madina: 95 },
  { subject: 'IT', diyora: 89, sardor: 74, madina: 79 }
];

export const todaySchedule: ParentScheduleItem[] = [
  {
    id: '1',
    childName: 'Diyora',
    childColor: 'var(--color-chart-1)',
    subject: 'Mathematics',
    topic: 'Quadratic Equations - Review',
    teacher: 'Mr. Aliyev',
    room: 'Room 204',
    startTime: '08:30',
    endTime: '09:15',
    status: 'completed'
  },
  {
    id: '2',
    childName: 'Madina',
    childColor: 'var(--color-chart-3)',
    subject: 'Reading Skills',
    topic: 'Phonics & Comprehension',
    teacher: 'Ms. Yoldosheva',
    room: 'Room 101',
    startTime: '09:00',
    endTime: '09:45',
    status: 'completed'
  },
  {
    id: '3',
    childName: 'Sardor',
    childColor: 'var(--color-chart-2)',
    subject: 'Science',
    topic: 'States of Matter - Experiment',
    teacher: 'Ms. Nodira',
    room: 'Lab 2',
    startTime: '10:30',
    endTime: '11:15',
    status: 'ongoing'
  },
  {
    id: '4',
    childName: 'Diyora',
    childColor: 'var(--color-chart-1)',
    subject: 'English Language',
    topic: 'Essay Workshop: Climate Change',
    teacher: 'Ms. Karimova',
    room: 'Room 110',
    startTime: '11:30',
    endTime: '12:15',
    status: 'upcoming'
  },
  {
    id: '5',
    childName: 'Sardor',
    childColor: 'var(--color-chart-2)',
    subject: 'Mathematics',
    topic: 'Fractions & Decimals',
    teacher: 'Mr. Qodirov',
    room: 'Room 207',
    startTime: '13:00',
    endTime: '13:45',
    status: 'upcoming'
  }
];

export const pendingPayments: PaymentItem[] = [
  {
    id: '1',
    childName: 'Diyora Karimova',
    description: 'Monthly tuition - June',
    amount: 850000,
    dueDate: '2026-06-20',
    status: 'pending'
  },
  {
    id: '2',
    childName: 'Sardor Karimov',
    description: 'Extra workshop fee - Robotics club',
    amount: 120000,
    dueDate: '2026-06-10',
    status: 'overdue'
  },
  {
    id: '3',
    childName: 'Madina Karimova',
    description: 'Monthly tuition - May',
    amount: 700000,
    dueDate: '2026-05-20',
    status: 'paid',
    paidDate: '2026-05-18'
  },
  {
    id: '4',
    childName: 'Diyora Karimova',
    description: 'Monthly tuition - May',
    amount: 850000,
    dueDate: '2026-05-20',
    status: 'paid',
    paidDate: '2026-05-19'
  }
];

export const upcomingAssignments: ParentAssignmentItem[] = [
  {
    id: '1',
    childName: 'Diyora',
    childColor: 'var(--color-chart-1)',
    subject: 'Physics',
    title: "Newton's Laws Problem Set",
    type: 'homework',
    dueDate: '2026-06-13',
    status: 'pending'
  },
  {
    id: '2',
    childName: 'Sardor',
    childColor: 'var(--color-chart-2)',
    subject: 'Mathematics',
    title: 'Fractions Practice Sheet',
    type: 'homework',
    dueDate: '2026-06-14',
    status: 'pending'
  },
  {
    id: '3',
    childName: 'Madina',
    childColor: 'var(--color-chart-3)',
    subject: 'Reading Skills',
    title: 'Storybook Reading Log',
    type: 'homework',
    dueDate: '2026-06-15',
    status: 'pending'
  },
  {
    id: '4',
    childName: 'Sardor',
    childColor: 'var(--color-chart-2)',
    subject: 'Science',
    title: 'States of Matter Quiz',
    type: 'quiz',
    dueDate: '2026-06-11',
    status: 'overdue'
  },
  {
    id: '5',
    childName: 'Diyora',
    childColor: 'var(--color-chart-1)',
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
    childName: 'Diyora',
    childColor: 'var(--color-chart-1)',
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
    description:
      'Check the schedule page for your children’s updated exam dates and rooms for this term.',
    author: 'Academic Office',
    date: '2026-06-12',
    priority: 'urgent'
  },
  {
    id: '2',
    title: 'Tuition payment reminder',
    description: 'June tuition invoices are due by June 20. Pay online to avoid late fees.',
    author: 'Finance Office',
    date: '2026-06-12',
    priority: 'important'
  },
  {
    id: '3',
    title: 'Parent-teacher meeting on June 20',
    description: 'Book a 15-minute slot with your child’s homeroom teacher via the meetings page.',
    author: 'Academic Office',
    date: '2026-06-10',
    priority: 'normal'
  },
  {
    id: '4',
    title: 'Summer holiday schedule',
    description: 'Classes will follow a modified schedule starting July 1. Details to follow soon.',
    author: 'Academic Office',
    date: '2026-06-09',
    priority: 'normal'
  }
];
