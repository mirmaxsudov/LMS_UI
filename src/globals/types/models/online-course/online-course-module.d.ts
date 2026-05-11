interface OnlineCourseModule {
  availableFrom: string;
  courseId: string;
  description: string;
  id: string;
  orderIndex: number;
  status: OnlineCourseContentStatus;
  title: string;
  lessons: [
    {
      id: string;
      moduleId: string;
      title: string;
      description: string;
      content: string;
      orderIndex: number;
      durationInMinutes: number;
      freePreview: true;
      status: OnlineCourseContentStatus;
      availableFrom: string;
      videoAttachmentId: string | null;
      videoUrl: string | null;
      materials: OnlineCourseMaterial[];
    }
  ];
}

type OnlineCourseModuleResponse = ApiResponse<OnlineCourseModule>;
