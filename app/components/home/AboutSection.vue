<script setup lang="ts">
// ─────────────────────────────────────────────────────────────────────────────
// Sticky cinematic About section.
// The scroll wrapper provides scroll height; the sticky stage stays in viewport
// while all child elements animate their opacity + transform based on scroll
// progress (p: 0→1). CSS custom properties feed cursor parallax on desktop.
// ─────────────────────────────────────────────────────────────────────────────

const scrollWrapper = ref<HTMLElement | null>(null);
const stageRef = ref<HTMLElement | null>(null);
const p = ref(0); // scroll progress 0→1
const rm = ref(false); // prefers-reduced-motion
const isLg = ref(false);
const isMd = ref(false);
let raf: number | null = null;

function updateP() {
  if (!scrollWrapper.value) return;
  const r = scrollWrapper.value.getBoundingClientRect();
  const total = r.height - window.innerHeight;
  p.value = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
}

const onScroll = () => {
  if (raf !== null) return;
  raf = requestAnimationFrame(() => {
    updateP();
    raf = null;
  });
};

// Cursor parallax via CSS custom properties — bypasses Vue reactivity for perf
const onMouseMove = (e: MouseEvent) => {
  if (!stageRef.value || rm.value) return;
  stageRef.value.style.setProperty(
    '--cx',
    ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3),
  );
  stageRef.value.style.setProperty(
    '--cy',
    ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3),
  );
};

onMounted(() => {
  rm.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  isLg.value = window.innerWidth >= 1024;
  isMd.value = window.innerWidth >= 640;
  window.addEventListener('scroll', onScroll, { passive: true });
  if (!rm.value && window.matchMedia('(pointer: fine)').matches)
    document.addEventListener('mousemove', onMouseMove, { passive: true });
  updateP();
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  document.removeEventListener('mousemove', onMouseMove);
  if (raf !== null) cancelAnimationFrame(raf);
});

// ── helpers ──────────────────────────────────────────────────────────────────

function eio(t: number): number {
  t = Math.max(0, Math.min(1, t));
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function cl(v: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, v));
}

// Local progress (0→1, eased) within a scroll range
function prg(s: number, e: number) {
  return eio(cl((p.value - s) / (e - s)));
}

// Lerp
function lp(a: number, b: number, t: number) {
  return a + (b - a) * cl(t);
}

// Opacity with fade-in/out. outS/outE default to "never fade out"
function op(inS: number, inE: number, outS = 99, outE = 99.1): number {
  const v = p.value;
  if (rm.value) return v >= inS && v < outE ? 1 : 0;
  if (v < inS) return 0;
  if (v < inE) return prg(inS, inE);
  if (v < outS) return 1;
  if (v < outE) return 1 - prg(outS, outE);
  return 0;
}

// blur: entrance blur-in (px). exitFy/exitFx: exit movement; exitFy defaults to -22 (all exit upward).
function st(
  inS: number,
  inE: number,
  outS: number,
  outE: number,
  opts: {
    fy?: number;
    fx?: number;
    fs?: number;
    blur?: number;
    exitFy?: number;
    exitFx?: number;
  } = {},
): Record<string, string> {
  const o = op(inS, inE, outS, outE);
  if (o === 0 && p.value > outE + 0.04)
    return { opacity: '0', visibility: 'hidden', pointerEvents: 'none' };
  if (rm.value)
    return { opacity: o.toFixed(2), pointerEvents: o > 0 ? 'auto' : 'none' };

  const v = p.value;
  let ty = 0,
    tx = 0,
    sc = 1,
    blurPx = 0;

  if (v < inE) {
    const t = prg(inS, inE);
    if (opts.fy) ty = lp(opts.fy, 0, t);
    if (opts.fx) tx = lp(opts.fx, 0, t);
    if (opts.fs !== undefined) sc = lp(opts.fs, 1, t);
    if (opts.blur) blurPx = lp(opts.blur, 0, t);
  } else if (v >= outS) {
    const t = prg(outS, outE);
    ty = lp(0, opts.exitFy !== undefined ? opts.exitFy : -22, t);
    if (opts.exitFx) tx = lp(0, opts.exitFx, t);
    blurPx = lp(0, 4, t);
  }

  return {
    opacity: o.toFixed(3),
    transform: `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px)${sc !== 1 ? ` scale(${sc.toFixed(3)})` : ''}`,
    ...(blurPx > 0.2 ? { filter: `blur(${blurPx.toFixed(1)}px)` } : {}),
    pointerEvents: o > 0.05 ? 'auto' : 'none',
  };
}

