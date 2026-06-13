export type StudentStatus = 'active' | 'at-risk' | 'inactive';

export interface TeacherStudent {
  attendanceRate: number;
  averageScore: number;
  email: string;
  enrolledCourses: number;
  group: string;
  id: string;
  initials: string;
  lastActive: string;
  name: string;
  status: StudentStatus;
}
