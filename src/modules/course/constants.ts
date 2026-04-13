import type { Option } from '@/shared/ui/filter/FilterToolbar';

export const courseLevelLabelMap: Record<CourseLevel, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced'
};

export const courseLevelOptions: Option[] = Object.entries(courseLevelLabelMap).map(
  ([value, label]) => ({
    value,
    label
  })
);
