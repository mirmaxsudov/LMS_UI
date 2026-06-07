const apiUrl = process.env.VITE_API_URL?.replace(/\/+$/, '');
const apiToken = process.env.API_TOKEN;

if (!apiUrl) {
  throw new Error('VITE_API_URL is required in .env');
}

if (!apiToken) {
  throw new Error('API_TOKEN is required in .env');
}

const authorization = apiToken.startsWith('Bearer ') ? apiToken : `Bearer ${apiToken}`;

const daysByScheduleType = {
  EVEN_DAYS: ['TUESDAY', 'THURSDAY', 'SATURDAY'],
  ODD_DAYS: ['MONDAY', 'WEDNESDAY', 'FRIDAY']
};

const timeSlots = [
  { startTime: '08:00', endTime: '09:30' },
  { startTime: '10:00', endTime: '11:30' },
  { startTime: '12:00', endTime: '13:30' },
  { startTime: '14:00', endTime: '15:30' },
  { startTime: '16:00', endTime: '17:30' },
  { startTime: '18:00', endTime: '19:30' }
];

const request = async (path, options = {}) => {
  const response = await fetch(`${apiUrl}/${path.replace(/^\/+/, '')}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      Authorization: authorization,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  const responseText = await response.text();
  let responseBody = null;

  if (responseText) {
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = responseText;
    }
  }

  if (!response.ok) {
    throw new Error(
      `${options.method ?? 'GET'} ${path} failed (${response.status}): ${JSON.stringify(responseBody)}`
    );
  }

  return responseBody;
};

const getResults = (response) =>
  response?.results ?? response?.data?.results ?? response?.result?.results ?? [];

const getGroups = async () => {
  const response = await request('groups?page=1&size=100');
  return getResults(response).filter(({ active, status }) => active && status !== 'CANCELLED');
};

const getExistingSchedules = async (groupId) => {
  const query = new URLSearchParams({ groupId, page: '1', size: '100' });
  const response = await request(`schedules?${query}`);
  return getResults(response);
};

const getScheduleDays = (group) => {
  if (group.scheduleType === 'EXACT_DAYS') {
    return group.scheduleDays;
  }

  return daysByScheduleType[group.scheduleType] ?? [];
};

const main = async () => {
  const groups = await getGroups();

  if (groups.length === 0) {
    throw new Error('No active groups were found');
  }

  let created = 0;
  let skipped = 0;

  for (const [groupIndex, group] of groups.entries()) {
    const days = getScheduleDays(group);

    if (days.length === 0) {
      throw new Error(`Group "${group.name}" has no valid schedule days`);
    }

    const existingSchedules = await getExistingSchedules(group.id);
    const { startTime, endTime } = timeSlots[groupIndex % timeSlots.length];

    for (const dayOfWeek of days) {
      const exists = existingSchedules.some((schedule) => schedule.dayOfWeek === dayOfWeek);

      if (exists) {
        skipped += 1;
        process.stdout.write(`Skipped: ${group.name} / ${dayOfWeek}\n`);
        continue;
      }

      await request('schedules', {
        method: 'POST',
        body: JSON.stringify({
          dayOfWeek,
          endTime,
          groupId: group.id,
          startTime
        })
      });

      created += 1;
      process.stdout.write(
        `Created: ${group.name} / ${dayOfWeek} / ${startTime}-${endTime}\n`
      );
    }
  }

  process.stdout.write(
    `Schedule seed completed. Groups: ${groups.length}, created: ${created}, skipped: ${skipped}.\n`
  );
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
