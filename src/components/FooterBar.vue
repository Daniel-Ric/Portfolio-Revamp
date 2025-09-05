<template>
  <footer class="relative mt-16">
    <div class="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-b from-transparent via-white/5 to-white/10 opacity-[0.07]"></div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs sm:text-[13px] opacity-70 text-center sm:text-left">
          © 2025 SpindexGFX — Crafting fast frontends & pragmatic bots.
        </p>

        <nav class="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
          <a class="footer-link" href="https://github.com/Daniel-Ric" target="_blank" rel="noopener" aria-label="GitHub">
            <i class="fa-brands fa-github"></i><span>GitHub</span>
          </a>
          <a class="footer-link" href="https://www.linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">
            <i class="fa-brands fa-linkedin"></i><span>LinkedIn</span>
          </a>
          <a class="footer-link" href="https://discord.com/app" target="_blank" rel="noopener" aria-label="Discord">
            <i class="fa-brands fa-discord"></i><span>Discord</span>
          </a>
          <a class="footer-link" href="mailto:hello@example.com" aria-label="Email">
            <i class="fa-solid fa-envelope"></i><span>Email</span>
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer-link{
  display:inline-flex;align-items:center;gap:.45rem;
  opacity:.85;padding:.45rem .7rem;border:1px solid rgba(255,255,255,.14);
  border-radius:.75rem;background:linear-gradient(90deg,rgba(255,255,255,.08),transparent)
}
.footer-link:hover{opacity:1;border-color:rgba(255,255,255,.28)}
</style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
</style>
