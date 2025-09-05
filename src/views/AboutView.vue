<template>
  <section ref="root" class="mx-auto max-w-3xl px-4 sm:px-6 py-16">
    <div class="pointer-events-none h-8 -mt-8 mb-6 rounded-xl opacity-[0.12] bg-[linear-gradient(180deg,rgba(255,255,255,.06),transparent)]"></div>

    <h1 class="text-lg sm:text-xl font-light tracking-[0.12em] uppercase">About</h1>

    <p class="mt-4 text-sm opacity-80 leading-relaxed">
      I’m a frontend engineer and bot developer focused on clarity, speed, and maintainability. I use motion as meaning,
      keep surface area small, and measure outcomes so work scales without adding noise.
    </p>

    <div class="mt-10 space-y-8">
      <div data-anim class="panel">
        <h2 class="text-sm font-light tracking-[0.12em] uppercase">Principles</h2>
        <ul class="mt-4 grid gap-3">
          <li class="li">
            <i class="fa-regular fa-circle-check"></i>
            <span><strong>Minimal first.</strong> Fewer moving parts, stronger defaults, clearer decisions.</span>
          </li>
          <li class="li">
            <i class="fa-solid fa-gauge-high"></i>
            <span><strong>Performance budgets.</strong> Fast by design—guardrails for scripts, images, and motion.</span>
          </li>
          <li class="li">
            <i class="fa-solid fa-person-running"></i>
            <span><strong>Motion with intent.</strong> Animations clarify state and hierarchy, never distract.</span>
          </li>
          <li class="li">
            <i class="fa-solid fa-diagram-project"></i>
            <span><strong>Pragmatic systems.</strong> Components and tokens that scale without ceremony.</span>
          </li>
        </ul>
      </div>

      <div data-anim class="panel">
        <h2 class="text-sm font-light tracking-[0.12em] uppercase">How I work</h2>
        <ol class="mt-4 grid gap-3">
          <li class="li">
            <i class="fa-regular fa-clipboard"></i>
            <span><strong>Plan.</strong> Define the smallest valuable outcome and constraints.</span>
          </li>
          <li class="li">
            <i class="fa-solid fa-hammer"></i>
            <span><strong>Build.</strong> Ship a thin vertical slice with accessible defaults.</span>
          </li>
          <li class="li">
            <i class="fa-solid fa-chart-line"></i>
            <span><strong>Measure.</strong> Track UX signals and performance against budget.</span>
          </li>
          <li class="li">
            <i class="fa-solid fa-rotate"></i>
            <span><strong>Iterate.</strong> Keep what works, remove what doesn’t, repeat quickly.</span>
          </li>
        </ol>
      </div>

      <div data-anim class="panel">
        <h2 class="text-sm font-light tracking-[0.12em] uppercase">Currently</h2>
        <ul class="mt-4 grid gap-3">
          <li class="li">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span>Refining **GSAP** micro-interactions for meaningful feedback and subtle route transitions.</span>
          </li>
          <li class="li">
            <i class="fa-brands fa-discord"></i>
            <span>Hardening Discord bot flows with predictable moderation UX and resilient retries.</span>
          </li>
          <li class="li">
            <i class="fa-solid fa-link"></i>
            <span>Bridging **PlayFab** and **Xbox Live** patterns (auth shapes, rate limits, tidy helpers).</span>
          </li>
          <li class="li">
            <i class="fa-solid fa-layer-group"></i>
            <span>Design tokens that keep typography, spacing, and motion consistent across surfaces.</span>
          </li>
        </ul>
      </div>

      <div data-anim class="cta">
        <p class="text-sm opacity-85">
          If you value lean products and calm UIs, we’ll get along. I’m open to focused collaborations and pro bono audits for small community projects.
        </p>
        <RouterLink to="/contact" class="btn-ghost">Say hello</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'

const root = ref(null)
let observer = null

onMounted(() => {
  if (!root.value) return
  const blocks = Array.from(root.value.querySelectorAll('[data-anim]'))
  blocks.forEach(el => gsap.set(el, { opacity: 0, y: 16, filter: 'blur(6px)' }))

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' })
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })

  blocks.forEach(el => observer.observe(el))
})

onBeforeUnmount(() => {
  observer && observer.disconnect()
  observer = null
})
</script>

<style scoped>
.panel{
  border:1px solid rgba(255,255,255,.12);
  border-radius:1rem;
  padding:1.1rem 1.2rem;
  background:linear-gradient(135deg,rgba(255,255,255,.06),transparent)
}
.li{
  display:flex;gap:.65rem;align-items:flex-start;
  font-size:.9rem;line-height:1.6;opacity:.9
}
.li i{opacity:.9;margin-top:.2rem}

.cta{
  display:flex;flex-direction:column;gap:.9rem;
  border:1px solid rgba(255,255,255,.12);
  border-radius:1rem;padding:1.1rem;
  background:linear-gradient(135deg,rgba(255,255,255,.06),transparent)
}
@media (min-width:640px){.cta{flex-direction:row;align-items:center;justify-content:space-between}}
.btn-ghost{
  display:inline-flex;align-items:center;justify-content:center;
  padding:.6rem 1rem;border-radius:9999px;
  border:1px solid rgba(255,255,255,.16);
  letter-spacing:.2em;text-transform:uppercase;font-size:.72rem;
  background:linear-gradient(90deg,rgba(255,255,255,.08),transparent)
}
</style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
</style>
