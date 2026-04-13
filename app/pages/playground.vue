<script setup lang="ts">
import { creativeProjects } from '~/data/portfolio';
import StylingSection from '~/components/home/StylingSection.vue';

useSeoMeta({
  title: 'Playground — Michelle Aprile',
  description:
    "A hidden corner of Michelle Aprile's portfolio: a draggable styling board, wardrobe experiments, and creative direction work.",
  robots: 'noindex',
});
</script>

<template>
  <div>
    <!-- Back link -->
    <div
      class="section-shell pt-6 pb-2 flex items-center justify-between flex-wrap gap-4"
    >
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/72 px-4 py-2 text-sm font-medium text-ink shadow-float backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white"
      >
        <span aria-hidden="true">←</span> Back
      </NuxtLink>

      <p
        class="rainbow-label text-[11px] font-semibold uppercase tracking-[0.26em]"
      >
        ✦ Playground ✦
      </p>
    </div>

    <StylingSection :projects="creativeProjects" />
  </div>
</template>

<style scoped>
@keyframes rainbowShift {
  0% {
    color: #ff6b9d;
  }
  14% {
    color: #ff9f43;
  }
  28% {
    color: #ffd32a;
  }
  42% {
    color: #26de81;
  }
  57% {
    color: #45aaf2;
  }
  71% {
    color: #a55eea;
  }
  85% {
    color: #fd79a8;
  }
  100% {
    color: #ff6b9d;
  }
}

.rainbow-label {
  animation: rainbowShift 3s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .rainbow-label {
    animation: none;
    color: inherit;
    opacity: 0.5;
  }
}
</style>
