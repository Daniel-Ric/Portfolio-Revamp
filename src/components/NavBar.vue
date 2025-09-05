<template>
  <nav
    ref="header"
    class="fixed top-0 inset-x-0 z-50 transition-transform duration-300 will-change-transform"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <div
      class="absolute inset-0 backdrop-blur-[6px] sm:bg-gradient-to-b sm:from-black/70 sm:via-black/35 sm:to-transparent
             bg-gradient-to-b from-black/95 via-black/90 to-black/80"
    ></div>

    <div class="relative mx-auto max-w-7xl px-3 sm:px-6 pt-[max(env(safe-area-inset-top),0px)]">
      <div class="h-14 flex items-center justify-between">
        <RouterLink to="/" aria-label="SpindexGFX Home" class="text-sm tracking-[0.2em] font-light">
          SpindexGFX
        </RouterLink>

        <button
          class="sm:hidden p-2 rounded-xl border border-white/20 bg-white/10"
          @click="toggle()"
          :aria-expanded="open ? 'true' : 'false'"
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <span v-if="!open">☰</span><span v-else>✕</span>
        </button>

        <div ref="menu" class="hidden sm:flex items-center gap-5 text-xs">
          <RouterLink class="nav-link" to="/about">About</RouterLink>
          <RouterLink class="nav-link" to="/skills">Skills</RouterLink>
          <RouterLink class="nav-link" to="/projects">Projects</RouterLink>
          <RouterLink class="nav-link" to="/experience">Experience</RouterLink>
          <RouterLink class="nav-link" to="/contact">Contact</RouterLink>
          <a
            class="btn-ghost"
            href="https://github.com/Daniel-Ric"
            target="_blank"
            rel="noopener"
          >View Work</a>
        </div>
      </div>
    </div>

    <Transition :css="false" @enter="enterMobile" @leave="leaveMobile">
      <div
        v-if="open"
        id="mobile-menu"
        class="sm:hidden fixed inset-0 z-[60]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-title"
      >
        <button
          class="absolute inset-0 bg-black/90"
          aria-label="Close menu"
          @click="close()"
        ></button>

        <div class="relative h-[100svh] pt-[max(env(safe-area-inset-top),0px)] px-3">
          <div
            ref="mobileSheet"
            class="mt-2 rounded-2xl border border-white/14
                   bg-[linear-gradient(135deg,rgba(255,255,255,.14),transparent)]
                   p-3 shadow-xl"
          >
            <h2 id="mobile-title" class="sr-only">Navigation</h2>
            <nav ref="mobileList" class="grid gap-2 text-base">
              <RouterLink class="nav-item" @click="close()" to="/about">About</RouterLink>
              <RouterLink class="nav-item" @click="close()" to="/skills">Skills</RouterLink>
              <RouterLink class="nav-item" @click="close()" to="/projects">Projects</RouterLink>
              <RouterLink class="nav-item" @click="close()" to="/experience">Experience</RouterLink>
              <RouterLink class="nav-item" @click="close()" to="/contact">Contact</RouterLink>
              <a
                class="nav-item"
                href="https://github.com/Daniel-Ric"
                target="_blank"
                rel="noopener"
                @click="close()"
              >View Work</a>
            </nav>

            <div class="mt-3 flex flex-col xs:flex-row gap-2">
              <RouterLink @click="close()" to="/contact" class="btn-cta">Contact</RouterLink>
              <RouterLink @click="close()" to="/projects" class="btn-ghost w-full text-center">Projects</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'

const open = ref(false)
const hidden = ref(false)
const header = ref(null)
const menu = ref(null)
const mobileSheet = ref(null)
const mobileList = ref(null)

let lastY = 0
const onScroll = () => {
  const y = window.scrollY
  hidden.value = y > 64 && y > lastY
  lastY = y
}

function toggle(){ open.value ? close() : openMenu() }
function openMenu(){ open.value = true }
function close(){ open.value = false }

function enterMobile(el, done){
  gsap.set(el, { opacity: 0 })
  gsap.to(el, { opacity: 1, duration: 0.2, ease: 'power1.out' })

  nextTick(() => {
    if (mobileSheet.value) {
      gsap.fromTo(
        mobileSheet.value,
        { y: -8, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.28, ease: 'power2.out', onComplete: done }
      )
    } else { done() }

    const first = mobileList.value?.querySelector('a,button,[tabindex]:not([tabindex="-1"])')
    first && first.focus({ preventScroll: true })
  })
}

function leaveMobile(el, done){
  const tl = gsap.timeline({ onComplete: done })
  if (mobileSheet.value) tl.to(mobileSheet.value, { y: -6, opacity: 0, duration: 0.18, ease: 'power1.inOut' }, 0)
  tl.to(el, { opacity: 0, duration: 0.18, ease: 'power1.inOut' }, 0)
}

watch(open, (v) => {
  document.documentElement.classList.toggle('overflow-hidden', v)
  document.body.classList.toggle('overflow-hidden', v)
})

const onResize = () => {
  if (window.innerWidth >= 640 && open.value) close()
}

onMounted(() => {
  if (menu.value) gsap.from(menu.value.children, { opacity: 0, y: -8, duration: 0.5, stagger: 0.06, ease: 'power2.out' })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && open.value) close() })
  window.addEventListener('resize', onResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  document.documentElement.classList.remove('overflow-hidden')
  document.body.classList.remove('overflow-hidden')
})
</script>

<style scoped>
.nav-link{opacity:.85}.nav-link:hover{opacity:1}
.btn-ghost{padding:.5rem .85rem;border:1px solid rgba(255,255,255,.16);border-radius:9999px}

.nav-item{
  padding:.9rem 1rem;
  border:1px solid rgba(255,255,255,.16);
  border-radius:.95rem;
  background:linear-gradient(90deg,rgba(255,255,255,.10),transparent);
  opacity:.98
}
.nav-item:active{transform:translateY(1px)}

.btn-cta{
  display:inline-flex;align-items:center;justify-content:center;
  padding:.7rem 1rem;border-radius:9999px;
  border:1px solid rgba(255,255,255,.22);
  letter-spacing:.2em;text-transform:uppercase;font-size:.74rem;
  background:linear-gradient(90deg,rgba(255,255,255,.16),transparent)
}
</style>
