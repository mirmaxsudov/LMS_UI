export const ONLINE_COURSE_PROGRESS_QUERY_KEYS = {
  all: () => ['online-course-progress'] as const,
  byEnrollmentId: (enrollmentId?: string) =>
    [...ONLINE_COURSE_PROGRESS_QUERY_KEYS.all(), 'by-enrollment-id', enrollmentId] as const,
  byLessonId: (lessonId?: string) =>
    [...ONLINE_COURSE_PROGRESS_QUERY_KEYS.all(), 'by-lesson-id', lessonId] as const
};
