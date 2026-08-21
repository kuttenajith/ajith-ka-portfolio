export const profile = {
  name: "Ajith K A",
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
      items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Bootstrap"],
    },
    {
      title: "Architecture",
      items: [
        "SSR",
        "Micro-frontends",
        "Design systems",
        "Reusable component libraries",
        "State management",
        "REST + WebSockets",
      ],
    },
    {
      title: "Delivery",
      items: ["GCP (4+ years)", "AWS", "Azure", "CI/CD", "Docker", "Git", "Jira", "Agile / Scrum"],
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
    name: "Live Ops Board",
    tag: "Real-time",
    summary:
      "Operations dashboard with live metrics, operator presence, and WebSocket reconnect handling.",
    repo: "https://github.com/kuttenajith/live-ops-board",
    live: "https://kuttenajith.github.io/live-ops-board/",
  },
  {
    name: "MFE Shell",
    tag: "Micro-frontends",
    summary:
      "Host application that loads independent remote apps over iframe + postMessage, with a shared theme contract.",
    repo: "https://github.com/kuttenajith/mfe-shell",
    live: "https://kuttenajith.github.io/mfe-shell/",
  },
];

export const education = {
  degree: "B.E. Computer Science Engineering",
  school: "KLN College of Engineering, Madurai",
  dates: "2015 — 2019",
  grade: "Grade A",
};
