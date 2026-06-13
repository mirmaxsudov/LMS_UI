export interface ChildProgress {
  group: string;
  id: string;
  initials: string;
  level: string;
  name: string;
  nextLesson: string;
  nextLessonTopic: string;
  teacher: string;
  stats: {
    score: number;
    attendance: number;
    homework: number;
    rank: number;
    classSize: number;
  };
}

export const children: ChildProgress[] = [
  {
    id: 'amina',
    name: 'Amina Karimova',
    initials: 'AK',
    level: 'Intermediate B1',
    group: 'English Teens 04',
    teacher: 'Sarah Johnson',
    nextLesson: 'Mon, 15 Jun · 17:00–18:30',
    nextLessonTopic: 'Speaking & Listening',
    stats: { score: 87, attendance: 94, homework: 91, rank: 4, classSize: 18 }
  },
  {
    id: 'timur',
    name: 'Timur Karimov',
    initials: 'TK',
    level: 'Elementary A2',
    group: 'English Kids 07',
    teacher: 'Daniel Lee',
    nextLesson: 'Tue, 16 Jun · 16:00–17:30',
    nextLessonTopic: 'Grammar & Vocabulary',
    stats: { score: 81, attendance: 90, homework: 86, rank: 7, classSize: 20 }
  }
];

export const performanceTrend = [
  { period: 'Jan', student: 72, classAverage: 68 },
  { period: 'Feb', student: 75, classAverage: 69 },
  { period: 'Mar', student: 78, classAverage: 71 },
  { period: 'Apr', student: 82, classAverage: 73 },
  { period: 'May', student: 84, classAverage: 75 },
  { period: 'Jun', student: 87, classAverage: 77 }
];

export const attendanceBreakdown = [
  { label: 'Present', value: 47, percentage: 94, color: 'var(--color-success)' },
  { label: 'Late', value: 2, percentage: 4, color: 'var(--color-chart-3)' },
  { label: 'Absent', value: 1, percentage: 2, color: 'var(--color-muted-foreground)' }
];

export const subjectMastery = [
  { subject: 'Grammar', score: 92, change: 6 },
  { subject: 'Listening', score: 88, change: 3 },
  { subject: 'Speaking', score: 85, change: 5 },
  { subject: 'Reading', score: 82, change: 1 },
  { subject: 'Writing', score: 78, change: -2 }
];

export const recentAssessments = [
  { id: '1', title: 'Unit 6 Quiz', subject: 'Grammar', date: '12 Jun 2026', score: 90 },
  { id: '2', title: 'Listening Test', subject: 'Listening', date: '8 Jun 2026', score: 85 },
  { id: '3', title: 'Speaking Test', subject: 'Speaking', date: '3 Jun 2026', score: 80 },
  { id: '4', title: 'Reading Comprehension', subject: 'Reading', date: '29 May 2026', score: 88 },
  { id: '5', title: 'Writing Task', subject: 'Writing', date: '25 May 2026', score: 75 }
];

export const goals = [
  { id: '1', title: 'Complete Unit 6 homework', due: 'Completed', completed: true },
  { id: '2', title: 'Prepare for Unit 7 vocabulary test', due: '19 Jun', completed: false },
  { id: '3', title: 'Write an opinion essay (250 words)', due: '26 Jun', completed: false }
];
