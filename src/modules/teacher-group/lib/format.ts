export const getInitials = (firstName: string, lastName: string) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

export const getFullName = (firstName: string, lastName: string) => `${firstName} ${lastName}`.trim();

export const formatDate = (value: string | null) =>
  value
    ? new Date(value).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : '—';

export const formatDateTime = (value: string | null) =>
  value
    ? new Date(value).toLocaleString('en-US', {
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        month: 'short'
      })
    : '—';

// Trims seconds from a "HH:mm:ss" time string → "HH:mm".
export const formatTime = (value?: string) => (value ? value.slice(0, 5) : '');

export const getPrimarySchedule = (group: TeacherGroup): Schedule | undefined => group.schedules[0];

export const getScheduleTimeRange = (group: TeacherGroup) => {
  const schedule = getPrimarySchedule(group);

  return schedule ? `${formatTime(schedule.startTime)} - ${formatTime(schedule.endTime)}` : '—';
};

export const getRoomName = (group: TeacherGroup) => getPrimarySchedule(group)?.roomName ?? '—';

const chartColors = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)'
];

export const getGroupColor = (id: string) => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return chartColors[hash % chartColors.length];
};
