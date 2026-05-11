type OnlineCourseProgressStatus = 'AVAILABLE' | 'COMPLETED' | 'IN_PROGRESS' | 'LOCKED';
type OnlineCourseEnrollmentStatus = 'ACTIVE' | 'CANCELLED' | 'COMPLETED' | 'SUSPENDED';

interface OnlineCourseEnrollment {
  completedAt: string;
  completedLessons: number;
  currentLessonId: string;
  currentModuleId: string;
  id: string;
  openedAt: string;
  openedById: string;
  progressPercentage: number;
  status: OnlineCourseEnrollmentStatus;
  studentName: string;
  studentProfileId: string;
  studentUserId: string;
  totalLessons: number;
  course: {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    level: CourseLevel;
    status: OnlineCourseStatus;
    unlockStrategy: OnlineCourseUnlockStrategy;
    estimatedDurationInMinutes: number;
    thumbnailId: string;
    thumbnailUrl: string;
  };
  lessonProgresses: [
    {
      id: string;
      enrollmentId: string;
      contentId: string;
      title: string;
      status: OnlineCourseProgressStatus;
      lastPositionInSeconds: number;
      openedAt: string;
      startedAt: string;
      completedAt: string;
    }
  ];
  moduleProgresses: [
    {
      id: string;
      enrollmentId: string;
      contentId: string;
      title: string;
      status: OnlineCourseProgressStatus;
      lastPositionInSeconds: number;
      openedAt: string;
      startedAt: string;
      completedAt: string;
    }
  ];
}

type OnlineCourseProgressResponse = ApiResponse<OnlineCourseEnrollment>;
type OnlineCourseEnrollmentsResponse = Pagination<OnlineCourseEnrollment>;
