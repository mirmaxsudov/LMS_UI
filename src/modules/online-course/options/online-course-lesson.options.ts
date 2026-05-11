export const ONLINE_COURSE_LESSON_QUERY_KEYS = {
  all: () => ['online-course-lessons'] as const,
  byId: (lessonId?: string) => [...ONLINE_COURSE_LESSON_QUERY_KEYS.all(), 'by-id', lessonId] as const,
  byModuleId: (moduleId?: string) =>
    [...ONLINE_COURSE_LESSON_QUERY_KEYS.all(), 'by-module-id', moduleId] as const
};
