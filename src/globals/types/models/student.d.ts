type StudentStatus = 'ACTIVE' | 'GRADUATED' | 'SUSPENDED';

interface Student {
  baseData: User;
  status: StudentStatus;
  studentId: string;
}

// Apis

type StudentsResponse = Pagination<Student>;
type StudentResponse = ApiResponse<Student>;
