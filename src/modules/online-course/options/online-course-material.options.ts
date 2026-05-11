export const ONLINE_COURSE_MATERIAL_QUERY_KEYS = {
  all: () => ['online-course-materials'] as const,
  byId: (materialId?: string) =>
    [...ONLINE_COURSE_MATERIAL_QUERY_KEYS.all(), 'by-id', materialId] as const,
  byLessonId: (lessonId?: string) =>
    [...ONLINE_COURSE_MATERIAL_QUERY_KEYS.all(), 'by-lesson-id', lessonId] as const
};
