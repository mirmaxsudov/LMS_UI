export interface CatalogTeacher {
  initials: string;
  name: string;
}

export interface CatalogCourse {
  category: string;
  color: string;
  description: string;
  durationWeeks: number;
  id: string;
  isEnrolled: boolean;
  isNew: boolean;
  lessons: number;
  level: CourseLevel;
  price: number;
  rating: number;
  ratingCount: number;
  studentsCount: number;
  teacher: CatalogTeacher;
  title: string;
}
