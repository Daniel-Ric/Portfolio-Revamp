<template>
  <section ref="root" class="mx-auto max-w-lg px-4 sm:px-6 py-16">
    <header class="flex flex-col gap-2">
      <h1 class="text-lg sm:text-xl font-light tracking-[0.12em] uppercase">Contact</h1>
      <p class="text-sm opacity-80">Choose how you want to reach out — Discord or Email — and add a bit of context.</p>
    </header>

    <div class="mt-5 segmented">
      <button :class="['seg-btn', method==='discord' && 'is-active']" @click="switchMethod('discord')">
        <i class="fa-brands fa-discord"></i> Discord
      </button>
      <button :class="['seg-btn', method==='email' && 'is-active']" @click="switchMethod('email')">
        <i class="fa-solid fa-envelope"></i> Email
      </button>
    </div>

    <form @submit.prevent="submit" class="mt-6 space-y-5" ref="formWrap">
      <div>
        <label class="label"><i class="fa-solid fa-tags"></i> Topics</label>
        <div class="flex flex-wrap gap-2 mt-2">
          <button
            v-for="t in allTopics"
            :key="t"
            type="button"
            :class="['chip', form.topics.includes(t) && 'is-active']"
            @click="toggleTopic(t)"
          >{{ t }}</button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="label"><i class="fa-solid fa-timeline"></i> Timeframe</label>
          <select v-model="form.timeframe" class="field">
            <option>ASAP</option>
            <option>1–2 weeks</option>
            <option>2–4 weeks</option>
            <option>1–2 months</option>
          </select>
        </div>
        <div>
          <label class="label"><i class="fa-solid fa-sack-dollar"></i> Budget</label>
          <select v-model="form.budget" class="field">
            <option>Exploring</option>
            <option>€500–1k</option>
            <option>€1–3k</option>
            <option>€3–8k</option>
            <option>€8k+</option>
          </select>
        </div>
      </div>

      <div v-show="method==='discord'" ref="discordWrap" class="space-y-4">
        <div>
          <label class="label"><i class="fa-brands fa-discord"></i> Discord username or ID</label>
          <input v-model="form.discord" placeholder="e.g. SpindexGFX or 123456789012345678" class="field" required />
        </div>
        <div>
          <label class="label"><i class="fa-solid fa-message"></i> Message</label>
          <textarea v-model="form.message" rows="5" placeholder="What would you like to build?" class="field" required></textarea>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <button type="submit" class="btn-solid w-full sm:w-auto">
            <i class="fa-solid fa-paper-plane"></i> Prepare DM
          </button>
          <a
            class="btn-ghost w-full sm:w-auto"
            href="https://discord.com/app"
            target="_blank" rel="noopener"
          ><i class="fa-brands fa-discord"></i> Open Discord</a>
        </div>

        <p v-if="copied" class="text-xs opacity-80">
          DM template copied — paste it in Discord. I’ll reply soon.
        </p>
      </div>

      <div v-show="method==='email'" ref="emailWrap" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="label"><i class="fa-solid fa-user"></i> Name</label>
            <input v-model="form.name" placeholder="Your name" class="field" required />
          </div>
          <div>
            <label class="label"><i class="fa-solid fa-at"></i> Email</label>
            <input v-model="form.email" type="email" placeholder="you@example.com" class="field" required />
          </div>
        </div>

        <div>
          <label class="label"><i class="fa-solid fa-heading"></i> Subject</label>
          <input v-model="form.subject" placeholder="Quick summary" class="field" />
        </div>

        <div>
          <label class="label"><i class="fa-solid fa-message"></i> Message</label>
          <textarea v-model="form.message" rows="6" placeholder="Tell me about your project…" class="field" required></textarea>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <button type="submit" class="btn-solid w-full sm:w-auto">
            <i class="fa-solid fa-envelope-open-text"></i> Send via Email
          </button>
          <a :href="mailtoHref" class="btn-ghost w-full sm:w-auto">
            <i class="fa-solid fa-paper-plane"></i> Open Mail App
          </a>
        </div>

        <p v-if="sent" class="text-xs opacity-80">Thanks — I’ll get back to you soon.</p>
      </div>

      <div>
        <label class="label"><i class="fa-solid fa-paperclip"></i> Optional attachment</label>
        <input type="file" class="field" />
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { gsap } from 'gsap'

const root = ref(null)
const formWrap = ref(null)
const discordWrap = ref(null)
const emailWrap = ref(null)

