<template>
  <section class="relative min-h-[70svh] sm:min-h-[80svh] md:min-h-screen w-full overflow-hidden">
    <div class="absolute inset-0">
      <video ref="videoA" class="absolute inset-0 h-full w-full object-cover will-change-auto" autoplay muted playsinline preload="auto" aria-hidden="true" src="@/assets/bg.mp4"></video>
      <video ref="videoB" class="absolute inset-0 h-full w-full object-cover opacity-0 will-change-auto" autoplay muted playsinline preload="auto" aria-hidden="true" src="@/assets/bg.mp4"></video>
    </div>

    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/90"></div>
      <div class="absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_120%,rgba(0,229,255,0.07),transparent_60%)]"></div>
    </div>

    <div ref="content" class="relative z-10 flex min-h-[70svh] sm:min-h-[80svh] md:min-h-screen w-full items-center justify-center p-4 sm:p-6 md:p-8">
      <div class="text-center select-none max-w-[95vw]">
        <h1 ref="title" class="text-white font-extralight tracking-[0.06em] text-[clamp(1.5rem,5vw,3.25rem)] leading-snug drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
          SpindexGFX
        </h1>
        <p ref="subtitle" class="mt-2 md:mt-3 text-white/90 text-[clamp(0.65rem,1.8vw,0.95rem)] tracking-[0.3em] uppercase">
          FRONTEND / BOT DEVELOPER
        </p>
        <div class="mt-5 flex items-center justify-center gap-3">
          <RouterLink to="/projects" class="px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase hover:border-white/40 bg-gradient-to-r from-white/10 to-transparent">
            View Work
          </RouterLink>
          <RouterLink to="/contact" class="px-4 py-2 rounded-full border border-white/10 text-xs tracking-[0.2em] uppercase hover:border-white/30">
            Contact
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent"></div>
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'

const title = ref(null)
const subtitle = ref(null)
const content = ref(null)
const videoA = ref(null)
const videoB = ref(null)

let detachA = null
let detachB = null

const CROSSFADE = 0.34
const EPS = 0.08

function attachHandlers(video, partner) {
  let armed = false
  const onTimeUpdate = () => {
    const d = video.duration
    if (!isFinite(d) || d === 0) return
    if (!armed && d - video.currentTime <= CROSSFADE + EPS) {
      armed = true
      partner.currentTime = 0
      partner.play().catch(() => {})
      gsap.to(video, { opacity: 0, duration: CROSSFADE, ease: 'power1.out' })
      gsap.to(partner, { opacity: 1, duration: CROSSFADE, ease: 'power1.out', onComplete: () => {
          video.pause()
          video.currentTime = 0
          gsap.set(video, { opacity: 0 })
          gsap.set(partner, { opacity: 1 })
          armed = false
        } })
    }
  }
  video.addEventListener('timeupdate', onTimeUpdate)
  return () => video.removeEventListener('timeupdate', onTimeUpdate)
}

onMounted(() => {
  gsap.set([title.value, subtitle.value], { opacity: 0, y: 15 })
  if (content.value) {
    gsap.set(content.value, { opacity: 0 })
    gsap.to(content.value, { opacity: 1, duration: 0.5, ease: 'power1.out' })
  }
  const tl = gsap.timeline({ delay: 0.1 })
  tl.to(title.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to(subtitle.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.35')

  if (videoA.value && videoB.value) {
    gsap.set(videoA.value, { opacity: 1 })
    gsap.set(videoB.value, { opacity: 0 })
    videoA.value.play().catch(() => {})
    videoB.value.pause()
    detachA = attachHandlers(videoA.value, videoB.value)
    detachB = attachHandlers(videoB.value, videoA.value)
  }

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mq.matches) {
    gsap.killTweensOf([title.value, subtitle.value])
    gsap.set([title.value, subtitle.value], { opacity: 1, y: 0 })
  }
})

onBeforeUnmount(() => {
  detachA && detachA()
  detachB && detachB()
})
</script>

<style scoped>
.will-change-auto{will-change:opacity;backface-visibility:hidden}
h1,p{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
</style>
