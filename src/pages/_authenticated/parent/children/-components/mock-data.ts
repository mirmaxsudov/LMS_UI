import type { ParentChild } from './types';

export const children: ParentChild[] = [
  {
    id: 'abdulloh-karimov',
    name: 'Abdulloh Karimov',
    initials: 'AK',
    grade: 'Grade 8',
    group: 'Foundation A',
    status: 'active',
    attendance: 96,
    performance: 88,
    courses: 5,
    completedAssignments: 18,
    totalAssignments: 20,
    nextClass: {
      subject: 'Mathematics',
      teacher: 'Ms. Madina',
      date: 'Mon, Jun 15',
      time: '09:00'
    },
    accentClassName: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
  },
  {
    id: 'maryam-karimova',
    name: 'Maryam Karimova',
    initials: 'MK',
    grade: 'Grade 5',
    group: 'Young Learners B',
    status: 'active',
    attendance: 91,
    performance: 94,
    courses: 4,
    completedAssignments: 14,
    totalAssignments: 16,
    nextClass: {
      subject: 'English',
      teacher: 'Mr. James',
      date: 'Mon, Jun 15',
      time: '11:30'
    },
    accentClassName: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
  },
  {
    id: 'yusuf-karimov',
    name: 'Yusuf Karimov',
    initials: 'YK',
    grade: 'Grade 2',
    group: 'Junior Stars',
    status: 'on-break',
    attendance: 87,
    performance: 82,
    courses: 3,
    completedAssignments: 9,
    totalAssignments: 12,
    nextClass: {
      subject: 'Science',
      teacher: 'Ms. Aziza',
      date: 'Tue, Jun 16',
      time: '10:00'
    },
    accentClassName: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
  }
];
