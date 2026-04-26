type TeacherPositon = 'ASSISTANT' | 'LECTURER' | 'PROFESSOR';

interface Teacher {
  position: TeacherPositon;
  teacherId: string;
  user: User;
}

type TeachersResponse = Pagination<Teacher>;
