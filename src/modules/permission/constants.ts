import type { MessageDescriptor } from '@lingui/core';

import { msg } from '@lingui/core/macro';

export const permissionCategoryLabelMap: Record<PermissionCategory, MessageDescriptor> = {
  ATTENDANCE: msg`Attendance`,
  COURSE: msg`Course`,
  ENROLLMENT: msg`Enrollment`,
  GROUP: msg`Group`,
  LESSON: msg`Lesson`,
  SYSTEM: msg`System`,
  USER: msg`User`
};

export const permissionCategoryOptions = Object.entries(permissionCategoryLabelMap).map(
  ([value, label]) => ({
    label,
    value: value as PermissionCategory
  })
);

export const permissionSystemOptions = [
  { label: msg`System`, value: 'true' },
  { label: msg`Custom`, value: 'false' }
];
