<script setup lang="ts">
withDefaults(
  defineProps<{
    symbol: string;
    tone?: 'pink' | 'green' | 'lavender' | 'yellow';
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    tone: 'pink',
    size: 'md',
  },
);

const toneClasses = {
  pink: 'text-rose/80',
  green: 'text-sage/80',
  lavender: 'text-[#8d76ef]/80',
  yellow: 'text-[#c99a00]/80',
};

const sizeClasses = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-5xl',
};
</script>

<template>
  <span
    :class="[
      'select-none font-display leading-none drop-shadow-[0_10px_25px_rgba(71,57,84,0.12)]',
      toneClasses[tone],
      sizeClasses[size],
    ]"
    aria-hidden="true"
  >
    {{ symbol }}
  </span>
</template>
