<script setup lang="ts">
import type { ContactLink } from '~/data/portfolio';
import DecorSlot from '~/components/shared/DecorSlot.vue';
import MotionReveal from '~/components/shared/MotionReveal.vue';
import StickerChip from '~/components/shared/StickerChip.vue';

defineProps<{
  contactLinks: ContactLink[];
}>();

function isExternalLink(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

function getContactActionLabel(href: string) {
  return href.startsWith('mailto:') ? 'Email' : 'Open';
}

function getContactCardClasses(label: string) {
  if (label === 'LinkedIn') {
    return 'rotate-[-2deg] border-white/75 bg-gradient-to-br from-white via-[#ffe9f4] to-[#fff6d9] text-ink hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_24px_50px_rgba(255,122,183,0.18)]';
  }

  if (label === 'GitHub') {
    return 'rotate-[1.5deg] border-white/75 bg-gradient-to-br from-white via-[#eef5ff] to-[#e8fff4] text-ink hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_24px_50px_rgba(120,150,255,0.18)]';
  }

  if (label === 'Email') {
    return 'rotate-[-1deg] border-white/75 bg-gradient-to-br from-white via-[#fff0da] to-[#ffe8f3] text-ink hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_24px_50px_rgba(255,196,92,0.2)]';
  }

  return 'rotate-[2deg] border-white/75 bg-gradient-to-br from-white via-[#f7ecff] to-[#eaf7ff] text-ink hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_24px_50px_rgba(157,125,205,0.18)]';
}
</script>

<template>
  <section
    id="contact"
    class="section-shell overflow-x-clip overflow-y-visible pb-10 pt-2 sm:pb-14"
  >
    <MotionReveal
      class="section-bleed curve-panel-c relative overflow-x-clip overflow-y-visible border border-white/60 bg-gradient-to-br from-[#fff7d7] via-[#fff0f8] to-[#e7f7ff] p-5 text-ink shadow-dreamy sm:p-8 lg:p-10 xl:px-14"
    >
      <div
        class="absolute left-[-4rem] top-[-3rem] h-40 w-40 rounded-full bg-[#ffd8ea]/70 blur-3xl"
      />
      <div
        class="absolute bottom-[-4rem] right-[-3rem] h-44 w-44 rounded-full bg-[#dff6ff]/80 blur-3xl"
      />
      <img
        src="/yellow_sparkle_1.gif"
        alt=""
        aria-hidden="true"
        class="float-orbit left-[4%] top-[12%] hidden w-14 -rotate-[10deg] object-contain opacity-90 lg:block animate-float"
      />
      <img
        src="/left_Arrow_Green.gif"
        alt=""
        aria-hidden="true"
        class="float-orbit right-[6%] top-[16%] hidden w-16 rotate-[14deg] object-contain opacity-90 xl:block animate-drift"
      />
      <img
        src="/purple_stars.gif"
        alt=""
        aria-hidden="true"
        class="float-orbit left-[48%] bottom-[-0.6rem] hidden w-16 rotate-[7deg] object-contain opacity-75 xl:block animate-float"
      />

      <div
        class="relative z-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end"
      >
        <div class="lg:pl-8 xl:pl-14">
          <span
            class="inline-flex rounded-full border border-white/60 bg-white/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-ink/70 shadow-float backdrop-blur-sm"
          >
            Contact
          </span>

          <h2
            class="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[0.92] text-balance sm:text-6xl lg:text-7xl"
          >
            Send me a note if you want something thoughtful, soft, and well
            made.
          </h2>

          <p class="mt-5 max-w-2xl text-base leading-8 text-ink/72 sm:text-lg">
            I am open to thoughtful product work, creative websites, and
            collaborations that want both technical clarity and a softer visual
            point of view. London-based, but always carrying a little Italian
            warmth into the work.
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <StickerChip label="London based" tone="pink" icon="✦" />
            <StickerChip
              label="front-end + creative"
              tone="lavender"
              icon="♡"
            />
          </div>
        </div>

        <div
          class="card-hover-soft rounded-[2.25rem] border border-white/60 bg-white/48 p-5 shadow-dreamy backdrop-blur-xl sm:p-6 lg:-mr-2 xl:-mr-10"
        >
          <div class="grid gap-4">
            <a
              v-for="link in contactLinks"
              :key="link.label"
              :href="link.href"
              :target="isExternalLink(link.href) ? '_blank' : undefined"
              :rel="isExternalLink(link.href) ? 'noreferrer' : undefined"
              :class="[
                'group card-hover-lilt card-wiggle rounded-[1.75rem] border p-4 shadow-float backdrop-blur-sm transition duration-500',
                getContactCardClasses(link.label),
              ]"
            >
              <div class="flex items-center justify-between gap-4">
                <p class="font-display text-3xl font-semibold">
                  {{ link.label }}
                </p>
                <span
                  class="text-sm font-semibold uppercase tracking-[0.2em] text-ink/48 transition duration-300 group-hover:text-ink/70"
                  >{{ getContactActionLabel(link.href) }}</span
                >
              </div>
              <p class="mt-2 text-sm leading-7 text-ink/66">
                {{ link.caption }}
              </p>
            </a>
          </div>

          <div class="mt-5">
            <DecorSlot
              label="final illustration / sticker cluster"
              accent="pink"
            />
          </div>
        </div>
      </div>
    </MotionReveal>
  </section>
</template>

<style scoped>
/* Wiggle-bounce on hover for contact cards */
@keyframes cardWiggle {
  0% {
    transform: rotate(0deg) translateY(0);
  }
  18% {
    transform: rotate(-4deg) translateY(-4px);
  }
  36% {
    transform: rotate(4deg) translateY(-6px);
  }
  52% {
    transform: rotate(-2deg) translateY(-3px);
  }
  68% {
    transform: rotate(1.5deg) translateY(-1px);
  }
  84% {
    transform: rotate(-0.5deg) translateY(0);
  }
  100% {
    transform: rotate(0deg) translateY(0);
  }
}

/* This overrides the rotate set by getContactCardClasses during hover */
.card-wiggle:hover {
  animation: cardWiggle 480ms cubic-bezier(0.22, 1, 0.36, 1) both;
  /* Let the animation handle the transform, disable the Tailwind translate */
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .card-wiggle:hover {
    animation: none;
  }
}
</style>
