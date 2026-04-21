<script setup lang="ts">
import { computed, ref } from 'vue';
import MotionReveal from '~/components/shared/MotionReveal.vue';

type SkillCard = {
  label: string;
  note: string;
  previewLabel: string;
  tokens: string[];
  src: string;
  tone: string;
  x: number;
  y: number;
  width: number;
  rotate: number;
  effect:
    | 'framework'
    | 'logic'
    | 'style'
    | 'tailwind'
    | 'motion'
    | 'tooling'
    | 'design'
    | 'app';
  motion: 'scrap-float-a' | 'scrap-float-b' | 'scrap-float-c';
};

const skillLogos: SkillCard[] = [
  {
    label: 'Vue.js',
    note: 'ui systems',
    previewLabel: 'reactive components snapping into place',
    tokens: ['ref()', 'props', 'slots'],
    src: 'https://cdn.simpleicons.org/vuedotjs/42B883',
    tone: 'from-[#e9fff1] via-white to-[#d9f8e6]',
    x: 4,
    y: 15,
    width: 10.5,
    rotate: -10,
    effect: 'framework',
    motion: 'scrap-float-a',
  },
  {
    label: 'Nuxt.js',
    note: 'full-stack vue',
    previewLabel: 'routes, islands, and app structure',
    tokens: ['pages/', 'server/', 'seo'],
    src: 'https://cdn.simpleicons.org/nuxt/00DC82',
    tone: 'from-[#e7fff2] via-white to-[#dcf8ea]',
    x: 21,
    y: 4,
    width: 10,
    rotate: 7,
    effect: 'framework',
    motion: 'scrap-float-b',
  },
  {
    label: 'Angular',
    note: 'structured apps',
    previewLabel: 'strong patterns for large screens',
    tokens: ['modules', 'forms', 'guards'],
    src: 'https://cdn.simpleicons.org/angular/DD0031',
    tone: 'from-[#fff0f4] via-white to-[#ffe0ea]',
    x: 40,
    y: 10,
    width: 10.2,
    rotate: -7,
    effect: 'framework',
    motion: 'scrap-float-c',
  },
  {
    label: 'Git',
    note: 'versioning',
    previewLabel: 'branches splitting, merging, and shipping',
    tokens: ['commit', 'branch', 'merge'],
    src: 'https://cdn.simpleicons.org/git/F05032',
    tone: 'from-[#fff5eb] via-white to-[#ffe8d7]',
    x: 58,
    y: 3,
    width: 9.8,
    rotate: 6,
    effect: 'tooling',
    motion: 'scrap-float-a',
  },
  {
    label: 'Figma',
    note: 'interface direction',
    previewLabel: 'frames, components, and layout rhythm',
    tokens: ['auto layout', 'tokens', 'prototype'],
    src: 'https://cdn.simpleicons.org/figma/F24E1E',
    tone: 'from-[#fff0f8] via-white to-[#efe7ff]',
    x: 77,
    y: 14,
    width: 10.5,
    rotate: -9,
    effect: 'design',
    motion: 'scrap-float-b',
  },
  {
    label: 'JavaScript',
    note: 'interaction logic',
    previewLabel: 'events, state changes, and small sparks',
    tokens: ['events', 'async', 'state'],
    src: 'https://cdn.simpleicons.org/javascript/F7DF1E',
    tone: 'from-[#fff9c8] via-white to-[#fff2a6]',
    x: 12,
    y: 42,
    width: 11,
    rotate: 5,
    effect: 'logic',
    motion: 'scrap-float-c',
  },
  {
    label: 'TypeScript',
    note: 'safer front-end',
    previewLabel: 'types lining everything up cleanly',
    tokens: ['types', 'guards', 'models'],
    src: 'https://cdn.simpleicons.org/typescript/3178C6',
    tone: 'from-[#eef5ff] via-white to-[#dbeaff]',
    x: 31,
    y: 32,
    width: 11,
    rotate: -8,
    effect: 'logic',
    motion: 'scrap-float-a',
  },
  {
    label: 'HTML',
    note: 'page structure',
    previewLabel: 'semantic blocks holding the layout together',
    tokens: ['section', 'article', 'nav'],
    src: 'https://cdn.simpleicons.org/html5/E34F26',
    tone: 'from-[#fff3ea] via-white to-[#ffe2d6]',
    x: 50,
    y: 45,
    width: 10,
    rotate: 8,
    effect: 'logic',
    motion: 'scrap-float-b',
  },
  {
    label: 'CSS',
    note: 'visual polish',
    previewLabel: 'spacing, layering, and soft contrast',
    tokens: ['grid', 'color', 'motion'],
    src: 'https://cdn.simpleicons.org/css/1572B6',
    tone: 'from-[#edf6ff] via-white to-[#d9eefe]',
    x: 68,
    y: 36,
    width: 9.8,
    rotate: -5,
    effect: 'style',
    motion: 'scrap-float-c',
  },
  {
    label: 'SCSS',
    note: 'design tokens',
    previewLabel: 'variables and mixins folding layers together',
    tokens: ['$rose', '@mixin', '&:hover'],
    src: 'https://cdn.simpleicons.org/sass/CC6699',
    tone: 'from-[#fff1f8] via-white to-[#ffe0ef]',
    x: 43,
    y: 63,
    width: 10.2,
    rotate: -4,
    effect: 'style',
    motion: 'scrap-float-a',
  },
  {
    label: 'Tailwind',
    note: 'utility styling',
    previewLabel: 'utility chips lifting into a quick system',
    tokens: ['flex', 'gap-3', 'rounded-full'],
    src: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    tone: 'from-[#ebfdff] via-white to-[#daf7fb]',
    x: 62,
    y: 65,
    width: 11.2,
    rotate: 6,
    effect: 'tailwind',
    motion: 'scrap-float-b',
  },
  {
    label: 'React',
    note: 'component work',
    previewLabel: 'component loops orbiting around state',
    tokens: ['hooks', 'state', 'jsx'],
    src: 'https://cdn.simpleicons.org/react/61DAFB',
    tone: 'from-[#ebfbff] via-white to-[#dff6ff]',
    x: 83,
    y: 50,
    width: 10.2,
    rotate: 7,
    effect: 'framework',
    motion: 'scrap-float-a',
  },
  {
    label: 'Docker',
    note: 'local environments',
    previewLabel: 'containers snapping into a clean stack',
    tokens: ['build', 'compose', 'ship'],
    src: 'https://cdn.simpleicons.org/docker/2496ED',
    tone: 'from-[#eef7ff] via-white to-[#dfefff]',
    x: 5,
    y: 67,
    width: 10.2,
    rotate: -6,
    effect: 'tooling',
    motion: 'scrap-float-b',
  },
  {
    label: 'Android Studio',
    note: 'mobile tooling',
    previewLabel: 'device frames and layouts in motion',
    tokens: ['layout', 'preview', 'device'],
    src: 'https://cdn.simpleicons.org/androidstudio/3DDC84',
    tone: 'from-[#efffea] via-white to-[#e0f7dc]',
    x: 26,
    y: 70,
    width: 12.2,
    rotate: 6,
    effect: 'app',
    motion: 'scrap-float-c',
  },
  {
    label: 'GSAP',
    note: 'motion systems',
    previewLabel: 'timelines, orbits, and staggered movement',
    tokens: ['timeline()', 'stagger', 'ease'],
    src: 'https://cdn.simpleicons.org/greensock/88CE02',
    tone: 'from-[#f7ffe7] via-white to-[#eefad6]',
    x: 81,
    y: 73,
    width: 10,
    rotate: -7,
    effect: 'motion',
    motion: 'scrap-float-c',
  },
];

