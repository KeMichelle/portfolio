<script setup lang="ts">
import { type Ref, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  codeProjects,
  contactLinks,
  friendReviews,
  servicePillars,
  webProjects,
} from '~/data/portfolio';
import AboutSection from '~/components/home/AboutSection.vue';
import ContactSection from '~/components/home/ContactSection.vue';
import HeroSection from '~/components/home/HeroSection.vue';
import ProofSection from '~/components/home/ProofSection.vue';
import SkillsSection from '~/components/home/SkillsSection.vue';
import WebProjectsSection from '~/components/home/WebProjectsSection.vue';

useSeoMeta({
  title: 'Michelle Aprile',
  description:
    'Michelle Aprile is a London-based Software Engineer with 2+ years of experience across Vue, Nuxt, Angular, React, TypeScript, and Cypress, with a soft creative eye for styling and visual storytelling.',
  ogTitle: 'Michelle Aprile',
  ogDescription:
    'A soft, grounded portfolio for Michelle Aprile: Software Engineer, creative developer, and stylist based in London.',
  twitterCard: 'summary_large_image',
});

// Scroll-triggered section entrances — each section materialises as it enters the viewport
const sec2 = ref<HTMLElement | null>(null);
const sec3 = ref<HTMLElement | null>(null);
const sec4 = ref<HTMLElement | null>(null);
const sec5 = ref<HTMLElement | null>(null);
const sec6 = ref<HTMLElement | null>(null);

const sec2Vis = ref(false);
const sec3Vis = ref(false);
const sec4Vis = ref(false);
const sec5Vis = ref(false);
const sec6Vis = ref(false);

let scrollRevealObs: IntersectionObserver | null = null;

onMounted(() => {
  if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sec2Vis.value =
      sec3Vis.value =
      sec4Vis.value =
      sec5Vis.value =
      sec6Vis.value =
        true;
    return;
  }

  const pairs: [Ref<HTMLElement | null>, Ref<boolean>][] = [
    [sec2, sec2Vis],
    [sec3, sec3Vis],
    [sec4, sec4Vis],
    [sec5, sec5Vis],
    [sec6, sec6Vis],
  ];

  scrollRevealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const pair = pairs.find(([r]) => r.value === entry.target);
        if (pair) pair[1].value = entry.isIntersecting;
      });
    },
    // Small rootMargin from top so the first section doesn't fire on load.
    { threshold: 0.08, rootMargin: '-60px 0px 0px 0px' },
  );

  pairs.forEach(([r]) => {
    if (r.value) scrollRevealObs!.observe(r.value);
  });
});

onBeforeUnmount(() => scrollRevealObs?.disconnect());
</script>

<template>
  <div class="scroll-stage">
    <!-- Hero — sits at the base layer, fades in immediately -->
    <div class="scroll-layer" style="--layer: 0" data-cursor="hero">
      <HeroSection :service-pillars="servicePillars" class="hero-entrance" />
    </div>

    <!-- Each subsequent section slides over the previous one as you scroll -->
    <div
      ref="sec2"
      class="scroll-layer"
      style="--layer: 1"
      data-cursor="web"
      :class="['section-scroll-reveal', sec2Vis && 'is-visible']"
    >
      <WebProjectsSection :projects="webProjects" />
    </div>

    <div
      ref="sec3"
      class="scroll-layer"
      style="--layer: 2"
      data-cursor="styling"
      :class="['section-scroll-reveal', sec3Vis && 'is-visible']"
    >
      <SkillsSection />
    </div>

    <div
      ref="sec4"
      class="scroll-layer"
      style="--layer: 3"
      data-cursor="about"
      :class="['section-scroll-reveal', sec4Vis && 'is-visible']"
    >
      <AboutSection />
    </div>

    <div
      ref="sec5"
      class="scroll-layer"
      style="--layer: 4"
      data-cursor="proof"
      :class="['section-scroll-reveal', sec5Vis && 'is-visible']"
    >
      <ProofSection
        :code-projects="codeProjects"
        :friend-reviews="friendReviews"
      />
    </div>

    <div
      ref="sec6"
      class="scroll-layer"
      style="--layer: 5"
      data-cursor="contact"
      :class="['section-scroll-reveal', sec6Vis && 'is-visible']"
    >
      <ContactSection :contact-links="contactLinks" />
    </div>
  </div>
</template>

<style scoped>
/**
 * Scroll stage — the overall page container.
 * Each child .scroll-layer gets a z-index from its --layer variable so
 * later sections visually stack on top of earlier ones as you scroll down.
 * A subtle top padding + background continuation makes the transition seamless.
 */
.scroll-stage {
  position: relative;
}

.scroll-layer {
  position: relative;
  z-index: calc(10 + var(--layer, 0));
  /* Soft cream background so sections don't show transparent gaps */
  background: transparent;
}

/* Layer 1+ get a slightly rounded top edge so each section "lifts" above
   the previous one — small overlap so sections card over one another. */
.scroll-layer:not(:first-child) {
  margin-top: -1rem;
  padding-top: 1rem;
  background: linear-gradient(
    180deg,
    rgba(255, 250, 246, 0.96) 0%,
    transparent 6rem
  );
  border-radius: 2.5rem 2.5rem 0 0;
}

/* Hero entrance — fires immediately on load */
.hero-entrance {
  opacity: 0;
  transform: translate3d(0, 18px, 0);
  animation: heroFadeUp 960ms cubic-bezier(0.22, 1, 0.36, 1) 60ms forwards;
}

@keyframes heroFadeUp {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-entrance {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .scroll-layer:not(:first-child) {
    margin-top: 0;
    padding-top: 0;
    border-radius: 0;
    background: transparent;
  }
}

@media (max-width: 639px) {
  .scroll-stage {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    scroll-snap-type: y proximity;
    padding-bottom: 1.25rem;
  }

  .scroll-layer {
    min-height: 100svh;
    display: flex;
    align-items: stretch;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  .scroll-layer > * {
    flex: 1;
  }

  .scroll-layer:not(:first-child) {
    margin-top: 0;
    padding-top: 0;
    border-radius: 0;
    background: transparent;
  }
}
</style>
