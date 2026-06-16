import { differenceInMinutes, format, parseISO } from 'date-fns';

import type { ClassDisplayStatus } from './types';

const SUBJECT_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)'
];

/** Stable subject → color mapping so the same subject always looks the same. */
export const getSubjectColor = (subject: string) => {
  const hash = subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return SUBJECT_COLORS[hash % SUBJECT_COLORS.length];
};

export const formatTime = (isoDate: string) => format(parseISO(isoDate), 'HH:mm');

export const getClassDisplayStatus = (
  item: StudentScheduleClass,
  now: Date = new Date()
): ClassDisplayStatus => {
  if (item.status === 'CANCELLED') return 'cancelled';

  const start = parseISO(item.startTime);
  const end = parseISO(item.endTime);

  if (now >= end) return 'completed';
  if (now >= start) return 'ongoing';
  return 'upcoming';
};

/** Total scheduled hours for a day, computed from the session start/end times. */
export const getDayDurationHours = (day: StudentScheduleDay) => {
  const minutes = day.classes.reduce(
    (sum, item) => sum + differenceInMinutes(parseISO(item.endTime), parseISO(item.startTime)),
    0
  );
  return Math.round((minutes / 60) * 10) / 10;
};
