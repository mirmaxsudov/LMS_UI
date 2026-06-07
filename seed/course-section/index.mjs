const apiUrl = process.env.VITE_API_URL?.replace(/\/+$/, '');
const apiToken = process.env.API_TOKEN;

if (!apiUrl) {
  throw new Error('VITE_API_URL is required in .env');
}

if (!apiToken) {
  throw new Error('API_TOKEN is required in .env');
}

const authorization = apiToken.startsWith('Bearer ') ? apiToken : `Bearer ${apiToken}`;

const sectionTitlesByCourse = {
  'Python Programming Fundamentals': [
    'Python Setup, Syntax, and Variables',
    'Control Flow and Functions',
    'Collections and Data Processing',
    'Files, Errors, and Modules',
    'Object-Oriented Python Project'
  ],
  'JavaScript: From Basics to Modern ES6+': [
    'JavaScript Syntax and Core Types',
    'Functions, Scope, and Closures',
    'Arrays, Objects, and Modern ES6+',
    'Asynchronous JavaScript and APIs',
    'Modules, Tooling, and Final Project'
  ],
  'HTML and CSS for Responsive Web Design': [
    'Semantic HTML and Page Structure',
    'CSS Foundations and the Box Model',
    'Flexbox and Grid Layouts',
    'Responsive Design and Accessibility',
    'Building a Production Landing Page'
  ],
  'Git and GitHub for Developers': [
    'Repositories, Commits, and History',
    'Branches, Merging, and Rebasing',
    'Remote Workflows with GitHub',
    'Conflict Resolution and Recovery',
    'Pull Requests and Team Collaboration'
  ],
  'SQL and Relational Database Essentials': [
    'Relational Modeling and SQL Basics',
    'Filtering, Sorting, and Aggregation',
    'Joins and Subqueries',
    'Indexes, Transactions, and Constraints',
    'Designing a Production Database'
  ],
  'TypeScript for JavaScript Developers': [
    'TypeScript Setup and Type Inference',
    'Objects, Interfaces, and Unions',
    'Generics and Utility Types',
    'Type Narrowing and Error Handling',
    'Strictly Typed Application Project'
  ],
  'React 19 Application Development': [
    'Components, JSX, and Props',
    'State, Events, and React Hooks',
    'Forms, Validation, and Routing',
    'Server Data and Error Handling',
    'Production React Application'
  ],
  'Node.js and Express REST APIs': [
    'Node.js Runtime and Project Structure',
    'Express Routing and Middleware',
    'Database Integration and Validation',
    'Authentication and Authorization',
    'Testing and Deploying a REST API'
  ],
  'Java Programming and Object-Oriented Design': [
    'Java Syntax and Core Types',
    'Classes, Objects, and Encapsulation',
    'Interfaces, Inheritance, and Polymorphism',
    'Collections, Streams, and Exceptions',
    'Object-Oriented Application Project'
  ],
  'Spring Boot Backend Development': [
    'Spring Boot Setup and Configuration',
    'REST Controllers and Validation',
    'Persistence with Spring Data JPA',
    'Spring Security and Authentication',
    'Testing and Production Deployment'
  ],
  'C# and .NET Web API Development': [
    'C# Language and .NET Foundations',
    'ASP.NET Core Web APIs',
    'Entity Framework Core and Databases',
    'Authentication and Dependency Injection',
    'Testing and Deploying .NET Services'
  ],
  'Go Programming for Backend Engineers': [
    'Go Syntax, Packages, and Tooling',
    'Structs, Interfaces, and Errors',
    'Concurrency with Goroutines and Channels',
    'Building HTTP Services',
    'Testing and Production Go Project'
  ],
  'PostgreSQL Performance and Administration': [
    'PostgreSQL Architecture and Configuration',
    'Indexing and Query Planning',
    'Transactions, Locks, and Concurrency',
    'Backup, Recovery, and Replication',
    'Monitoring and Performance Tuning'
  ],
  'MongoDB Data Modeling and Development': [
    'Documents, Collections, and CRUD',
    'Schema Design and Relationships',
    'Indexes and Query Performance',
    'Aggregation Pipelines and Transactions',
    'Production MongoDB Application'
  ],
  'Docker and Container Fundamentals': [
    'Containers, Images, and Registries',
    'Writing Effective Dockerfiles',
    'Volumes, Networks, and Configuration',
    'Multi-Container Apps with Compose',
    'Security and Production Builds'
  ],
  'Kubernetes for Application Developers': [
    'Kubernetes Architecture and Pods',
    'Deployments, Services, and Networking',
    'Configuration, Secrets, and Storage',
    'Health Checks, Scaling, and Updates',
    'Packaging and Deployment with Helm'
  ],
  'AWS Cloud Practitioner Foundations': [
    'Cloud Concepts and AWS Global Infrastructure',
    'Compute, Storage, and Database Services',
    'Networking and Content Delivery',
    'Security, Identity, and Compliance',
    'Billing, Support, and Architecture Review'
  ],
  'Linux Command Line and System Administration': [
    'Shell Navigation and File Management',
    'Users, Groups, and Permissions',
    'Processes, Services, and Packages',
    'Networking, Logs, and Troubleshooting',
    'Server Administration Project'
  ],
  'Data Structures and Algorithms': [
    'Complexity Analysis and Arrays',
    'Linked Lists, Stacks, and Queues',
    'Trees, Heaps, and Hash Tables',
    'Graphs, Sorting, and Searching',
    'Recursion and Dynamic Programming'
  ],
  'System Design for Scalable Applications': [
    'Requirements and Capacity Estimation',
    'Load Balancing, Caching, and CDNs',
    'Databases, Replication, and Partitioning',
    'Queues, Consistency, and Reliability',
    'End-to-End System Design Case Studies'
  ],
  'Microservices Architecture in Practice': [
    'Service Boundaries and Domain Modeling',
    'Synchronous and Asynchronous Communication',
    'Distributed Data and Transactions',
    'Resilience, Security, and Observability',
    'Deployment and Migration Strategies'
  ],
  'Software Testing and Test Automation': [
    'Testing Strategy and Test Design',
    'Unit Testing and Test Doubles',
    'Integration and API Testing',
    'End-to-End Test Automation',
    'Coverage, CI, and Test Maintenance'
  ],
  'Web Application Security Fundamentals': [
    'Threat Modeling and Security Foundations',
    'Authentication and Session Security',
    'Injection, XSS, and CSRF Prevention',
    'Access Control and Data Protection',
    'Security Testing and Hardening'
  ],
  'DevOps CI/CD with GitHub Actions': [
    'CI/CD Foundations and Workflow Syntax',
    'Automated Quality Checks and Builds',
    'Caching, Artifacts, and Reusable Workflows',
    'Environments, Secrets, and Deployments',
    'Production Release Pipeline'
  ],
  'Machine Learning with Python': [
    'Machine Learning Workflow and Data Preparation',
    'Regression and Classification',
    'Feature Engineering and Model Selection',
    'Evaluation, Tuning, and Pipelines',
    'End-to-End Machine Learning Project'
  ],
  'Data Analysis with pandas and NumPy': [
    'NumPy Arrays and Vectorized Computing',
    'pandas Series and DataFrames',
    'Cleaning and Transforming Data',
    'Aggregation, Visualization, and Insights',
    'Real-World Data Analysis Project'
  ],
  'Deep Learning with PyTorch': [
    'Tensors, Autograd, and Neural Networks',
    'Training Loops and Optimization',
    'Convolutional Neural Networks',
    'Transfer Learning and Regularization',
    'Deployable Deep Learning Project'
  ],
  'UI/UX Design Fundamentals': [
    'User Research and Problem Definition',
    'Information Architecture and User Flows',
    'Wireframing and Interaction Design',
    'Visual Design Systems and Accessibility',
    'Prototyping and Usability Testing'
  ],
  'Agile Project Management with Scrum': [
    'Agile Principles and Scrum Roles',
    'Product Vision and Backlog Management',
    'Estimation and Sprint Planning',
    'Daily Scrum, Reviews, and Retrospectives',
    'Metrics and Continuous Improvement'
  ],
  'Clean Code and Refactoring Techniques': [
    'Meaningful Names and Focused Functions',
    'Code Smells and Refactoring Patterns',
    'SOLID Principles and Dependencies',
    'Testing Legacy Code Safely',
    'Refactoring a Real Application'
  ]
};