// ── cutout: center→left on desktop; upward parallax in scene 1; tilt on transition ──
const cutoutStyle = computed<Record<string, string>>(() => {
  const pv = p.value;
  const o = op(0, 0.04, 0.42, 0.5);
  const tr = isLg.value && !rm.value ? eio(cl((pv - 0.18) / 0.12)) : 0;
  const leftPct = lp(42, 16, tr);
  const scale = lp(1, 0.68, tr);
  const entY = rm.value ? 0 : lp(36, 0, eio(cl(pv / 0.04)));
  const paraY = !rm.value && pv < 0.18 ? lp(0, -18, eio(cl(pv / 0.18))) : 0;
  const rot = rm.value ? 0 : lp(0, -3, tr);
  return {
    opacity: o.toFixed(3),
    left: `${leftPct.toFixed(1)}%`,
    bottom: '8%',
    transform: `translateX(-50%) translateY(${(entY + paraY).toFixed(1)}px) scale(${scale.toFixed(3)}) rotate(${rot.toFixed(2)}deg)`,
    pointerEvents: o > 0.05 ? 'auto' : 'none',
  };
});

// ── photo 1: blur entrance, continuous parallax, drifts right on exit ──
const photo1Style = computed<Record<string, string>>(() => {
  const pv = p.value;
  const o = op(0.22, 0.33, 0.44, 0.52);
  const entX = rm.value ? 0 : lp(80, 0, prg(0.22, 0.33));
  const entBlur = rm.value ? 0 : lp(18, 0, prg(0.22, 0.33));
  const paraY = rm.value ? 0 : lp(22, -28, prg(0.22, 0.52));
  const exitX = pv >= 0.44 && !rm.value ? lp(0, 55, prg(0.44, 0.52)) : 0;
  return {
    opacity: o.toFixed(3),
    transform: `translateX(${(entX + exitX).toFixed(1)}px) translateY(${paraY.toFixed(1)}px)`,
    ...(entBlur > 0.2 ? { filter: `blur(${entBlur.toFixed(1)}px)` } : {}),
    pointerEvents: o > 0.05 ? 'auto' : 'none',
  };
});

// ── photo 2: scale + blur entrance, continuous upward parallax ──
const photo2Style = computed<Record<string, string>>(() => {
  const o = op(0.64, 0.72, 0.83, 0.89);
  const scEnt = rm.value ? 1 : lp(0.82, 1, prg(0.64, 0.72));
  const entBlur = rm.value ? 0 : lp(20, 0, prg(0.64, 0.72));
  const paraY = rm.value ? 0 : lp(22, -22, prg(0.64, 0.89));
  return {
    opacity: o.toFixed(3),
    transform: `scale(${scEnt.toFixed(3)}) translateY(${paraY.toFixed(1)}px)`,
    ...(entBlur > 0.2 ? { filter: `blur(${entBlur.toFixed(1)}px)` } : {}),
    pointerEvents: o > 0.05 ? 'auto' : 'none',
  };
});

const techLabels = [
  { text: 'Vue', pos: 'left-[8%]  top-[22%]', delay: 0 },
  { text: 'Nuxt', pos: 'left-[18%] top-[48%]', delay: 0.01 },
  { text: 'React', pos: 'left-[5%]  top-[65%]', delay: 0.02 },
  { text: 'TypeScript', pos: 'right-[8%] top-[35%]', delay: 0.03 },
  { text: 'SCSS', pos: 'right-[15%] top-[58%]', delay: 0.02 },
  { text: 'Tailwind', pos: 'right-[5%]  top-[72%]', delay: 0.01 },
];
</script>

