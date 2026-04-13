<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const { preview, clearPreview } = useCursorPreview();

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
let vx = 0,
  vy = 0;
let smoothVx = 0,
  smoothVy = 0;
let bubbleSize = 40;
let bubbleRotate = 0;
let bubbleStretchX = 1;
let bubbleStretchY = 1;
let bubbleOffsetX = 0;
let bubbleOffsetY = 0;
let rafId = 0;

const previewActive = computed(() => Boolean(preview.value));
const previewHasVideo = computed(
  () => preview.value?.mode !== 'link' && Boolean(preview.value?.src),
);
const linkPreviewActive = computed(() => preview.value?.mode === 'link');
const previewScale = computed(() => preview.value?.scale ?? 1.16);
const previewBubbleSize = computed(() => preview.value?.bubbleSize ?? 240);
const decorativeTrack =
  'data:text/vtt;charset=utf-8,WEBVTT%0A%0A00:00.000%20-->%2000:10.000%0ADecorative%20project%20preview%0A';

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function updateBubbleMotion(isPreview: boolean) {
  if (!isPreview) {
    bubbleStretchX = lerp(bubbleStretchX, 1, 0.22);
    bubbleStretchY = lerp(bubbleStretchY, 1, 0.22);
    bubbleRotate = lerp(bubbleRotate, 0, 0.22);
    return;
  }

  const clampedVx = clamp(smoothVx, -18, 18);
  const clampedVy = clamp(smoothVy, -18, 18);
  const speed = Math.min(Math.hypot(clampedVx, clampedVy), 18);
  const stretch = (speed / 18) * 0.22;

  if (Math.abs(clampedVx) >= Math.abs(clampedVy)) {
    bubbleStretchX = 1 + stretch;
    bubbleStretchY = 1 - stretch * 0.55;
  } else {
    bubbleStretchX = 1 - stretch * 0.5;
    bubbleStretchY = 1 + stretch;
  }

  bubbleRotate = lerp(bubbleRotate, clamp(clampedVx * 0.45, -14, 14), 0.18);
}

function updateBubbleOffset(isPreview: boolean) {
  const targetOffsetX = isPreview ? clamp(smoothVx * 1.35, -18, 18) : 0;
  const targetOffsetY = isPreview ? clamp(smoothVy * 0.9, -14, 14) : 0;

  bubbleOffsetX = lerp(bubbleOffsetX, targetOffsetX, 0.16);
  bubbleOffsetY = lerp(bubbleOffsetY, targetOffsetY, 0.16);
}

function getBubbleBorderRadius() {
  const bubbleRadiusX1 = clamp(44 - smoothVx * 0.8 - smoothVy * 0.45, 26, 68);
  const bubbleRadiusX2 = clamp(56 + smoothVx * 0.65 - smoothVy * 0.35, 30, 72);
  const bubbleRadiusX3 = clamp(54 + smoothVx * 0.55 + smoothVy * 0.55, 28, 70);
  const bubbleRadiusX4 = clamp(46 - smoothVx * 0.55 + smoothVy * 0.35, 28, 70);
  const bubbleRadiusY1 = clamp(42 - smoothVx * 0.3 - smoothVy * 0.7, 30, 70);
  const bubbleRadiusY2 = clamp(46 + smoothVx * 0.45 - smoothVy * 0.55, 28, 70);
  const bubbleRadiusY3 = clamp(58 + smoothVx * 0.25 + smoothVy * 0.7, 32, 74);
  const bubbleRadiusY4 = clamp(54 - smoothVx * 0.45 + smoothVy * 0.55, 28, 70);

  return `${bubbleRadiusX1}% ${bubbleRadiusX2}% ${bubbleRadiusX3}% ${bubbleRadiusX4}% / ${bubbleRadiusY1}% ${bubbleRadiusY2}% ${bubbleRadiusY3}% ${bubbleRadiusY4}%`;
}

function getDotScale() {
  if (previewActive.value) return 0.2;
  if (isPointer.value) return 1.8;
  return 1;
}

function tick() {
  // Lerp factor 0.20 → snappier ring, still smooth
  lx = lerp(lx, x, 0.2);
  ly = lerp(ly, y, 0.2);

  smoothVx = lerp(smoothVx, vx, 0.18);
  smoothVy = lerp(smoothVy, vy, 0.18);
  vx *= 0.82;
  vy *= 0.82;

  const targetBubbleSize = previewActive.value ? previewBubbleSize.value : 40;
  let ringScale = 1;

  bubbleSize = lerp(
    bubbleSize,
    targetBubbleSize,
    previewActive.value ? 0.12 : 0.22,
  );

  if (!previewActive.value && isPointer.value) {
    ringScale = 1.6;
  }

  updateBubbleMotion(previewActive.value);
  updateBubbleOffset(previewActive.value);

  if (ringEl.value) {
    ringEl.value.style.width = `${bubbleSize}px`;
    ringEl.value.style.height = `${bubbleSize}px`;
    ringEl.value.style.transform = `translate3d(${lx - bubbleSize / 2 + bubbleOffsetX}px,${ly - bubbleSize / 2 + bubbleOffsetY}px,0) rotate(${bubbleRotate}deg) scale(${ringScale * bubbleStretchX}, ${ringScale * bubbleStretchY})`;
    ringEl.value.style.borderRadius = previewActive.value
      ? getBubbleBorderRadius()
      : '50%';
  }
  if (dotEl.value) {
    dotEl.value.style.transform = `translate3d(${x - 4}px,${y - 4}px,0) scale(${getDotScale()})`;
  }

  rafId = requestAnimationFrame(tick);
}

