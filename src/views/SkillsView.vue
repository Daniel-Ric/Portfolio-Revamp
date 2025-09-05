<template>
  <section class="mx-auto w-full max-w-3xl px-4 sm:px-6 pt-24 md:pt-28 pb-12">
    <header class="flex flex-col gap-4">
      <div>
        <h1 class="text-lg sm:text-xl font-light tracking-[0.12em] uppercase">Skills</h1>
        <p class="mt-2 text-sm opacity-80 max-w-prose">
          Curated frameworks, languages, and tools with succinct summaries, practical use-cases, and relevant tooling.
        </p>
      </div>

      <div class="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 p-2">
        <div class="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2 py-1.5 w-full">
          <i class="fa-solid fa-magnifying-glass opacity-80"></i>
          <input
            v-model="query"
            type="text"
            placeholder="Search skills…"
            aria-label="Search skills"
            class="bg-transparent outline-none border-0 placeholder:opacity-60 w-full text-sm"
          />
          <button v-if="query" class="opacity-80 hover:opacity-100" @click="query=''">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="text-sm opacity-85 whitespace-nowrap px-2">
          {{ filtered.length }} items
        </div>
      </div>
    </header>

    <div class="mt-6 h-6 rounded-xl opacity-[0.12] bg-[linear-gradient(180deg,rgba(255,255,255,.06),transparent)]"></div>

    <div class="mt-6 flex flex-col gap-4">
      <article
        v-for="(item, i) in filtered"
        :key="item.category + '-' + item.label + '-' + i"
        class="group flex flex-col gap-3 rounded-2xl border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,.06),transparent)] p-4 transition hover:-translate-y-0.5 hover:border-white/30 focus-visible:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/30"
        tabindex="0"
        :aria-label="item.label"
      >
        <div class="flex items-start gap-3">
          <div class="grid place-items-center h-10 w-10 rounded-xl border border-white/15 bg-white/10 shrink-0">
            <i :class="item.icon" class="opacity-95"></i>
          </div>
          <div class="min-w-0 w-full">
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-base font-medium truncate">{{ item.label }}</h3>
              <span class="text-[11px] opacity-75 inline-flex items-center gap-1">
                <i :class="categoryIcon(item.category)"></i>
                <span class="capitalize">{{ item.category }}</span>
              </span>
            </div>

            <p v-if="item.summary" class="mt-1.5 text-sm opacity-90 leading-relaxed">
              {{ item.summary }}
            </p>

            <div v-if="item.useCases?.length" class="mt-2 flex flex-wrap gap-1">
              <span
                v-for="u in item.useCases"
                :key="u"
                class="text-[11px] inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 leading-none"
              >
                <i class="fa-solid fa-bullseye"></i>{{ u }}
              </span>
            </div>

            <div v-if="hasMeta(item)" class="mt-2 grid gap-1.5 sm:grid-cols-2">
              <div v-if="item.tooling?.length" class="flex flex-wrap items-center gap-1">
                <span class="text-[10px] inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 leading-none">
                  <i class="fa-solid fa-screwdriver-wrench"></i> Tooling
                </span>
                <span v-for="t in item.tooling" :key="t" class="text-[10px] rounded px-1.5 py-0.5 bg-white/5 border border-white/10 leading-none opacity-90">{{ t }}</span>
              </div>
              <div v-if="item.workflows?.length" class="flex flex-wrap items-center gap-1">
                <span class="text-[10px] inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 leading-none">
                  <i class="fa-solid fa-diagram-project"></i> Workflows
                </span>
                <span v-for="w in item.workflows" :key="w" class="text-[10px] rounded px-1.5 py-0.5 bg-white/5 border border-white/10 leading-none opacity-90">{{ w }}</span>
              </div>
              <div v-if="item.ecosystem?.length" class="flex flex-wrap items-center gap-1 sm:col-span-2">
                <span class="text-[10px] inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 leading-none">
                  <i class="fa-solid fa-cubes"></i> Ecosystem
                </span>
                <span v-for="e in item.ecosystem" :key="e" class="text-[10px] rounded px-1.5 py-0.5 bg-white/5 border border-white/10 leading-none opacity-90">{{ e }}</span>
              </div>
            </div>

            <div v-if="item.badges?.length" class="mt-2">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="b in item.badges"
                  :key="b"
                  class="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-1.5 py-0.5 text-[10px] leading-none"
                >
                  <i class="fa-solid fa-tag text-[9px] opacity-80"></i>{{ b }}
                </span>
              </div>
            </div>

            <div v-if="item.links?.length" class="mt-2 flex flex-wrap items-center gap-2">
              <a
                v-for="lnk in item.links"
                :key="lnk.href + lnk.label"
                :href="lnk.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs underline underline-offset-4 opacity-90 hover:opacity-100"
              >
                <i class="fa-solid fa-arrow-up-right-from-square"></i>{{ lnk.label }}
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const query = ref('')

