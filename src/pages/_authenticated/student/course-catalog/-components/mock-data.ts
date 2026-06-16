import type { CatalogCourse } from './types';

export const catalogCategories = [
  'All',
  'Mathematics',
  'Sciences',
  'Languages',
  'Computer Science',
  'Humanities'
];

export const catalogCourses: CatalogCourse[] = [
  {
    id: 'cat-1',
    title: 'Calculus I: Limits & Derivatives',
    category: 'Mathematics',
    description:
      'Build a strong foundation in differential calculus with intuitive explanations and worked examples.',
    level: 'BEGINNER',
    teacher: { name: 'Ms. Tosheva', initials: 'MT' },
    rating: 4.8,
    ratingCount: 312,
    lessons: 24,
    durationWeeks: 10,
    studentsCount: 1280,
    price: 0,
    color: '#2563EB',
    isEnrolled: true,
    isNew: false
  },
  {
    id: 'cat-2',
    title: 'Physics: Mechanics & Motion',
    category: 'Sciences',
    description:
      "Explore Newton's laws, energy and momentum through real-world problems and simulations.",
    level: 'INTERMEDIATE',
    teacher: { name: 'Mr. Yusupov', initials: 'MY' },
    rating: 4.6,
    ratingCount: 198,
    lessons: 30,
    durationWeeks: 12,
    studentsCount: 940,
    price: 0,
    color: '#7C3AED',
    isEnrolled: false,
    isNew: false
  },
  {
    id: 'cat-3',
    title: 'Data Structures & Algorithms',
    category: 'Computer Science',
    description:
      'Master arrays, trees, graphs and the algorithms that power efficient software.',
    level: 'ADVANCED',
    teacher: { name: 'Mr. Aliyev', initials: 'MA' },
    rating: 4.9,
    ratingCount: 540,
    lessons: 42,
    durationWeeks: 16,
    studentsCount: 2150,
    price: 49,
    color: '#16A34A',
    isEnrolled: false,
    isNew: true
  },
  {
    id: 'cat-4',
    title: 'English for Academic Writing',
    category: 'Languages',
    description:
      'Sharpen your essays, reports and presentations with clear structure and persuasive style.',
    level: 'INTERMEDIATE',
    teacher: { name: 'Mr. Karimov', initials: 'MK' },
    rating: 4.7,
    ratingCount: 276,
    lessons: 20,
    durationWeeks: 8,
    studentsCount: 1620,
    price: 0,
    color: '#0891B2',
    isEnrolled: false,
    isNew: false
  },
  {
    id: 'cat-5',
    title: 'Introduction to Biology',
    category: 'Sciences',
    description:
      'From cells to ecosystems — discover how life works with engaging visuals and labs.',
    level: 'BEGINNER',
    teacher: { name: 'Ms. Saidova', initials: 'MS' },
    rating: 4.5,
    ratingCount: 154,
    lessons: 26,
    durationWeeks: 10,
    studentsCount: 870,
    price: 0,
    color: '#DB2777',
    isEnrolled: false,
    isNew: true
  },
  {
    id: 'cat-6',
    title: 'World History: Trade & Empires',
    category: 'Humanities',
    description:
      'Trace the rise of civilizations, the Silk Road and the forces that shaped the modern world.',
    level: 'BEGINNER',
    teacher: { name: 'Mr. Rashidov', initials: 'MR' },
    rating: 4.4,
    ratingCount: 121,
    lessons: 18,
    durationWeeks: 8,
    studentsCount: 610,
    price: 0,
    color: '#D97706',
    isEnrolled: false,
    isNew: false
  },
  {
    id: 'cat-7',
    title: 'Web Development Fundamentals',
    category: 'Computer Science',
    description:
      'Build responsive websites from scratch with HTML, CSS and modern JavaScript.',
    level: 'BEGINNER',
    teacher: { name: 'Mr. Aliyev', initials: 'MA' },
    rating: 4.8,
    ratingCount: 430,
    lessons: 36,
    durationWeeks: 14,
    studentsCount: 1980,
    price: 29,
    color: '#0EA5E9',
    isEnrolled: false,
    isNew: false
  },
  {
    id: 'cat-8',
    title: 'Linear Algebra Essentials',
    category: 'Mathematics',
    description:
      'Vectors, matrices and transformations explained with clarity for science and engineering.',
    level: 'INTERMEDIATE',
    teacher: { name: 'Ms. Tosheva', initials: 'MT' },
    rating: 4.6,
    ratingCount: 203,
    lessons: 28,
    durationWeeks: 11,
    studentsCount: 1040,
    price: 0,
    color: '#4F46E5',
    isEnrolled: true,
    isNew: false
  }
];
