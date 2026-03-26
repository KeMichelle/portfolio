<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    src?: string;
    alt?: string;
    tone?: 'pink' | 'green' | 'lavender' | 'yellow';
    size?: 'sm' | 'md' | 'lg';
    rotate?: number;
  }>(),
  {
    src: undefined,
    alt: '',
    tone: 'pink',
    size: 'sm',
    rotate: 0,
  },
);

const toneClasses = {
  pink: 'border-rose/30 bg-blush/45 text-rose',
  green: 'border-sage/30 bg-mint/45 text-sage',
  lavender: 'border-[#a892ff]/30 bg-lavender/45 text-[#8d76ef]',
  yellow: 'border-[#d3ac2f]/30 bg-butter/50 text-[#b38700]',
};

const sizeClasses = {
  sm: 'min-h-16 px-3 py-3 text-[10px] max-w-[9rem]',
  md: 'min-h-20 px-4 py-4 text-[11px] max-w-[11rem]',
  lg: 'min-h-24 px-4 py-4 text-xs max-w-[13rem]',
};

const imageClasses = {
  sm: 'h-16 w-16 lg:h-24 lg:w-24 xl:h-28 xl:w-28',
  md: 'h-20 w-20 lg:h-32 lg:w-32 xl:h-36 xl:w-36',
  lg: 'h-24 w-24 lg:h-40 lg:w-40 xl:h-44 xl:w-44',
};
</script>

<template>
  <div
    :class="[
      'asset-slot-clean',
      src
        ? 'doodle-hover-lift flex items-center justify-center'
        : 'flex items-center justify-center rounded-[1.5rem] border border-dashed text-center font-semibold uppercase tracking-[0.22em] shadow-float backdrop-blur-sm',
      !src && toneClasses[tone],
      !src && sizeClasses[size],
    ]"
  >
    <span
      v-if="src"
      :class="[
        'doodle-interactive inline-flex items-center justify-center',
        imageClasses[size],
      ]"
      :style="{ transform: `rotate(${rotate}deg)` }"
    >
      <img
        :src="src"
        :alt="alt"
        class="h-full w-full object-contain drop-shadow-[0_10px_25px_rgba(71,57,84,0.12)]"
      />
    </span>
    <span v-else>{{ label }}</span>
  </div>
</template>
