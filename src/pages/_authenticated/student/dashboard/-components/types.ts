export interface DashboardOverviewStat {
  activeCoursesTrend: number;
  assignmentsDueToday: number;
  attendanceRate: number;
  attendanceTrend: number;
  averageScore: number;
  averageScoreTrend: number;
  enrolledCourses: number;
  pendingAssignments: number;
  rank: number;
  rankSize: number;
  studyStreakDays: number;
  totalPoints: number;
}

export interface WeeklyActivityPoint {
  day: string;
  goalHours: number;
  hours: number;
}

export interface PerformanceTrendPoint {
  classAverage: number;
  period: string;
  you: number;
}

export interface AttendanceOverviewItem {
  color: string;
  label: string;
  value: number;
}

export type ScheduleStatus = 'completed' | 'ongoing' | 'upcoming';

export interface ScheduleItem {
  color: string;
  endTime: string;
  id: string;
  room: string;
  startTime: string;
  status: ScheduleStatus;
  subject: string;
  teacher: string;
  topic: string;
}

export type AssignmentType = 'exam' | 'homework' | 'project' | 'quiz';
export type AssignmentStatus = 'graded' | 'overdue' | 'pending' | 'submitted';

export interface AssignmentItem {
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

export interface CourseProgressItem {
  color: string;
  completedLessons: number;
  id: string;
  name: string;
  nextLesson: string;
  nextLessonDate: string;
  progress: number;
  teacher: string;
  totalLessons: number;
}

export interface ContinueLearning {
  courseName: string;
  lessonTitle: string;
  progress: number;
  teacher: string;
}
