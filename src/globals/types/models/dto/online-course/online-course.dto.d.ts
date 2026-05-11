interface OnlineCourseDto {
  description: string;
  estimatedDurationInMinutes: number;
  level: CourseLevel;
  shortDescription: string;
  slug: string;
  status: OnlineCourseStatus;
  thumbnailId: string;
  title: string;
  unlockStrategy: OnlineCourseUnlockStrategy;
}

type PostOnlineCourseDto = OnlineCourseDto;
type PutOnlineCourseDto = OnlineCourseDto;
