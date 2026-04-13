<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import type { ShowcaseProject } from '~/data/portfolio';
import FloatingAssetSlot from '~/components/shared/FloatingAssetSlot.vue';
import MotionReveal from '~/components/shared/MotionReveal.vue';

const props = defineProps<{
  projects: ShowcaseProject[];
}>();

const myStyling = props.projects[0];
const chiaraStyling = props.projects[1];
const futureStyling = props.projects[2];

const sectionRef = ref<HTMLElement | null>(null);
const boardRef = ref<HTMLElement | null>(null);

const activeBoard = ref<'mine' | 'client' | 'review'>('mine');
// parallax is written directly as CSS custom properties on sectionRef
// so mouse moves NEVER trigger Vue re-renders

const designInfluences = [
  'editorial composition',
  'visual balance',
  'layout instinct',
  'image direction',
] as const;

type ClothingPiece = {
  id: string;
  label: string;
  note: string;
  width: string;
  height: string;
  tone: string;
  rotate: string;
  x: number;
  y: number;
  maxX: number;
  maxY: number;
};

const clothingSets = {
  mine: [
    {
      id: 'mine-coat',
      label: 'soft coat',
      note: 'future cutout',
      width: '17%',
      height: '26%',
      tone: 'bg-[#fff6fb]',
      rotate: '-4deg',
      x: 5,
      y: 10,
      maxX: 80,
      maxY: 68,
    },
    {
      id: 'mine-top',
      label: 'pretty top',
      note: 'future cutout',
      width: '16%',
      height: '20%',
      tone: 'bg-[#fffbea]',
      rotate: '4deg',
      x: 24,
      y: 5,
      maxX: 82,
      maxY: 73,
    },
    {
      id: 'mine-trousers',
      label: 'tailored trousers',
      note: 'future cutout',
      width: '15%',
      height: '27%',
      tone: 'bg-[#f2f7ff]',
      rotate: '-3deg',
      x: 43,
      y: 8,
      maxX: 83,
      maxY: 67,
    },
    {
      id: 'mine-dress',
      label: 'dress look',
      note: 'future cutout',
      width: '17%',
      height: '29%',
      tone: 'bg-[#f8fff7]',
      rotate: '5deg',
      x: 62,
      y: 12,
      maxX: 79,
      maxY: 64,
    },
    {
      id: 'mine-look-a',
      label: 'outfit 01',
      note: 'future cutout',
      width: '19%',
      height: '23%',
      tone: 'bg-white',
      rotate: '-4deg',
      x: 11,
      y: 40,
      maxX: 78,
      maxY: 73,
    },
    {
      id: 'mine-look-b',
      label: 'outfit 02',
      note: 'future cutout',
      width: '23%',
      height: '29%',
      tone: 'bg-[#fff8fd]',
      rotate: '2deg',
      x: 33,
      y: 35,
      maxX: 73,
      maxY: 65,
    },
    {
      id: 'mine-shoes',
      label: 'shoes',
      note: 'future cutout',
      width: '14%',
      height: '18%',
      tone: 'bg-[#f8f3ff]',
      rotate: '-5deg',
      x: 61,
      y: 49,
      maxX: 84,
      maxY: 78,
    },
    {
      id: 'mine-bag',
      label: 'bag / detail',
      note: 'future cutout',
      width: '15%',
      height: '17%',
      tone: 'bg-[#fffef6]',
      rotate: '4deg',
      x: 18,
      y: 73,
      maxX: 83,
      maxY: 81,
    },
    {
      id: 'mine-look-c',
      label: 'outfit 03',
      note: 'future cutout',
      width: '15%',
      height: '15%',
      tone: 'bg-[#f0fbff]',
      rotate: '-2deg',
      x: 40,
      y: 77,
      maxX: 84,
      maxY: 83,
    },
    {
      id: 'mine-look-d',
      label: 'outfit 04',
      note: 'future cutout',
      width: '20%',
      height: '17%',
      tone: 'bg-[#fff7f1]',
      rotate: '4deg',
      x: 60,
      y: 74,
      maxX: 77,
      maxY: 82,
    },
  ],
  client: [
    {
      id: 'client-jacket',
      label: 'street jacket',
      note: 'future cutout',
      width: '18%',
      height: '27%',
      tone: 'bg-[#eef8ff]',
      rotate: '-5deg',
      x: 6,
      y: 9,
      maxX: 79,
      maxY: 67,
    },
    {
      id: 'client-tee',
      label: 'graphic tee',
      note: 'future cutout',
      width: '17%',
      height: '20%',
      tone: 'bg-[#fff6fb]',
      rotate: '3deg',
      x: 27,
      y: 6,
      maxX: 81,
      maxY: 73,
    },
    {
      id: 'client-trousers',
      label: 'oversized trousers',
      note: 'future cutout',
      width: '16%',
      height: '29%',
      tone: 'bg-[#f5f2ff]',
      rotate: '-2deg',
      x: 47,
      y: 8,
      maxX: 82,
      maxY: 66,
    },
    {
      id: 'client-racer',
      label: 'sport look',
      note: 'future cutout',
      width: '19%',
      height: '29%',
      tone: 'bg-[#fffdf1]',
      rotate: '5deg',
      x: 66,
      y: 13,
      maxX: 77,
      maxY: 64,
    },
    {
      id: 'client-look-a',
      label: 'outfit 01',
      note: 'future cutout',
      width: '20%',
      height: '22%',
      tone: 'bg-white',
      rotate: '-4deg',
      x: 11,
      y: 42,
      maxX: 77,
      maxY: 74,
    },
    {
      id: 'client-look-b',
      label: 'outfit 02',
      note: 'future cutout',
      width: '24%',
      height: '28%',
      tone: 'bg-[#eefcff]',
      rotate: '2deg',
      x: 34,
      y: 36,
      maxX: 72,
      maxY: 66,
    },
    {
      id: 'client-shoes',
      label: 'sneakers',
      note: 'future cutout',
      width: '15%',
      height: '18%',
      tone: 'bg-[#fff8fd]',
      rotate: '-6deg',
      x: 63,
      y: 50,
      maxX: 83,
      maxY: 78,
    },
    {
      id: 'client-bag',
      label: 'detail / cap',
      note: 'future cutout',
      width: '16%',
      height: '17%',
      tone: 'bg-[#f8fff7]',
      rotate: '4deg',
      x: 17,
      y: 73,
      maxX: 82,
      maxY: 81,
    },
    {
      id: 'client-look-c',
      label: 'outfit 03',
      note: 'future cutout',
      width: '16%',
      height: '15%',
      tone: 'bg-[#f0fbff]',
      rotate: '-1deg',
      x: 41,
      y: 77,
      maxX: 83,
      maxY: 83,
    },
    {
      id: 'client-look-d',
      label: 'outfit 04',
      note: 'future cutout',
      width: '21%',
      height: '17%',
      tone: 'bg-[#fff7f1]',
      rotate: '4deg',
      x: 60,
      y: 74,
      maxX: 77,
      maxY: 82,
    },
  ],
  review: [
    {
      id: 'review-before',
      label: 'before vibe',
      note: 'future cutout',
      width: '18%',
      height: '24%',
      tone: 'bg-[#fff6fb]',
      rotate: '-4deg',
      x: 8,
      y: 12,
      maxX: 79,
      maxY: 70,
    },
    {
      id: 'review-after',
      label: 'after vibe',
      note: 'future cutout',
      width: '20%',
      height: '25%',
      tone: 'bg-[#eef8ff]',
      rotate: '4deg',
      x: 32,
      y: 10,
      maxX: 77,
      maxY: 69,
    },
    {
      id: 'review-palette',
      label: 'colour story',
      note: 'future cutout',
      width: '16%',
      height: '18%',
      tone: 'bg-[#fffbea]',
      rotate: '-2deg',
      x: 57,
      y: 10,
      maxX: 82,
      maxY: 76,
    },
    {
      id: 'review-note',
      label: 'styling note',
      note: 'future cutout',
      width: '18%',
      height: '19%',
      tone: 'bg-[#f8f3ff]',
      rotate: '3deg',
      x: 75,
      y: 16,
      maxX: 79,
      maxY: 75,
    },
    {
      id: 'review-look-a',
      label: 'result 01',
      note: 'future cutout',
      width: '22%',
      height: '26%',
      tone: 'bg-white',
      rotate: '-3deg',
      x: 10,
      y: 42,
      maxX: 75,
      maxY: 69,
    },
    {
      id: 'review-look-b',
      label: 'result 02',
      note: 'future cutout',
      width: '24%',
      height: '28%',
      tone: 'bg-[#fff8fd]',
      rotate: '2deg',
      x: 36,
      y: 39,
      maxX: 71,
      maxY: 67,
    },
    {
      id: 'review-look-c',
      label: 'result 03',
      note: 'future cutout',
      width: '19%',
      height: '22%',
      tone: 'bg-[#f8fff7]',
      rotate: '-5deg',
      x: 66,
      y: 46,
      maxX: 79,
      maxY: 72,
    },
    {
      id: 'review-detail-a',
      label: 'detail',
      note: 'future cutout',
      width: '15%',
      height: '15%',
      tone: 'bg-[#fffef6]',
      rotate: '4deg',
      x: 18,
      y: 74,
      maxX: 84,
      maxY: 83,
    },
    {
      id: 'review-detail-b',
      label: 'review note',
      note: 'future cutout',
      width: '16%',
      height: '15%',
      tone: 'bg-[#f0fbff]',
      rotate: '-2deg',
      x: 43,
      y: 78,
      maxX: 83,
      maxY: 83,
    },
    {
      id: 'review-detail-c',
      label: 'final look',
      note: 'future cutout',
      width: '20%',
      height: '16%',
      tone: 'bg-[#fff7f1]',
      rotate: '4deg',
      x: 63,
      y: 76,
      maxX: 77,
      maxY: 82,
    },
  ],
} as const satisfies Record<
  'mine' | 'client' | 'review',
  readonly ClothingPiece[]
