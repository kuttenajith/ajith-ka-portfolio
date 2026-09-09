export const profile = {
  name: "Ajith Amarnath",
  role: "Senior Frontend Engineer",
  location: "Madurai, Tamil Nadu, India",
  email: "ajithkutten1998@gmail.com",
  phone: "+91 79049 49080",
  phoneHref: "tel:+917904949080",
  linkedin: "https://www.linkedin.com/in/ajith-amarnath-18b71713b/",
  github: "https://github.com/kuttenajith",
  resume: `${import.meta.env.BASE_URL}Ajith-KA-Senior-Frontend.pdf`,
  photo: `${import.meta.env.BASE_URL}ajith-ka.jpg`,
  currentRole: "SDE II — Frontend, ARRise powering Pragmatic Play",
  titles: [
    "Senior Frontend Engineer",
    "Frontend architect",
    "Team lead",
    "React specialist",
  ],
  headline:
    "Senior Frontend Engineer specializing in React, Next.js, and TypeScript, with experience in frontend architecture, performance optimization, and team leadership.",
  summary:
    "Frontend engineer with professional experience since 2018. Responsible for architecture, reusable component systems, and delivery from requirements through production. Has led a team of six engineers. Core strengths include React, Next.js, TypeScript, server-side rendering, micro-frontends, and performance optimization using Lighthouse and Core Web Vitals. Cloud and DevOps experience across GCP, AWS, and Azure.",
};

export const impact = [
  {
    value: "93.8%",
    label: "Lighthouse performance score",
    detail: "Achieved through bundle optimization, lazy loading, and Core Web Vitals improvements.",
  },
  {
    value: "94%",
    label: "Conversion improvement",
    detail: "Result of a UX-focused redesign combined with faster page performance.",
  },
  {
    value: "6",
    label: "Engineers led",
    detail: "Mentoring, code reviews, sprint planning, and architecture standards for the frontend team.",
  },
];

