const apiUrl = process.env.VITE_API_URL?.replace(/\/+$/, '');
const apiToken = process.env.API_TOKEN;

if (!apiUrl) {
  throw new Error('VITE_API_URL is required in .env');
}

if (!apiToken) {
  throw new Error('API_TOKEN is required in .env');
}

const authorization = apiToken.startsWith('Bearer ') ? apiToken : `Bearer ${apiToken}`;

const groupDefinitions = [
  {
    active: true,
    capacity: 24,
    courseTitle: 'Python Programming Fundamentals',
    name: 'Python Foundations 2026-A',
    scheduleDays: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
    scheduleType: 'EXACT_DAYS',
    status: 'FORMING'
  },
  {
    active: true,
    capacity: 20,
    courseTitle: 'JavaScript: From Basics to Modern ES6+',
    name: 'Modern JavaScript 2026-A',
    scheduleDays: [],
    scheduleType: 'ODD_DAYS',
    status: 'FORMING'
  },
  {
    active: true,
    capacity: 18,
    courseTitle: 'React 19 Application Development',
    name: 'React Developers 2026-A',
    scheduleDays: [],
    scheduleType: 'EVEN_DAYS',
    status: 'FORMING'
  }
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

const getCourses = async () => {
  const response = await request('courses?page=1&size=100');
  return getResults(response);
};

const getTeachers = async () => {
  const response = await request('teacher?page=1&size=100');
  return getResults(response).filter(({ teacherId, user }) => teacherId && user?.status === 'ACTIVE');
};

const groupExists = async (name) => {
  const query = new URLSearchParams({ search: name, page: '1', size: '100' });
  const response = await request(`groups?${query}`);

  return getResults(response).some((group) => group.name === name);
};

const main = async () => {
  const [courses, teachers] = await Promise.all([getCourses(), getTeachers()]);
  const coursesByTitle = new Map(courses.map((course) => [course.title, course]));

  const missingCourses = groupDefinitions
    .map(({ courseTitle }) => courseTitle)
    .filter((courseTitle) => !coursesByTitle.has(courseTitle));

  if (missingCourses.length > 0) {
    throw new Error(`Required seeded courses are missing: ${missingCourses.join(', ')}`);
  }

  if (teachers.length < groupDefinitions.length) {
    throw new Error(
      `At least ${groupDefinitions.length} active teachers are required; found ${teachers.length}`
    );
  }

  let created = 0;
  let skipped = 0;

  for (const [index, definition] of groupDefinitions.entries()) {
    if (await groupExists(definition.name)) {
      skipped += 1;
      process.stdout.write(`Skipped: ${definition.name}\n`);
      continue;
    }

    const course = coursesByTitle.get(definition.courseTitle);
    const teacher = teachers[index];

    await request('groups', {
      method: 'POST',
      body: JSON.stringify({
        active: definition.active,
        capacity: definition.capacity,
        courseId: course.id,
        name: definition.name,
        scheduleDays: definition.scheduleDays,
        scheduleType: definition.scheduleType,
        status: definition.status,
        teacherId: teacher.teacherId
      })
    });

    created += 1;
    process.stdout.write(
      `Created: ${definition.name} / ${definition.courseTitle} / ${teacher.user.firstName} ${teacher.user.lastName}\n`
    );
  }

  process.stdout.write(`Group seed completed. Created: ${created}, skipped: ${skipped}.\n`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
