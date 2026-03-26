<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

// Low-frequency state — Vue reactivity is fine here
const theme = ref('default');
const isPointer = ref(false);
const active = ref(false);

// Direct DOM refs — we write style.transform here, bypassing Vue's vdom
const dotEl = ref<HTMLElement | null>(null);
const ringEl = ref<HTMLElement | null>(null);

// Positions stored as plain JS numbers — zero Vue overhead on every frame
let x = -100,
  y = -100;
let lx = -100,
  ly = -100;
let rafId = 0;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function tick() {
  // Lerp factor 0.20 → snappier ring, still smooth
  lx = lerp(lx, x, 0.2);
  ly = lerp(ly, y, 0.2);

  const scale = isPointer.value ? 1.6 : 1;
  if (ringEl.value) {
    ringEl.value.style.transform = `translate3d(${lx - 20}px,${ly - 20}px,0) scale(${scale})`;
  }
  if (dotEl.value) {
    dotEl.value.style.transform = `translate3d(${x - 4}px,${y - 4}px,0) scale(${isPointer.value ? 1.8 : 1})`;
  }

  rafId = requestAnimationFrame(tick);
}

function onMove(e: PointerEvent) {
  // Only track the primary pointer (ignore touch/stylus during drag)
  if (e.pointerType !== 'mouse') return;
  x = e.clientX;
  y = e.clientY;

  if (!active.value) active.value = true;

  // Find nearest [data-cursor] zone
  const el = document.elementFromPoint(e.clientX, e.clientY);
  const zone = el?.closest('[data-cursor]') as HTMLElement | null;
  theme.value = zone?.dataset.cursor ?? 'default';

  // Cheap interactive check — no getComputedStyle (forces style recalc)
  const tag = (el as HTMLElement | null)?.tagName?.toLowerCase() ?? '';
  const role = (el as HTMLElement | null)?.getAttribute('role') ?? '';
  isPointer.value =
    ['a', 'button', 'select', 'input', 'textarea', 'label'].includes(tag) ||
    role === 'button';
}

function onLeave() {
  active.value = false;
}

onMounted(() => {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeave);
  rafId = requestAnimationFrame(tick);
  document.documentElement.classList.add('custom-cursor-active');
});

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove);
  document.documentElement.removeEventListener('mouseleave', onLeave);
  cancelAnimationFrame(rafId);
  document.documentElement.classList.remove('custom-cursor-active');
});

// Theme → colour map
const themeColors: Record<string, { dot: string; ring: string }> = {
  default: { dot: '#473954', ring: 'rgba(71,57,84,0.22)' },
  hero: { dot: '#f5a4c6', ring: 'rgba(245,164,198,0.28)' },
  web: { dot: '#9ec8aa', ring: 'rgba(158,200,170,0.28)' },
  styling: { dot: '#c9b8ef', ring: 'rgba(201,184,239,0.30)' },
  about: { dot: '#ffd6c2', ring: 'rgba(255,214,194,0.32)' },
  proof: { dot: '#b3d9ff', ring: 'rgba(179,217,255,0.30)' },
  contact: { dot: '#ffd8e6', ring: 'rgba(255,216,230,0.30)' },
};
</script>

<template>
  <Teleport to="body">
    <template v-if="active">
      <!-- Trailing ring — transform set directly by RAF, colour via Vue binding -->
      <div
        ref="ringEl"
        class="cursor-ring"
        :style="{
          borderColor: themeColors[theme]?.ring ?? themeColors.default.ring,
        }"
      />
      <!-- Sharp dot — transform set directly by RAF, colour via Vue binding -->
      <div
        ref="dotEl"
        class="cursor-dot"
        :style="{
          background: themeColors[theme]?.dot ?? themeColors.default.dot,
        }"
      />
    </template>
  </Teleport>
</template>

<style>
/* Hide native cursor when custom cursor is active */
html.custom-cursor-active,
html.custom-cursor-active * {
  cursor: none !important;
}

/* Dot */
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: background 300ms ease;
  will-change: transform;
  mix-blend-mode: multiply;
}

/* Ring (lagged) */
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid;
  pointer-events: none;
  z-index: 9998;
  transition: border-color 400ms ease;
  will-change: transform;
}
</style>
