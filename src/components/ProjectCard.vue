<template>
  <article data-card class="rounded-2xl border border-white/10 p-5 bg-gradient-to-br from-white/5 to-transparent hover:border-white/25 transition">
    <h3 class="text-sm font-light">{{ title }}</h3>
    <p class="mt-2 text-xs opacity-80">{{ desc }}</p>
    <div class="mt-3 flex gap-2 flex-wrap">
      <span v-for="t in tags" :key="t" class="text-[11px] opacity-90 border border-white/14 px-2 py-1 rounded-full bg-gradient-to-r from-white/7 to-transparent">{{ t }}</span>
    </div>
    <div class="mt-4 flex gap-3">
      <a href="#" class="text-xs underline opacity-90 hover:opacity-100">Live</a>
      <a href="#" class="text-xs underline opacity-90 hover:opacity-100">Source</a>
    </div>
  </article>
</template>

<script setup>
defineProps({
  title: String,
  desc: String,
  tags: { type: Array, default: () => [] }
})
</script>
