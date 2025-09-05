<template>
  <main>
    <HeroBanner />
  </main>
</template>

<script setup>
import HeroBanner from '@/components/HeroBanner.vue'
</script>

<style scoped>
.panel{
  border:1px solid rgba(255,255,255,.12);
  border-radius:1rem;
  padding:1rem;
  background:linear-gradient(135deg,rgba(255,255,255,.06),transparent);
}

.stack{display:flex;flex-direction:column;gap:.5rem}
.stack-title{font-size:.8rem;opacity:.85;display:flex;align-items:center;gap:.5rem}
.stack-tags{display:flex;flex-wrap:wrap;gap:.4rem}
.chip{
  border:1px solid rgba(255,255,255,.15);
  padding:.4rem .75rem;border-radius:9999px;
  font-size:.75rem;background:linear-gradient(90deg,rgba(255,255,255,.06),transparent);
  display:inline-flex;gap:.45rem;align-items:center
}

.segmented{
  display:flex;gap:.35rem;
  padding:.25rem;border:1px solid rgba(255,255,255,.12);border-radius:9999px;
  background:linear-gradient(135deg,rgba(255,255,255,.05),transparent)
}
.seg-btn{
  padding:.45rem .8rem;border-radius:9999px;font-size:.72rem;
  letter-spacing:.14em;text-transform:uppercase;opacity:.85;border:1px solid transparent
}
.seg-btn.is-active{
  border-color:rgba(255,255,255,.25);
  background:linear-gradient(90deg,rgba(255,255,255,.14),transparent);
  opacity:1
}

.card{
  display:flex;flex-direction:column;gap:.8rem;
  border:1px solid rgba(255,255,255,.12);
  border-radius:1rem;padding:1.1rem;
  background:linear-gradient(135deg,rgba(255,255,255,.06),transparent);
  min-height:12.5rem
}
.card-head{display:flex;flex-direction:column;gap:.35rem}
.card-title{font-size:.95rem;font-weight:300}
.card-desc{font-size:.8rem;opacity:.85;line-height:1.6}
.card-tags{display:flex;gap:.4rem;flex-wrap:wrap}
.card-tags span{
  font-size:.7rem;opacity:.9;border:1px solid rgba(255,255,255,.14);
  padding:.25rem .5rem;border-radius:9999px;
  background:linear-gradient(90deg,rgba(255,255,255,.07),transparent)
}
.card-actions{display:flex;gap:.8rem;margin-top:auto}
.link{font-size:.75rem;opacity:.9;text-decoration:underline;display:inline-flex;gap:.45rem;align-items:center}
.link:hover{opacity:1}

.service{
  border:1px solid rgba(255,255,255,.12);
  border-radius:1rem;padding:1rem;
  background:linear-gradient(135deg,rgba(255,255,255,.05),transparent);
  min-height:7.5rem
}
.service h3{font-size:.9rem;font-weight:300;margin-bottom:.25rem;display:flex;gap:.5rem;align-items:center}
.service p{font-size:.8rem;opacity:.85;line-height:1.6}

.cta{
  display:flex;flex-direction:column;gap:.9rem;
  border:1px solid rgba(255,255,255,.12);
  border-radius:1rem;padding:1.1rem;
  background:linear-gradient(135deg,rgba(255,255,255,.06),transparent)
}
@media (min-width:640px){.cta{flex-direction:row;align-items:center;justify-content:space-between}}
.btn-solid{
  display:inline-flex;align-items:center;justify-content:center;
  padding:.65rem 1.1rem;border-radius:9999px;
  border:1px solid rgba(255,255,255,.22);
  letter-spacing:.2em;text-transform:uppercase;font-size:.72rem;
  background:linear-gradient(90deg,rgba(255,255,255,.14),transparent)
}
.btn-ghost{
  display:inline-flex;align-items:center;justify-content:center;
  padding:.6rem 1rem;border-radius:9999px;
  border:1px solid rgba(255,255,255,.16);
  letter-spacing:.2em;text-transform:uppercase;font-size:.72rem;
  background:linear-gradient(90deg,rgba(255,255,255,.08),transparent)
}
.divider{
  height:24px;border-radius:12px;
  background:linear-gradient(180deg,rgba(255,255,255,.06),transparent);
  opacity:.12
}
</style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
</style>