export const experience = [
  {
    role: "SDE II — Frontend",
    company: "ARRise powering Pragmatic Play",
    dates: "Feb 2025 — Present",
    points: [
      "Lead frontend architecture on React and TypeScript for high-traffic, real-time products.",
      "Build reusable component libraries used across enterprise applications.",
      "Drive performance, maintainability, and code quality standards.",
      "Collaborate with product, QA, design, and backend teams. Support production releases and troubleshooting.",
    ],
  },
  {
    role: "Module Lead",
    company: "Celsior Technologies",
    dates: "Aug 2022 — Feb 2025",
    points: [
      "Led and mentored six frontend engineers through delivery of enterprise modules.",
      "Set technical roadmaps, architecture standards, and review culture.",
      "Translated stakeholder requirements into structured technical plans and delivery estimates.",
      "Ran sprint planning, estimation, and delivery tracking.",
    ],
  },
  {
    role: "Application Developer",
    company: "Tanisha Systems Inc",
    dates: "Apr 2021 — Aug 2022",
    points: [
      "Built scalable enterprise apps on modern JavaScript frameworks.",
      "Integrated REST APIs and tightened frontend–backend contracts.",
      "Improved responsiveness, maintainability, and day-to-day UX.",
      "Took part in production support and release work.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Zencode Group",
    dates: "Dec 2018 — Apr 2021",
    points: [
      "Developed responsive web applications aligned with accessibility and UX standards.",
      "Contributed to a 94% improvement in conversion metrics through UI modernization.",
      "Implemented performance optimization to improve page load times.",
    ],
  },
];

export const practice = {
  layers: [
    {
      title: "Interface",
      items: [
        { skill: "React.js", level: 93 },
        { skill: "Next.js", level: 88 },
        { skill: "TypeScript", level: 90 },
        { skill: "JavaScript (ES6+)", level: 90 },
        { skill: "HTML5 / CSS3", level: 88 },
      ],
    },
    {
      title: "Architecture",
      items: [
        { skill: "SSR", level: 85 },
        { skill: "Micro-frontends", level: 82 },
        { skill: "Design systems", level: 86 },
        { skill: "State management", level: 84 },
        { skill: "REST + WebSockets", level: 83 },
      ],
    },
    {
      title: "Delivery",
      items: [
        { skill: "Performance (Lighthouse / CWV)", level: 90 },
        { skill: "CI/CD / Git", level: 80 },
        { skill: "GCP / AWS / Azure", level: 76 },
        { skill: "Docker / Agile", level: 74 },
      ],
    },
  ],
  focus: [
    "Technical ownership from requirement analysis through production deployment.",
    "Performance optimization using Lighthouse, lazy loading, and code splitting.",
    "Reusable frontend systems and component libraries for enterprise applications.",
    "Cross-functional delivery with product, UX, QA, backend, and DevOps teams.",
  ],
};

export const projects = [
  {
    name: "MFE Shell",
    tag: "Micro-frontends",
    summary:
      "Host application that loads independent remote apps over iframe + postMessage, with a shared theme contract.",
    repo: "https://github.com/kuttenajith/mfe-shell",
    live: "https://kuttenajith.github.io/mfe-shell/",
  },
  {
    name: "Live Ops Board",
    tag: "Real-time",
    summary:
      "Operations dashboard with live metrics, operator presence, and WebSocket reconnect handling.",
    repo: "https://github.com/kuttenajith/live-ops-board",
    live: "https://kuttenajith.github.io/live-ops-board/",
  },
  {
    name: "Task Master",
    tag: "Spatial UI",
    summary:
      "Location tree plus SVG floor plans: rotate, filter shapes, recolour rooms, and keep that state when switching buildings.",
    repo: "https://github.com/kuttenajith/task-master",
    live: "https://kuttenajith.github.io/task-master/",
  },
  {
    name: "Ajith UI",
    tag: "Design system",
    summary:
      "Reusable React and TypeScript component library: design tokens, accessible primitives, and a live gallery.",
    repo: "https://github.com/kuttenajith/ajith-ui",
    live: "https://kuttenajith.github.io/ajith-ui/",
  },
  {
    name: "Interview Board",
    tag: "Product architecture",
    summary:
      "Hiring pipeline board with candidate records, column workflow, search, and local persistence.",
    repo: "https://github.com/kuttenajith/interview-board",
    live: "https://kuttenajith.github.io/interview-board/",
  },
  {
    name: "Data Grid",
    tag: "Data-dense UI",
    summary:
      "A table for bulk work: row selection, select-all, and export of the chosen rows — the kind of UI that fails if selection state is sloppy.",
    repo: "https://github.com/kuttenajith/datagrid-app",
    live: "https://datagrid-app-five.vercel.app/",
  },
];

export const education = {
  degree: "B.E. Computer Science Engineering",
  school: "KLN College of Engineering, Madurai",
  dates: "2015 — 2019",
  grade: "Grade A",
};

export const offer = {
  name: "Frontend health check",
  length: "Two working days",
  summary:
    "A fixed-scope review of a React or Next.js application: performance, structure, and a written plan the team can execute without me in the room.",
  includes: [
    "Lighthouse and Core Web Vitals baseline on the real product URL",
    "Bundle and route-level JavaScript review (what ships on first load vs later)",
    "Component and state-structure notes: reuse, coupling, and risk",
    "A written report with ordered actions: quick wins, then deeper work",
    "A 60-minute walkthrough call with engineering or product",
  ],
  notIncluded: [
    "Implementation of the full backlog inside the two days",
    "Confidential employer systems or anything that cannot be shared legally",
    "Mobile-native or backend-only work",
  ],
  howToStart:
    "Email with the product URL, the stack (React / Next.js), and the outcome you want (speed, maintainability, or a hiring-readiness review). I reply with availability and a fixed fee after a short intro call.",
};

export const contact = {
  kicker: "Contact",
  title: "Send the brief. I'll come back to you.",
  lede: "Hiring managers, CTOs, CEOs, and founders — write the role, the product, or the problem. I reply by email, or I call you back if you ask.",
  note: "Typically within one business day. India time (IST).",
};