>;

const allClothes = Object.values(clothingSets).flat();

type ClothingId = ClothingPiece['id'];

const currentClothes = computed(() => clothingSets[activeBoard.value]);

const clothingPositions = reactive(
  Object.fromEntries(
    allClothes.map((piece) => [piece.id, { x: piece.x, y: piece.y }]),
  ) as Record<ClothingId, { x: number; y: number }>,
);

const dragState = ref<{
  id: ClothingId;
  offsetX: number;
  offsetY: number;
} | null>(null);

const boardContent = computed(() => {
  if (activeBoard.value === 'client') {
    return {
      eyebrow: 'client example',
      title: chiaraStyling?.title || 'Client example',
      text:
        chiaraStyling?.blurb ||
        'Sharper, sportier, more street-led, but still pulled together and intentional.',
      tags: chiaraStyling?.highlights || [
        'sporty energy',
        'cleaner outfit combinations',
        'streetwear with polish',
      ],
    };
  }

  if (activeBoard.value === 'review') {
    return {
      eyebrow: 'review',
      title: 'How the styling should feel afterwards',
      text: 'The result should still feel like you, just clearer, stronger, and more intentional. That is the whole point of the service.',
      tags: ['more intentional', 'still personal', 'not overstyled'],
    };
  }

  return {
    eyebrow: 'my side',
    title: myStyling?.title || 'My wardrobe',
    text:
      myStyling?.blurb ||
      'Soft, elegant, polished, and built around reworking existing pieces into better combinations.',
    tags: myStyling?.highlights || [
      'pastel outfit combinations',
      'soft moodboard',
      'elegant styling notes',
    ],
  };
});

