interface OnlineCourseModuleDto {
  availableFrom: string;
  description: string;
  orderIndex: number;
  status: OnlineCourseContentStatus;
  title: string;
}

type PostOnlineCourseModuleDto = OnlineCourseModuleDto;
type PutOnlineCourseModuleDto = OnlineCourseModuleDto;
