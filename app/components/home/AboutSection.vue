<script setup lang="ts">
import FloatingAssetSlot from '~/components/shared/FloatingAssetSlot.vue';
import MotionReveal from '~/components/shared/MotionReveal.vue';

const workList = [
  'clear structure',
  'soft interactions',
  'thoughtful design choices',
] as const;

const personalNotes = [
  'I pay attention to small details.',
  "I don't like cold interfaces.",
  'I like when design feels considered, calm, and human.',
] as const;

const workWithMeNotes = [
  'front-end roles',
  'freelance work',
  'creative projects',
] as const;
</script>

<template>
  <section
    id="about"
    class="section-shell relative overflow-x-clip overflow-y-visible pb-12 pt-8 sm:pb-28 lg:pb-32"
  >
    <div class="section-bleed relative overflow-x-clip overflow-y-visible">
      <div
        class="ambient-blob absolute left-[4%] top-[4%] h-56 w-56 rounded-full bg-[#ffe7a6]/60 blur-3xl"
      />
      <div
        class="ambient-blob ambient-blob-reverse absolute right-[7%] top-[14%] h-64 w-64 rounded-full bg-[#ffd4ea]/60 blur-3xl"
      />
      <div
        class="ambient-blob ambient-blob-slow absolute left-[18%] bottom-[10%] h-56 w-56 rounded-full bg-[#c7f5e4]/55 blur-3xl"
      />
      <div
        class="ambient-blob absolute right-[22%] bottom-[18%] h-48 w-48 rounded-full bg-[#dcd8ff]/55 blur-3xl"
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
        <!-- Mobile-only stickers -->
        <div
          class="pointer-events-none absolute right-4 top-4 z-10 block lg:hidden"
        >
          <img
            src="/purple_stars.gif"
            alt=""
            aria-hidden="true"
            class="w-10 -rotate-[6deg] object-contain opacity-90"
          />
        </div>
        <div
          class="pointer-events-none absolute left-4 bottom-6 z-10 block lg:hidden"
        >
          <img
            src="/yellow_sparkle_1.gif"
            alt=""
            aria-hidden="true"
            class="w-8 rotate-[10deg] object-contain opacity-85"
          />
        </div>

        <div
          class="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.95fr)] lg:gap-10 xl:gap-14"
        >
          <div class="relative">
            <!-- Mobile-only: gentle polaroid portrait -->
            <MotionReveal
              class="mb-7 flex justify-center sm:hidden"
              :delay="50"
              direction="none"
              :once="true"
            >
              <div class="relative rotate-[-2deg]">
                <div
                  class="relative w-[8.5rem] overflow-hidden rounded-[1.75rem] border border-white/80 bg-white px-2.5 pb-3 pt-2.5 shadow-dreamy"
                >
                  <div
                    class="aspect-[4/5] overflow-hidden rounded-[1.3rem] border border-[#f2d9e7]/80 bg-[#fff5fb]"
                  >
                    <img
                      src="/cutout_michelle_phone_selfie.png"
                      alt="Michelle"
                      class="h-full w-full scale-[1.35] object-cover object-top"
                    />
                  </div>
                  <p class="mt-2 text-center font-display text-sm text-ink/70">
                    Michelle
                  </p>
                </div>
              </div>
            </MotionReveal>

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
                I'm a designer and front-end developer based in London,
                originally from Italy.
              </p>
              <p
                class="mt-4 max-w-[38rem] text-base leading-8 text-ink/72 sm:text-lg"
              >
                I create websites that feel clear, soft, and genuinely nice to
                use — balancing structure with a strong visual eye.
              </p>
            </div>

            <div class="mt-6 flex max-w-[42rem] flex-wrap gap-3">
              <span
                class="rounded-full border border-white/65 bg-[#ffd8ec] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink shadow-float"
                >based in London</span
              >
              <span
                class="rounded-full border border-white/65 bg-[#c7f5e4] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink shadow-float"
                >originally from Italy</span
              >
              <span
                class="rounded-full border border-white/65 bg-[#dcd8ff] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink shadow-float"
                >designer &amp; developer</span
              >
            </div>

            <MotionReveal
              class="mt-8 grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
              :delay="310"
              direction="up"
              :once="true"
            >
              <div
                class="card-hover-soft curve-panel-a rounded-[2rem] border border-white/65 bg-gradient-to-br from-[#fff3c4] via-white to-[#d6fef0] p-5 shadow-float backdrop-blur-xl"
              >
                <p
                  class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/55"
                >
                  how I think
                </p>
                <ul class="mt-4 space-y-3 text-sm leading-7 text-ink/70">
                  <li class="flex items-start gap-2">
                    <span
                      class="mt-[0.35rem] h-2 w-2 flex-none rounded-full bg-[#ff8ec3]"
                    ></span>
                    I pay attention to small details.
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="mt-[0.35rem] h-2 w-2 flex-none rounded-full bg-[#ffd32a]"
                    ></span>
                    I don't like cold interfaces.
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="mt-[0.35rem] h-2 w-2 flex-none rounded-full bg-[#45aaf2]"
                    ></span>
                    I like when design feels considered, calm, and human.
                  </li>
                </ul>
              </div>

              <div
                class="card-hover-soft curve-panel-c rounded-[2rem] border border-white/65 bg-gradient-to-br from-[#ede8ff] via-white to-[#d5eeff] p-5 shadow-float backdrop-blur-xl"
              >
                <p
                  class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/55"
                >
                  my approach
                </p>
                <p class="mt-4 text-sm leading-7 text-ink/70">
                  Most of my day-to-day is Vue, Nuxt, React, and TypeScript —
                  real products, dashboards, and structured apps.
                </p>
                <p class="mt-3 text-sm leading-7 text-ink/70">
                  Alongside code, I'm naturally drawn to styling and visual
                  composition — which shapes how I think about layout, spacing,
                  and storytelling.
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    class="rounded-full bg-[#ffd8ec] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink shadow-float"
                  >
                    clear structure
                  </span>
                  <span
                    class="rounded-full bg-[#c7f5e4] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink shadow-float"
                  >
                    soft interactions
                  </span>
                  <span
                    class="rounded-full bg-[#dcd8ff] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink shadow-float"
                  >
                    thoughtful design
                  </span>
                </div>
              </div>
            </MotionReveal>

            <MotionReveal :delay="440" direction="up" :once="true">
              <div
                class="card-hover-lilt mt-4 rounded-[2rem] border border-white/65 bg-gradient-to-br from-[#fff4a3] via-[#ffeaf5] to-[#ffe0f8] p-5 shadow-float backdrop-blur-xl"
              >
                <p
                  class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/55"
                >
                  if this resonates
                </p>
                <p
                  class="mt-4 max-w-[42rem] text-sm leading-7 text-ink/70 sm:text-base"
                >
                  I like things that feel a bit sunlit, a bit soft, and never
                  too corporate.
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    class="rounded-full bg-[#ffd8ec] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink shadow-float"
                  >
                    front-end roles
                  </span>
                  <span
                    class="rounded-full bg-[#fff4ae] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink shadow-float"
                  >
                    freelance work
                  </span>
                  <span
                    class="rounded-full bg-[#c7f5e4] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink shadow-float"
                  >
                    creative projects
                  </span>
                </div>
                <a
                  href="#contact"
                  class="mt-5 inline-flex max-w-full rounded-[1.4rem] bg-[#ff7ab7] px-4 py-3 text-sm font-semibold leading-6 text-white shadow-dreamy transition duration-300 hover:bg-[#ff62aa]"
                >
                  <span class="max-w-[20rem] whitespace-normal text-left">
                    If this resonates with you, you'll probably enjoy working
                    together.
                  </span>
                </a>
              </div>
            </MotionReveal>
          </div>

          <MotionReveal
            class="relative hidden min-h-[38rem] sm:block sm:min-h-[40rem] lg:min-h-[44rem]"
            :delay="180"
            direction="right"
            :once="true"
          >
            <div
              class="curve-panel-a absolute inset-x-[4%] top-[2%] bottom-[8%] border border-white/60 bg-gradient-to-br from-[#ffeef8]/90 via-white/80 to-[#eef5ff]/85 shadow-dreamy backdrop-blur-xl"
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
          </MotionReveal>
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