const boardGlowClasses = computed(() => {
  if (activeBoard.value === 'client') {
    return 'bg-gradient-to-br from-[#eef8ff] via-[#ffffff] to-[#e3fff2]';
  }

  if (activeBoard.value === 'review') {
    return 'bg-gradient-to-br from-[#fff6de] via-[#fffdf6] to-[#ffe8f2]';
  }

  return 'bg-gradient-to-br from-[#fff9fd] via-white to-[#fff6de]';
});

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function getClothingPosition(id: ClothingId) {
  const position = clothingPositions[id];

  if (position) {
    return position;
  }

  return { x: 0, y: 0 };
}

function clothingStyle(piece: ClothingPiece) {
  const position = getClothingPosition(piece.id);

  return {
    left: `${position.x}%`,
    top: `${position.y}%`,
    width: piece.width,
    height: piece.height,
    transform: `rotate(${piece.rotate})`,
  };
}

// Returns a static CSS-var-based transform — no reactive dependency,
// so Vue never re-renders these elements when the mouse moves.
function parallaxStyle(xDepth: number, yDepth: number, baseRotate = 0) {
  return {
    transform: `translate3d(calc(var(--px, 0) * ${xDepth}px), calc(var(--py, 0) * ${yDepth}px), 0) rotate(${baseRotate}deg)`,
  };
}