const activeSkill = ref<string | null>(null);
const discovered = ref<string[]>([]);

const discoveredCount = computed(() => discovered.value.length);

function rememberSkill(label: string) {
  if (discovered.value.includes(label)) return;
  discovered.value = [...discovered.value, label];
}

function handleSkillEnter(label: string) {
  activeSkill.value = label;
  rememberSkill(label);
}

function handleSkillLeave() {
  activeSkill.value = null;
}

function handleSkillClick(label: string) {
  activeSkill.value = activeSkill.value === label ? null : label;
  rememberSkill(label);
}

function getMobileNoteStyle(index: number) {
  return {
    '--note-rotate': index % 2 === 0 ? '-1.6deg' : '1.4deg',
  };
}

function getSkillShellStyle(skill: SkillCard, isActive: boolean) {
  const left = `${skill.x}%`;
  const top = `${skill.y}%`;
  const width = `${skill.width}rem`;

  return {
    left,
    top,
    width,
    '--skill-rotate': `${skill.rotate}deg`,
    zIndex: isActive ? '40' : '10',
  };
}
</script>

<template>
  <section
    id="skills"
    class="section-shell relative overflow-x-clip overflow-y-visible pb-14 pt-6 sm:pb-20 sm:pt-10 lg:pb-24"
  >
    <div
      class="section-bleed relative overflow-x-clip overflow-y-visible px-5 sm:px-8 lg:px-12 xl:px-16"
    >
      <div
        class="ambient-blob absolute left-[3%] top-[8%] h-48 w-48 rounded-full bg-[#ffe2ee]/60 blur-3xl"
      />
      <div
        class="ambient-blob ambient-blob-slow absolute right-[7%] top-[12%] h-56 w-56 rounded-full bg-[#dff7ee]/55 blur-3xl"
      />
      <div
        class="ambient-blob ambient-blob-reverse absolute left-[24%] bottom-[0%] h-52 w-52 rounded-full bg-[#e8e2ff]/60 blur-3xl"
      />

      <div
        class="pointer-events-none absolute left-[6%] top-[4%] hidden lg:block"
      >
        <img
          src="/random_lines.png"
          alt=""
          aria-hidden="true"
          class="w-24 -rotate-[8deg] object-contain opacity-65"
        />
      </div>
      <div
        class="pointer-events-none absolute right-[6%] top-[26%] hidden lg:block"
      >
        <img
          src="/purple_stars.gif"
          alt=""
          aria-hidden="true"
          class="w-14 rotate-[10deg] object-contain opacity-90"
        />
      </div>
      <div
        class="pointer-events-none absolute left-[14%] bottom-[6%] hidden lg:block"
      >
        <img
          src="/yellow_sparkle_2.gif"
          alt=""
          aria-hidden="true"
          class="w-12 -rotate-[5deg] object-contain opacity-85"
        />
      </div>

      <MotionReveal class="relative z-10 max-w-3xl" :delay="60" direction="up">
        <span
          class="inline-flex rotate-[-4deg] border border-white/70 bg-white/78 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ink shadow-float"
          style="clip-path: polygon(3% 4%, 98% 0, 100% 90%, 6% 100%, 0 14%)"
        >
          Open the notes
        </span>

        <div class="mt-4 flex flex-wrap items-center gap-3">
          <span
            class="inline-flex rounded-full bg-white/74 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/68 shadow-float"
          >
            discovered {{ discoveredCount }} / {{ skillLogos.length }}
          </span>
          <span
            class="inline-flex rounded-full bg-[#fff0f7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/62 shadow-float"
          >
            tap on mobile, hover on desktop
          </span>
        </div>

        <h2
          class="mt-5 max-w-[42rem] font-display text-[3rem] font-semibold leading-[0.9] text-ink sm:text-[4rem] lg:text-[5rem]"
        >
          my skills
        </h2>

        <p
          class="mt-5 max-w-[40rem] text-base leading-8 text-ink/72 sm:text-lg"
        >
          these are the frameworks and tools i have used since the start of my
          career
        </p>
      </MotionReveal>

      <div
        class="relative z-10 mt-8 hidden min-h-[31rem] md:block lg:min-h-[34rem]"
      >
        <div class="skill-board-surface absolute inset-0">
          <span class="skill-board-grid" />
          <span class="skill-board-glow skill-board-glow-a" />
          <span class="skill-board-glow skill-board-glow-b" />
        </div>

        <button
          v-for="skill in skillLogos"
          :key="skill.label"
          type="button"
          :class="[
            'skill-scrap-shell absolute text-left',
            activeSkill === skill.label ? 'is-active' : '',
          ]"
          :style="getSkillShellStyle(skill, activeSkill === skill.label)"
          :aria-pressed="activeSkill === skill.label"
          @pointerenter="handleSkillEnter(skill.label)"
          @pointerleave="handleSkillLeave"
          @click="handleSkillClick(skill.label)"
        >
          <div
            :class="[
              'skill-scrap-inner relative border border-white/70 bg-gradient-to-br p-3.5 shadow-float backdrop-blur-sm transition duration-500 hover:shadow-dreamy',
              skill.tone,
              skill.motion,
              activeSkill === skill.label ? 'is-active' : '',
            ]"
          >
            <span class="skill-tape" />
            <div class="relative z-10 flex items-start gap-3">
              <div
                :class="[
                  'skill-logo-pocket mt-1 shrink-0',
                  `logo-pocket-${skill.effect}`,
                  activeSkill === skill.label ? 'is-active' : '',
                ]"
              >
                <span class="skill-logo-orbit skill-logo-orbit-a" />
                <span class="skill-logo-orbit skill-logo-orbit-b" />
                <span class="skill-logo-spark skill-logo-spark-a" />
                <span class="skill-logo-spark skill-logo-spark-b" />
                <img
                  :src="skill.src"
                  :alt="`${skill.label} logo`"
                  class="skill-logo-image h-9 w-9 object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <p
                  class="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/45"
                >
                  {{ skill.note }}
                </p>
                <p
                  class="mt-1 font-display text-[1.25rem] leading-[1.02] text-ink"
                >
                  {{ skill.label }}
                </p>
              </div>
            </div>
            <div class="relative z-10 skill-card-code mt-3">
              <span class="skill-card-code__line skill-card-code__line-a" />
              <span class="skill-card-code__line skill-card-code__line-b" />
              <span class="skill-card-code__badge">{{ skill.tokens[0] }}</span>
            </div>
            <p
              :class="[
                'skill-desktop-caption relative z-10 mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/48',
                activeSkill === skill.label ? 'is-active' : '',
              ]"
            >
              {{ skill.previewLabel }}
            </p>
          </div>
        </button>
      </div>

      <div class="relative z-10 mt-7 space-y-4 md:hidden">
        <article
          v-for="(skill, index) in skillLogos"
          :key="skill.label"
          :class="[
            'skill-mobile-note relative overflow-hidden border border-white/75 bg-gradient-to-br shadow-float',
            skill.tone,
            activeSkill === skill.label ? 'is-active' : '',
          ]"
          :style="getMobileNoteStyle(index)"
        >
          <span class="skill-tape skill-tape-mobile" />

          <button
            type="button"
            class="skill-mobile-note__toggle relative z-10 w-full text-left"
            :aria-expanded="activeSkill === skill.label"
            :aria-pressed="activeSkill === skill.label"
            @click="handleSkillClick(skill.label)"
          >
            <div class="flex items-start gap-3 pr-16">
              <div
                :class="[
                  'skill-logo-pocket mt-0.5 shrink-0',
                  `logo-pocket-${skill.effect}`,
                  activeSkill === skill.label ? 'is-active' : '',
                ]"
              >
                <span class="skill-logo-orbit skill-logo-orbit-a" />
                <span class="skill-logo-orbit skill-logo-orbit-b" />
                <span class="skill-logo-spark skill-logo-spark-a" />
                <span class="skill-logo-spark skill-logo-spark-b" />
                <img
                  :src="skill.src"
                  :alt="`${skill.label} logo`"
                  class="skill-logo-image h-9 w-9 object-contain"
                  loading="lazy"
                />
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p
                      class="text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/45"
                    >
                      {{ skill.note }}
                    </p>
                    <p
                      class="mt-1 font-display text-[1.5rem] leading-[0.98] text-ink"
                    >
                      {{ skill.label }}
                    </p>
                  </div>
                </div>

                <div class="skill-card-code mt-3">
                  <span class="skill-card-code__line skill-card-code__line-a" />
                  <span class="skill-card-code__line skill-card-code__line-b" />
                  <span class="skill-card-code__badge">{{
                    skill.tokens[0]
                  }}</span>
                </div>
              </div>
            </div>

            <span class="skill-mobile-note__status">
              {{ activeSkill === skill.label ? 'close' : 'open' }}
            </span>
            <span
              :class="[
                'skill-mobile-note__chevron',
                activeSkill === skill.label ? 'is-active' : '',
              ]"
              aria-hidden="true"
            />
          </button>

          <div
            :class="[
              'skill-mobile-note__body-wrap',
              activeSkill === skill.label ? 'is-active' : '',
            ]"
            :aria-hidden="activeSkill === skill.label ? 'false' : 'true'"
          >
            <div
              :class="[
                'skill-mobile-note__body relative z-10 mt-1',
                `board-effect-${skill.effect}`,
              ]"
            >
              <p class="max-w-[20rem] text-sm leading-6 text-ink/70">
                {{ skill.previewLabel }}
              </p>

              <div class="skill-mobile-note__divider" />

              <div
                :class="[
                  'skill-stage skill-stage--mobile',
                  `stage-effect-${skill.effect}`,
                  activeSkill === skill.label ? 'is-awake' : '',
                ]"
              >
                <span class="skill-stage-ring skill-stage-ring-a" />
                <span class="skill-stage-ring skill-stage-ring-b" />
                <span class="skill-stage-beam skill-stage-beam-a" />
                <span class="skill-stage-beam skill-stage-beam-b" />
                <span class="skill-stage-core" />
                <span class="skill-stage-dot skill-stage-dot-a" />
                <span class="skill-stage-dot skill-stage-dot-b" />
                <span class="skill-stage-dot skill-stage-dot-c" />
              </div>

              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="token in skill.tokens"
                  :key="`mobile-token-${skill.label}-${token}`"
                  class="skill-mobile-chip"
                >
                  {{ token }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-mobile-note {
  clip-path: polygon(1% 7%, 11% 0, 98% 4%, 100% 92%, 92% 100%, 4% 97%, 0 22%);
  transform-origin: center top;
  transform: rotate(var(--note-rotate));
  transition:
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 320ms ease;
}

.skill-mobile-note.is-active {
  transform: translate3d(0, -0.18rem, 0) rotate(0deg);
  box-shadow: 0 26px 58px rgba(88, 64, 108, 0.18);
}

.skill-mobile-note::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent 38%),
    repeating-linear-gradient(
      180deg,
      transparent 0,
      transparent 1.45rem,
      rgba(71, 57, 84, 0.055) 1.45rem,
      rgba(71, 57, 84, 0.055) 1.52rem
    );
  opacity: 0.78;
  pointer-events: none;
}

