<script setup lang="ts">
import { computed, ref } from 'vue';
import MotionReveal from '~/components/shared/MotionReveal.vue';

type SkillCard = {
  label: string;
  note: string;
  src: string;
  tone: string;
  x: number;
  y: number;
  width: number;
  rotate: number;
  motion: 'scrap-float-a' | 'scrap-float-b' | 'scrap-float-c';
};

const skillLogos: SkillCard[] = [
  {
    label: 'Vue.js',
    note: 'ui systems',
    src: 'https://cdn.simpleicons.org/vuedotjs/42B883',
    tone: 'from-[#e9fff1] via-white to-[#d9f8e6]',
    x: 4,
    y: 15,
    width: 10.5,
    rotate: -10,
    motion: 'scrap-float-a',
  },
  {
    label: 'Nuxt.js',
    note: 'full-stack vue',
    src: 'https://cdn.simpleicons.org/nuxt/00DC82',
    tone: 'from-[#e7fff2] via-white to-[#dcf8ea]',
    x: 21,
    y: 4,
    width: 10,
    rotate: 7,
    motion: 'scrap-float-b',
  },
  {
    label: 'Angular',
    note: 'structured apps',
    src: 'https://cdn.simpleicons.org/angular/DD0031',
    tone: 'from-[#fff0f4] via-white to-[#ffe0ea]',
    x: 40,
    y: 10,
    width: 10.2,
    rotate: -7,
    motion: 'scrap-float-c',
  },
  {
    label: 'Git',
    note: 'versioning',
    src: 'https://cdn.simpleicons.org/git/F05032',
    tone: 'from-[#fff5eb] via-white to-[#ffe8d7]',
    x: 58,
    y: 3,
    width: 9.8,
    rotate: 6,
    motion: 'scrap-float-a',
  },
  {
    label: 'Figma',
    note: 'interface direction',
    src: 'https://cdn.simpleicons.org/figma/F24E1E',
    tone: 'from-[#fff0f8] via-white to-[#efe7ff]',
    x: 77,
    y: 14,
    width: 10.5,
    rotate: -9,
    motion: 'scrap-float-b',
  },
  {
    label: 'JavaScript',
    note: 'interaction logic',
    src: 'https://cdn.simpleicons.org/javascript/F7DF1E',
    tone: 'from-[#fff9c8] via-white to-[#fff2a6]',
    x: 12,
    y: 42,
    width: 11,
    rotate: 5,
    motion: 'scrap-float-c',
  },
  {
    label: 'TypeScript',
    note: 'safer front-end',
    src: 'https://cdn.simpleicons.org/typescript/3178C6',
    tone: 'from-[#eef5ff] via-white to-[#dbeaff]',
    x: 31,
    y: 32,
    width: 11,
    rotate: -8,
    motion: 'scrap-float-a',
  },
  {
    label: 'HTML',
    note: 'page structure',
    src: 'https://cdn.simpleicons.org/html5/E34F26',
    tone: 'from-[#fff3ea] via-white to-[#ffe2d6]',
    x: 50,
    y: 45,
    width: 10,
    rotate: 8,
    motion: 'scrap-float-b',
  },
  {
    label: 'CSS',
    note: 'visual polish',
    src: 'https://cdn.simpleicons.org/css/1572B6',
    tone: 'from-[#edf6ff] via-white to-[#d9eefe]',
    x: 68,
    y: 36,
    width: 9.8,
    rotate: -5,
    motion: 'scrap-float-c',
  },
  {
    label: 'React',
    note: 'component work',
    src: 'https://cdn.simpleicons.org/react/61DAFB',
    tone: 'from-[#ebfbff] via-white to-[#dff6ff]',
    x: 83,
    y: 50,
    width: 10.2,
    rotate: 7,
    motion: 'scrap-float-a',
  },
  {
    label: 'Docker',
    note: 'local environments',
    src: 'https://cdn.simpleicons.org/docker/2496ED',
    tone: 'from-[#eef7ff] via-white to-[#dfefff]',
    x: 5,
    y: 67,
    width: 10.2,
    rotate: -6,
    motion: 'scrap-float-b',
  },
  {
    label: 'Android Studio',
    note: 'mobile tooling',
    src: 'https://cdn.simpleicons.org/androidstudio/3DDC84',
    tone: 'from-[#efffea] via-white to-[#e0f7dc]',
    x: 26,
    y: 70,
    width: 12.2,
    rotate: 6,
    motion: 'scrap-float-c',
  },
];