function onMove(e: PointerEvent) {
  // Only track the primary pointer (ignore touch/stylus during drag)
  if (e.pointerType !== 'mouse') return;
  vx = e.clientX - x;
  vy = e.clientY - y;
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
  clearPreview();
}

onMounted(() => {
  if (!globalThis.matchMedia('(pointer: fine)').matches) return;
  if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  globalThis.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeave);
  rafId = requestAnimationFrame(tick);
  document.documentElement.classList.add('custom-cursor-active');
});

onBeforeUnmount(() => {
  globalThis.removeEventListener('pointermove', onMove);
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
        :class="{
          'is-preview': previewActive,
          'is-link-preview': linkPreviewActive,
        }"
        :style="{
          borderColor: themeColors[theme]?.ring ?? themeColors.default.ring,
        }"
      >
        <div class="cursor-bubble-chrome">
          <video
            v-if="previewHasVideo && preview?.src"
            :src="preview.src"
            class="cursor-preview-video"
            :style="{ transform: `scale(${previewScale})` }"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          >
            <track
              default
              kind="captions"
              label="Decorative preview"
              srclang="en"
              :src="decorativeTrack"
            />
          </video>
          <div v-if="linkPreviewActive" class="cursor-link-card">
            <span class="cursor-link-kicker">Open</span>
            <p v-if="preview?.title" class="cursor-link-title">
              {{ preview.title }}
            </p>
            <p v-if="preview?.subtitle" class="cursor-link-subtitle">
              {{ preview.subtitle }}
            </p>
          </div>
          <div class="cursor-preview-sheen" />
          <p v-if="preview?.title" class="cursor-preview-label">
            {{ preview.title }}
          </p>
        </div>
      </div>
      <!-- Sharp dot — transform set directly by RAF, colour via Vue binding -->
      <div
        ref="dotEl"
        class="cursor-dot"
        :class="{ 'is-hidden': previewActive }"
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
  transition:
    background 300ms ease,
    opacity 280ms ease;
  will-change: transform;
  mix-blend-mode: multiply;
}

.cursor-dot.is-hidden {
  opacity: 0;
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
  background: rgba(255, 255, 255, 0.14);
  pointer-events: none;
  z-index: 9998;
  transition:
    width 420ms cubic-bezier(0.22, 1, 0.36, 1),
    height 420ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 400ms ease,
    background-color 360ms ease,
    box-shadow 420ms ease;
  will-change: transform, width, height, border-radius;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(71, 57, 84, 0.12);
}

.cursor-ring.is-preview {
  width: 220px;
  height: 220px;
  border-width: 1px;
  border-radius: 38% 62% 58% 42% / 43% 41% 59% 57%;
  background: rgba(255, 255, 255, 0.34);
  box-shadow: 0 34px 84px rgba(71, 57, 84, 0.22);
}

.cursor-ring.is-link-preview {
  background:
    radial-gradient(
      circle at top left,
      rgba(255, 255, 255, 0.82),
      transparent 42%
    ),
    linear-gradient(
      145deg,
      rgba(255, 243, 248, 0.96),
      rgba(239, 248, 255, 0.92)
    );
}

.cursor-bubble-chrome {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 220ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 420ms ease;
}

.cursor-ring.is-preview .cursor-bubble-chrome {
  opacity: 1;
  transform: scale(1);
  filter: saturate(1.05);
  animation: cursorBubbleFloat 4.8s ease-in-out infinite alternate;
}

.cursor-ring.is-link-preview .cursor-bubble-chrome {
  filter: none;
}

.cursor-preview-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.02) contrast(1.04);
  animation: cursorVideoDrift 6.5s ease-in-out infinite alternate;
}

.cursor-link-card {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 1.2rem;
  text-align: center;
}

.cursor-link-kicker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(71, 57, 84, 0.92);
  padding: 0.3rem 0.7rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.98);
}

.cursor-link-title {
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  color: #473954;
}

.cursor-link-subtitle {
  margin: 0;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(71, 57, 84, 0.54);
}

.cursor-preview-sheen {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.42), transparent 34%),
    linear-gradient(180deg, transparent 58%, rgba(50, 32, 62, 0.28));
}

.cursor-preview-label {
  position: absolute;
  right: 1rem;
  bottom: 0.95rem;
  left: 1rem;
  margin: 0;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-shadow: 0 2px 12px rgba(21, 13, 31, 0.32);
}

.cursor-ring.is-link-preview .cursor-preview-label {
  display: none;
}

.cursor-ring.is-link-preview .cursor-preview-sheen {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.4), transparent 36%),
    linear-gradient(180deg, transparent 62%, rgba(71, 57, 84, 0.08));
}

@keyframes cursorBubbleFloat {
  0% {
    transform: scale(1) translate3d(0, 0, 0);
  }

  50% {
    transform: scale(1.02) translate3d(0.12rem, -0.16rem, 0);
  }

  100% {
    transform: scale(0.995) translate3d(-0.08rem, 0.14rem, 0);
  }
}

@keyframes cursorVideoDrift {
  0% {
    transform: scale(1.16) translate3d(0, 0, 0);
  }

  100% {
    transform: scale(1.22) translate3d(0.18rem, -0.24rem, 0);
  }
}
</style>
