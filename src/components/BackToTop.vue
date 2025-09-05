<template>
  <button
    v-show="show"
    @click="scrollTop"
    class="fixed bottom-5 right-5 z-40 rounded-full border border-white/20 px-3 py-2 text-xs tracking-[0.2em] uppercase bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm hover:border-white/40"
    aria-label="Back to top">
    Top
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const show = ref(false)
const onScroll = () => { show.value = window.scrollY > 300 }

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>
