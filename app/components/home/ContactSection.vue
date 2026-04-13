<script setup lang="ts">
import type { ContactLink } from '~/data/portfolio';
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
    return 'rotate-[-2deg] border-white/75 bg-gradient-to-br from-white via-[#ffe9f4] to-[#fff6d9] text-ink hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_24px_50px_rgba(255,122,183,0.18)]';
  }

  if (label === 'GitHub') {
    return 'rotate-[1.5deg] border-white/75 bg-gradient-to-br from-white via-[#eef5ff] to-[#e8fff4] text-ink hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_24px_50px_rgba(120,150,255,0.18)]';
  }

  if (label === 'Email') {
    return 'rotate-[-1deg] border-white/75 bg-gradient-to-br from-white via-[#fff0da] to-[#ffe8f3] text-ink hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_24px_50px_rgba(255,196,92,0.2)]';
  }

  if (label === 'Instagram') {
    return 'rotate-[1deg] border-white/75 bg-gradient-to-br from-white via-[#fce8ff] to-[#ffe0f5] text-ink hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_24px_50px_rgba(220,130,200,0.2)]';
  }

  return 'rotate-[2deg] border-white/75 bg-gradient-to-br from-white via-[#f7ecff] to-[#eaf7ff] text-ink hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_24px_50px_rgba(157,125,205,0.18)]';
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
            If you're looking for a website that feels thoughtful, clear, and
            visually refined, I'd love to hear from you.
          </h2>

          <p class="mt-5 max-w-2xl text-base leading-8 text-ink/72 sm:text-lg">
            I'm open to creative websites, product and front-end work, and
            freelance projects and collaborations.
          </p>

          <p class="mt-4 max-w-2xl text-base leading-8 text-ink/60 sm:text-lg">
            Based in London, working with clients everywhere, always bringing a
            soft, considered approach to both design and development.
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
                'group card-hover-lilt rounded-[1.75rem] border p-4 shadow-float backdrop-blur-sm transition duration-500',
                getContactCardClasses(link.label),
              ]"
            >
              <div class="flex items-center justify-between gap-4">
                <p class="contact-label font-display text-3xl font-semibold">
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
        </div>
      </div>
    </MotionReveal>

    <!-- Hidden gem — for the curious ones -->
    <div class="mt-8 flex justify-center">
      <NuxtLink
        to="/playground"
        class="playground-link group inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] transition duration-300"
      >
        <span class="transition duration-300 group-hover:rotate-12 inline-block"
          >✦</span
        >
        Playground
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
/* ── Card label: underline-reveal on hover ── */
.contact-label {
  position: relative;
  display: inline-block;
}

.contact-label::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  opacity: 0.3;
  transform: scaleX(0);
  transform-origin: left center;
  transition:
    transform 380ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 280ms ease;
}

.group:hover .contact-label::after {
  transform: scaleX(1);
  opacity: 0.5;
}

/* Rainbow hidden gem link */
@keyframes rainbowText {
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

.playground-link {
  animation: rainbowText 4s linear infinite;
  opacity: 0.45;
}

.playground-link:hover {
  opacity: 1;
  animation-duration: 1.2s;
}

@media (max-width: 639px) {
  .curve-panel-c {
    border-radius: 2.8rem 2.1rem 3rem 2rem / 2rem 3rem 2.3rem 2.8rem;
    padding-top: 4.5rem;
    padding-bottom: 2rem;
  }

  .curve-panel-c > .relative {
    gap: 1rem;
  }

  .curve-panel-c > .relative > div:last-child {
    margin-top: -0.8rem;
    transform: rotate(-1.6deg);
  }

  .curve-panel-c a.group:nth-child(odd) {
    transform: rotate(-1.25deg);
  }

  .curve-panel-c a.group:nth-child(even) {
    transform: rotate(1deg);
  }

  .playground-link {
    opacity: 0.7;
    letter-spacing: 0.24em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .playground-link {
    animation: none;
    color: inherit;
    opacity: 0.36;
  }
}
</style>
