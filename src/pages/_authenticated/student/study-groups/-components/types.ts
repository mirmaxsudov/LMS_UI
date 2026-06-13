export interface GroupSchedule {
  days: string[];
  endTime: string;
  room: string;
  startTime: string;
}

export interface GroupMember {
  id: string;
  initials: string;
  name: string;
}

export interface NextLesson {
  date: string;
  topic: string;
}

export interface StudyGroup {
  color: string;
  completedLessons: number;
  description: string;
  id: string;
  members: GroupMember[];
  name: string;
  nextLesson: NextLesson;
  progress: number;
  schedule: GroupSchedule;
  subject: string;
  teacher: string;
  teacherInitials: string;
  totalLessons: number;
  totalMembers: number;
}

export interface StudyGroupsOverviewStat {
  averageProgress: number;
  sessionsThisWeek: number;
  totalClassmates: number;
  totalGroups: number;
}
