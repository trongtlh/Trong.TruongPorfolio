<script setup>
defineProps({ home: Boolean })

const experiences = [
  {
    company: 'Eastsea Star Software Co., Ltd.',
    url: 'https://esstar.com.vn/',
    role: 'Full Stack Engineer',
    type: 'Full-time',
    period: 'Jun 2026 – Present',
    description:
      'Develop web interfaces and connected desktop experiences for subsurface data workspaces and reservoir visualization.',
    skills:
      'Vue interfaces · API integration · Authentication flows · Desktop packaging · Technical research',
  },
  {
    company: 'Can Tho Stroke International Services',
    url: 'https://sisvietnam.vn/',
    role: 'Software Implementation Consultant',
    type: 'Full-time',
    period: 'Oct 2025 – Feb 2026 · 5 mos',
    location: 'Ho Chi Minh City, Vietnam · On-site',
    responsibilities: [
      'Supported software implementation, including system configuration, deployment, testing and troubleshooting.',
      'Collaborated with technical teams to identify issues, analyze root causes and implement solutions.',
      'Conducted functional testing to ensure software features aligned with business requirements.',
      'Prepared technical documentation and provided end-user support during software implementation.',
      'Assisted with system maintenance, issue resolution and continuous improvement.',
    ],
    skills:
      'System configuration · Software deployment · Testing · Troubleshooting',
  },
  {
    company: 'FPT IS',
    url: 'https://fpt-is.com/',
    role: 'Data Analyst',
    type: 'Internship',
    period: 'May 2025 – Aug 2025',
    description: '',
    skills: 'Oracle Database · Oracle Applications',
  },
  {
    company: 'FPT Software',
    url: 'https://fptsoftware.com/',
    role: 'Manual Tester',
    type: 'Internship',
    period: 'May 2023 – Sep 2023',
    description:
      'Created test cases, test scenarios and bug reports. Performed functional, regression and UI/UX testing.',
    skills:
      'Test documentation · Functional testing · Regression testing · UI/UX testing',
  },
]

const education = {
  school: 'FPT University',
  url: 'https://daihoc.fpt.edu.vn/',
  degree: 'Bachelor’s degree in Software Engineering',
  period: 'Sep 2020 – Dec 2024',
  courses:
    'Data Structures and Algorithms · Object-Oriented Programming · Software Development Lifecycle',
  skills: 'Problem Solving · ASP.NET · C# · Next.js · SQL · HTML/CSS/JavaScript',
}

const principles = [
  [
    '01 / Understand',
    'Start with the user’s workflow and the problem behind the request.',
  ],
  [
    '02 / Explore',
    'Compare options, test assumptions and build small prototypes.',
  ],
  [
    '03 / Refine',
    'Improve the details through feedback and real use.',
  ],
]
</script>

<template>
  <div
    v-if="home"
    id="about"
    class="container home-section-heading"
  >
    <div class="section-heading">
      <h2>Experience & education</h2>
      <RouterLink class="text-link" to="/about">
        Explore about ↗
      </RouterLink>
    </div>
  </div>

  <section v-reveal class="section container">
    <h2>Experience through real projects</h2>

    <div
      v-for="(experience, index) in experiences.slice(0, home ? 2 : experiences.length)"
      :key="`${experience.company}-${experience.role}`"
      class="experience-row"
      :class="{ divided: index > 0 }"
    >
      <div>
        <h3>
          <a
            class="organization-link"
            :href="experience.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ experience.company }}
            <span aria-hidden="true">↗</span>
          </a>
        </h3>
        <p class="muted">{{ experience.period }}</p>
        <p class="muted">{{ experience.type }}</p>
        <p v-if="experience.location" class="muted">{{ experience.location }}</p>
      </div>

      <div>
        <h3>{{ experience.role }}</h3>
        <ul v-if="experience.responsibilities" class="responsibilities">
          <li
            v-for="responsibility in experience.responsibilities"
            :key="responsibility"
          >
            {{ responsibility }}
          </li>
        </ul>
        <p v-if="experience.description" class="muted">
          {{ experience.description }}
        </p>
        <p class="muted">{{ experience.skills }}</p>
      </div>
    </div>
  </section>

  <section v-reveal class="section container">
    <h2>Education</h2>

    <div class="experience-row">
      <div>
        <h3>
          <a
            class="organization-link"
            :href="education.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ education.school }}
            <span aria-hidden="true">↗</span>
          </a>
        </h3>
        <p class="muted">{{ education.period }}</p>
      </div>

      <div>
        <h3>{{ education.degree }}</h3>
        <p class="muted">
          Related courses: {{ education.courses }}
        </p>
        <p class="muted">{{ education.skills }}</p>
      </div>
    </div>
  </section>

  <section v-reveal class="section soft-band">
    <div class="container">
      <h2>How I like to work</h2>

      <div class="three-columns">
        <article
          v-for="[title, body] in principles"
          :key="title"
        >
          <h3>{{ title }}</h3>
          <p class="muted">{{ body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.organization-link {
  color: inherit;
  text-decoration: none;
}

.organization-link:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.organization-link span {
  display: inline-block;
  margin-left: 4px;
  font-size: 0.85em;
}

.responsibilities {
  margin: 0 0 16px;
  padding: 0;
  list-style: none;
}

.responsibilities li {
  position: relative;
  padding-left: 1em;
  font-size: 17px;
  line-height: 1.6;
}

.responsibilities li::before {
  position: absolute;
  left: 0;
  content: '–';
}
</style>