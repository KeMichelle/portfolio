<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    as?: string;
    delay?: number;
    direction?: 'up' | 'left' | 'right' | 'none';
    once?: boolean;
  }>(),
  {
    as: 'div',
    delay: 0,
    direction: 'up',
    once: false,
  },
);

const target = ref<HTMLElement | null>(null);
const visible = ref(false);
let observer: IntersectionObserver | null = null;

const directionClass = computed(() => {
  switch (props.direction) {
    case 'left':
      return 'reveal-left';
    case 'right':
      return 'reveal-right';
    case 'none':
      return 'reveal-none';
    default:
      return 'reveal-up';
  }
});

onMounted(() => {
  if (!target.value) {
    return;
  }

  if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = true;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;

      if (entry?.isIntersecting) {
        visible.value = true;

        if (props.once && observer && target.value) {
          observer.unobserve(target.value);
        }
      } else if (!props.once) {
        visible.value = false;
      }
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -6% 0px',
    },
  );

  observer.observe(target.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <component
    :is="as"
    ref="target"
    :style="{ transitionDelay: `${delay}ms` }"
    :class="['reveal-base', directionClass, visible && 'reveal-visible']"
  >
    <slot />
  </component>
</template>

<style scoped>
.reveal-base {
  opacity: 0;
  transform: translate3d(0, 22px, 0);
  transition:
    opacity 480ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 560ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.reveal-up {
  transform: translate3d(0, 22px, 0);
}

.reveal-left {
  transform: translate3d(-28px, 0, 0);
}

.reveal-right {
  transform: translate3d(28px, 0, 0);
}

.reveal-none {
  transform: scale(0.98);
}

.reveal-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

/* ── Mobile editorial: blur-in + vertical-only reveals ── */
@media (max-width: 639px) {
  /* Convert sideways slides to gentle upward drift on mobile */
  .reveal-left,
  .reveal-right {
    transform: translate3d(0, 20px, 0) scale(0.97);
  }

  .reveal-up {
    transform: translate3d(0, 24px, 0) scale(0.965);
  }

  .reveal-none {
    transform: scale(0.94);
  }

  /* Add soft blur that clears as element enters */
  .reveal-base {
    filter: blur(8px) saturate(0.96);
    transform-origin: center bottom;
    transition:
      opacity 680ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 860ms cubic-bezier(0.16, 0.84, 0.32, 1),
      filter 760ms ease;
  }

  .reveal-visible {
    filter: blur(0px) saturate(1);
  }
}
</style>