const method = ref('discord') // 'discord' | 'email'
const copied = ref(false)
const sent = ref(false)

const allTopics = ['Frontend', 'Bots', 'Integrations', 'Consulting', 'Automation', 'Other']

const form = ref({
  topics: [],
  timeframe: 'ASAP',
  budget: 'Exploring',
  message: '',

  discord: '',

  name: '',
  email: '',
  subject: ''
})

const mailtoHref = computed(() => {
  const to = 'hello@example.com' // change to your inbox
  const subject = encodeURIComponent(form.value.subject || 'Project inquiry')
  const body = encodeURIComponent(
    [
      `Name: ${form.value.name}`,
      `Email: ${form.value.email}`,
      `Topics: ${form.value.topics.join(', ') || '—'}`,
      `Timeframe: ${form.value.timeframe}`,
      `Budget: ${form.value.budget}`,
      '',
      form.value.message || ''
    ].join('\n')
  )
  return `mailto:${to}?subject=${subject}&body=${body}`
})

function toggleTopic(t) {
  const set = new Set(form.value.topics)
  set.has(t) ? set.delete(t) : set.add(t)
  form.value.topics = Array.from(set)
}

function switchMethod(next) {
  if (method.value === next) return
  const hide = method.value === 'discord' ? discordWrap.value : emailWrap.value
  const show = next === 'discord' ? discordWrap.value : emailWrap.value
  gsap.to(hide, { opacity: 0, y: 8, duration: 0.18, ease: 'power1.inOut', onComplete: async () => {
      method.value = next
      await nextTick()
      gsap.fromTo(show, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' })
    }})
}

function submit() {
  if (method.value === 'discord') {
    const template = [
      `Hi SpindexGFX — quick inquiry`,
      ``,
      `Topics: ${form.value.topics.join(', ') || '—'}`,
      `Timeframe: ${form.value.timeframe}`,
      `Budget: ${form.value.budget}`,
      ``,
      form.value.message || ''
    ].join('\n')
    navigator.clipboard?.writeText(template).then(() => {
      copied.value = true
      setTimeout(() => (copied.value = false), 3000)
      window.open('https://discord.com/app', '_blank', 'noopener')
    })
  } else {
    window.location.href = mailtoHref.value
    sent.value = true
    setTimeout(() => (sent.value = false), 3000)
  }
}

onMounted(() => {
  if (!root.value) return
  const inputs = Array.from(root.value.querySelectorAll('input, textarea, select, button'))
  gsap.from([root.value.querySelector('h1'), ...inputs], {
    opacity: 0, y: 10, duration: 0.55, ease: 'power2.out', stagger: 0.05
  })
})

watch(() => [form.value.topics.join(','), form.value.timeframe], () => {
})
</script>

<style scoped>
.label{display:flex;gap:.5rem;align-items:center;font-size:.8rem;opacity:.9}

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

.field{
  width:100%;
  background:transparent;
  border:1px solid rgba(255,255,255,.15);
  border-radius:1rem;
  padding:.65rem .9rem;
  font-size:.9rem;
  outline:none;
  background:linear-gradient(90deg,rgba(255,255,255,.08),transparent)
}
.field:focus{border-color:rgba(255,255,255,.3)}

.chip{
  border:1px solid rgba(255,255,255,.15);
  padding:.45rem .9rem;border-radius:9999px;
  font-size:.75rem;background:linear-gradient(90deg,rgba(255,255,255,.06),transparent)
}
.chip.is-active{
  border-color:rgba(255,255,255,.3);
  background:linear-gradient(90deg,rgba(255,255,255,.14),transparent)
}

.btn-solid{
  display:inline-flex;align-items:center;justify-content:center;
  gap:.5rem;
  padding:.65rem 1.1rem;border-radius:1rem;
  border:1px solid rgba(255,255,255,.22);
  letter-spacing:.2em;text-transform:uppercase;font-size:.72rem;
  background:linear-gradient(90deg,rgba(255,255,255,.14),transparent)
}
.btn-ghost{
  display:inline-flex;align-items:center;justify-content:center;
  gap:.5rem;
  padding:.65rem 1.1rem;border-radius:1rem;
  border:1px solid rgba(255,255,255,.16);
  letter-spacing:.2em;text-transform:uppercase;font-size:.72rem;
  background:linear-gradient(90deg,rgba(255,255,255,.08),transparent)
}
</style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
</style>
