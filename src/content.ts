export const profile = {
  name: "Ajith K A",
  role: "Senior Frontend Engineer",
  location: "Madurai, Tamil Nadu, India",
  email: "ajithkutten1998@gmail.com",
  phone: "+91 79049 49080",
  phoneHref: "tel:+917904949080",
  linkedin: "https://www.linkedin.com/in/ajith-k-a-18b71713b",
  github: "https://github.com/kuttenajith",
  resume: `${import.meta.env.BASE_URL}Ajith-KA-Senior-Frontend.pdf`,
  resumeAlt: `${import.meta.env.BASE_URL}Ajith-KA-Resume.pdf`,
  headline:
    "I design React and TypeScript systems that stay fast, reusable, and shippable under real production load.",
  summary:
    "Frontend engineer since 2018. I own architecture, component systems, and delivery — from requirement to production — and have led a team of six. Strongest in React, Next.js, TypeScript, SSR, micro-frontends, and performance work measured with Lighthouse and Core Web Vitals. Cloud delivery across GCP, AWS, and Azure.",
};

export const impact = [
  {
    value: "93.8%",
    label: "Lighthouse performance",
    detail: "Bundle splitting, lazy loading, and Core Web Vitals work — not a one-off audit screenshot.",
  },
  {
    value: "94%",
    label: "Conversion lift",
    detail: "UX-led redesign paired with faster pages. Product outcome, not just a prettier UI.",
  },
  {
    value: "6",
    label: "Engineers led",
    detail: "Mentoring, reviews, sprint planning, and architecture standards that the team could actually follow.",
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
      "Own performance, maintainability, and code quality — not just feature tickets.",
      "Ship with product, QA, design, and backend. Support production releases and troubleshooting.",
    ],
  },
  {
    role: "Module Lead",
    company: "Celsior Technologies",
    dates: "Aug 2022 — Feb 2025",
    points: [
      "Led and mentored six frontend engineers through delivery of enterprise modules.",
      "Set technical roadmaps, architecture standards, and review culture.",
      "Translated stakeholder requirements into work the team could estimate and finish.",
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
      "Shipped responsive applications with accessibility and UX as constraints, not extras.",
      "Contributed to a 94% conversion lift through UI modernization.",
      "Tuned load performance so the redesign was actually usable.",
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
    "Technical ownership from analysis through production.",
    "Performance as a product feature: Lighthouse, lazy loading, code splitting.",
    "Systems other engineers can extend — not one-off pages.",
    "Cross-functional delivery with product, UX, QA, backend, and DevOps.",
  ],
};

export const education = {
  degree: "B.E. Computer Science Engineering",
  school: "KLN College of Engineering, Madurai",
  dates: "2015 — 2019",
  grade: "Grade A",
};
