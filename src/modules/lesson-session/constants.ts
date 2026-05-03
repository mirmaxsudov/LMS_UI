import type { MessageDescriptor } from '@lingui/core';

import { msg } from '@lingui/core/macro';

export const lessonSessionStatusLabelMap: Record<LessonSessionStatus, MessageDescriptor> = {
  CANCELLED: msg`Cancelled`,
  COMPLETED: msg`Completed`,
  PLANNED: msg`Planned`
};

export const lessonSessionStatusOptions = Object.entries(lessonSessionStatusLabelMap).map(
  ([key, value]) => ({
    label: value,
    value: key as LessonSessionStatus
  })
);

export const lessonSessionStatusColorMap: Record<LessonSessionStatus, string> = {
  CANCELLED: '#DC2626',
  COMPLETED: '#16A34A',
  PLANNED: '#2563EB'
};
