type TeacherPositon = 'ASSISTANT' | 'LECTURER' | 'PROFESSOR';

interface Teacher {
  baseData: User;
  position: TeacherPositon;
}

// apis

type TeachersResponse = Pagination<Teacher>;
