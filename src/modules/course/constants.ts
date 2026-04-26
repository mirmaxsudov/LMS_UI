import type { MessageDescriptor } from '@lingui/core';

import { msg } from '@lingui/core/macro';

export const courseLevelLabelMap: Record<CourseLevel, MessageDescriptor> = {
  BEGINNER: msg`Beginner`,
  INTERMEDIATE: msg`Intermediate`,
  ADVANCED: msg`Advanced`
};

export const courseLevelOptions = Object.entries(courseLevelLabelMap).map(([key, value]) => ({
  label: value,
  value: key as CourseLevel
}));