.skill-mobile-note__toggle {
  padding: 1.1rem 1rem 1rem;
}

.skill-mobile-note__status {
  position: absolute;
  right: 2.3rem;
  top: 1.15rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(71, 57, 84, 0.42);
}

.skill-mobile-note__chevron {
  position: absolute;
  right: 1rem;
  top: 1.3rem;
  width: 0.72rem;
  height: 0.72rem;
  border-right: 2px solid rgba(71, 57, 84, 0.42);
  border-bottom: 2px solid rgba(71, 57, 84, 0.42);
  transform: rotate(45deg);
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.skill-mobile-note__chevron.is-active {
  transform: rotate(225deg);
}

.skill-mobile-note__body {
  margin-left: 0.8rem;
  margin-right: 0.8rem;
  margin-bottom: 0.9rem;
  border-radius: 1.35rem;
  border: 1px solid rgba(255, 255, 255, 0.65);
  padding: 0.95rem 0.95rem 1rem;
  transform-origin: top center;
}

.skill-mobile-note__body-wrap {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-0.35rem);
  transition:
    max-height 520ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 240ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.skill-mobile-note__body-wrap.is-active {
  max-height: 26rem;
  opacity: 1;
  transform: translateY(0);
}

.skill-mobile-note__divider {
  margin-top: 0.85rem;
  height: 1px;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(71, 57, 84, 0),
    rgba(71, 57, 84, 0.14),
    rgba(71, 57, 84, 0)
  );
}

