type StudentStatus = 'ACTIVE' | 'GRADUATED' | 'SUSPENDED';
type StudentEngagementStatus = 'AT_RISK' | 'ACTIVE';

interface Student {
  baseData: User;
  status: StudentStatus;
  studentId: string;
}

// Apis

type StudentsResponse = Pagination<Student>;
type StudentResponse = ApiResponse<Student>;
