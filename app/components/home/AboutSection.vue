<script setup lang="ts">
import { ref } from 'vue';
import FloatingAssetSlot from '~/components/shared/FloatingAssetSlot.vue';
import MotionReveal from '~/components/shared/MotionReveal.vue';

const activeMode = ref<'developer' | 'styling'>('developer');

const workList = [
  'clear structure',
  'soft interactions',
  'real product thinking',
] as const;

const personalNotes = [
  'I notice small details a lot.',
  'I do not like cold interfaces.',
  'I like mixing code and styling.',
] as const;

const profileFacts = [
  'based in London',
  'originally from Italy',
  'frontend + visual eye',
] as const;

const workWithMeNotes = [
  'front-end roles',
  'freelance work',
  'creative projects',
] as const;

const modeContent = {
  developer: {
    title: 'developer side',
    text: 'Most of my day-to-day is coding with Vue, Nuxt, React, and TypeScript, but I always want the result to feel calm, clear, and human.',
    accent: 'bg-gradient-to-br from-[#e7e4ff] via-[#eef5ff] to-[#ddeeff]',
  },
  styling: {
    title: 'styling side',
    text: 'I also love fashion, cutouts, moodboards, and visual storytelling, so this portfolio is really both sides of me living together.',
    accent: 'bg-gradient-to-br from-[#ffe0ef] via-[#fff5fa] to-[#fff0c9]',
  },
} as const;
</script>

