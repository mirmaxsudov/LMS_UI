interface CourseSectionDto {
  orderIndex: number;
  title: string;
}

type PostCourseSectionDto = CourseSectionDto & {
  courseId: string;
};
type PutCourseSectionDto = CourseSectionDto;
