<template>
  <section ref="root" class="mx-auto max-w-7xl px-4 sm:px-6 py-16">
    <header class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 class="text-lg sm:text-xl font-light tracking-[0.12em] uppercase">Projects</h1>
        <p class="mt-2 text-sm opacity-80 max-w-prose">
          A selection of production bots and open-source utilities. Minimal surfaces, measurable performance, clean handoffs.
        </p>
      </div>

      <div class="segmented">
        <button :class="['seg-btn', activeTab==='all' && 'is-active']" @click="setTab('all')">
          <i class="fa-solid fa-layer-group"></i> All
        </button>
        <button :class="['seg-btn', activeTab==='closed' && 'is-active']" @click="setTab('closed')">
          <i class="fa-solid fa-lock"></i> Closed Source
        </button>
        <button :class="['seg-btn', activeTab==='open' && 'is-active']" @click="setTab('open')">
          <i class="fa-solid fa-code-branch"></i> Open Source
        </button>
      </div>
    </header>

    <div class="mt-6 h-6 rounded-xl opacity-[0.12] bg-[linear-gradient(180deg,rgba(255,255,255,.06),transparent)]"></div>
    <div ref="listWrap" class="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[1fr]">
      <article
        v-for="p in filtered"
        :key="p.title"
        data-card
        class="card"
      >
        <header class="card-head">
          <h3 class="card-title">{{ p.title }}</h3>
          <p class="card-desc">{{ p.desc }}</p>
        </header>

        <div class="card-tags">
          <span v-for="t in p.tags" :key="t">{{ t }}</span>
        </div>

        <div class="card-actions">
          <a
            v-if="p.live"
            class="link"
            :href="p.live"
            target="_blank"
            rel="noopener"
          >
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live
          </a>
          <a
            v-if="p.source"
            class="link"
            :href="p.source"
            target="_blank"
            rel="noopener"
          >
            <i class="fa-brands fa-github"></i> Source
          </a>
          <span v-if="!p.live && !p.source" class="link opacity-60 pointer-events-none">
            <i class="fa-solid fa-circle-info"></i> Info soon
          </span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { gsap } from 'gsap'

const root = ref(null)
const listWrap = ref(null)
const activeTab = ref('all') // 'all' | 'closed' | 'open'

const projects = [
  {
    group: 'closed',
    title: 'CubeStats Bot',
    desc: 'Discord bot delivering real-time cube statistics and queryable leaderboards with durable storage and fast moderation flows.',
    tags: ['JavaScript', 'SQL', 'Discord API'],
    live: 'https://discord.com/oauth2/authorize?client_id=1263851701698301992',
    source: null
  },
  {
    group: 'closed',
    title: 'CubeStats API',
    desc: 'Go based API to deliver real-time cube statistics and queryable leaderboards.',
    tags: ['Go', 'SQL'],
    live: null,
    source: null
  },
  {
    group: 'closed',
    title: 'Monitoring API',
    desc: 'JavaScript based API to communicate with RakNet and tmux to monitor my services and some of the largest Bedrock Edition servers in real time.',
    tags: ['JavaScript'],
    live: 'https://status.spindexgfx.com/',
    source: null
  },
  {
    group: 'closed',
    title: 'Zeqa Cosmetics API',
    desc: 'An API that provides and communicates with Zeqa`s (ap.zeqa.net) HTTP endpoints to fetch the latest cosmetic and player data.',
    tags: ['JavaScript', 'HTTPS' ],
    live: null,
    source: null
  },
  {
    group: 'open',
    title: 'Zeqa Cosmetics Website (ShardHub)',
    desc: 'A website that has tools for the Zeqa Bedrock Network — item values, bank, trade comparison, and player profiles.',
    tags: ['JavaScript', 'HTTPS' ],
    live: 'https://zeqa.spindexgfx.com/',
    source: null
  },
  {
    group: 'closed',
    title: 'View-MarketplaceNET Bot',
    desc: 'Marketplace alerts and account utilities across Xbox Live + PlayFab, integrated with Discord slash commands and rate-limit aware persistence.',
    tags: ['JavaScript', 'SQL', 'Discord API', 'PlayFab API', 'Xbox Live API'],
    live: 'https://discord.com/oauth2/authorize?client_id=1302624577943506985&scope=bot+applications.commands&permissions=8',
    source: null
  },
  {
    group: 'closed',
    title: 'View-MarketplaceNET Website',
    desc: 'The entire Minecraft Bedrock Edition marketplace on a website ^^.',
    tags: ['JavaScript', 'Vue3', 'TailwindCSS', 'PlayFab API', 'Xbox Live API'],
    live: 'https://view-marketplace.net/',
    source: null
  },
  {
    group: 'closed',
    title: 'View-MarketplaceNET Redirect Service',
    desc: 'open Minecraft Marketplace offers and Dressing Room Offers via URL links fully dynamically.',
    tags: ['JavaScript', 'Express', 'HTTP'],
    live: null,
    source: null
  },
  {
    group: 'open',
    title: 'PlayFab Bedrock API',
    desc: 'Utilities and patterns for PlayFab & Xbox Live from JavaScript: tidy helpers, typed-ish endpoints, and examples for catalog/data workflows.',
    tags: ['JavaScript', 'PlayFab API', 'Xbox Live API'],
    live: null,
    source: 'https://github.com/Daniel-Ric/PlayFab-Catalog-Service-Bedrock'
  },
  {
    group: 'open',
    title: 'Roadmap API (Hive/CubeCraft Bedrock)',
    desc: 'Small Go service that unifies a public roadmap from Notion and XenForo. Minimal endpoints, simple caching, and straightforward deployment.',
    tags: ['Go', 'Notion API', 'XenForo API'],
    live: null,
    source: 'https://github.com/Daniel-Ric/Roadmap-API'
  },
  {
    group: 'open',
    title: 'xLink API',
    desc: 'Lightweight integration layer bridging PlayFab with Xbox Live auth flows. Clear request shapes and predictable handoffs for downstream clients.',
    tags: ['JavaScript', 'PlayFab API', 'Xbox Live API'],
    live: null,
    source: null
  }
]