const stacks = {
  frameworks: [
    {
      category: 'frameworks',
      label: 'Vue 3',
      icon: 'fa-brands fa-vuejs',
      summary: 'SPA/SSR apps with Composition API and SFCs aligned to a design system.',
      badges: ['SPA', 'SSR', 'State mgmt'],
      useCases: ['Dashboards', 'Form flows', 'Animated UIs'],
      tooling: ['Vite', 'Vue Router', 'Pinia'],
      workflows: ['Component-driven development', 'Accessibility-first'],
      ecosystem: ['Vitest', 'Playwright'],
      links: []
    },
    {
      category: 'frameworks',
      label: 'Tailwind CSS',
      icon: 'fa-solid fa-paint-roller',
      summary: 'Utility-first styling, tokens and scalable theming for fast UI delivery.',
      badges: ['Design tokens', 'Dark mode'],
      useCases: ['UI kits', 'Prototyping', 'Refactors'],
      tooling: ['PostCSS', 'Autoprefixer'],
      workflows: ['Design-to-code', 'Responsive layouts'],
      ecosystem: ['Headless UI'],
      links: []
    }
  ],
  languages: [
    {
      category: 'languages',
      label: 'HTML',
      icon: 'fa-brands fa-html5',
      summary: 'Semantic markup with accessibility and SEO best practices.',
      badges: ['A11y', 'SEO'],
      useCases: ['Landing pages', 'Email templates'],
      tooling: ['ARIA', 'Lighthouse'],
      workflows: ['Semantic components'],
      ecosystem: [],
      links: []
    },
    {
      category: 'languages',
      label: 'CSS',
      icon: 'fa-brands fa-css3-alt',
      summary: 'Modern CSS with Grid/Flexbox, container queries and custom properties.',
      badges: ['Grid', 'Flex', 'CQ'],
      useCases: ['Responsive layouts', 'Theming'],
      tooling: ['PostCSS'],
      workflows: ['BEM-lite when needed'],
      ecosystem: [],
      links: []
    },
    {
      category: 'languages',
      label: 'JavaScript',
      icon: 'fa-brands fa-js',
      summary: 'ESNext modules, fetch/async flows, and tooling for robust frontends.',
      badges: ['ESNext', 'Type safety (JSDoc)'],
      useCases: ['Interactivity', 'API integration', 'Tooling scripts'],
      tooling: ['Vite', 'ESBuild', 'Vitest'],
      workflows: ['CI-friendly lint/test'],
      ecosystem: ['Node.js'],
      links: []
    },
    {
      category: 'languages',
      label: 'Go',
      icon: 'fa-solid fa-terminal',
      summary: 'CLI and microservices with clean structure and fast builds.',
      badges: ['CLI', 'Services'],
      useCases: ['CLIs', 'Service endpoints'],
      tooling: ['Go modules', 'Gofmt'],
      workflows: ['12-factor mindset'],
      ecosystem: [],
      links: []
    }
  ],
  tools: [
    {
      category: 'tools',
      label: 'SQL',
      icon: 'fa-solid fa-database',
      summary: 'Query design, indexing strategy, joins, and performance-aware data access.',
      badges: ['Indexes', 'Joins'],
      useCases: ['Reporting', 'ETL'],
      tooling: ['psql', 'SQLite CLI'],
      workflows: ['Explain plans review'],
      ecosystem: [],
      links: []
    },
    {
      category: 'tools',
      label: 'RESTful',
      icon: 'fa-solid fa-plug',
      summary: 'API design and integration with clear contracts and error handling.',
      badges: ['OpenAPI'],
      useCases: ['CRUD APIs', 'Integrations'],
      tooling: ['Insomnia', 'cURL'],
      workflows: ['Contract-first'],
      ecosystem: [],
      links: []
    },
    {
      category: 'tools',
      label: 'Node.js',
      icon: 'fa-brands fa-node-js',
      summary: 'Build tooling, SSR and lightweight REST backends.',
      badges: ['SSR', 'REST'],
      useCases: ['Build scripts', 'APIs'],
      tooling: ['PNPM', 'ESBuild'],
      workflows: ['Monorepo-friendly'],
      ecosystem: [],
      links: []
    },
    {
      category: 'tools',
      label: 'Git',
      icon: 'fa-brands fa-git-alt',
      summary: 'Branching strategies, PR reviews, and conventional commits for clean history.',
      badges: ['CI-ready'],
      useCases: ['Team workflow', 'Code reviews'],
      tooling: ['Git CLI', 'GitHub'],
      workflows: ['Feature branches', 'Squash & merge'],
      ecosystem: ['Actions'],
      links: []
    },
    {
      category: 'tools',
      label: 'JetBrains IDEs',
      icon: 'fa-solid fa-briefcase',
      summary: 'Refactoring, inspections and debugger for higher throughput.',
      badges: ['Productivity'],
      useCases: ['Refactors', 'Debugging'],
      tooling: ['WebStorm', 'GoLand'],
      workflows: ['Live templates'],
      ecosystem: [],
      links: []
    },
    {
      category: 'tools',
      label: 'VS Code',
      icon: 'fa-solid fa-code',
      summary: 'Fast edits with workspace profiles and key extensions.',
      badges: ['Lightweight'],
      useCases: ['Extensions', 'Workspaces'],
      tooling: ['ESLint', 'Prettier'],
      workflows: ['Task runner'],
      ecosystem: [],
      links: []
    },
    {
      category: 'tools',
      label: 'Docker',
      icon: 'fa-brands fa-docker',
      summary: 'Local environments and services via Compose for reproducibility.',
      badges: ['Compose'],
      useCases: ['Dev envs', 'Services'],
      tooling: ['Docker CLI', 'Compose'],
      workflows: ['.env per service'],
      ecosystem: [],
      links: []
    }
  ]
}

const all = [...stacks.frameworks, ...stacks.languages, ...stacks.tools]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return all
  return all.filter(s =>
    s.label.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q) ||
    s.summary?.toLowerCase().includes(q) ||
    (s.badges || []).some(b => b.toLowerCase().includes(q)) ||
    (s.useCases || []).some(u => u.toLowerCase().includes(q)) ||
    (s.tooling || []).some(t => t.toLowerCase().includes(q)) ||
    (s.workflows || []).some(w => w.toLowerCase().includes(q)) ||
    (s.ecosystem || []).some(e => e.toLowerCase().includes(q))
  )
})

function categoryIcon(category) {
  switch (category) {
    case 'frameworks': return 'fa-brands fa-vuejs'
    case 'languages': return 'fa-solid fa-code'
    case 'tools': return 'fa-solid fa-toolbox'
    default: return 'fa-solid fa-layer-group'
  }
}

function hasMeta(item) {
  return (item.tooling && item.tooling.length) || (item.workflows && item.workflows.length) || (item.ecosystem && item.ecosystem.length)
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
</style>
