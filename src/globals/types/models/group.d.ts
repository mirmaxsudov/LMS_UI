type GroupStatus = 'ACTIVE' | 'CANCELLED' | 'FINISHED' | 'FORMING';

interface Group {
  active: boolean;
  capacity: number;
  courseId: string;
  courseName: string;
  currentStudents: number;
  id: string;
  name: string;
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

interface GroupDto {
  active: boolean;
  capacity: number;
  courseId: string;
  name: string;
  status: GroupStatus;
  teacherId: string;
}

type PostGroupDto = GroupDto;
type PutGroupDto = GroupDto;
