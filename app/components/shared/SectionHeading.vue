<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string;
    title: string;
    description: string;
    align?: 'left' | 'center';
  }>(),
  {
    align: 'left',
  },
);
</script>

<template>
  <div
    :class="align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'"
  >
    <span class="soft-tag">{{ eyebrow }}</span>
    <h2
      class="mt-5 font-display text-4xl font-semibold leading-none text-ink text-balance sm:text-5xl lg:text-6xl"
    >
      {{ title }}
    </h2>
    <p class="mt-4 text-base leading-8 text-ink/72 sm:text-lg">
      {{ description }}
    </p>
  </div>
</template>
