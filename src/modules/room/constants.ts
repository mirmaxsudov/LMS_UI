import type { MessageDescriptor } from '@lingui/core';

import { msg } from '@lingui/core/macro';

export const roomTypeLabelMap: Record<RoomType, MessageDescriptor> = {
  CLASS_ROOM: msg`Class room`,
  COMPUTER_LAB: msg`Computer lab`,
  LECTURE_HALL: msg`Lecture hall`
};

export const roomTypeOptions = Object.entries(roomTypeLabelMap).map(([key, value]) => ({
  label: value,
  value: key as RoomType
}));

export const roomTypeColorMap: Record<RoomType, string> = {
  CLASS_ROOM: '#2563EB',
  COMPUTER_LAB: '#7C3AED',
  LECTURE_HALL: '#0891B2'
};

export const roomStatusLabelMap: Record<RoomStatus, MessageDescriptor> = {
  ACTIVE: msg`Active`,
  INACTIVE: msg`Inactive`,
  UNDER_MAINTENANCE: msg`Under maintenance`
};

export const roomStatusOptions = Object.entries(roomStatusLabelMap).map(([key, value]) => ({
  label: value,
  value: key as RoomStatus
}));

export const roomStatusColorMap: Record<RoomStatus, string> = {
  ACTIVE: '#16A34A',
  INACTIVE: '#64748B',
  UNDER_MAINTENANCE: '#D97706'
};

export const booleanFilterOptions = [
  { label: msg`Yes`, value: 'true' },
  { label: msg`No`, value: 'false' }
];
