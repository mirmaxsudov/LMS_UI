type TeacherGroupStudentStatus = 'ACTIVE' | 'AT_RISK' | 'INACTIVE';
type TeacherGroupPaymentStatus = 'OVERDUE' | 'PAID' | 'PENDING';

interface TeacherGroupStudent {
  attendanceRate: number;
  averageGrade: number;
  email: string;
  enrolledAt: string;
  firstName: string;
  id: string;
  lastName: string;
  paymentStatus: TeacherGroupPaymentStatus;
  phoneNumber: string;
  profileImageUrl: string | null;
  status: TeacherGroupStudentStatus;
}

interface TeacherGroup {
  active: boolean;
  capacity: number;
  course: Course;
  currentStudents: number;
  groupName: string;
  id: string;
  nextLesson: NextLesson | null;
  scheduleDays: DayOfWeek[];
  schedules: Schedule[];
  scheduleType: ScheduleType;
  status: GroupStatus;
  syllabusProgress: SyllabusProgress;
}

// Derived on the client from the groups list (not a dedicated endpoint).
interface TeacherGroupOverview {
  activeGroups: number;
  sessionsThisWeek: number;
  totalGroups: number;
  totalStudents: number;
}

interface TeacherGroupStudentOverview {
  activeStudents: number;
  averageAttendance: number;
  averageGrade: number;
  students: TeacherGroupStudent[];
  totalStudents: number;
}

// API Responses

type TeacherGroupsResponse = Pagination<TeacherGroup>;
type TeacherGroupStudentOverviewResponse = ApiResponse<TeacherGroupStudentOverview>;
