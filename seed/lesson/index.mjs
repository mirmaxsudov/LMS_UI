const apiUrl = process.env.VITE_API_URL?.replace(/\/+$/, '');
const apiToken = process.env.API_TOKEN;

if (!apiUrl) {
  throw new Error('VITE_API_URL is required in .env');
}

if (!apiToken) {
  throw new Error('API_TOKEN is required in .env');
}

const authorization = apiToken.startsWith('Bearer ') ? apiToken : `Bearer ${apiToken}`;

const targets = [
  {
    groupId: '4fb208ad-d597-49ce-ab21-1f097f80b77e',
    courseId: 'f517b691-c3ae-46e1-af64-2d24d5cb8ae8'
  },
  {
    groupId: 'c4e85fb3-5e1a-4d5f-ae37-55ab2607fb0c',
    courseId: '1438c60c-b0c8-4da2-b2e9-497dc97cdbcb'
  },
  {
    groupId: '0584c461-3d32-472b-a4fe-77e77607b9f3',
    courseId: '917a6463-2457-40c4-88f7-174b45891fb0'
  }
];

const lessonTopicsBySection = {
  'Python Setup, Syntax, and Variables': [
    'Installing Python and Configuring the Development Environment',
    'Running Python Scripts and Using the Interactive Shell',
    'Python Syntax, Indentation, and Code Structure',
    'Variables, Assignment, and Naming Conventions',
    'Numbers and Arithmetic Operations',
    'Strings, Formatting, and Common String Methods',
    'Booleans and Comparison Operators',
    'Type Conversion and User Input',
    'Writing Readable Python with PEP 8',
    'Building a Command-Line Profile Generator'
  ],
  'Control Flow and Functions': [
    'Conditional Logic with if, elif, and else',
    'Combining Conditions with Logical Operators',
    'Repeating Work with for Loops',
    'Controlling Iteration with while Loops',
    'Using range, enumerate, and zip',
    'Defining and Calling Functions',
    'Parameters, Arguments, and Return Values',
    'Scope, Defaults, and Keyword Arguments',
    'Lambda Functions and Functional Patterns',
    'Building a Menu-Driven Calculator'
  ],
  'Collections and Data Processing': [
    'Creating and Updating Python Lists',
    'Tuples and Immutable Data',
    'Sets and Unique Value Operations',
    'Dictionaries and Key-Value Modeling',
    'Nested Collections and Structured Records',
    'List, Set, and Dictionary Comprehensions',
    'Sorting and Filtering Data',
    'Useful Built-in Collection Functions',
    'Processing CSV-Style Business Data',
    'Building a Student Grade Analyzer'
  ],
  'Files, Errors, and Modules': [
    'Reading Text Files Safely',
    'Writing and Appending File Content',
    'Working with Paths using pathlib',
    'Handling JSON Data',
    'Understanding Exceptions and Tracebacks',
    'Using try, except, else, and finally',
    'Creating Custom Exceptions',
    'Importing Standard Library Modules',
    'Organizing Code into Packages',
    'Building a Persistent Notes Application'
  ],
  'Object-Oriented Python Project': [
    'Classes, Objects, and Instance State',
    'Constructors and Instance Methods',
    'Encapsulation with Properties',
    'Inheritance and Method Overriding',
    'Composition over Inheritance',
    'Class Methods and Static Methods',
    'Data Classes and Value Objects',
    'Abstract Base Classes and Interfaces',
    'Testing Object-Oriented Python Code',
    'Building a Library Management System'
  ],
  'JavaScript Syntax and Core Types': [
    'Setting Up a Modern JavaScript Environment',
    'Variables with const and let',
    'Numbers, Strings, and Template Literals',
    'Booleans, Comparisons, and Truthy Values',
    'null, undefined, and Safe Defaults',
    'Operators and Expression Evaluation',
    'Conditional Statements and switch',
    'Loops and Iteration Fundamentals',
    'Debugging JavaScript in the Browser',
    'Building an Interactive Unit Converter'
  ],
  'Functions, Scope, and Closures': [
    'Function Declarations and Expressions',
    'Arrow Functions and Concise Syntax',
    'Parameters, Defaults, and Rest Arguments',
    'Return Values and Pure Functions',
    'Global, Function, and Block Scope',
    'Lexical Scope and the Scope Chain',
    'Closures and Private State',
    'Callbacks and Higher-Order Functions',
    'The this Keyword and Function Context',
    'Building a Reusable Validation Library'
  ],
  'Arrays, Objects, and Modern ES6+': [
    'Creating and Updating Arrays',
    'Mapping, Filtering, and Reducing Data',
    'Finding, Sorting, and Grouping Records',
    'Object Properties and Methods',
    'Destructuring Arrays and Objects',
    'Spread and Rest Syntax',
    'Optional Chaining and Nullish Coalescing',
    'Maps, Sets, and Unique Collections',
    'Immutable Data Update Patterns',
    'Building a Product Inventory Manager'
  ],
  'Asynchronous JavaScript and APIs': [
    'The Event Loop and Asynchronous Execution',
    'Creating and Consuming Promises',
    'Writing Async Functions with await',
    'Handling Asynchronous Errors',
    'Making HTTP Requests with fetch',
    'Working with JSON API Responses',
    'Running Requests in Parallel',
    'Cancellation, Timeouts, and AbortController',
    'Loading and Error States in User Interfaces',
    'Building a Weather Dashboard with an API'
  ],
  'Modules, Tooling, and Final Project': [
    'Exporting and Importing ES Modules',
    'Organizing JavaScript by Responsibility',
    'Managing Dependencies with pnpm',
    'Using Vite for Local Development',
    'Linting and Formatting JavaScript',
    'Environment Variables and Configuration',
    'Unit Testing JavaScript Modules',
    'Bundling and Production Optimization',
    'Deploying a Frontend Application',
    'Building a Modular Task Management App'
  ],
  'Components, JSX, and Props': [
    'Creating a React 19 Application',
    'Understanding JSX and React Elements',
    'Building Reusable Function Components',
    'Passing Data with Props',
    'Rendering Lists with Stable Keys',
    'Conditional Rendering Patterns',
    'Component Composition and children',
    'Handling Events in React',
    'Designing a Maintainable Component Tree',
    'Building a Reusable Product Catalog'
  ],
  'State, Events, and React Hooks': [
    'Managing Local State with useState',
    'Updating State from Previous Values',
    'Lifting State to a Common Parent',
    'Controlled Inputs and Form State',
    'Synchronizing Effects with useEffect',
    'Cleaning Up Subscriptions and Timers',
    'Persisting Values with useRef',
    'Sharing Logic through Custom Hooks',
    'Avoiding Derived State and Effect Misuse',
    'Building an Interactive Shopping Cart'
  ],
  'Forms, Validation, and Routing': [
    'Designing Accessible React Forms',
    'Managing Controlled Form Fields',
    'Client-Side Validation Strategies',
    'Displaying Field and Submission Errors',
    'Configuring Application Routes',
    'Nested Routes and Shared Layouts',
    'Route Parameters and Search Parameters',
    'Navigation and Protected Routes',
    'Handling Unsaved Form Changes',
    'Building a Multi-Page Registration Flow'
  ],
  'Server Data and Error Handling': [
    'Fetching Server Data in React',
    'Loading, Empty, and Error States',
    'Caching Data with TanStack Query',
    'Mutations and Cache Invalidation',
    'Pagination and Infinite Queries',
    'Optimistic User Interface Updates',
    'Error Boundaries and Recovery',
    'Authentication State and API Clients',
    'Preventing Request Race Conditions',
    'Building a Resilient Course Dashboard'
  ],
  'Production React Application': [
    'Planning Features and Application Boundaries',
    'Creating a Scalable Folder Structure',
    'Reusable UI and Design System Patterns',
    'Performance with Memoization and Code Splitting',
    'Accessibility Testing and Keyboard Navigation',
    'Testing Components and User Workflows',
    'Environment Configuration and Security',
    'Production Builds and Bundle Analysis',
    'Deployment, Monitoring, and Error Reporting',
    'Completing a Production Learning Platform'
  ]
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

const getData = (response) => response?.data ?? response?.result ?? response;

const getResults = (response) =>
  response?.results ?? response?.data?.results ?? response?.result?.results ?? [];

const validateGroupCoursePair = async ({ groupId, courseId }) => {
  const response = await request(`groups/${groupId}`);
  const group = getData(response);

  if (group?.courseId !== courseId) {
    throw new Error(
      `Group ${groupId} belongs to course ${group?.courseId ?? 'unknown'}, expected ${courseId}`
    );
  }
};

const getCourseSections = async (courseId) => {
  const query = new URLSearchParams({ courseId, page: '1', size: '100' });
  const response = await request(`course-sections?${query}`);

  return getResults(response).sort((left, right) => left.orderIndex - right.orderIndex);
};

const getExistingLessons = async (sectionId) => {
  const query = new URLSearchParams({ sectionId, page: '1', size: '100' });
  const response = await request(`lessons?${query}`);
  return getResults(response);
};

const buildContent = ({ courseTitle, sectionTitle, lessonTitle }) =>
  `This lesson is part of "${courseTitle}" and develops the "${sectionTitle}" topic through clear explanations, practical examples, guided exercises, and an applied task. Students will learn ${lessonTitle.toLowerCase()}, identify common mistakes, and finish with a working solution they can review and extend independently.`;

const main = async () => {
  await Promise.all(targets.map(validateGroupCoursePair));

  let created = 0;
  let skipped = 0;
  let sectionCount = 0;

  for (const target of targets) {
    const sections = await getCourseSections(target.courseId);

    if (sections.length !== 5) {
      throw new Error(`Course ${target.courseId} must have exactly 5 sections; found ${sections.length}`);
    }

    for (const section of sections) {
      const lessonTitles = lessonTopicsBySection[section.title];

      if (!lessonTitles || lessonTitles.length !== 10 || new Set(lessonTitles).size !== 10) {
        throw new Error(`No valid 10-lesson catalog found for section "${section.title}"`);
      }

      sectionCount += 1;
      const existingLessons = await getExistingLessons(section.id);

      for (const [lessonIndex, title] of lessonTitles.entries()) {
        const exists = existingLessons.some((lesson) => lesson.title === title);

        if (exists) {
          skipped += 1;
          process.stdout.write(`Skipped: ${section.courseTitle} / ${section.title} / ${title}\n`);
          continue;
        }

        await request('lessons', {
          method: 'POST',
          body: JSON.stringify({
            content: buildContent({
              courseTitle: section.courseTitle,
              lessonTitle: title,
              sectionTitle: section.title
            }),
            durationInMinutes: 45 + (lessonIndex % 4) * 15,
            sectionId: section.id,
            title
          })
        });

        created += 1;
        process.stdout.write(`Created: ${section.courseTitle} / ${section.title} / ${title}\n`);
      }
    }
  }

  process.stdout.write(
    `Lesson seed completed. Courses: ${targets.length}, sections: ${sectionCount}, created: ${created}, skipped: ${skipped}.\n`
  );
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
