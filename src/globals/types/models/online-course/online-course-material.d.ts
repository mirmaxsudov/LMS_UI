interface OnlineCourseMaterial {
  attachmentId: string;
  attachmentUrl: string;
  id: string;
  lessonId: string;
  orderIndex: number;
  title: string;
}

type OnlineCourseMaterialResponse = ApiResponse<OnlineCourseMaterial>;