.skill-tape-mobile {
  top: -0.55rem;
  width: 3.4rem;
  height: 0.95rem;
}

.skill-scrap-shell {
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  transform: rotate(var(--skill-rotate));
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.skill-scrap-shell:hover,
.skill-scrap-shell:focus-visible,
.skill-scrap-shell.is-active {
  transform: translate3d(0, -0.55rem, 0)
    rotate(calc(var(--skill-rotate) + 2deg)) scale(1.05);
}

.skill-scrap-inner {
  clip-path: polygon(2% 8%, 12% 0, 100% 4%, 97% 91%, 89% 100%, 0 96%);
  will-change: transform;
  text-align: left;
}

.skill-scrap-inner.is-active {
  box-shadow: 0 24px 54px rgba(88, 64, 108, 0.18);
}

.skill-logo-pocket {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
}

.skill-logo-image {
  position: relative;
  z-index: 2;
}

.skill-logo-orbit,
.skill-logo-spark {
  position: absolute;
  opacity: 0;
  transition:
    opacity 220ms ease,
    transform 360ms cubic-bezier(0.22, 1, 0.36, 1);
}

.skill-logo-orbit {
  inset: 50% auto auto 50%;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.62);
  transform: translate(-50%, -50%) scale(0.86);
}

.skill-logo-orbit-a {
  width: 2.8rem;
  height: 2.8rem;
}

