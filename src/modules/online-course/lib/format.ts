export const formatMinutes = (minutes: number) => {
  if (!Number.isFinite(minutes) || minutes <= 0) return '0 min';

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (!hours) return `${rest} min`;
  if (!rest) return `${hours} h`;

  return `${hours} h ${rest} min`;
};

export const getOnlineCourseLessonCount = (course: OnlineCourse) =>
  course.modules.reduce((count, module) => count + module.lessons.length, 0);
