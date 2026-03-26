<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    tone?: 'pink' | 'green' | 'lavender' | 'yellow';
    icon?: string;
  }>(),
  {
    tone: 'pink',
    icon: '✦',
  },
);

const toneClasses = {
  pink: 'border-rose/35 bg-blush/60 text-rose',
  green: 'border-sage/35 bg-mint/60 text-sage',
  lavender: 'border-[#a892ff]/30 bg-lavender/55 text-[#8d76ef]',
  yellow: 'border-[#d3ac2f]/30 bg-butter/60 text-[#b38700]',
};
</script>

<template>
  <div
    :class="[
      'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-float backdrop-blur-sm',
      toneClasses[tone],
    ]"
  >
    <span class="text-sm leading-none">{{ icon }}</span>
    <span>{{ label }}</span>
  </div>
</template>