<template>
  <section id="about" aria-label="About Michelle">
    <!-- ── MOBILE LAYOUT: natural scroll, intentionally designed ── -->
    <div class="relative overflow-hidden bg-cream px-5 pb-20 pt-14 sm:hidden">
      <!-- Atmospheric colour glows -->
      <div
        class="pointer-events-none absolute left-[-20%] top-[2%] h-72 w-72 rounded-full bg-[#ffd4ea]/28 blur-[80px]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute right-[-15%] top-[38%] h-56 w-56 rounded-full bg-[#ffe7a6]/22 blur-[70px]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute bottom-[20%] left-[-10%] h-52 w-52 rounded-full bg-[#dcd8ff]/22 blur-[60px]"
        aria-hidden="true"
      />

      <!-- Opening: Hi, I'm Michelle -->
      <div class="mb-16 flex flex-col items-center text-center">
        <MotionReveal>
          <span
            class="mb-5 inline-flex -rotate-[2deg] rounded-full bg-[#8ce7c0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ink shadow-float"
            >About me</span
          >
        </MotionReveal>

        <MotionReveal :delay="60">
          <h2
            class="font-display font-semibold text-ink"
            style="
              font-size: clamp(2.8rem, 14vw, 4.5rem);
              line-height: 0.88;
              letter-spacing: -0.02em;
            "
          >
            Hi, I'm<br />Michelle.
          </h2>
        </MotionReveal>

        <MotionReveal :delay="120">
          <div class="relative mx-auto mt-8 w-44">
            <div
              class="pointer-events-none absolute inset-0 rounded-full bg-[#ffd4ea]/40 blur-2xl"
              aria-hidden="true"
            />
            <img
              src="/cutout_michelle_phone_selfie.png"
              alt="Michelle"
              class="relative z-10 object-contain drop-shadow-[0_16px_36px_rgba(71,57,84,0.18)]"
            />
          </div>
        </MotionReveal>

        <MotionReveal :delay="160">
          <span
            class="mt-4 inline-flex rounded-full border border-white/70 bg-white/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/58 shadow-float backdrop-blur-md"
            >London via Italy ☀️</span
          >
        </MotionReveal>
      </div>

      <!-- A bit about me -->
      <div class="mb-14 space-y-4">
        <MotionReveal>
          <p
            class="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/38"
          >
            a bit about me
          </p>
          <p class="mt-3 text-base leading-8 text-ink/72">
            I'm originally from Italy and recently moved to London.
          </p>
          <p class="mt-2 text-sm leading-7 text-ink/60">
            I've always been a pretty happy person. I love sunshine, the sea,
            travelling, colourful things, fashion and making things.
          </p>
        </MotionReveal>
        <MotionReveal :delay="50">
          <p class="font-display text-xl italic text-ink/62">
            My friends say I'm a little ray of sunshine ☀️
          </p>
        </MotionReveal>
      </div>

      <!-- How it started -->
      <div class="mb-14 space-y-4">
        <MotionReveal>
          <p class="text-base leading-8 text-ink/72">
            I started coding in high school because I wanted to make games.
          </p>
        </MotionReveal>
        <MotionReveal :delay="40">
          <p class="text-sm leading-7 text-ink/60">
            That didn't quite work out, so I started making websites instead.
            Got my first job straight after graduating and spent a few years
            building corporate web apps.
          </p>
        </MotionReveal>
        <MotionReveal :delay="80">
          <p class="font-display text-xl font-semibold italic text-ink/62">
            But somewhere along the way I became obsessed with the little things
            too.
          </p>
        </MotionReveal>
      </div>

      <!-- How I work -->
      <div class="space-y-4">
        <MotionReveal>
          <p
            class="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/38"
          >
            how I work
          </p>
          <p class="mt-3 text-base leading-8 text-ink/72">
            I still love the coding part.
          </p>
          <p class="mt-2 text-sm leading-7 text-ink/58">
            Now I spend a lot of my time making my own projects, learning new
            things and figuring out what I want to build next.
          </p>
        </MotionReveal>
        <MotionReveal :delay="50">
          <div class="flex flex-wrap gap-2 pt-1">
            <span
              v-for="tag in techLabels"
              :key="tag.text"
              class="rounded-full border border-white/65 bg-white/55 px-3 py-1.5 text-xs font-semibold text-ink/72 shadow-float backdrop-blur-sm"
              >{{ tag.text }}</span
            >
          </div>
        </MotionReveal>
      </div>
    </div>

    <!-- ── DESKTOP LAYOUT: cinematic sticky scroll (unchanged) ── -->
    <!-- Scroll wrapper — 500vh provides the scroll distance for the cinematic stage -->
    <div
      ref="scrollWrapper"
      class="relative hidden sm:block"
      style="height: 500vh"
    >
      <!-- Sticky stage: 100vh, stays in viewport while wrapper scrolls past -->
      <div
        ref="stageRef"
        class="sticky top-0 h-screen w-full overflow-hidden bg-cream"
        style="--cx: 0; --cy: 0"
      >
        <!-- ─── BACKGROUND COLOUR FIELDS ──────────────────────────────── -->

        <!-- Scene 1: warm blush -->
        <div
          class="pointer-events-none absolute inset-0"
          :style="{
            opacity: op(0, 0.06, 0.2, 0.32),
            transform: `scale(${rm ? 1 : lp(0.75, 1.08, prg(0, 0.25))})`,
          }"
        >
          <div
            class="absolute right-[-6%] top-[-8%] h-[75%] w-[65%] rounded-full bg-[#ffd4ea]/38 blur-[110px]"
          />
          <div
            class="absolute left-[-4%] bottom-[-6%] h-[50%] w-[50%] rounded-full bg-[#c7f5e4]/22 blur-[90px]"
          />
        </div>

        <!-- Scene 2: warm yellow/gold (Italy, sunshine) -->
        <div
          class="pointer-events-none absolute inset-0"
          :style="{
            opacity: op(0.18, 0.28, 0.44, 0.52),
            transform: `scale(${rm ? 1 : lp(0.75, 1.1, prg(0.18, 0.38))})`,
          }"
        >
          <div
            class="absolute left-[-8%] top-[8%] h-[65%] w-[58%] rounded-full bg-[#ffe7a6]/36 blur-[100px]"
          />
          <div
            class="absolute right-[-4%] top-[-5%] h-[55%] w-[52%] rounded-full bg-[#ffd4ea]/26 blur-[90px]"
          />
        </div>

        <!-- Scene 3: soft lavender/mint (design obsession) -->
        <div
          class="pointer-events-none absolute inset-0"
          :style="{
            opacity: op(0.4, 0.5, 0.65, 0.72),
            transform: `scale(${rm ? 1 : lp(0.75, 1.08, prg(0.4, 0.58))})`,
          }"
        >
          <div
            class="absolute right-[-5%] top-[6%] h-[65%] w-[58%] rounded-full bg-[#dcd8ff]/30 blur-[100px]"
          />
          <div
            class="absolute left-[4%] bottom-[4%] h-[45%] w-[45%] rounded-full bg-[#d6fef0]/26 blur-[85px]"
          />
        </div>

        <!-- Scene 4: blush/butter (code) -->
        <div
          class="pointer-events-none absolute inset-0"
          :style="{
            opacity: op(0.62, 0.7, 0.84, 0.9),
            transform: `scale(${rm ? 1 : lp(0.75, 1.08, prg(0.62, 0.78))})`,
          }"
        >
          <div
            class="absolute left-[-6%] top-[-5%] h-[65%] w-[58%] rounded-full bg-[#ffd4ea]/30 blur-[100px]"
          />
          <div
            class="absolute right-[4%] bottom-[8%] h-[45%] w-[48%] rounded-full bg-[#fff0b8]/26 blur-[85px]"
          />
        </div>

        <!-- ─── SCENE 1: OPENING ───────────────────────────────────────── -->

        <!-- "About me" label -->
        <div
          class="absolute left-[5%] top-[8%] z-40 sm:left-[6%] lg:left-[8%]"
          :style="st(0, 0.04, 0.15, 0.2, { fy: -8, blur: 8, exitFy: -12 })"
        >
          <span
            class="inline-flex -rotate-[3deg] rounded-full bg-[#8ce7c0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-ink shadow-float"
          >
            About me
          </span>
        </div>

        <!-- "Hi, I'm" — large display type, left side -->
        <div
          class="about-hi absolute z-20"
          :style="{
            left: '5%',
            top: isMd ? '26%' : '15%',
            ...st(0, 0.05, 0.16, 0.22, {
              fy: 22,
              fx: -14,
              blur: 14,
              exitFx: -12,
            }),
          }"
        >
          <h2
            class="font-display font-semibold leading-[0.86] text-ink"
            style="font-size: clamp(3.2rem, 8vw, 9rem)"
          >
            Hi,<br />I'm
          </h2>
        </div>

        <!-- "Michelle." — large display type, right side -->
        <div
          class="about-michelle absolute z-20 text-right"
          :style="{
            right: '5%',
            top: isMd ? '26%' : '37%',
            ...st(0.01, 0.06, 0.16, 0.22, {
              fy: 22,
              fx: 14,
              blur: 14,
              exitFx: 12,
            }),
          }"
        >
          <p
            class="font-display font-semibold leading-[0.86] text-ink"
            style="font-size: clamp(3.2rem, 8vw, 9rem)"
          >
            Michelle.
          </p>
        </div>

        <!-- CUTOUT (computed position: center→left transition) -->
        <div class="absolute z-30" :style="cutoutStyle">
          <div
            class="pointer-events-none absolute inset-0 rounded-full bg-[#ffd4ea]/45 blur-2xl"
            aria-hidden="true"
          />
          <img
            src="/cutout_michelle_phone_selfie.png"
            alt="Michelle"
            class="relative z-10 cursor-float-a object-contain drop-shadow-[0_24px_48px_rgba(71,57,84,0.22)]"
            style="width: clamp(9rem, 20vw, 18rem)"
          />
          <!-- Location chip under cutout, fades out with it -->
          <div
            class="absolute -bottom-6 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap"
          >
            <span
              class="inline-flex rounded-full border border-white/70 bg-white/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/58 shadow-float backdrop-blur-md"
            >
              London via Italy ☀️
            </span>
          </div>
        </div>

        <!-- Purple stars, top-right — gentle cursor float -->
        <div
          class="absolute z-40 cursor-float-b"
          :style="{ right: '6%', top: '7%', ...st(0.02, 0.07, 0.18, 0.24) }"
          aria-hidden="true"
        >
          <img
            src="/purple_stars.gif"
            alt=""
            class="w-10 -rotate-[8deg] opacity-90 sm:w-12"
          />
        </div>

        <!-- Flower, lower-left -->
        <div
          class="absolute z-40 hidden cursor-float-c sm:block"
          :style="{ left: '5%', bottom: '14%', ...st(0.03, 0.08, 0.17, 0.23) }"
          aria-hidden="true"
        >
          <img src="/flower.png" alt="" class="w-9 rotate-[14deg] opacity-80" />
        </div>

        <!-- ─── SCENE 2: ITALY / PERSONAL ────────────────────────────── -->

        <!-- Main text block -->
        <div
          class="absolute z-20"
          :style="{
            left: '6%',
            top: '20%',
            maxWidth: isMd ? 'min(44rem, 50%)' : '88vw',
            ...st(0.2, 0.28, 0.38, 0.45, { fy: 28, fx: -8, blur: 10 }),
          }"
        >
          <p
            class="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/38"
          >
            a bit about me
          </p>
          <p
            class="mt-4 text-base leading-8 text-ink/72 sm:text-lg sm:leading-9 lg:text-xl"
          >
            I'm originally from Italy and recently moved to London.
          </p>
          <p
            class="mt-3 text-sm leading-7 text-ink/60 sm:text-base sm:leading-8"
          >
            I've always been a pretty happy person. I love sunshine, the sea,
            travelling, colourful things, fashion and making things.
          </p>
        </div>

        <!-- "ray of sunshine" note -->
        <div
          class="absolute z-30"
          :style="{
            left: '6%',
            bottom: '18%',
            ...st(0.28, 0.34, 0.4, 0.46, { fy: 16, blur: 8 }),
          }"
        >
          <p
            class="font-display text-xl italic text-ink/65 sm:text-2xl lg:text-3xl"
          >
            My friends say I'm a little ray of sunshine ☀️
          </p>
        </div>

        <!-- Photo 1 (_DSC2782i) — organic blob mask, right side on desktop -->
        <div
          class="absolute z-10 hidden sm:block"
          :style="{
            ...photo1Style,
            right: '4%',
            top: '8%',
            width: 'clamp(12rem, 36vw, 44%)',
            bottom: undefined,
          }"
        >
          <div
            class="pointer-events-none absolute inset-[-8%] bg-[#c7f5e4]/28 blur-3xl"
            style="border-radius: 60% 40% 55% 45% / 45% 58% 42% 55%"
            aria-hidden="true"
          />
          <div
            class="overflow-hidden shadow-[0_30px_80px_rgba(71,57,84,0.15)]"
            style="
              border-radius: 54% 46% 62% 38% / 47% 55% 45% 53%;
              aspect-ratio: 3/4;
            "
          >
            <img
              src="/_DSC2782i.jpg"
              alt="Michelle"
              class="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

        <!-- italy_london map, floating -->
        <div
          class="absolute z-30 hidden cursor-float-b sm:block"
          :style="{
            right: '6%',
            bottom: '10%',
            ...st(0.3, 0.38, 0.44, 0.5, { fy: 12 }),
          }"
        >
          <div class="-rotate-[3deg] opacity-85">
            <img
              src="/italy_london.png"
              alt="Cutout map from Italy to London"
              class="w-28 object-contain lg:w-36"
            />
          </div>
        </div>

        <!-- ─── SCENE 3: GAMING → WEBSITES → DESIGN OBSESSION ─────────── -->

        <!-- Architectural large type background — "DESIGN" -->
        <div
          class="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          :style="{
            opacity: op(0.42, 0.52, 0.64, 0.7),
            transform: `scale(${rm ? 1 : lp(1.5, 1, prg(0.42, 0.56))})`,
          }"
          aria-hidden="true"
        >
          <span
            class="select-none font-display font-semibold leading-none text-ink/[0.05]"
            style="font-size: clamp(8rem, 28vw, 28rem)"
            >DESIGN</span
          >
        </div>

        <!-- "I started coding because games." -->
        <div
          class="absolute z-20"
          :style="{
            left: '6%',
            top: '22%',
            maxWidth: isMd ? 'min(40rem, 60%)' : '88vw',
            ...st(0.4, 0.47, 0.54, 0.59, { fy: 24, blur: 10 }),
          }"
        >
          <p
            class="text-base leading-8 text-ink/72 sm:text-lg sm:leading-9 lg:text-xl"
          >
            I started coding in high school because I wanted to make games.
          </p>
        </div>

        <!-- "That didn't work out → websites instead." -->
        <div
          class="absolute z-20"
          :style="{
            left: '6%',
            top: '38%',
            maxWidth: isMd ? 'min(38rem, 60%)' : '88vw',
            ...st(0.44, 0.5, 0.56, 0.6, { fy: 20, blur: 8 }),
          }"
        >
          <p class="text-sm leading-7 text-ink/60 sm:text-base sm:leading-8">
            That didn't quite work out, so I started making websites instead.
            Got my first job straight after graduating and spent a few years
            building corporate web apps.
          </p>
        </div>

        <!-- "But somewhere along the way..." statement -->
        <div
          class="absolute z-20"
          :style="{
            left: '6%',
            top: '55%',
            maxWidth: isMd ? 'min(42rem, 60%)' : '88vw',
            ...st(0.5, 0.56, 0.62, 0.66, { fy: 18, blur: 10 }),
          }"
        >
          <p
            class="font-display text-xl font-semibold italic text-ink/65 sm:text-2xl lg:text-3xl"
          >
            But somewhere along the way I became obsessed with the little things
            too.
          </p>
        </div>

        <!-- The three little questions — appear in sequence -->
        <div
          class="absolute z-30 hidden sm:block"
          :style="{
            right: '8%',
            top: '22%',
            ...st(0.54, 0.58, 0.61, 0.64, {
              fx: 26,
              fy: -10,
              blur: 8,
              exitFy: -6,
              exitFx: 22,
            }),
          }"
        >
          <p
            class="rotate-[-1.5deg] font-display text-lg italic text-ink/55 sm:text-2xl"
          >
            "Why does this feel weird?"
          </p>
        </div>
        <div
          class="absolute z-30 hidden sm:block"
          :style="{
            right: '5%',
            top: '38%',
            ...st(0.57, 0.61, 0.63, 0.66, {
              fx: 26,
              fy: -10,
              blur: 8,
              exitFy: -6,
              exitFx: 20,
            }),
          }"
        >
          <p
            class="rotate-[1deg] font-display text-base italic text-ink/50 sm:text-xl"
          >
            "Why is that button moving like that?"
          </p>
        </div>
        <div
          class="absolute z-30 hidden sm:block"
          :style="{
            right: '10%',
            top: '52%',
            ...st(0.6, 0.64, 0.66, 0.68, {
              fx: 26,
              fy: -10,
              blur: 8,
              exitFy: -6,
            }),
          }"
        >
          <p
            class="rotate-[-0.5deg] font-display text-sm italic text-ink/45 sm:text-lg"
          >
            "Could this look a little nicer?"
          </p>
        </div>

        <!-- Sparkle decoration, scene 3 -->
        <div
          class="pointer-events-none absolute z-40"
          :style="{ left: '48%', top: '8%', ...st(0.46, 0.52, 0.64, 0.68) }"
          aria-hidden="true"
        >
          <img
            src="/yellow_sparkle_1.gif"
            alt=""
            class="w-9 rotate-[8deg] opacity-80"
          />
        </div>

        <!-- ─── SCENE 4: ENGINEERING / CODE ───────────────────────────── -->

        <!-- Tech labels scattered — each with slightly different timing -->
        <template v-for="tag in techLabels" :key="tag.text">
          <div
            class="absolute z-20 hidden sm:block"
            :class="tag.pos"
            :style="
              st(0.62 + tag.delay, 0.7 + tag.delay, 0.8, 0.86, { fy: 14 })
            "
          >
            <span
              class="rounded-full border border-white/65 bg-white/55 px-3 py-1.5 text-xs font-semibold text-ink/72 shadow-float backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm"
            >
              {{ tag.text }}
            </span>
          </div>
        </template>

        <!-- Main text -->
        <div
          class="absolute z-20"
          :style="{
            left: '6%',
            top: '30%',
            maxWidth: isMd ? 'min(38rem, 52%)' : '88vw',
            ...st(0.63, 0.7, 0.8, 0.85, { fy: 22, blur: 10 }),
          }"
        >
          <p
            class="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/38"
          >
            how I work
          </p>
          <p
            class="mt-4 text-base leading-8 text-ink/72 sm:text-lg sm:leading-9 lg:text-xl"
          >
            I still love the coding part.
          </p>
          <p
            class="mt-3 text-sm leading-7 text-ink/58 sm:text-base sm:leading-8"
          >
            Now I spend a lot of my time making my own projects, learning new
            things and figuring out what I want to build next.
          </p>
        </div>

        <!-- Photo 2 (_DSC2868h) — circular, right side -->
        <div
          class="absolute z-10 hidden sm:block"
          :style="{
            ...photo2Style,
            right: '5%',
            top: '15%',
            width: 'clamp(10rem, 28vw, 36%)',
            bottom: undefined,
          }"
        >
          <div
            class="pointer-events-none absolute inset-[-12%] bg-[#ffd4ea]/26 blur-3xl"
            style="border-radius: 50%"
            aria-hidden="true"
          />
          <div
            class="overflow-hidden shadow-[0_30px_80px_rgba(71,57,84,0.14)]"
            style="border-radius: 50%; aspect-ratio: 1 / 1"
          >
            <img
              src="/_DSC2868h.jpg"
              alt="Michelle"
              class="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <img
            src="/pink_Sparkle.gif"
            alt=""
            aria-hidden="true"
            class="pointer-events-none absolute -right-2 -top-2 z-10 w-9 rotate-[14deg] opacity-85 sm:w-11"
          />
        </div>
      </div>
      <!-- /sticky stage -->
    </div>
    <!-- /scroll wrapper -->
  </section>
</template>

<style scoped>
/* Cursor parallax — applied directly to elements via CSS vars on stageRef.
   Only active on pointer-capable devices (set via JS). */
.cursor-float-a {
  transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
  transform: translate(calc(var(--cx, 0) * 6px), calc(var(--cy, 0) * 4px));
}
.cursor-float-b {
  transition: transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
  transform: translate(calc(var(--cx, 0) * 10px), calc(var(--cy, 0) * 7px));
}
.cursor-float-c {
  transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
  transform: translate(calc(var(--cx, 0) * -8px), calc(var(--cy, 0) * 5px));
}

/* Scroll hint animation */
@keyframes scrollBob {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(4px);
  }
}
.scroll-hint {
  animation: scrollBob 2s ease-in-out infinite;
}

/* On mobile: natural-scroll layout is used instead — no min-height needed */
@media (max-width: 639px) {
  section {
    min-height: unset;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cursor-float-a,
  .cursor-float-b,
  .cursor-float-c {
    transform: none;
    transition: none;
  }
  .scroll-hint {
    animation: none;
  }
}
</style>
