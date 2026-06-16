type TeacherPositon = 'ASSISTANT' | 'LECTURER' | 'PROFESSOR';

interface Teacher {
  position: TeacherPositon;
  teacherId: string;
  user: User;
}

interface StudyGroupTeacher {
  birthDate: string | null;
  email: string;
  firstName: string;
  gender: Gender | null;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  profileBackgroundUrl: string | null;
  profileImageUrl: string | null;
  status: UserStatus;
  teacherId: string;
  userId: string;
}

type TeachersResponse = Pagination<Teacher>;
type TeacherResponse = ApiResponse<Teacher>;
