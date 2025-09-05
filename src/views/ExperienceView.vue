<template>
  <section ref="root" class="mx-auto max-w-3xl px-4 sm:px-6 py-16">
    <h1 class="text-lg font-light tracking-[0.12em] uppercase">Experience</h1>

    <div class="mt-6 space-y-6">
      <div class="item">
        <div class="when">2025 — Present</div>
        <div class="role">Frontend Developer • Media company</div>
        <p class="desc">Design systems, performance budgets, and motion-driven UI for audience-facing products.</p>
      </div>

      <div class="item">
        <div class="when">2022 — 2025</div>
        <div class="role">IT Specialist for Application Development (Ausbildung)</div>
        <p class="desc">VOC training focused on modern JS stacks, testing, and deployment fundamentals.</p>
      </div>

      <div class="item">
        <div class="when">2020 — 2022</div>
        <div class="role">Technical high school diploma (Computer Science)</div>
        <p class="desc">Foundation in algorithms, networking, and software principles.</p>
      </div>
    </div>
    <div class="mt-10">
      <h2 class="subhead">Online engagements</h2>
      <div class="mt-4 space-y-6">
        <div class="item">
          <div class="when">2023 — Present</div>
          <div class="role">Registered Freelancer • Germany (Remote)</div>
          <p class="desc">Frontend and bot projects for clients: rapid prototypes, automation pipelines, and focused consulting.</p>
        </div>

        <div class="item">
          <div class="when">2022 — 2024</div>
          <div class="role">Vice President of Art & Design • NetherGames Ltd (Remote)</div>
          <p class="desc">Led visual direction and design systems across brand and product surfaces; coordinated UI assets and guidelines.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
const root = ref(null)
onMounted(() => {
  if (!root.value) return
  const items = Array.from(root.value.querySelectorAll('.item'))
  gsap.from([root.value.querySelector('h1'), ...items], {
    opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', stagger: 0.06
  })
})
</script>

<style scoped>
.item{position:relative;padding-left:1rem;border-left:1px solid rgba(255,255,255,.15)}
.when{font-size:.75rem;opacity:.7}
.role{font-size:.95rem;font-weight:300}
.desc{font-size:.8rem;opacity:.85;margin-top:.25rem;line-height:1.6}
.subhead{margin-bottom:.25rem;font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;opacity:.85}
</style>
