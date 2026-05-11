type OnlineCourseStatus = 'ARCHIVED' | 'DRAFT' | 'PUBLIC';
type OnlineCourseUnlockStrategy = 'ALL_AT_ONCE' | 'LESSON_BY_LESSON' | 'MODULE_BY_MODULE';
type OnlineCourseContentStatus = 'DRAFT' | 'HIDDEN' | 'PUBLISHED';

interface OnlineCoursePreview {
  estimatedDurationInMinutes: number;
  id: string;
  level: CourseLevel;
  shortDescription: string;
  slug: string;
  status: OnlineCourseStatus;
  thumbnailId: string | null;
  thumbnailUrl: string | null;
  title: string;
  unlockStrategy: OnlineCourseUnlockStrategy;
}

interface OnlineCourse {
  createdById: string;
  createdByName: string;
  description: string;
  estimatedDurationInMinutes: number;
  id: string;
  level: CourseLevel;
  modules: OnlineCourseModule[];
  shortDescription: string;
  slug: string;
  status: OnlineCourseStatus;
  thumbnailId: string | null;
  thumbnailUrl: string | null;
  title: string;
  unlockStrategy: OnlineCourseUnlockStrategy;
}

// Responses
type OnlineCoursePreviewsResponse = Pagination<OnlineCoursePreview>;
type OnlineCourseResponse = ApiResponse<OnlineCourse>;