.skill-logo-orbit-b {
  width: 3.5rem;
  height: 3.5rem;
  border-style: dashed;
}

.skill-logo-spark {
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 0 16px rgba(255, 255, 255, 0.55);
}

.skill-logo-spark-a {
  left: 0.1rem;
  top: 0.35rem;
}

.skill-logo-spark-b {
  right: 0.05rem;
  bottom: 0.3rem;
}

.skill-logo-pocket.is-active .skill-logo-orbit,
.skill-logo-pocket.is-active .skill-logo-spark {
  opacity: 1;
}

.skill-logo-pocket.is-active .skill-logo-orbit-a {
  animation: logoPulse 1.7s ease-in-out infinite;
}

.skill-logo-pocket.is-active .skill-logo-orbit-b {
  animation: logoSpin 7s linear infinite;
}

.skill-logo-pocket.is-active .skill-logo-spark-a,
.skill-logo-pocket.is-active .skill-logo-spark-b {
  animation: logoSpark 1.2s ease-in-out infinite alternate;
}

.skill-desktop-caption {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-0.3rem);
  transition:
    max-height 280ms ease,
    opacity 220ms ease,
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.skill-desktop-caption.is-active {
  max-height: 2rem;
  opacity: 1;
  transform: translateY(0);
}

.skill-board-surface {
  border-radius: 2.2rem;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.26),
    rgba(255, 255, 255, 0.06)
  );
  opacity: 0.6;
  transition:
    background-color 320ms ease,
    opacity 320ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.skill-board-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(71, 57, 84, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71, 57, 84, 0.06) 1px, transparent 1px);
  background-size: 1.45rem 1.45rem;
  mask-image: radial-gradient(circle at center, black 62%, transparent 100%);
  opacity: 0.45;
}