const boardRef = ref<HTMLElement | null>(null);
const pointerX = ref(0);
const pointerY = ref(0);
const boardActive = ref(false);
const activeSkill = ref<string | null>(null);
const discovered = ref<string[]>([]);

const discoveredCount = computed(() => discovered.value.length);

function rememberSkill(label: string) {
  if (discovered.value.includes(label)) return;
  discovered.value = [...discovered.value, label];
}

function handleBoardMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !boardRef.value) return;

  const rect = boardRef.value.getBoundingClientRect();
  pointerX.value = event.clientX - rect.left;
  pointerY.value = event.clientY - rect.top;
  boardActive.value = true;
}

function handleBoardLeave() {
  boardActive.value = false;
  activeSkill.value = null;
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

function getSkillShellStyle(skill: SkillCard) {
  const left = `${skill.x}%`;
  const top = `${skill.y}%`;
  const width = `${skill.width}rem`;

  if (!boardActive.value || !boardRef.value) {
    return {
      left,
      top,
      width,
      transform: `translate3d(0, 0, 0) rotate(${skill.rotate}deg)`,
      zIndex: activeSkill.value === skill.label ? '30' : '10',
    };
  }

  const rect = boardRef.value.getBoundingClientRect();
  const cardCenterX = (skill.x / 100) * rect.width + skill.width * 8;
  const cardCenterY = (skill.y / 100) * rect.height + 40;
  const deltaX = cardCenterX - pointerX.value;
  const deltaY = cardCenterY - pointerY.value;
  const distance = Math.hypot(deltaX, deltaY);
  const radius = 220;
  let offsetX = 0;
  let offsetY = 0;
  let extraRotate = 0;

  if (distance < radius && distance > 0) {
    const force = 1 - distance / radius;
    offsetX = (deltaX / distance) * force * 18;
    offsetY = (deltaY / distance) * force * 14;
    extraRotate = (deltaX / distance) * force * 8;
  }

  const isActive = activeSkill.value === skill.label;

  return {
    left,
    top,
    width,
    transform: `translate3d(${offsetX}px, ${offsetY - (isActive ? 12 : 0)}px, 0) rotate(${skill.rotate + extraRotate + (isActive ? 2 : 0)}deg) scale(${isActive ? 1.06 : 1})`,
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
          Hover the scraps
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
            hover or tap to wake them up
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
        ref="boardRef"
        class="relative z-10 mt-8 hidden min-h-[31rem] md:block lg:min-h-[34rem]"
        @pointermove="handleBoardMove"
        @pointerleave="handleBoardLeave"
      >
        <div
          class="pointer-events-none absolute left-1/2 top-1/2 flex w-[10rem] -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] items-center justify-center border border-dashed border-white/75 bg-white/45 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/42 backdrop-blur-sm"
          style="clip-path: polygon(6% 0, 100% 8%, 94% 100%, 0 92%)"
        ></div>

        <button
          v-for="skill in skillLogos"
          :key="skill.label"
          type="button"
          class="skill-scrap-shell absolute text-left"
          :style="getSkillShellStyle(skill)"
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
            <div class="flex items-start gap-3">
              <img
                :src="skill.src"
                :alt="`${skill.label} logo`"
                class="mt-1 h-9 w-9 shrink-0 object-contain"
                loading="lazy"
              />
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
          </div>
        </button>
      </div>

      <div class="relative z-10 mt-7 grid gap-3 sm:grid-cols-2 md:hidden">
        <div
          v-for="skill in skillLogos"
          :key="skill.label"
          :class="[
            'skill-scrap-inner relative border border-white/70 bg-gradient-to-br p-4 shadow-float backdrop-blur-sm transition duration-500',
            skill.tone,
            skill.motion,
          ]"
        >
          <span class="skill-tape" />
          <div class="flex items-start gap-3">
            <img
              :src="skill.src"
              :alt="`${skill.label} logo`"
              class="mt-1 h-10 w-10 shrink-0 object-contain"
              loading="lazy"
            />
            <div>
              <p
                class="text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/45"
              >
                {{ skill.note }}
              </p>
              <p
                class="mt-1 font-display text-[1.35rem] leading-[1.02] text-ink"
              >
                {{ skill.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-scrap-shell {
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.skill-scrap-inner {
  clip-path: polygon(2% 8%, 12% 0, 100% 4%, 97% 91%, 89% 100%, 0 96%);
  will-change: transform;
}

.skill-scrap-inner.is-active {
  box-shadow: 0 24px 54px rgba(88, 64, 108, 0.18);
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
}
</style>
