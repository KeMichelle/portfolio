<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    accent?: 'pink' | 'green' | 'lavender' | 'yellow';
  }>(),
  {
    accent: 'pink',
  },
);

const accentClasses = {
  pink: 'border-rose/35 bg-blush/35 text-rose',
  green: 'border-sage/35 bg-mint/40 text-sage',
  lavender: 'border-[#a892ff]/30 bg-lavender/35 text-[#8d76ef]',
  yellow: 'border-[#d3ac2f]/30 bg-butter/45 text-[#b38700]',
};
</script>

<template>
  <div
    :class="[
      'flex min-h-24 items-center justify-center rounded-[2rem] border border-dashed px-4 py-5 text-center shadow-float backdrop-blur-sm',
      accentClasses[accent],
    ]"
  >
    <span
      class="max-w-[12rem] text-xs font-semibold uppercase tracking-[0.25em]"
    >
      {{ label }}
    </span>
  </div>
</template>
