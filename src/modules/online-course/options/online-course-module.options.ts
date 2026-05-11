export const ONLINE_COURSE_MODULE_QUERY_KEYS = {
  all: () => ['online-course-modules'] as const,
  byCourseId: (courseId?: string) =>
    [...ONLINE_COURSE_MODULE_QUERY_KEYS.all(), 'by-course-id', courseId] as const,
  byId: (moduleId?: string) => [...ONLINE_COURSE_MODULE_QUERY_KEYS.all(), 'by-id', moduleId] as const
};
