<script setup lang="ts">
import StickerChip from '~/components/shared/StickerChip.vue';

withDefaults(
  defineProps<{
    eyebrow: string;
    title: string;
    hint: string;
    accent?: 'pink' | 'green' | 'lavender' | 'yellow';
    size?: 'md' | 'lg';
  }>(),
  {
    accent: 'pink',
    size: 'md',
  },
);

const accentClasses = {
  pink: 'from-blush/70 via-white to-peach/45',
  green: 'from-mint/65 via-white to-peach/40',
  lavender: 'from-lavender/70 via-white to-blush/35',
  yellow: 'from-butter/75 via-white to-peach/40',
};

const haloClasses = {
  pink: 'bg-blush/70',
  green: 'bg-mint/70',
  lavender: 'bg-lavender/70',
  yellow: 'bg-butter/80',
};

const sizeClasses = {
  md: 'min-h-[22rem] p-5',
  lg: 'min-h-[30rem] p-5 sm:p-6',
};
</script>

<template>
  <div class="relative isolate">
    <div
      :class="[
        'absolute inset-x-10 top-8 h-28 rounded-full blur-3xl',
        haloClasses[accent],
      ]"
    />

    <div
      :class="[
        'paper-layer relative overflow-hidden rounded-[2.6rem] border border-white/70 bg-gradient-to-br shadow-dreamy backdrop-blur-xl',
        accentClasses[accent],
        sizeClasses[size],
      ]"
    >
      <div class="absolute inset-0 mesh-glow opacity-80" />
      <div class="relative z-10 flex h-full flex-col">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <StickerChip :label="eyebrow" :tone="accent" icon="✿" />
          <span
            class="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50"
          >
            replace with your art
          </span>
        </div>

        <h3
          class="mt-5 max-w-xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl"
        >
          {{ title }}
        </h3>

        <div class="relative mt-6 flex flex-1 items-center justify-center">
          <slot>
            <div
              class="relative flex aspect-[4/5] w-full max-w-[18rem] items-end justify-center rounded-[2.7rem] border border-dashed border-white/70 bg-white/55 px-5 pb-5 pt-8 shadow-float backdrop-blur-sm sm:max-w-[20rem]"
            >
              <div
                class="absolute left-6 top-6 h-10 w-10 rounded-full bg-white/75 blur-md"
              />
              <div
                class="absolute right-6 top-10 h-6 w-20 rounded-full bg-white/60"
              />
              <div
                class="absolute bottom-0 h-[72%] w-[58%] rounded-t-[999px] rounded-b-[2rem] bg-gradient-to-b from-[#ffefeb] via-white to-[#ffd9e7] shadow-float"
              />
              <div
                class="absolute bottom-[58%] h-16 w-16 rounded-full bg-gradient-to-b from-[#fff7f2] to-[#ffd8e6] shadow-float"
              />
              <div
                class="absolute bottom-[66%] left-[28%] h-6 w-6 rounded-full bg-ink/10"
              />
              <div
                class="absolute bottom-[66%] right-[28%] h-6 w-6 rounded-full bg-ink/10"
              />
              <div
                class="absolute bottom-[60%] h-3 w-10 rounded-full bg-rose/40"
              />
              <div
                class="absolute bottom-[8%] left-[17%] h-16 w-10 rounded-full bg-white/65"
              />
              <div
                class="absolute bottom-[8%] right-[17%] h-16 w-10 rounded-full bg-white/65"
              />
              <div
                class="relative z-10 mt-auto rounded-full border border-white/60 bg-white/70 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink/55"
              >
                your illustrated self
              </div>
            </div>
          </slot>
        </div>

        <p
          class="relative z-10 mt-5 max-w-xl text-sm leading-7 text-ink/70 sm:text-base"
        >
          {{ hint }}
        </p>
      </div>
    </div>
  </div>
</template>
