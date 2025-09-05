<template>
  <section class="mx-auto max-w-xl px-4 sm:px-6 py-24 text-center">
    <h1 class="text-lg font-light tracking-[0.12em] uppercase">404 — Not Found</h1>
    <p class="mt-3 text-sm opacity-80">The page you’re looking for doesn’t exist or was moved.</p>
    <RouterLink to="/" class="inline-flex mt-6 px-4 py-2 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase hover:border-white/40">Go Home</RouterLink>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
