/**
 * Temporary mock data. Swap for a real API request (see `@/shared/api`) once the
 * announcements endpoints are available.
 */
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'Spring term final exams schedule released',
    content:
      'The final examination timetable for the spring term is now available. Please review your subjects and rooms carefully. Make-up requests must be submitted to the academic office before June 25th.',
    priority: 'urgent',
    audiences: ['students', 'teachers', 'parents'],
    status: 'published',
    pinned: true,
    author: {
      id: 'u1',
      name: 'Dilnoza Karimova',
      role: 'Academic Director',
      avatarUrl: null
    },
    publishedAt: '2026-06-14T09:00:00.000Z',
    scheduledAt: null,
    viewsCount: 1248
  },
  {
    id: 'a2',
    title: 'New attendance policy effective next month',
    content:
      'Starting July 1st, attendance will be tracked per session through the new portal. Teachers are kindly asked to complete the short training module before the rollout.',
    priority: 'high',
    audiences: ['teachers', 'admins'],
    status: 'published',
    pinned: true,
    author: {
      id: 'u2',
      name: 'Bekzod Yusupov',
      role: 'Operations Manager',
      avatarUrl: null
    },
    publishedAt: '2026-06-12T14:30:00.000Z',
    scheduledAt: null,
    viewsCount: 342
  },
  {
    id: 'a3',
    title: 'Summer enrollment is now open',
    content:
      'Enrollment for summer study groups is open until the end of the month. Spots are limited for the most popular courses, so encourage your students to register early.',
    priority: 'normal',
    audiences: ['all'],
    status: 'published',
    pinned: false,
    author: {
      id: 'u3',
      name: 'Madina Tolipova',
      role: 'Registrar',
      avatarUrl: null
    },
    publishedAt: '2026-06-10T08:15:00.000Z',
    scheduledAt: null,
    viewsCount: 873
  },
  {
    id: 'a4',
    title: 'Parent–teacher meetings scheduled for next week',
    content:
      'Individual parent–teacher conferences will take place from June 22nd to June 24th. Booking links will be shared with parents two days in advance.',
    priority: 'normal',
    audiences: ['teachers', 'parents'],
    status: 'scheduled',
    pinned: false,
    author: {
      id: 'u1',
      name: 'Dilnoza Karimova',
      role: 'Academic Director',
      avatarUrl: null
    },
    publishedAt: '2026-06-09T11:00:00.000Z',
    scheduledAt: '2026-06-20T07:00:00.000Z',
    viewsCount: 0
  },
  {
    id: 'a5',
    title: 'Library system maintenance this weekend',
    content:
      'The digital library will be temporarily unavailable on Saturday between 10 PM and 2 AM for scheduled maintenance. We apologise for any inconvenience.',
    priority: 'low',
    audiences: ['students', 'teachers'],
    status: 'published',
    pinned: false,
    author: {
      id: 'u4',
      name: 'Sardor Akmalov',
      role: 'IT Administrator',
      avatarUrl: null
    },
    publishedAt: '2026-06-07T16:45:00.000Z',
    scheduledAt: null,
    viewsCount: 156
  },
  {
    id: 'a6',
    title: 'Draft: End-of-year celebration plan',
    content:
      'Initial outline for the end-of-year ceremony. Still gathering input from department heads before sharing publicly with families.',
    priority: 'low',
    audiences: ['admins'],
    status: 'draft',
    pinned: false,
    author: {
      id: 'u2',
      name: 'Bekzod Yusupov',
      role: 'Operations Manager',
      avatarUrl: null
    },
    publishedAt: '2026-06-05T13:20:00.000Z',
    scheduledAt: null,
    viewsCount: 0
  }
];
