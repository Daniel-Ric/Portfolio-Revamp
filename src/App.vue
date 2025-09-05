<template>
  <div class="min-h-dvh flex flex-col bg-black text-white relative">
    <div class="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_120%,rgba(0,229,255,0.08),transparent_60%)]"></div>
    <div class="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black via-black/95 to-black"></div>

    <NavBar />

    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition :css="false" @enter="onEnter" @leave="onLeave" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <FooterBar />
    <BackToTop />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import { watch, onMounted } from 'vue'
import { gsap } from 'gsap'
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import BackToTop from '@/components/BackToTop.vue'

const onEnter = (el, done) =>
  gsap.fromTo(el, { opacity:0, y:16, filter:'blur(6px)' }, { opacity:1, y:0, filter:'blur(0)', duration:.6, ease:'power2.out', onComplete:done })
const onLeave = (el, done) =>
  gsap.to(el, { opacity:0, y:-10, filter:'blur(6px)', duration:.4, ease:'power2.inOut', onComplete:done })

const SITE_NAME = 'SpindexGFX' // anpassen

const route = useRoute()

function computeTitle(r) {
  const custom = typeof r.meta?.titleTemplate === 'function'
    ? r.meta.titleTemplate(r)
    : r.meta?.title
  const main = custom || (r.name ? String(r.name) : '')
  return main ? `${main} — ${SITE_NAME}` : SITE_NAME
}

function setMeta(name, content) {
  if (!content) return
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function applyHead() {
  document.title = computeTitle(route)
  // Optional: Beschreibung/Keywords pro Route über meta steuern
  setMeta('description', route.meta?.description)
  setMeta('keywords', route.meta?.keywords)
  // Optional: OpenGraph Titel synchron halten
  let og = document.querySelector('meta[property="og:title"]')
  if (!og) {
    og = document.createElement('meta')
    og.setAttribute('property', 'og:title')
    document.head.appendChild(og)
  }
  og.setAttribute('content', document.title)
}

onMounted(applyHead)
watch(() => route.fullPath, () => applyHead(), { immediate: true })
</script>
