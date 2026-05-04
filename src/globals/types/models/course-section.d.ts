interface CourseSection {
  courseId: string;
  courseTitle: string;
  id: string;
  lessons: Lesson[];
  orderIndex: number;
  title: string;
}

type CourseSectionsResponse = Pagination<CourseSection>;
type CourseSectionResponse = ApiResponse<CourseSection>;
