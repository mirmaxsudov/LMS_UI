interface StudyGroup {
  active: boolean;
  capacity: number;
  classmates: Classmate[];
  classmatesCount: number;
  course: Course;
  currentStudents: number;
  groupName: string;
  id: string;
  nextLesson: NextLesson;
  scheduleDays: DayOfWeek[];
  schedules: Schedule[];
  scheduleType: ScheduleType;
  status: GroupStatus;
  syllabusProgress: SyllabusProgress;
  teacher: StudyGroupTeacher;
}

interface Classmate {
  firstName: string;
  lastName: string;
  profileImageUrl: string | null;
  studentId: string;
}

interface SyllabusProgress {
  completedLessons: number;
  percentage: number;
  totalLessons: number;
}

interface StudyGroupOverview {
  averageProgress: number;
  sessionsThisWeek: number;
  totalClassmates: number;
  totalGroups: number;
}

// API Responses

type StudyGroupsResponse = Pagination<StudyGroup>;
type StudyGroupOverviewResponse = ApiResponse<StudyGroupOverview>;