.skill-board-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(38px);
  transition:
    opacity 320ms ease,
    transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 320ms ease;
}

.skill-board-glow-a {
  left: 18%;
  top: 18%;
  width: 12rem;
  height: 12rem;
  background: rgba(255, 214, 228, 0.4);
}

.skill-board-glow-b {
  right: 14%;
  bottom: 16%;
  width: 13rem;
  height: 13rem;
  background: rgba(221, 244, 235, 0.4);
}

.skill-stage {
  position: absolute;
  width: 19rem;
  height: 19rem;
  rotate: -4deg;
  opacity: 0.7;
  transition:
    opacity 320ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.skill-stage.is-awake {
  opacity: 1;
}

.skill-stage--mobile {
  position: relative;
  left: auto;
  top: auto;
  width: 100%;
  height: 8.6rem;
  transform: none;
  translate: 0;
  rotate: 0deg;
}

.skill-mobile-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  padding: 0.28rem 0.6rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(71, 57, 84, 0.72);
}

.skill-stage-ring,
.skill-stage-beam,
.skill-stage-core,
.skill-stage-dot {
  position: absolute;
}

.skill-stage-ring {
  inset: 50% auto auto 50%;
  border-radius: 999px;
  border: 1px solid rgba(71, 57, 84, 0.12);
  transform: translate(-50%, -50%);
}

.skill-stage-ring-a {
  width: 8rem;
  height: 8rem;
}

.skill-stage-ring-b {
  width: 12.5rem;
  height: 12.5rem;
  border-style: dashed;
  opacity: 0.7;
}

.skill-stage-beam {
  left: 50%;
  top: 50%;
  width: 8.5rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(71, 57, 84, 0.18),
    transparent
  );
  transform-origin: center;
}

.skill-stage-beam-a {
  transform: translate(-50%, -50%) rotate(28deg);
}

.skill-stage-beam-b {
  transform: translate(-50%, -50%) rotate(-34deg);
}

.skill-stage-core {
  left: 50%;
  top: 50%;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 999px;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.95),
    rgba(255, 230, 239, 0.65) 58%,
    rgba(255, 255, 255, 0.05) 100%
  );
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.5),
    0 14px 34px rgba(95, 74, 116, 0.14);
  transform: translate(-50%, -50%);
}

.skill-stage-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.5);
}

.skill-stage-dot-a {
  left: 31%;
  top: 32%;
}

.skill-stage-dot-b {
  right: 27%;
  top: 38%;
}

.skill-stage-dot-c {
  left: 47%;
  bottom: 22%;
}

