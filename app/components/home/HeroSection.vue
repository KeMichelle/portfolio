<script setup lang="ts">
import type { ServicePillar } from '~/data/portfolio';
import { ref } from 'vue';
import FloatingAssetSlot from '~/components/shared/FloatingAssetSlot.vue';
import MotionReveal from '~/components/shared/MotionReveal.vue';
import { useTilt } from '~/composables/useTilt';

defineProps<{
  servicePillars: ServicePillar[];
}>();

const portraitRef = ref<HTMLElement | null>(null);
useTilt(portraitRef, 7, 5);
</script>

<template>
  <section
    id="home"
    class="section-shell overflow-x-clip overflow-y-visible pt-10 sm:pt-12 lg:pt-14 xl:pt-16"
  >
    <div class="section-bleed relative overflow-x-clip overflow-y-visible">
      <div class="absolute left-[3%] top-[3%] hidden xl:block parallax-up">
        <FloatingAssetSlot
          label="purple stars"
          src="/purple_stars.gif"
          alt="Purple stars"
          tone="lavender"
          size="lg"
          :rotate="-8"
          class="animate-drift"
        />
      </div>

      <div class="absolute right-[5%] top-[8%] hidden lg:block parallax-up-sm">
        <FloatingAssetSlot
          label="flower sticker"
          src="/flower.png"
          alt="Flower doodle"
          tone="pink"
          size="md"
          :rotate="8"
          class="animate-float"
        />
      </div>

      <div class="absolute left-[10%] top-[28%] hidden xl:block parallax-up">
        <img
          src="/yellow_sparkle_2.gif"
          alt=""
          aria-hidden="true"
          class="w-16 -rotate-[10deg] object-contain opacity-90 animate-float"
        />
      </div>

      <div
        class="absolute right-[15%] top-[23%] hidden min-[1440px]:block parallax-up-sm"
      >
        <img
          src="/pink_Sparkle.gif"
          alt=""
          aria-hidden="true"
          class="w-16 rotate-[11deg] object-contain opacity-90 animate-drift"
        />
      </div>

      <div class="absolute left-[8%] bottom-[18%] hidden lg:block">
        <FloatingAssetSlot
          label="heart sticker"
          src="/heart.png"
          alt="Heart sticker"
          tone="pink"
          size="sm"
          :rotate="-10"
          class="animate-float"
        />
      </div>

      <div class="absolute right-[8%] bottom-[17%] hidden xl:block">
        <FloatingAssetSlot
          label="green arrow"
          src="/left_Arrow_Green.gif"
          alt="Green arrow doodle"
          tone="green"
          size="md"
          :rotate="14"
          class="animate-drift"
        />
      </div>

      <div class="absolute left-[17%] bottom-[12%] hidden min-[1440px]:block">
        <img
          src="/yellow_sparkle_1.gif"
          alt=""
          aria-hidden="true"
          class="w-14 rotate-[8deg] object-contain opacity-85 animate-float"
        />
      </div>

      <div class="absolute right-[22%] bottom-[8%] hidden xl:block">
        <img
          src="/colorful_lines.gif"
          alt=""
          aria-hidden="true"
          class="w-24 -rotate-[10deg] object-contain opacity-85 animate-drift"
        />
      </div>

      <MotionReveal
        class="relative mx-auto min-h-[42rem] max-w-[112rem] overflow-visible pb-12 sm:min-h-[42rem] sm:pb-12 lg:min-h-[44rem] lg:pb-14 xl:min-h-[48rem]"
        :delay="70"
        direction="up"
      >
        <div
          class="absolute left-[2%] right-auto top-[5%] z-0 text-left sm:left-[4%] lg:left-[5%] xl:left-[6%]"
        >
          <p
            class="font-sans text-[3.25rem] font-light uppercase tracking-[0.24em] text-ink/[0.1] sm:text-[5rem] lg:text-[7.6rem] xl:text-[9.4rem] min-[1440px]:text-[10.8rem]"
          >
            <span class="typing-hero">MICHELLE</span>
          </p>
        </div>

        <div
          class="absolute left-1/2 top-[12%] z-20 w-full max-w-[24rem] -translate-x-1/2 sm:max-w-[28rem] lg:top-[10%] lg:max-w-[33rem] xl:max-w-[37rem] min-[1440px]:top-[8%] min-[1440px]:max-w-[40rem]"
        >
          <div
            ref="portraitRef"
            class="relative mx-auto flex items-end justify-center"
            style="will-change: transform; transform-style: preserve-3d"
          >
            <div
              class="absolute left-[10%] top-[6%] w-[72%] -rotate-6 opacity-90"
            >
              <img
                src="/shabby_paper_yellow.png"
                alt=""
                aria-hidden="true"
                class="w-full object-contain drop-shadow-[0_20px_45px_rgba(71,57,84,0.12)]"
              />
            </div>

            <div
              class="absolute right-[2%] top-[16%] hidden w-24 rotate-6 sm:block lg:w-28 xl:w-32"
            >
              <img
                src="/colorful_lines.gif"
                alt=""
                aria-hidden="true"
                class="w-full object-contain opacity-88"
              />
            </div>

            <div
              class="absolute left-[2%] bottom-[22%] hidden w-20 -rotate-12 lg:block xl:w-24"
            >
              <img
                src="/random_lines.png"
                alt=""
                aria-hidden="true"
                class="w-full object-contain opacity-82"
              />
            </div>

            <div class="absolute right-[9%] top-[14%] hidden xl:block">
              <img
                src="/yellow_sparkle_1.gif"
                alt=""
                aria-hidden="true"
                class="w-16 rotate-12 object-contain opacity-82"
              />
            </div>

            <div class="absolute left-[4%] top-[13%] hidden sm:block">
              <FloatingAssetSlot
                label="smiley"
                src="/smiley_face.gif"
                alt="Smiley face doodle"
                tone="yellow"
                size="sm"
                :rotate="-8"
                class="animate-drift"
              />
            </div>

            <img
              src="/michelle_cutout.png"
              alt="Michelle cutout portrait"
              class="relative z-10 max-h-[21rem] w-auto object-contain drop-shadow-[0_32px_65px_rgba(71,57,84,0.2)] sm:max-h-[27rem] lg:max-h-[34rem] xl:max-h-[38rem] min-[1440px]:max-h-[41rem]"
            />

            <p
              class="hero-aprile absolute bottom-[2%] right-[-4%] z-30 translate-x-[14%] font-display text-[2.7rem] font-normal italic tracking-[0.02em] text-ink/92 sm:right-[-5%] sm:text-[3.9rem] lg:right-[-7%] lg:text-[5rem] xl:right-[-8%] xl:text-[5.9rem] min-[1440px]:right-[-9%] min-[1440px]:text-[6.4rem]"
            >
              APRILE
            </p>
          </div>
        </div>

        <div
          class="absolute left-[4%] top-[18.5rem] z-30 w-[14rem] max-w-[68vw] sm:left-[8%] sm:top-[17rem] sm:w-[19rem] lg:left-[10%] lg:top-[18rem] xl:left-[9%] xl:w-[20rem] min-[1440px]:left-[11%]"
        >
          <div
            class="paper-layer curve-panel-a rotate-[-5deg] rounded-[2rem] border border-white/60 bg-white/76 p-5 shadow-float backdrop-blur-xl sm:p-6"
          >
            <p
              class="font-display text-[1.45rem] font-normal leading-[1.18] text-ink sm:text-[1.7rem]"
            >
              I'm Michelle, a front-end developer with a soft spot for styling
              and visual storytelling.
            </p>
          </div>
        </div>

        <div
          class="absolute right-[6%] top-[32rem] z-30 hidden w-[10rem] sm:right-[10%] sm:top-[34rem] sm:block sm:w-[11rem] lg:right-[12%] lg:top-[18rem] lg:w-[12rem] xl:right-[9%] xl:top-[19rem] xl:w-[13rem]"
        >
          <div
            class="rotate-[7deg] rounded-[1.8rem] border border-white/55 bg-white/58 p-3 shadow-float backdrop-blur-xl sm:p-4"
          >
            <img
              src="/flower.png"
              alt=""
              aria-hidden="true"
              class="mx-auto w-full max-w-[4.5rem] object-contain opacity-95 sm:max-w-[5.25rem]"
            />
          </div>
        </div>

        <div
          class="absolute left-1/2 top-[78%] z-30 w-full max-w-[42rem] -translate-x-1/2 px-4 sm:top-[72%] lg:top-[73%] xl:max-w-[46rem]"
        >
          <div
            class="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#web-projects"
              class="inline-flex items-center justify-center rounded-full border border-ink/10 bg-white/72 px-6 py-3 text-sm font-medium text-ink shadow-float backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              View the work
            </a>
            <a
              href="#about"
              class="inline-flex items-center justify-center rounded-full border border-white/60 bg-blush/40 px-6 py-3 text-sm font-medium text-ink shadow-float backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/78"
            >
              Read about me
            </a>
          </div>
        </div>
      </MotionReveal>
    </div>
  </section>
</template>

<style scoped>
.hero-aprile {
  animation:
    aprileFloatIn 980ms cubic-bezier(0.22, 1, 0.36, 1) 1.55s both,
    aprileDrift 5.8s ease-in-out 2.5s infinite;
  transform-origin: center;
}

.typing-hero {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  border-right: 1px solid rgba(47, 36, 60, 0.14);
  animation:
    heroTyping 1.9s steps(9, end) 220ms forwards,
    heroCaret 0.8s step-end 220ms 4,
    heroCaretHide 0s linear 2.2s forwards;
}

@keyframes heroTyping {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

@keyframes heroCaret {
  0%,
  49% {
    border-color: rgba(47, 36, 60, 0.14);
  }

  50%,
  100% {
    border-color: transparent;
  }
}

@keyframes heroCaretHide {
  to {
    border-color: transparent;
  }
}

@keyframes aprileFloatIn {
  from {
    opacity: 0;
    transform: translate3d(2rem, 0.65rem, 0) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes aprileDrift {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }

  50% {
    transform: translate3d(0.35rem, -0.2rem, 0) rotate(1.2deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-aprile,
  .typing-hero {
    animation: none;
  }

  .typing-hero {
    width: 100%;
    border-right: 0;
  }
}
</style>
