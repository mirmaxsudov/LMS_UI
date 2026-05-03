import type { MessageDescriptor } from '@lingui/core';

import { msg } from '@lingui/core/macro';

export type GroupActivity = 'active' | 'inactive';
export type GroupStudentsCountStatus = 'available' | 'empty' | 'full' | 'nearlyFull';

export const scheduleTypeLabelMap: Record<ScheduleType, MessageDescriptor> = {
  EVEN_DAYS: msg`Even days`,
  EXACT_DAYS: msg`Exact days`,
  ODD_DAYS: msg`Odd days`
};

export const scheduleTypeOptions = Object.entries(scheduleTypeLabelMap).map(([key, value]) => ({
  label: value,
  value: key as ScheduleType
}));

export const dayOfWeekLabelMap: Record<DayOfWeek, MessageDescriptor> = {
  FRIDAY: msg`Friday`,
  MONDAY: msg`Monday`,
  SATURDAY: msg`Saturday`,
  SUNDAY: msg`Sunday`,
  THURSDAY: msg`Thursday`,
  TUESDAY: msg`Tuesday`,
  WEDNESDAY: msg`Wednesday`
};

export const dayOfWeekOptions = Object.entries(dayOfWeekLabelMap).map(([key, value]) => ({
  label: value,
  value: key as DayOfWeek
}));

export const groupStatusLabelMap: Record<GroupStatus, MessageDescriptor> = {
  ACTIVE: msg`Active`,
  CANCELLED: msg`Cancelled`,
  FINISHED: msg`Finished`,
  FORMING: msg`Forming`
};

export const groupStatusOptions = Object.entries(groupStatusLabelMap).map(([key, value]) => ({
  label: value,
  value: key as GroupStatus
}));

export const groupStatusColorMap: Record<GroupStatus, string> = {
  ACTIVE: '#16A34A',
  CANCELLED: '#DC2626',
  FINISHED: '#64748B',
  FORMING: '#2563EB'
};

export const groupActivityLabelMap: Record<GroupActivity, MessageDescriptor> = {
  active: msg`Active`,
  inactive: msg`Inactive`
};

export const groupActivityOptions = Object.entries(groupActivityLabelMap).map(([key, value]) => ({
  label: value,
  value: key as GroupActivity
}));

export const groupActiveOptions = [
  { label: groupActivityLabelMap.active, value: 'true' },
  { label: groupActivityLabelMap.inactive, value: 'false' }
];

export const groupActivityColorMap: Record<GroupActivity, string> = {
  active: '#16A34A',
  inactive: '#64748B'
};

export const groupStudentsCountStatusLabelMap: Record<
  GroupStudentsCountStatus,
  MessageDescriptor
> = {
  available: msg`Available`,
  empty: msg`Empty`,
  full: msg`Full`,
  nearlyFull: msg`Nearly full`
};

export const groupStudentsCountStatusColorMap: Record<GroupStudentsCountStatus, string> = {
  available: '#16A34A',
  empty: '#64748B',
  full: '#DC2626',
  nearlyFull: '#D97706'
};

export const getGroupStudentsCountStatus = (
  currentStudents: number,
  capacity: number
): GroupStudentsCountStatus => {
  if (currentStudents <= 0) return 'empty';
  if (capacity > 0 && currentStudents >= capacity) return 'full';
  if (capacity > 0 && currentStudents / capacity >= 0.8) return 'nearlyFull';

  return 'available';
};
