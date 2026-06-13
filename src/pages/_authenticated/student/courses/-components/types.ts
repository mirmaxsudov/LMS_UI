export type CourseStatus = 'active' | 'completed' | 'upcoming';

export interface CourseTeacher {
  avatarUrl?: string;
  initials: string;
  name: string;
}

export interface CourseSchedule {
  days: string[];
  endTime: string;
  room?: string;
  startTime: string;
}

export interface CourseNextLesson {
  date: string;
  title: string;
}

export interface StudentCourse {
  classmatesCount: number;
  color: string;
  completedLessons: number;
  description: string;
  groupName: string;
  id: string;
  level: CourseLevel;
  nextLesson?: CourseNextLesson;
  progress: number;
  schedule: CourseSchedule;
  status: CourseStatus;
  teacher: CourseTeacher;
  title: string;
  totalLessons: number;
}

export interface CoursesOverviewStat {
  activeCourses: number;
  averageProgress: number;
  completedCourses: number;
  totalCourses: number;
}
