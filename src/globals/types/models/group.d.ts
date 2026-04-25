type GroupStatus = 'ACTIVE' | 'CANCELLED' | 'FINISHED' | 'FORMING';

interface Group {
  active: boolean;
  capacity: number;
  courseId: string;
  courseName: string;
  currentStudents: number;
  id: string;
  name: string;
  status?: GroupStatus;
  teacher: GroupTeacher;
  teacherId: string;
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
}

type GroupsResponse = Pagination<Group>;
type GroupResponse = ApiResponse<Group>;