@media (max-width: 639px) {
  .paper-layer {
    border-radius: 2.6rem 2rem 3rem 2rem / 2rem 3rem 2.2rem 2.8rem;
    padding-top: 4.6rem;
    overflow: hidden;
  }

  .paper-layer::after {
    content: '';
    position: absolute;
    inset: -8% auto auto -10%;
    width: 11rem;
    height: 11rem;
    border-radius: 999px;
    background: radial-gradient(
      circle,
      rgba(255, 233, 163, 0.58),
      transparent 72%
    );
    filter: blur(14px);
    pointer-events: none;
  }

  .paper-layer > .relative {
    gap: 1.25rem;
  }

  .paper-layer h2 {
    max-width: 8ch;
    font-size: 3.5rem;
    line-height: 0.9;
  }

  .paper-layer .card-hover-soft,
  .paper-layer .card-hover-lilt {
    border-radius: 2rem 1.5rem 2.2rem 1.6rem / 1.45rem 2.2rem 1.7rem 2.25rem;
  }

  .paper-layer .card-hover-soft:nth-of-type(1) {
    transform: rotate(-1.6deg);
  }

  .paper-layer .card-hover-soft:nth-of-type(2),
  .paper-layer .card-hover-lilt {
    transform: rotate(1.3deg);
  }
}
</style>