const filtered = computed(() => {
  if (activeTab.value === 'all') return projects
  return projects.filter(p => p.group === activeTab.value)
})

function setTab(tab) {
  if (tab === activeTab.value) return
  activeTab.value = tab
}

watch(activeTab, async () => {
  if (!listWrap.value) return
  await gsap.to(listWrap.value, { opacity: 0, y: 8, duration: 0.18, ease: 'power1.inOut' })
  await nextTick()
  gsap.fromTo(listWrap.value, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' })
})

onMounted(() => {
  if (!root.value) return
  const cards = Array.from(root.value.querySelectorAll('[data-card]'))
  gsap.from([root.value.querySelector('h1'), ...cards], {
    opacity: 0,
    y: 14,
    duration: 0.65,
    ease: 'power2.out',
    stagger: 0.06
  })
})
</script>

<style scoped>
.segmented{
  display:flex;gap:.35rem;
  padding:.25rem;border:1px solid rgba(255,255,255,.12);border-radius:9999px;
  background:linear-gradient(135deg,rgba(255,255,255,.05),transparent)
}
.seg-btn{
  padding:.45rem .8rem;border-radius:9999px;font-size:.72rem;
  letter-spacing:.14em;text-transform:uppercase;opacity:.85;border:1px solid transparent;
  display:inline-flex;gap:.45rem;align-items:center
}
.seg-btn.is-active{
  border-color:rgba(255,255,255,.25);
  background:linear-gradient(90deg,rgba(255,255,255,.14),transparent);
  opacity:1
}

/* cards */
.card{
  display:flex;flex-direction:column;gap:.85rem;
  border:1px solid rgba(255,255,255,.12);
  border-radius:1rem;padding:1.15rem;
  background:linear-gradient(135deg,rgba(255,255,255,.06),transparent);
  min-height:12.5rem
}
.card-head{display:flex;flex-direction:column;gap:.4rem}
.card-title{font-size:.95rem;font-weight:300}
.card-desc{font-size:.8rem;opacity:.85;line-height:1.6}
.card-tags{display:flex;gap:.4rem;flex-wrap:wrap}
.card-tags span{
  font-size:.7rem;opacity:.9;border:1px solid rgba(255,255,255,.14);
  padding:.25rem .5rem;border-radius:9999px;
  background:linear-gradient(90deg,rgba(255,255,255,.07),transparent)
}
.card-actions{display:flex;gap:.8rem;margin-top:auto}
.link{font-size:.75rem;opacity:.9;text-decoration:underline;display:inline-flex;gap:.45rem;align-items:center}
.link:hover{opacity:1}
</style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
</style>
