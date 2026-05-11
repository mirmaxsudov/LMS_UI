import type { MessageDescriptor } from '@lingui/core';

import { msg } from '@lingui/core/macro';

export const onlineCourseStatusLabelMap: Record<OnlineCourseStatus, MessageDescriptor> = {
  ARCHIVED: msg`Archived`,
  DRAFT: msg`Draft`,
  PUBLIC: msg`Public`
};

export const onlineCourseStatusOptions = Object.entries(onlineCourseStatusLabelMap).map(
  ([key, value]) => ({
    label: value,
    value: key as OnlineCourseStatus
  })
);

export const onlineCourseStatusColorMap: Record<OnlineCourseStatus, string> = {
  ARCHIVED: '#64748b',
  DRAFT: '#f59e0b',
  PUBLIC: '#16a34a'
};

export const onlineCourseUnlockStrategyLabelMap: Record<
  OnlineCourseUnlockStrategy,
  MessageDescriptor
> = {
  ALL_AT_ONCE: msg`All at once`,
  LESSON_BY_LESSON: msg`Lesson by lesson`,
  MODULE_BY_MODULE: msg`Module by module`
};

export const onlineCourseUnlockStrategyOptions = Object.entries(
  onlineCourseUnlockStrategyLabelMap
).map(([key, value]) => ({
  label: value,
  value: key as OnlineCourseUnlockStrategy
}));

export const onlineCourseContentStatusLabelMap: Record<
  OnlineCourseContentStatus,
  MessageDescriptor
> = {
  DRAFT: msg`Draft`,
  HIDDEN: msg`Hidden`,
  PUBLISHED: msg`Published`
};

export const onlineCourseContentStatusOptions = Object.entries(
  onlineCourseContentStatusLabelMap
).map(([key, value]) => ({
  label: value,
  value: key as OnlineCourseContentStatus
}));

export const onlineCourseEnrollmentStatusLabelMap: Record<
  OnlineCourseEnrollmentStatus,
  MessageDescriptor
> = {
  ACTIVE: msg`Active`,
  CANCELLED: msg`Cancelled`,
  COMPLETED: msg`Completed`,
  SUSPENDED: msg`Suspended`
};

export const onlineCourseEnrollmentStatusOptions = Object.entries(
  onlineCourseEnrollmentStatusLabelMap
).map(([key, value]) => ({
  label: value,
  value: key as OnlineCourseEnrollmentStatus
}));