function startClothingDrag(event: PointerEvent, id: ClothingId) {
  if (!boardRef.value) {
    return;
  }

  // Prevent the browser from claiming the touch for page scroll
  event.preventDefault();

  const piece = allClothes.find((item) => item.id === id);

  if (!piece) {
    return;
  }

  const rect = boardRef.value.getBoundingClientRect();
  const position = getClothingPosition(id);
  const currentX = (position.x / 100) * rect.width;
  const currentY = (position.y / 100) * rect.height;

  dragState.value = {
    id,
    offsetX: event.clientX - rect.left - currentX,
    offsetY: event.clientY - rect.top - currentY,
  };

  (event.currentTarget as HTMLElement | null)?.setPointerCapture?.(
    event.pointerId,
  );
}

// Gate drag updates through RAF so we never do more than 1 position
// write per frame regardless of how fast pointermove fires.
// pendingDrag* are module-level so every pointermove overwrites to latest.
let dragRaf = 0;
let pendingDragX = 0;
let pendingDragY = 0;

function onPointerMove(event: PointerEvent) {
  if (!boardRef.value || !dragState.value) return;
  // Always overwrite to the most recent position
  pendingDragX = event.clientX;
  pendingDragY = event.clientY;
  if (!dragRaf) {
    dragRaf = requestAnimationFrame(() => {
      dragRaf = 0;
      if (!boardRef.value || !dragState.value) return;
      const piece = allClothes.find((item) => item.id === dragState.value?.id);
      if (!piece) return;
      const rect = boardRef.value.getBoundingClientRect();
      const nextX =
        ((pendingDragX - rect.left - dragState.value.offsetX) / rect.width) *
        100;
      const nextY =
        ((pendingDragY - rect.top - dragState.value.offsetY) / rect.height) *
        100;
      const position = getClothingPosition(piece.id);
      position.x = clamp(nextX, 1, piece.maxX);
      position.y = clamp(nextY, 1, piece.maxY);
    });
  }
}

function stopDrag() {
  dragState.value = null;
  cancelAnimationFrame(dragRaf);
  dragRaf = 0;
}

let parallaxRaf = 0;
let pendingPx = 0;
let pendingPy = 0;

function updateParallax(event: PointerEvent) {
  if (!sectionRef.value) return;
  const rect = sectionRef.value.getBoundingClientRect();
  pendingPx = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
  pendingPy = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
  if (!parallaxRaf) {
    parallaxRaf = requestAnimationFrame(() => {
      sectionRef.value?.style.setProperty('--px', String(pendingPx));
      sectionRef.value?.style.setProperty('--py', String(pendingPy));
      parallaxRaf = 0;
    });
  }
}

function resetParallax() {
  cancelAnimationFrame(parallaxRaf);
  parallaxRaf = 0;
  sectionRef.value?.style.setProperty('--px', '0');
  sectionRef.value?.style.setProperty('--py', '0');
}

