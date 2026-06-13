type GroupStatus = 'ACTIVE' | 'CANCELLED' | 'FINISHED' | 'FORMING';
type ScheduleType = 'EVEN_DAYS' | 'EXACT_DAYS' | 'ODD_DAYS';

interface Group {
  active: boolean;
  capacity: number;
  courseId: string;
  courseName: string;
  currentStudents: number;
  id: string;
  name: string;
  scheduleDays: DayOfWeek[];
  scheduleType: ScheduleType;
  status: GroupStatus;
  teacher: GroupTeacher;
}

interface GroupTeacher {
  birthDate: string;
  email: string;
  firstName: string;
  gender: Gender;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  profileBackgroundUrl: string;
  profileImageUrl: string;
  status: UserStatus;
  teacherId: string;
  userId: string;
}

// APIs responses

type GroupsResponse = Pagination<Group>;
type GroupResponse = ApiResponse<Group>;
type GroupStudents = ApiResponse<Student[]>;