.skill-card-code {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.skill-card-code__line {
  display: block;
  height: 2px;
  border-radius: 999px;
  background: rgba(71, 57, 84, 0.18);
  transition:
    transform 340ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 260ms ease,
    background-color 260ms ease;
}

.skill-card-code__line-a {
  width: 2.8rem;
}

.skill-card-code__line-b {
  width: 1.8rem;
}

.skill-card-code__badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.62);
  padding: 0.22rem 0.5rem;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(71, 57, 84, 0.62);
  transition:
    transform 340ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 260ms ease,
    color 260ms ease;
}

.skill-scrap-inner.is-active .skill-card-code__line-a {
  transform: scaleX(1.18);
}

.skill-scrap-inner.is-active .skill-card-code__line-b {
  transform: scaleX(1.32);
}

.skill-scrap-inner.is-active .skill-card-code__badge {
  transform: translateX(0.2rem);
}

.board-effect-framework {
  background: linear-gradient(
    180deg,
    rgba(231, 255, 242, 0.34),
    rgba(255, 255, 255, 0.08)
  );
}

.board-effect-logic {
  background: linear-gradient(
    180deg,
    rgba(255, 249, 200, 0.34),
    rgba(255, 255, 255, 0.08)
  );
}

.board-effect-style {
  background: linear-gradient(
    180deg,
    rgba(255, 235, 245, 0.34),
    rgba(255, 255, 255, 0.08)
  );
}

.board-effect-tailwind {
  background: linear-gradient(
    180deg,
    rgba(232, 252, 255, 0.4),
    rgba(255, 255, 255, 0.08)
  );
}

.board-effect-motion {
  background: linear-gradient(
    180deg,
    rgba(246, 255, 228, 0.36),
    rgba(255, 255, 255, 0.08)
  );
}

.board-effect-tooling {
  background: linear-gradient(
    180deg,
    rgba(238, 247, 255, 0.38),
    rgba(255, 255, 255, 0.08)
  );
}

.board-effect-design {
  background: linear-gradient(
    180deg,
    rgba(255, 240, 248, 0.36),
    rgba(255, 255, 255, 0.08)
  );
}

.board-effect-app {
  background: linear-gradient(
    180deg,
    rgba(239, 255, 234, 0.38),
    rgba(255, 255, 255, 0.08)
  );
}

.logo-pocket-framework.is-active .skill-logo-spark,
.logo-pocket-app.is-active .skill-logo-spark {
  background: rgba(221, 255, 237, 0.94);
}

.logo-pocket-logic.is-active .skill-logo-spark {
  background: rgba(255, 245, 178, 0.96);
}

.logo-pocket-style.is-active .skill-logo-spark,
.logo-pocket-design.is-active .skill-logo-spark {
  background: rgba(255, 222, 239, 0.96);
}

.logo-pocket-tailwind.is-active .skill-logo-spark {
  background: rgba(217, 249, 255, 0.96);
}

.logo-pocket-motion.is-active .skill-logo-spark {
  background: rgba(237, 255, 200, 0.96);
}

.logo-pocket-tooling.is-active .skill-logo-spark {
  background: rgba(221, 239, 255, 0.96);
}

.stage-effect-framework.is-awake .skill-stage-ring-a {
  animation: stagePulse 2.8s ease-in-out infinite;
}

.stage-effect-framework.is-awake .skill-stage-ring-b {
  animation: stageSpin 12s linear infinite;
}

.stage-effect-logic.is-awake .skill-stage-beam {
  animation: stageSweep 2.2s ease-in-out infinite alternate;
}

.stage-effect-style.is-awake .skill-stage-ring-a,
.stage-effect-design.is-awake .skill-stage-ring-a {
  animation: stageTilt 3s ease-in-out infinite alternate;
}

.stage-effect-tailwind.is-awake .skill-stage-dot {
  animation: stagePop 1.2s ease-in-out infinite;
}

.stage-effect-motion.is-awake .skill-stage-ring-b {
  animation: stageSpin 7s linear infinite;
}

.stage-effect-motion.is-awake .skill-stage-dot-a,
.stage-effect-motion.is-awake .skill-stage-dot-b,
.stage-effect-motion.is-awake .skill-stage-dot-c {
  animation: stageOrbit 2.8s ease-in-out infinite alternate;
}

.stage-effect-tooling.is-awake .skill-stage-beam-a,
.stage-effect-tooling.is-awake .skill-stage-beam-b {
  animation: stageSlide 2.4s ease-in-out infinite alternate;
}

.stage-effect-app.is-awake .skill-stage-core {
  animation: stagePulse 2.2s ease-in-out infinite;
}

