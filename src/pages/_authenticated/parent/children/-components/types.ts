export type ChildStatus = 'active' | 'on-break';

export interface ParentChild {
  accentClassName: string;
  attendance: number;
  completedAssignments: number;
  courses: number;
  grade: string;
  group: string;
  id: string;
  initials: string;
  name: string;
  performance: number;
  status: ChildStatus;
  totalAssignments: number;
  nextClass: {
    subject: string;
    teacher: string;
    date: string;
    time: string;
  };
}
