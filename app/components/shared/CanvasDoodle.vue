<script setup lang="ts">
withDefaults(
  defineProps<{
    variant:
      | 'sparkle'
      | 'star'
      | 'arrow'
      | 'scribble'
      | 'loop'
      | 'blob'
      | 'heart';
    tone?: 'pink' | 'green' | 'lavender' | 'yellow' | 'ink';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    rotate?: number;
  }>(),
  {
    tone: 'pink',
    size: 'md',
    rotate: 0,
  },
);

const toneClasses = {
  pink: 'text-rose/80',
  green: 'text-sage/80',
  lavender: 'text-[#8d76ef]/80',
  yellow: 'text-[#c99a00]/80',
  ink: 'text-ink/45',
};

const sizeClasses = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
  xl: 'h-28 w-28',
};
</script>

<template>
  <span
    class="inline-flex select-none"
    :style="{ transform: `rotate(${rotate}deg)` }"
    aria-hidden="true"
  >
    <span
      :class="[
        'doodle-interactive inline-flex items-center justify-center drop-shadow-[0_10px_25px_rgba(71,57,84,0.1)]',
        toneClasses[tone],
        sizeClasses[size],
      ]"
    >
      <svg
        v-if="variant === 'sparkle'"
        class="h-full w-full"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 10L55 38L84 43L56 50L61 84L50 58L39 84L44 50L16 43L45 38L50 10Z"
          class="stroke-current"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="variant === 'star'"
        class="h-full w-full"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M49 13L58 35L83 37L63 54L69 79L49 64L29 79L35 54L15 37L40 35L49 13Z"
          class="stroke-current"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="variant === 'arrow'"
        class="h-full w-full"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M20 92C31 82 48 71 66 68C81 65 91 57 101 38"
          class="stroke-current"
          stroke-width="5"
          stroke-linecap="round"
        />
        <path
          d="M77 36C86 35 95 35 104 38C99 44 94 50 89 57"
          class="stroke-current"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="variant === 'scribble'"
        class="h-full w-full"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M14 36C31 23 47 52 63 38C79 24 90 52 106 40"
          class="stroke-current"
          stroke-width="4.5"
          stroke-linecap="round"
        />
        <path
          d="M16 58C32 46 48 76 64 61C81 46 92 72 105 62"
          class="stroke-current"
          stroke-width="4.5"
          stroke-linecap="round"
        />
        <path
          d="M18 80C34 68 50 93 67 80C82 68 93 91 104 82"
          class="stroke-current"
          stroke-width="4.5"
          stroke-linecap="round"
        />
      </svg>

      <svg
        v-else-if="variant === 'loop'"
        class="h-full w-full"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M79 46C79 66 61 83 42 80C23 76 16 57 21 40C27 19 53 14 70 27C85 39 87 63 72 76"
          class="stroke-current"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="variant === 'blob'"
        class="h-full w-full"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M82 52C80 69 66 82 48 83C30 84 16 72 15 54C14 36 23 18 43 17C62 16 84 31 82 52Z"
          class="fill-current"
          opacity="0.32"
        />
        <path
          d="M82 52C80 69 66 82 48 83C30 84 16 72 15 54C14 36 23 18 43 17C62 16 84 31 82 52Z"
          class="stroke-current"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg v-else class="h-full w-full" viewBox="0 0 100 100" fill="none">
        <path
          d="M50 78C28 64 18 48 22 34C26 22 41 18 50 29C59 18 74 22 78 34C82 48 72 64 50 78Z"
          class="stroke-current"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </span>
</template>