.stage-effect-framework .skill-stage-core {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.95),
    rgba(217, 248, 230, 0.8) 58%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

.stage-effect-logic .skill-stage-core {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.95),
    rgba(255, 243, 180, 0.8) 58%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

.stage-effect-style .skill-stage-core,
.stage-effect-design .skill-stage-core {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.95),
    rgba(255, 225, 240, 0.82) 58%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

.stage-effect-tailwind .skill-stage-core {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.95),
    rgba(210, 245, 250, 0.82) 58%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

.stage-effect-motion .skill-stage-core {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.95),
    rgba(235, 250, 199, 0.86) 58%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

.stage-effect-tooling .skill-stage-core,
.stage-effect-app .skill-stage-core {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.95),
    rgba(223, 239, 255, 0.84) 58%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

.skill-tape {
  position: absolute;
  top: -0.7rem;
  left: 50%;
  width: 3rem;
  height: 1rem;
  transform: translateX(-50%) rotate(-4deg);
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 10px rgba(71, 57, 84, 0.08);
  backdrop-filter: blur(4px);
}

@keyframes scrapFloatA {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0.28rem, -0.45rem, 0);
  }
}

@keyframes scrapFloatB {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(-0.24rem, -0.35rem, 0);
  }
}

@keyframes scrapFloatC {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0.18rem, -0.4rem, 0);
  }
}

@keyframes stagePulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }

  50% {
    transform: translate(-50%, -50%) scale(1.08);
  }
}

@keyframes stageSpin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes stageSweep {
  from {
    opacity: 0.45;
    width: 6.5rem;
  }

  to {
    opacity: 1;
    width: 10rem;
  }
}

@keyframes stageTilt {
  from {
    transform: translate(-50%, -50%) rotate(-8deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(8deg);
  }
}

@keyframes stagePop {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.75;
  }

  50% {
    transform: scale(1.5);
    opacity: 1;
  }
}

@keyframes stageOrbit {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(0.7rem, -0.45rem, 0);
  }
}

@keyframes stageSlide {
  from {
    opacity: 0.45;
    transform: translate(-50%, -50%) rotate(28deg);
  }

  to {
    opacity: 1;
    transform: translate(-40%, -50%) rotate(28deg);
  }
}

@keyframes logoPulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }

  50% {
    transform: translate(-50%, -50%) scale(1.08);
    opacity: 1;
  }
}

@keyframes logoSpin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes logoSpark {
  from {
    transform: scale(0.9) translateY(0);
    opacity: 0.58;
  }

  to {
    transform: scale(1.35) translateY(-0.2rem);
    opacity: 1;
  }
}

.scrap-float-a {
  animation: scrapFloatA 5.8s ease-in-out infinite;
}

.scrap-float-b {
  animation: scrapFloatB 6.6s ease-in-out infinite;
}

.scrap-float-c {
  animation: scrapFloatC 6.1s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .scrap-float-a,
  .scrap-float-b,
  .scrap-float-c {
    animation: none;
  }

  .skill-note-enter-active,
  .skill-mobile-note,
  .skill-mobile-note__chevron,
  .skill-mobile-note__body-wrap,
  .skill-scrap-shell {
    transition: none;
  }

  .skill-logo-pocket.is-active .skill-logo-orbit-a,
  .skill-logo-pocket.is-active .skill-logo-orbit-b,
  .skill-logo-pocket.is-active .skill-logo-spark-a,
  .skill-logo-pocket.is-active .skill-logo-spark-b,
  .stage-effect-framework.is-awake .skill-stage-ring-a,
  .stage-effect-framework.is-awake .skill-stage-ring-b,
  .stage-effect-logic.is-awake .skill-stage-beam,
  .stage-effect-style.is-awake .skill-stage-ring-a,
  .stage-effect-design.is-awake .skill-stage-ring-a,
  .stage-effect-tailwind.is-awake .skill-stage-dot,
  .stage-effect-motion.is-awake .skill-stage-ring-b,
  .stage-effect-motion.is-awake .skill-stage-dot-a,
  .stage-effect-motion.is-awake .skill-stage-dot-b,
  .stage-effect-motion.is-awake .skill-stage-dot-c,
  .stage-effect-tooling.is-awake .skill-stage-beam-a,
  .stage-effect-tooling.is-awake .skill-stage-beam-b,
  .stage-effect-app.is-awake .skill-stage-core {
    animation: none;
  }
}
</style>