<template>
  <section
    id="about"
    class="section-shell relative overflow-x-clip overflow-y-visible pb-12 pt-8 sm:pb-28 lg:pb-32"
  >
    <div class="section-bleed relative overflow-x-clip overflow-y-visible">
      <div
        class="ambient-blob absolute left-[4%] top-[4%] h-40 w-40 rounded-full bg-[#ffe7a6]/50 blur-3xl"
      />
      <div
        class="ambient-blob ambient-blob-reverse absolute right-[7%] top-[14%] h-48 w-48 rounded-full bg-[#ffd4ea]/50 blur-3xl"
      />
      <div
        class="ambient-blob ambient-blob-slow absolute left-[18%] bottom-[10%] h-44 w-44 rounded-full bg-[#dff7ef]/45 blur-3xl"
      />

      <MotionReveal
        class="paper-layer relative overflow-visible rounded-[2.75rem] border border-white/65 bg-white/62 px-6 py-8 shadow-dreamy backdrop-blur-xl sm:px-8 sm:py-10 lg:px-11 lg:py-12 xl:px-14"
        :delay="70"
        direction="up"
      >
        <img
          src="/random_lines.png"
          alt=""
          aria-hidden="true"
          class="absolute right-[4%] top-[5%] hidden w-24 rotate-[8deg] object-contain opacity-65 lg:block"
        />
        <img
          src="/colorful_lines.gif"
          alt=""
          aria-hidden="true"
          class="absolute bottom-[10%] right-[8%] hidden w-20 -rotate-[6deg] object-contain opacity-80 lg:block"
        />

        <div
          class="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.95fr)] lg:gap-10 xl:gap-14"
        >
          <div class="relative">
            <span
              class="inline-flex -rotate-[4deg] rounded-full bg-[#8ce7c0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ink shadow-float"
            >
              About me
            </span>

            <div class="mt-6 max-w-[44rem]">
              <h2
                class="max-w-[11ch] font-display text-[3.35rem] font-semibold leading-[0.9] text-ink sm:text-[4rem] xl:text-[5rem]"
              >
                Hi, I’m Michelle.
              </h2>
              <p
                class="mt-5 max-w-[39rem] text-base leading-8 text-ink/76 sm:text-lg"
              >
                I’m a front-end developer based in London, originally from
                Italy.
              </p>
              <p
                class="mt-4 max-w-[38rem] text-base leading-8 text-ink/72 sm:text-lg"
              >
                I love building things that feel clear, soft, and actually nice
                to use.
              </p>
            </div>

            <div class="mt-6 flex max-w-[42rem] flex-wrap gap-3">
              <span
                v-for="fact in profileFacts"
                :key="fact"
                class="rounded-full border border-white/65 bg-white/82 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60 shadow-float backdrop-blur-sm"
              >
                {{ fact }}
              </span>
            </div>

            <div
              class="mt-8 grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
            >
              <div
                class="card-hover-soft curve-panel-a rounded-[2rem] border border-white/65 bg-white/84 p-5 shadow-float backdrop-blur-xl"
              >
                <p
                  class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/48"
                >
                  little pieces of me
                </p>
                <ul class="mt-4 space-y-3 text-sm leading-7 text-ink/70">
                  <li v-for="item in personalNotes" :key="item">{{ item }}</li>
                </ul>
              </div>

              <div
                class="card-hover-soft curve-panel-c rounded-[2rem] border border-white/65 bg-gradient-to-br from-[#fff8fd] via-white to-[#eef8ff] p-5 shadow-float backdrop-blur-xl"
              >
                <p
                  class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/48"
                >
                  switch the mood
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    @click="activeMode = 'developer'"
                    :class="[
                      'rounded-full px-3 py-2 text-xs font-semibold shadow-float transition duration-300',
                      activeMode === 'developer'
                        ? 'bg-[#dcd8ff] text-ink'
                        : 'bg-white text-ink/70',
                    ]"
                  >
                    developer
                  </button>
                  <button
                    type="button"
                    @click="activeMode = 'styling'"
                    :class="[
                      'rounded-full px-3 py-2 text-xs font-semibold shadow-float transition duration-300',
                      activeMode === 'styling'
                        ? 'bg-[#ffb6da] text-ink'
                        : 'bg-white text-ink/70',
                    ]"
                  >
                    styling
                  </button>
                </div>
                <Transition name="about-mode" mode="out-in">
                  <div
                    :key="activeMode"
                    :class="[
                      'mt-4 rounded-[1.4rem] p-4',
                      modeContent[activeMode].accent,
                    ]"
                  >
                    <p
                      class="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50"
                    >
                      {{ modeContent[activeMode].title }}
                    </p>
                    <p class="mt-2 text-sm leading-6 text-ink/70">
                      {{ modeContent[activeMode].text }}
                    </p>
                  </div>
                </Transition>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="item in workList"
                    :key="item"
                    class="rounded-full bg-white/82 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60 shadow-float"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>

            <div
              class="card-hover-lilt mt-4 rounded-[2rem] border border-white/65 bg-gradient-to-br from-white via-[#fff7d8] to-[#ffe8f4] p-5 shadow-float backdrop-blur-xl"
            >
              <p
                class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/48"
              >
                short story
              </p>
              <p
                class="mt-4 max-w-[42rem] text-sm leading-7 text-ink/70 sm:text-base"
              >
                I moved from Italy to London and now work as a Software
                Engineer, mostly on real products, dashboards, structured apps,
                and things people actually use.
              </p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="item in workWithMeNotes"
                  :key="item"
                  class="rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/58 shadow-float"
                >
                  {{ item }}
                </span>
              </div>
              <a
                href="#contact"
                class="mt-5 inline-flex max-w-full rounded-[1.4rem] bg-[#ff7ab7] px-4 py-3 text-sm font-semibold leading-6 text-white shadow-dreamy transition duration-300 hover:bg-[#ff62aa]"
              >
                <span class="max-w-[20rem] whitespace-normal text-left">
                  If you like this kind of work, you’ll probably like working
                  with me too.
                </span>
              </a>
            </div>
          </div>

          <div class="relative min-h-[38rem] sm:min-h-[40rem] lg:min-h-[44rem]">
            <div
              class="curve-panel-a absolute inset-x-[4%] top-[2%] bottom-[8%] border border-white/60 bg-gradient-to-br from-[#fff9fd]/88 via-white/78 to-[#fff6dc]/80 shadow-dreamy backdrop-blur-xl"
            />

            <div class="absolute right-[4%] top-[4%] z-20 hidden sm:block">
              <FloatingAssetSlot
                label="purple stars"
                src="/purple_stars.gif"
                alt="Purple stars"
                tone="lavender"
                size="sm"
                :rotate="-8"
                class="animate-drift"
              />
            </div>

            <div class="absolute left-[6%] bottom-[11%] z-20 hidden sm:block">
              <FloatingAssetSlot
                label="flower"
                src="/flower.png"
                alt="Flower doodle"
                tone="pink"
                size="sm"
                :rotate="9"
                class="animate-float"
              />
            </div>

            <div
              class="absolute left-[6%] top-[8%] z-20 w-[88%] rotate-[1deg] rounded-[2rem] border border-white/65 bg-white/72 p-4 shadow-float backdrop-blur-xl sm:left-[12%] sm:w-[82%] sm:rotate-[2deg] sm:rounded-[2.2rem] sm:p-5"
            >
              <p
                class="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/48"
              >
                editorial note
              </p>
              <p
                class="mt-3 font-display text-[1.9rem] leading-[1.02] text-ink sm:text-[2.35rem] xl:text-[2.7rem]"
              >
                Clear, soft, and never too corporate.
              </p>
            </div>

            <div
              class="absolute left-1/2 top-[24%] z-30 w-[72%] max-w-[23rem] -translate-x-1/2 rotate-[-4deg] sm:w-[66%]"
            >
              <div
                class="absolute left-[10%] top-[12%] h-[78%] w-[78%] rounded-full bg-[#ffd4ea]/55 blur-3xl"
              />
              <div
                class="relative z-20 rounded-[1.9rem] border border-white/80 bg-white px-4 pb-5 pt-4 shadow-[0_30px_60px_rgba(71,57,84,0.18)]"
              >
                <div
                  class="absolute left-[12%] top-[-0.65rem] h-5 w-[32%] rotate-[-4deg] rounded-full bg-[#fff1a9]/80 blur-[1px]"
                />
                <div
                  class="aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-[#f2d9e7]/80 bg-[#fff5fb]"
                >
                  <img
                    src="/cutout_michelle_phone_selfie.png"
                    alt="Michelle selfie cutout"
                    class="h-full w-full scale-[1.38] object-cover object-top"
                  />
                </div>
                <div class="mt-4 flex items-end justify-between gap-3">
                  <div>
                    <p
                      class="font-display text-[1.55rem] leading-none text-ink sm:text-[1.8rem]"
                    >
                      Michelle
                    </p>
                    <p
                      class="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/48"
                    >
                      London via Italy
                    </p>
                  </div>
                  <img
                    src="/pink_Sparkle.gif"
                    alt=""
                    aria-hidden="true"
                    class="w-10 rotate-[12deg] object-contain opacity-80"
                  />
                </div>
              </div>
            </div>

            <div
              class="absolute right-[8%] top-[22%] z-40 hidden w-[10rem] rotate-[8deg] rounded-[1.4rem] border border-white/65 bg-[#fff8df]/90 p-3 shadow-float backdrop-blur-sm sm:block sm:w-[11rem]"
            >
              <img
                src="/italy_london.png"
                alt="Cutout map from Italy to London"
                class="w-full object-contain"
              />
            </div>

            <img
              src="/michelle_chibi_head.png"
              alt="Michelle chibi self portrait"
              class="absolute right-[6%] bottom-[2%] z-40 h-[8.5rem] w-auto rotate-[5deg] object-contain drop-shadow-[0_20px_30px_rgba(71,57,84,0.18)] sm:right-[4%] sm:bottom-[1%] sm:h-[11.5rem] sm:rotate-[7deg] xl:h-[13rem]"
            />

            <div
              class="absolute left-[12%] bottom-[8%] z-30 hidden max-w-[13rem] -rotate-[5deg] rounded-[1.6rem] border border-white/65 bg-white/84 px-4 py-3 shadow-float backdrop-blur-sm sm:block"
            >
              <p
                class="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/48"
              >
                little note
              </p>
              <p class="mt-2 text-xs leading-5 text-ink/68">
                I like things that feel a bit sunlit, a bit soft, and not too
                serious.
              </p>
            </div>

            <img
              src="/heart.png"
              alt=""
              aria-hidden="true"
              class="absolute left-[8%] top-[32%] z-20 w-11 -rotate-[14deg] object-contain opacity-90"
            />
          </div>
        </div>
      </MotionReveal>
    </div>
  </section>
</template>

<style scoped>
.about-mode-enter-active,
.about-mode-leave-active {
  transition:
    opacity 260ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.about-mode-enter-from,
.about-mode-leave-to {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
}
</style>