watch(
  activeBoard,
  (board) => {
    dragState.value = null;

    for (const piece of clothingSets[board]) {
      const position = getClothingPosition(piece.id);
      position.x = piece.x;
      position.y = piece.y;
    }
  },
  { immediate: true },
);

onMounted(() => {
  globalThis.addEventListener('pointermove', onPointerMove);
  globalThis.addEventListener('pointerup', stopDrag);
  globalThis.addEventListener('pointercancel', stopDrag);
});

onBeforeUnmount(() => {
  globalThis.removeEventListener('pointermove', onPointerMove);
  globalThis.removeEventListener('pointerup', stopDrag);
  globalThis.removeEventListener('pointercancel', stopDrag);
});
</script>

<template>
  <section
    id="styling"
    ref="sectionRef"
    class="section-shell defer-section relative overflow-x-clip overflow-y-visible pb-20 pt-10 sm:pb-28 lg:pb-32"
    @pointermove="updateParallax"
    @pointerleave="resetParallax"
  >
    <div class="section-bleed relative overflow-x-clip overflow-y-visible">
      <div
        class="absolute left-[4%] top-[5%] hidden xl:block"
        :style="parallaxStyle(-0.8, -0.5, -6)"
      >
        <FloatingAssetSlot
          label="purple stars"
          src="/purple_stars.gif"
          alt="Purple stars"
          tone="lavender"
          size="md"
          :rotate="-8"
          class="animate-drift"
        />
      </div>
      <div
        class="absolute right-[4%] top-[10%] hidden lg:block"
        :style="parallaxStyle(0.7, -0.4, 7)"
      >
        <FloatingAssetSlot
          label="flower sticker"
          src="/flower.png"
          alt="Flower sticker"
          tone="pink"
          size="sm"
          :rotate="9"
          class="animate-float"
        />
      </div>
      <div
        class="absolute left-[8%] bottom-[10%] hidden lg:block"
        :style="parallaxStyle(-0.7, 0.7, -10)"
      >
        <FloatingAssetSlot
          label="green arrow"
          src="/left_Arrow_Green.gif"
          alt="Green arrow"
          tone="green"
          size="md"
          :rotate="-12"
          class="animate-drift"
        />
      </div>
      <img
        src="/yellow_sparkle_1.gif"
        alt=""
        aria-hidden="true"
        class="absolute right-[12%] top-[7%] hidden w-16 object-contain opacity-90 lg:block animate-float"
        :style="parallaxStyle(0.5, -0.3, 8)"
      />
      <img
        src="/smiley_face.gif"
        alt=""
        aria-hidden="true"
        class="absolute right-[18%] bottom-[8%] hidden w-16 object-contain opacity-90 xl:block animate-float"
        :style="parallaxStyle(0.6, 0.6, -8)"
      />

      <div class="relative z-10 space-y-5 sm:space-y-6">
        <MotionReveal
          class="relative max-w-[38rem] pl-1 sm:pl-2 lg:pl-4"
          :delay="60"
          direction="up"
        >
          <span
            class="inline-flex -rotate-[4deg] rounded-full bg-[#ff8ec3] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-float"
          >
            Creative direction
          </span>
          <h2
            class="mt-5 font-display text-[3rem] font-semibold leading-[0.9] text-ink sm:text-[4rem] lg:text-[5rem]"
          >
            Creative direction &amp; styling
          </h2>
          <p
            class="mt-4 max-w-[34rem] text-sm leading-7 text-ink/74 sm:text-base lg:text-lg"
          >
            Beyond web design, I explore styling and visual composition. This
            influences how I approach layout, balance, and storytelling in
            digital work.
          </p>
        </MotionReveal>

        <div
          class="relative grid gap-5 lg:grid-cols-[minmax(18rem,0.52fr)_minmax(0,1.48fr)] lg:items-start xl:gap-7"
        >
          <div class="relative z-20 lg:sticky lg:top-24 lg:self-start">
            <MotionReveal :delay="180" direction="left">
              <div
                class="card-hover-soft rotate-[-1deg] curve-panel-b border border-white/65 bg-white/84 p-5 shadow-dreamy backdrop-blur-xl sm:rotate-[-2deg] sm:p-6"
              >
                <p
                  class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/46"
                >
                  how it informs the work
                </p>
                <p
                  class="mt-3 font-display text-[1.55rem] leading-[1.04] text-ink sm:text-[1.9rem]"
                >
                  Styling as a design language.
                </p>
                <p class="mt-4 text-sm leading-7 text-ink/66">
                  My editorial eye — for silhouette, proportion, and tone — is
                  the same lens I bring to layout, hierarchy, and visual rhythm
                  in digital work.
                </p>
                <div class="mt-5 flex flex-wrap gap-2">
                  <span
                    v-for="item in designInfluences"
                    :key="item"
                    class="rounded-full bg-[#fff4ae] px-3 py-1.5 text-[11px] font-semibold text-ink shadow-float"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>
            </MotionReveal>
          </div>

          <MotionReveal
            class="relative z-30 lg:-mt-[10.5rem] xl:-mt-[11.5rem]"
            :delay="240"
            direction="up"
          >
            <img
              src="/hello_Note.gif"
              alt=""
              aria-hidden="true"
              class="absolute -left-5 top-6 hidden w-24 -rotate-[10deg] object-contain opacity-95 lg:block animate-float"
            />
            <img
              src="/heart.png"
              alt=""
              aria-hidden="true"
              class="absolute right-10 -top-8 hidden w-14 rotate-[8deg] object-contain opacity-90 lg:block animate-drift"
            />
            <img
              src="/pink_Sparkle.gif"
              alt=""
              aria-hidden="true"
              class="absolute -right-4 bottom-12 hidden w-16 rotate-[10deg] object-contain opacity-90 xl:block animate-float"
            />
            <div
              class="group curve-panel-b relative overflow-visible shadow-dreamy sm:p-6 lg:p-8"
            >
              <div class="absolute inset-0 mesh-glow opacity-80" />
              <div
                class="absolute -left-10 top-10 h-36 w-36 rounded-full bg-[#ffdbe9]/60 blur-3xl"
              />
              <div
                class="absolute right-4 top-4 h-40 w-40 rounded-full bg-[#e5e0ff]/45 blur-3xl"
              />

              <div
                class="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start lg:gap-8"
              >
                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      @click="activeBoard = 'mine'"
                      :class="[
                        'tap-safe-press px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-float transition duration-300 hover:-translate-y-0.5',
                        activeBoard === 'mine'
                          ? 'board-tab-active rotate-[-4deg] border border-white/70 bg-[#ffd8ec] text-ink shadow-dreamy'
                          : 'rotate-[-2deg] border border-white/70 bg-white/82 text-ink/60',
                      ]"
                      style="border-radius: 42% 58% 55% 45% / 48% 38% 62% 52%"
                    >
                      my side
                    </button>
                    <button
                      type="button"
                      @click="activeBoard = 'client'"
                      :class="[
                        'tap-safe-press px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-float transition duration-300 hover:-translate-y-0.5',
                        activeBoard === 'client'
                          ? 'board-tab-active rotate-[3deg] border border-white/70 bg-[#d9f8eb] text-ink shadow-dreamy'
                          : 'rotate-[1deg] border border-white/70 bg-white/82 text-ink/60',
                      ]"
                      style="border-radius: 57% 43% 41% 59% / 39% 55% 45% 61%"
                    >
                      client example
                    </button>
                    <button
                      type="button"
                      @click="activeBoard = 'review'"
                      :class="[
                        'tap-safe-press px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-float transition duration-300 hover:-translate-y-0.5',
                        activeBoard === 'review'
                          ? 'board-tab-active rotate-[-3deg] border border-white/70 bg-[#fff1a9] text-ink shadow-dreamy'
                          : 'rotate-[-1deg] border border-white/70 bg-white/82 text-ink/60',
                      ]"
                      style="border-radius: 36% 64% 58% 42% / 56% 42% 58% 44%"
                    >
                      review
                    </button>
                  </div>

                  <div
                    ref="boardRef"
                    class="relative mt-6 h-[26rem] rounded-[2rem] border border-white/60 bg-gradient-to-br from-[#fff9fd] via-white to-[#fff6de] p-2.5 shadow-float sm:h-[39rem] sm:p-4 lg:h-[42rem]"
                    :style="parallaxStyle(0.3, 0.2)"
                  >
                    <Transition name="board-glow" mode="out-in">
                      <div
                        :key="activeBoard"
                        :class="[
                          'absolute inset-0 rounded-[2rem] transition duration-500',
                          boardGlowClasses,
                        ]"
                      />
                    </Transition>

                    <TransitionGroup
                      tag="div"
                      name="board-piece"
                      class="absolute inset-0"
                    >
                      <div
                        v-for="(piece, pieceIndex) in currentClothes"
                        :key="piece.id"
                        :class="[
                          'absolute cursor-grab active:cursor-grabbing',
                          pieceIndex >= 7 ? 'mobile-optional-piece' : '',
                          dragState?.id === piece.id
                            ? 'z-40'
                            : 'transition-[left,top,transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        ]"
                        :style="{
                          ...clothingStyle(piece),
                          touchAction: 'none',
                        }"
                        @pointerdown="startClothingDrag($event, piece.id)"
                      >
                        <div
                          :class="[
                            'tap-safe-press flex h-full flex-col justify-between rounded-[1.35rem] border border-white p-3 shadow-float transition duration-300 hover:z-40 hover:scale-[1.03] hover:shadow-dreamy sm:p-4',
                            piece.tone,
                          ]"
                        >
                          <span
                            class="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/44"
                          >
                            {{ piece.label }}
                          </span>
                          <div
                            class="rounded-[1rem] border border-dashed border-ink/12 bg-white/60 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-ink/34"
                          >
                            {{ piece.note }}
                          </div>
                        </div>
                      </div>
                    </TransitionGroup>

                    <div
                      class="absolute left-[4%] top-[4%] rounded-full bg-[#fff1a9] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/60 shadow-float"
                    >
                      styling board
                    </div>
                    <div
                      class="absolute bottom-[4%] left-[4%] rounded-full bg-[#eadfff] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/60 shadow-float sm:left-auto sm:right-[5%] sm:top-[6%] sm:bottom-auto"
                    >
                      tap a board
                    </div>

                    <NuxtImg
                      src="/michelle_cutout.png"
                      alt="Michelle styling cutout"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      format="webp"
                      quality="80"
                      sizes="(max-width: 1024px) 180px, 240px"
                      class="absolute bottom-[4%] right-[4%] z-20 h-[5.75rem] w-auto object-contain opacity-88 drop-shadow-[0_22px_45px_rgba(71,57,84,0.18)] sm:h-[9.5rem] lg:h-[10.5rem]"
                      :style="parallaxStyle(0.18, 0.25)"
                    />
                  </div>

                  <div class="mt-3 flex gap-2 sm:hidden">
                    <span
                      class="rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/58 shadow-float"
                    >
                      tap the boards
                    </span>
                    <span
                      class="rounded-full bg-[#fff4ae]/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/58 shadow-float"
                    >
                      drag a few pieces
                    </span>
                  </div>
                </div>

                <div class="space-y-4 lg:pt-2">
                  <Transition name="board-copy" mode="out-in">
                    <div
                      :key="activeBoard"
                      class="card-hover-soft rotate-[1deg] rounded-[1.9rem] border border-white/60 bg-white/78 p-5 shadow-float backdrop-blur-xl sm:rotate-[2deg]"
                    >
                      <p
                        class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/46"
                      >
                        {{ boardContent.eyebrow }}
                      </p>
                      <p
                        class="mt-3 font-display text-[1.6rem] leading-[1.04] text-ink sm:text-[2rem]"
                      >
                        {{ boardContent.title }}
                      </p>
                      <p class="mt-4 text-sm leading-7 text-ink/68">
                        {{ boardContent.text }}
                      </p>
                      <div class="mt-4 flex flex-wrap gap-2">
                        <span
                          v-for="item in boardContent.tags"
                          :key="item"
                          class="rounded-full bg-white px-3 py-2 text-xs font-semibold text-ink shadow-float"
                        >
                          {{ item }}
                        </span>
                      </div>
                    </div>
                  </Transition>

                  <!-- future presentation and work-with-me removed: section is now creative direction taste proof -->
                  <div class="hidden-sr-only" style="display: none">
                    <p
                      class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/46"
                    >
                      future presentation (hidden)
                    </p>
                    <p
                      class="mt-3 font-display text-[1.45rem] leading-[1.04] text-ink sm:text-[1.75rem]"
                    >
                      <span class="hidden sm:inline"
                        >Hover here for Chiara’s future video preview.</span
                      >
                      <span class="sm:hidden"
                        >Future Chiara preview, ready for when the video
                        is.</span
                      >
                    </p>
                    <p class="mt-3 text-sm leading-7 text-ink/66">
                      This is where the video preview can appear later, only on
                      hover, once the client presentation is ready.
                    </p>

                    <div
                      class="relative mt-4 h-[11rem] overflow-hidden rounded-[1.6rem] border border-white/60 bg-white/72"
                    >
                      <div
                        class="absolute inset-0 flex items-center justify-center"
                      >
                        <img
                          src="/colorful_lines.gif"
                          alt=""
                          aria-hidden="true"
                          class="h-20 w-auto object-contain opacity-85"
                        />
                      </div>
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-[#ffdcec]/45 via-transparent to-[#dfe8ff]/45"
                      />
                      <div
                        class="absolute inset-0 flex items-center justify-center opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <div
                          class="rounded-[1.3rem] border border-white/70 bg-white/88 px-5 py-4 text-center shadow-dreamy backdrop-blur-sm"
                        >
                          <p
                            class="text-xs font-semibold uppercase tracking-[0.22em] text-ink/48"
                          >
                            hover video area
                          </p>
                          <p class="mt-2 text-sm leading-6 text-ink/68">
                            future client presentation preview
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="card-hover-lilt hidden rounded-[1.9rem] border border-white/60 bg-gradient-to-br from-white via-[#fff7da] to-[#ffe9f5] p-5 shadow-float backdrop-blur-xl"
                  >
                    <p
                      class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/46"
                    >
                      work with me
                    </p>
                    <p
                      class="mt-3 font-display text-[1.45rem] leading-[1.04] text-ink sm:text-[1.75rem]"
                    >
                      {{ futureStyling?.title || 'Work with me' }}
                    </p>
                    <p class="mt-3 text-sm leading-7 text-ink/66">
                      {{
                        futureStyling?.blurb ||
                        'Wardrobe-based styling sessions, built around what you already own.'
                      }}
                    </p>
                    <a
                      href="#contact"
                      class="tap-safe-press mt-5 inline-flex rounded-full bg-[#ff7ab7] px-4 py-2 text-sm font-semibold text-white shadow-dreamy transition duration-300 hover:bg-[#ff62aa]"
                    >
                      enquire now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.board-tab-active {
  animation: boardTabPulse 2.8s ease-in-out infinite;
}

.board-piece-enter-active,
.board-piece-leave-active {
  transition:
    opacity 320ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.board-piece-enter-from,
.board-piece-leave-to {
  opacity: 0;
  transform: translateY(18px) scale(0.94);
}

.board-copy-enter-active,
.board-copy-leave-active,
.board-glow-enter-active,
.board-glow-leave-active {
  transition:
    opacity 280ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.board-copy-enter-from,
.board-copy-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}

.board-glow-enter-from,
.board-glow-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

@keyframes boardTabPulse {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(0, -1px, 0) scale(1.02);
  }
}

@media (max-width: 639px) {
  .mobile-optional-piece {
    display: none;
  }
}
</style>