const assertValidCurriculum = () => {
  const curricula = Object.entries(sectionTitlesByCourse);
  const hasInvalidCourse = curricula.some(
    ([courseTitle, sectionTitles]) =>
      !courseTitle || sectionTitles.length !== 5 || new Set(sectionTitles).size !== 5
  );

  if (curricula.length !== 30 || hasInvalidCourse) {
    throw new Error('Course-section seed must contain 30 courses with 5 unique sections each');
  }
};

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

const getExistingSections = async (courseId) => {
  const query = new URLSearchParams({ courseId, page: '1', size: '100' });
  const response = await request(`course-sections?${query}`);
  return getResults(response);
};

const main = async () => {
  assertValidCurriculum();

  const courses = await getCourses();
  const seededCourses = courses.filter(({ title }) => sectionTitlesByCourse[title]);

  if (seededCourses.length !== 30) {
    const foundTitles = new Set(seededCourses.map(({ title }) => title));
    const missingTitles = Object.keys(sectionTitlesByCourse).filter((title) => !foundTitles.has(title));

    throw new Error(
      `Expected all 30 seeded courses, found ${seededCourses.length}. Missing: ${missingTitles.join(', ')}`
    );
  }

  let created = 0;
  let skipped = 0;

  for (const course of seededCourses) {
    const existingSections = await getExistingSections(course.id);
    const sectionTitles = sectionTitlesByCourse[course.title];

    for (const [orderIndex, title] of sectionTitles.entries()) {
      const exists = existingSections.some(
        (section) => section.title === title || section.orderIndex === orderIndex
      );

      if (exists) {
        skipped += 1;
        process.stdout.write(`Skipped: ${course.title} / ${title}\n`);
        continue;
      }

      await request('course-sections', {
        method: 'POST',
        body: JSON.stringify({
          courseId: course.id,
          orderIndex,
          title
        })
      });

      created += 1;
      process.stdout.write(`Created: ${course.title} / ${title}\n`);
    }
  }

  process.stdout.write(
    `Course-section seed completed. Courses: ${seededCourses.length}, created: ${created}, skipped: ${skipped}.\n`
  );
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
