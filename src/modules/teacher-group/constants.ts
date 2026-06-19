import type { MessageDescriptor } from '@lingui/core';

import { msg } from '@lingui/core/macro';

export const teacherGroupStudentStatusLabelMap: Record<TeacherGroupStudentStatus, MessageDescriptor> =
  {
    ACTIVE: msg`Active`,
    AT_RISK: msg`At risk`,
    INACTIVE: msg`Inactive`
  };

export const teacherGroupStudentStatusColorMap: Record<TeacherGroupStudentStatus, string> = {
  ACTIVE: '#16A34A',
  AT_RISK: '#D97706',
  INACTIVE: '#64748B'
};

export const teacherGroupPaymentStatusLabelMap: Record<TeacherGroupPaymentStatus, MessageDescriptor> =
  {
    OVERDUE: msg`Overdue`,
    PAID: msg`Paid`,
    PENDING: msg`Pending`
  };

export const teacherGroupPaymentStatusColorMap: Record<TeacherGroupPaymentStatus, string> = {
  OVERDUE: '#DC2626',
  PAID: '#16A34A',
  PENDING: '#D97706'
};

export const courseLevelLabelMap: Record<CourseLevel, MessageDescriptor> = {
  ADVANCED: msg`Advanced`,
  BEGINNER: msg`Beginner`,
  INTERMEDIATE: msg`Intermediate`
};
