type CourseLevel = 'ADVANCED' | 'BEGINNER' | 'INTERMEDIATE';

interface Course {
  description: string;
  durationInMinutes: number;
  id: string;
  level: CourseLevel;
  title: string;
}

type CoursesResponse = Pagination<Course>;

interface CourseRequest {
  description: string;
  durationInMinutes: number;
  level: CourseLevel;
  title: string;
}
