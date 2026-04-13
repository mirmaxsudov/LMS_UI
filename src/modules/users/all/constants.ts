import type { MessageDescriptor } from '@lingui/core';

import { msg } from '@lingui/core/macro';

export const roleLabelMap: Record<UserRole, MessageDescriptor> = {
  ADMIN: msg`Admin`,
  GUARDIAN: msg`Guardian`,
  MAINTAINER: msg`Maintainer`,
  PARENT: msg`Parent`,
  STUDENT: msg`Student`,
  SUPER_ADMIN: msg`Super Admin`,
  SUPPORT_TEACHER: msg`Support Teacher`,
  TEACHER: msg`Teacher`
};

export const statusLabelMap: Record<UserStatus, MessageDescriptor> = {
  ACTIVE: msg`Active`,
  INACTIVE: msg`Inactive`
};
