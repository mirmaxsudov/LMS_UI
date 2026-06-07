const apiUrl = process.env.VITE_API_URL?.replace(/\/+$/, '');
const apiToken = process.env.API_TOKEN;

if (!apiUrl) {
  throw new Error('VITE_API_URL is required in .env');
}

if (!apiToken) {
  throw new Error('API_TOKEN is required in .env');
}

const authorization = apiToken.startsWith('Bearer ') ? apiToken : `Bearer ${apiToken}`;

const courses = [
  {
    title: 'Python Programming Fundamentals',
    description:
      'Learn Python syntax, data structures, functions, modules, error handling, and object-oriented programming through practical exercises.',
    level: 'BEGINNER',
    durationInMinutes: 1200
  },
  {
    title: 'JavaScript: From Basics to Modern ES6+',
    description:
      'Build a strong JavaScript foundation covering variables, functions, arrays, objects, asynchronous code, modules, and modern language features.',
    level: 'BEGINNER',
    durationInMinutes: 1080
  },
  {
    title: 'HTML and CSS for Responsive Web Design',
    description:
      'Create accessible, responsive websites with semantic HTML, modern CSS, Flexbox, Grid, animations, and mobile-first design techniques.',
    level: 'BEGINNER',
    durationInMinutes: 900
  },
  {
    title: 'Git and GitHub for Developers',
    description:
      'Master everyday Git workflows including branching, merging, rebasing, resolving conflicts, pull requests, and collaborative repository management.',
    level: 'BEGINNER',
    durationInMinutes: 480
  },
  {
    title: 'SQL and Relational Database Essentials',
    description:
      'Write practical SQL queries and understand relational modeling, joins, aggregation, indexes, transactions, and database normalization.',
    level: 'BEGINNER',
    durationInMinutes: 960
  },
  {
    title: 'TypeScript for JavaScript Developers',
    description:
      'Use TypeScript to build safer applications with type inference, interfaces, generics, narrowing, utility types, and strict compiler settings.',
    level: 'INTERMEDIATE',
    durationInMinutes: 840
  },
  {
    title: 'React 19 Application Development',
    description:
      'Build production-ready React applications using components, hooks, forms, routing, data fetching, error handling, and modern React patterns.',
    level: 'INTERMEDIATE',
    durationInMinutes: 1440
  },
  {
    title: 'Node.js and Express REST APIs',
    description:
      'Design and implement RESTful APIs with Node.js and Express, including validation, authentication, middleware, testing, and error handling.',
    level: 'INTERMEDIATE',
    durationInMinutes: 1320
  },
  {
    title: 'Java Programming and Object-Oriented Design',
    description:
      'Develop Java applications while learning classes, interfaces, collections, exceptions, streams, testing, and core object-oriented principles.',
    level: 'BEGINNER',
    durationInMinutes: 1500
  },
  {
    title: 'Spring Boot Backend Development',
    description:
      'Create maintainable Java backends with Spring Boot, Spring MVC, validation, persistence, security, testing, and production configuration.',
    level: 'INTERMEDIATE',
    durationInMinutes: 1680
  },
  {
    title: 'C# and .NET Web API Development',
    description:
      'Build typed web APIs with C#, ASP.NET Core, Entity Framework Core, dependency injection, authentication, and automated tests.',
    level: 'INTERMEDIATE',
    durationInMinutes: 1560
  },
  {
    title: 'Go Programming for Backend Engineers',
    description:
      'Learn Go fundamentals, interfaces, error handling, concurrency, HTTP services, testing, and project organization for backend systems.',
    level: 'INTERMEDIATE',
    durationInMinutes: 1200
  },
  {
    title: 'PostgreSQL Performance and Administration',
    description:
      'Improve PostgreSQL systems through indexing, query analysis, execution plans, transactions, locking, backups, and operational best practices.',
    level: 'ADVANCED',
    durationInMinutes: 1080
  },
  {
    title: 'MongoDB Data Modeling and Development',
    description:
      'Model document data, create indexes, build aggregation pipelines, manage transactions, and integrate MongoDB into modern applications.',
    level: 'INTERMEDIATE',
    durationInMinutes: 900
  },
  {
    title: 'Docker and Container Fundamentals',
    description:
      'Containerize applications with Dockerfiles, images, volumes, networks, multi-stage builds, Compose, and secure container practices.',
    level: 'BEGINNER',
    durationInMinutes: 720
  },
  {
    title: 'Kubernetes for Application Developers',
    description:
      'Deploy and operate containerized applications using Pods, Deployments, Services, ConfigMaps, Secrets, health checks, and Helm.',
    level: 'INTERMEDIATE',
    durationInMinutes: 1260
  },
  {
    title: 'AWS Cloud Practitioner Foundations',
    description:
      'Understand core AWS services, cloud architecture, identity and access management, pricing, reliability, and the shared responsibility model.',
    level: 'BEGINNER',
    durationInMinutes: 780
  },
  {
    title: 'Linux Command Line and System Administration',
    description:
      'Work confidently with Linux files, permissions, processes, networking, services, shell tools, package managers, and basic server operations.',
    level: 'BEGINNER',
    durationInMinutes: 960
  },
  {
    title: 'Data Structures and Algorithms',
    description:
      'Analyze and implement arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, recursion, and dynamic programming.',
    level: 'INTERMEDIATE',
    durationInMinutes: 1800
  },
  {
    title: 'System Design for Scalable Applications',
    description:
      'Design scalable systems using load balancing, caching, replication, partitioning, queues, observability, and resilient architecture patterns.',
    level: 'ADVANCED',
    durationInMinutes: 1440
  },
  {
    title: 'Microservices Architecture in Practice',
    description:
      'Design service boundaries and implement communication, discovery, resilience, distributed data, observability, and deployment strategies.',
    level: 'ADVANCED',
    durationInMinutes: 1320
  },
  {
    title: 'Software Testing and Test Automation',
    description:
      'Create effective unit, integration, API, and end-to-end tests while learning test design, mocking, coverage, and continuous testing.',
    level: 'INTERMEDIATE',
    durationInMinutes: 960
  },
  {
    title: 'Web Application Security Fundamentals',
    description:
      'Protect web applications from common threats including injection, XSS, CSRF, broken authentication, insecure access control, and data exposure.',
    level: 'INTERMEDIATE',
    durationInMinutes: 1080
  },
  {
    title: 'DevOps CI/CD with GitHub Actions',
    description:
      'Automate quality checks, builds, releases, and deployments with reusable GitHub Actions workflows, environments, caching, and secrets.',
    level: 'INTERMEDIATE',
    durationInMinutes: 840
  },
  {
    title: 'Machine Learning with Python',
    description:
      'Prepare data and train practical machine learning models with NumPy, pandas, scikit-learn, evaluation metrics, and feature engineering.',
    level: 'INTERMEDIATE',
    durationInMinutes: 1680
  },
  {
    title: 'Data Analysis with pandas and NumPy',
    description:
      'Clean, transform, aggregate, and analyze real datasets using Python, NumPy, pandas, visualization, and reproducible notebooks.',
    level: 'BEGINNER',
    durationInMinutes: 1080
  },
  {
    title: 'Deep Learning with PyTorch',
    description:
      'Build and train neural networks with PyTorch, covering tensors, optimization, convolutional models, transfer learning, and model evaluation.',
    level: 'ADVANCED',
    durationInMinutes: 1800
  },
  {
    title: 'UI/UX Design Fundamentals',
    description:
      'Apply user research, information architecture, wireframing, visual hierarchy, accessibility, prototyping, and usability testing techniques.',
    level: 'BEGINNER',
    durationInMinutes: 900
  },
  {
    title: 'Agile Project Management with Scrum',
    description:
      'Plan and deliver products with Scrum roles, events, artifacts, backlog refinement, estimation, retrospectives, and stakeholder collaboration.',
    level: 'BEGINNER',
    durationInMinutes: 600
  },
  {
    title: 'Clean Code and Refactoring Techniques',
    description:
      'Improve existing code through meaningful naming, focused functions, dependency management, design principles, code smells, and safe refactoring.',
    level: 'INTERMEDIATE',
    durationInMinutes: 840
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

const courseExists = async (title) => {
  const query = new URLSearchParams({ search: title, page: '0', size: '100' });
  const response = await request(`courses?${query}`);
  const results = response?.results ?? response?.data?.results ?? response?.result?.results ?? [];

  return results.some((course) => course.title === title);
};

const main = async () => {
  let created = 0;
  let skipped = 0;

  for (const [index, course] of courses.entries()) {
    if (await courseExists(course.title)) {
      skipped += 1;
      process.stdout.write(`[${index + 1}/${courses.length}] Skipped: ${course.title}\n`);
      continue;
    }

    await request('courses', {
      method: 'POST',
      body: JSON.stringify(course)
    });

    created += 1;
    process.stdout.write(`[${index + 1}/${courses.length}] Created: ${course.title}\n`);
  }

  process.stdout.write(`Course seed completed. Created: ${created}, skipped: ${skipped}.\n`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
