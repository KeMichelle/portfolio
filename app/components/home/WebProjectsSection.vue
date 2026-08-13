<script setup lang="ts">
import type { ShowcaseProject } from '~/data/portfolio';

const { showPreview, clearPreview } = useCursorPreview();

const props = defineProps<{ projects: ShowcaseProject[] }>();

const featured = computed(() => props.projects[0]);
const otherProjects = computed(() => props.projects.slice(1));

const decorativeTrack =
  'data:text/vtt;charset=utf-8,WEBVTT%0A%0A00:00.000%20-->%2000:10.000%0ADecorative%20project%20preview%0A';

// ── Scroll-driven title parallax ────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null);
const scrollProgress = ref(0);
const titleScrollY = computed(() => scrollProgress.value * -16);

function onScroll() {
  if (!sectionRef.value) return;
  const rect = sectionRef.value.getBoundingClientRect();
  const progress =
    (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
  scrollProgress.value = Math.max(0, Math.min(1, progress));
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});

// ── Cursor preview triggers ─────────────────────────────────────
function handleFeaturedEnter(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !featured.value?.previewSrc) return;
  showPreview({
    mode: 'video',
    src: featured.value.previewSrc,
    title: featured.value.title,
    scale: featured.value.previewScale,
    bubbleSize: 420,
  });
}

function handleOtherProjectEnter(
  project: ShowcaseProject,
  event: PointerEvent,
) {
  if (event.pointerType !== 'mouse' || !project.previewSrc) return;
  showPreview({
    mode: 'video',
    src: project.previewSrc,
    title: project.title,
    scale: project.previewScale,
    bubbleSize: project.previewBubbleSize,
  });
}

function handleLinkEnter(title: string, subtitle: string) {
  showPreview({ mode: 'link', title, subtitle });
}

function handleLeave() {
  clearPreview();
}
</script>

<template>
  <section
    id="web-projects"
    ref="sectionRef"
    aria-label="Work — projects"
    class="section-shell relative overflow-x-clip overflow-y-visible pb-20 pt-14 sm:pb-28 sm:pt-20 lg:pb-32"
  >
    <div
      class="section-bleed curve-panel-b relative overflow-x-clip overflow-y-visible border border-white/60 bg-white/45 px-5 py-12 shadow-dreamy backdrop-blur-xl sm:px-8 sm:py-16 lg:px-12 xl:px-16 min-[1440px]:px-20"
    >
      <!-- Background mesh + ambient glows -->
      <div class="absolute inset-0 mesh-glow opacity-90" />
      <div
        class="absolute -left-16 top-16 h-48 w-48 rounded-full bg-blush/55 blur-3xl"
      />
      <div
        class="absolute right-6 top-8 h-56 w-56 rounded-full bg-lavender/45 blur-3xl"
      />

      <!-- Decorative floats -->
      <div
        class="float-orbit right-[5%] top-[-1.2rem] hidden animate-float lg:block"
      >
        <FloatingAssetSlot
          label="website sparkle"
          src="/yellow_sparkle_2.gif"
          alt="Yellow sparkle"
          tone="yellow"
          size="md"
          :rotate="7"
        />
      </div>
      <div
        class="pointer-events-none absolute -right-1 top-4 z-10 block lg:hidden"
      >
        <img
          src="/yellow_sparkle_1.gif"
          alt=""
          aria-hidden="true"
          class="w-10 rotate-[12deg] object-contain opacity-90"
        />
      </div>
      <img
        src="/random_lines.png"
        alt=""
        aria-hidden="true"
        class="float-orbit left-[-1%] top-[12%] hidden w-28 -rotate-[16deg] animate-drift object-contain opacity-70 xl:block"
      />
      <img
        src="/left_Arrow_Green.gif"
        alt=""
        aria-hidden="true"
        class="float-orbit bottom-[8%] right-[4%] hidden w-16 rotate-[11deg] animate-float object-contain opacity-90 min-[1440px]:block"
      />

      <!-- ======================================================
           SECTION INTRO
      ====================================================== -->
      <MotionReveal class="relative z-10 mb-14 lg:mb-16">
        <SectionHeading
          eyebrow="Work"
          title="Things I've designed, built, and shipped."
          description="Two live projects — one image-led and editorial, one structured and bilingual. Together they show what I can actually do."
        />
      </MotionReveal>

      <!-- ======================================================
           VALENTINA — EDITORIAL FEATURE
      ====================================================== -->
      <div v-if="featured" class="relative z-10 mb-20 lg:mb-28">
        <!-- ── DESKTOP LAYOUT ── -->
        <!-- Hover anywhere in this area to see the cursor preview -->
        <div
          class="hidden lg:block"
          @pointerenter="handleFeaturedEnter($event)"
          @pointerleave="handleLeave"
        >
          <!-- Giant decorative background title -->
          <div class="vale-bg-title" aria-hidden="true">VALENTINA</div>

          <!-- Single editorial column -->
          <div class="max-w-2xl space-y-9 pb-16 pt-4 xl:pt-8">
            <MotionReveal>
              <div class="flex flex-wrap items-center gap-3">
                <span class="vale-eyebrow">Featured project ✦</span>
                <span class="vale-metric-badge">{{ featured.metric }}</span>
              </div>
            </MotionReveal>

            <MotionReveal :delay="80">
              <div :style="{ transform: `translateY(${titleScrollY}px)` }">
                <h3 class="vale-title">Valentina</h3>
                <p class="vale-subtitle">photographer</p>
              </div>
            </MotionReveal>

            <MotionReveal :delay="150">
              <p class="vale-blurb">{{ featured.blurb }}</p>
            </MotionReveal>

            <MotionReveal v-if="featured.caseStudy" :delay="220">
              <div class="vale-idea">
                <p class="vale-mini-label">THE IDEA</p>
                <p class="vale-idea-text">
                  {{ featured.caseStudy.overview }}
                </p>
              </div>
            </MotionReveal>

            <MotionReveal v-if="featured.caseStudy" :delay="290">
              <div class="vale-tech-row">
                <div
                  v-for="item in featured.caseStudy.techDetails"
                  :key="item.label"
                  class="vale-tech-item"
                >
                  <p class="vale-tech-name">{{ item.label }}</p>
                  <p class="vale-tech-note">{{ item.note }}</p>
                </div>
              </div>
            </MotionReveal>

            <MotionReveal :delay="360">
              <div class="vale-ctas">
                <a
                  v-if="featured.href"
                  :href="featured.href"
                  target="_blank"
                  rel="noreferrer"
                  class="vale-cta vale-cta--primary"
                  @pointerenter="
                    handleLinkEnter('See Valentina live', 'Website link')
                  "
                  @pointerleave="handleLeave"
                >
                  SEE THE WEBSITE
                  <span class="vale-arrow">↗</span>
                </a>
                <a
                  v-if="featured.repoHref"
                  :href="featured.repoHref"
                  target="_blank"
                  rel="noreferrer"
                  class="vale-cta vale-cta--secondary"
                  @pointerenter="
                    handleLinkEnter('View the code', 'GitHub repository')
                  "
                  @pointerleave="handleLeave"
                >
                  VIEW THE CODE
                  <span class="vale-arrow">↗</span>
                </a>
              </div>
            </MotionReveal>
          </div>
        </div>

        <!-- ── MOBILE LAYOUT ── -->
        <div class="space-y-7 lg:hidden">
          <MotionReveal>
            <div class="flex flex-wrap items-center gap-3">
              <span class="vale-eyebrow">Featured project ✦</span>
              <span class="vale-metric-badge">{{ featured.metric }}</span>
            </div>
          </MotionReveal>

          <MotionReveal :delay="60">
            <div>
              <h3 class="vale-title">Valentina</h3>
              <p class="vale-subtitle">photographer</p>
            </div>
          </MotionReveal>

          <MotionReveal :delay="120">
            <div
              class="overflow-hidden rounded-[2rem] border border-white/55 bg-white/20 shadow-dreamy"
              style="aspect-ratio: 16 / 10"
            >
              <video
                v-if="featured.previewSrc"
                :src="featured.previewSrc"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
                class="h-full w-full scale-[1.06] object-cover object-top"
              >
                <track
                  default
                  kind="captions"
                  label="Valentina photographer portfolio preview"
                  srclang="en"
                  :src="decorativeTrack"
                />
              </video>
            </div>
          </MotionReveal>

          <MotionReveal :delay="160">
            <p class="vale-blurb">{{ featured.blurb }}</p>
          </MotionReveal>

          <MotionReveal v-if="featured.caseStudy" :delay="210">
            <div class="vale-idea">
              <p class="vale-mini-label">THE IDEA</p>
              <p class="vale-idea-text">{{ featured.caseStudy.overview }}</p>
            </div>
          </MotionReveal>

          <MotionReveal v-if="featured.caseStudy" :delay="260">
            <div class="vale-tech-row">
              <div
                v-for="item in featured.caseStudy.techDetails"
                :key="item.label"
                class="vale-tech-item"
              >
                <p class="vale-tech-name">{{ item.label }}</p>
                <p class="vale-tech-note">{{ item.note }}</p>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal :delay="310">
            <div class="vale-ctas">
              <a
                v-if="featured.href"
                :href="featured.href"
                target="_blank"
                rel="noreferrer"
                class="vale-cta vale-cta--primary"
                @pointerenter="
                  handleLinkEnter('See Valentina live', 'Website link')
                "
                @pointerleave="handleLeave"
              >
                SEE THE WEBSITE
                <span class="vale-arrow">↗</span>
              </a>
              <a
                v-if="featured.repoHref"
                :href="featured.repoHref"
                target="_blank"
                rel="noreferrer"
                class="vale-cta vale-cta--secondary"
                @pointerenter="
                  handleLinkEnter('View the code', 'GitHub repository')
                "
                @pointerleave="handleLeave"
              >
                VIEW THE CODE
                <span class="vale-arrow">↗</span>
              </a>
            </div>
          </MotionReveal>
        </div>
      </div>

      <!-- ======================================================
           OTHER WORK DIVIDER
      ====================================================== -->
      <MotionReveal v-if="otherProjects.length" :delay="100" direction="up">
        <div class="relative z-10 mb-8 flex items-center gap-4 px-1">
          <p
            class="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/42"
          >
            Other work
          </p>
          <div class="h-px flex-1 bg-ink/10" />
        </div>
      </MotionReveal>

      <!-- ======================================================
           EDUP + OTHER COMPACT CARDS
      ====================================================== -->
      <MotionReveal
        v-for="(project, index) in otherProjects"
        :key="project.title"
        :delay="(index + 1) * 80"
        direction="up"
        class="relative z-10"
      >
        <article
          :class="[
            'group card-hover-lilt paper-layer relative overflow-hidden rounded-[2.5rem] border border-white/60 p-6 shadow-float backdrop-blur-xl transition duration-500 ease-out hover:-translate-y-1 hover:shadow-dreamy sm:p-7',
            project.tone,
          ]"
          @pointerenter="handleOtherProjectEnter(project, $event)"
          @pointerleave="handleLeave"
        >
          <div
            class="absolute right-5 top-5 h-16 w-16 rounded-full bg-white/50 blur-2xl"
          />
          <!-- Mobile-only video preview, bleeds to card edges -->
          <div
            v-if="project.previewSrc"
            class="relative -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-[2.5rem] sm:hidden"
            style="aspect-ratio: 16/10"
          >
            <video
              :src="project.previewSrc"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
              class="h-full w-full scale-[1.04] object-cover object-top"
            >
              <track
                default
                kind="captions"
                label="Project preview"
                srclang="en"
                :src="decorativeTrack"
              />
            </video>
          </div>
          <div
            class="relative z-10 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start"
          >
            <div>
              <div class="flex flex-wrap items-center gap-3">
                <StickerChip :label="project.type" tone="pink" icon="✦" />
                <span
                  class="rounded-full bg-white/65 px-3 py-1.5 text-sm font-semibold text-ink/70 shadow-float"
                  >{{ project.metric }}</span
                >
              </div>
              <h3
                class="mt-4 font-display text-4xl font-semibold leading-[1.0] text-ink sm:text-5xl"
              >
                {{ project.title }}
              </h3>
              <p
                class="mt-3 max-w-2xl text-sm leading-7 text-ink/70 sm:text-base sm:leading-8"
              >
                {{ project.blurb }}
              </p>
              <p
                v-if="project.note"
                class="mt-2 max-w-xl text-xs leading-6 text-ink/52 sm:text-sm sm:leading-7"
              >
                {{ project.note }}
              </p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="item in project.tech"
                  :key="item"
                  class="rounded-full border border-white/65 bg-white/55 px-3 py-1.5 text-xs text-ink/70"
                  >{{ item }}</span
                >
              </div>
              <div class="mt-5 flex flex-wrap gap-3">
                <a
                  v-if="project.href"
                  :href="project.href"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex rounded-full border border-white/70 bg-white/72 px-4 py-2 text-sm font-semibold text-ink shadow-float transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  @pointerenter="
                    handleLinkEnter(
                      project.hrefLabel || 'Open project',
                      'Website link',
                    )
                  "
                  @pointerleave="handleLeave"
                  >{{ project.hrefLabel || 'Open project' }}</a
                >
                <a
                  v-if="project.repoHref"
                  :href="project.repoHref"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-float transition duration-300 hover:-translate-y-0.5 hover:bg-[#5a4767] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  @pointerenter="
                    handleLinkEnter(
                      project.repoLabel || 'GitHub repo',
                      'Repository link',
                    )
                  "
                  @pointerleave="handleLeave"
                  >{{ project.repoLabel || 'GitHub repo' }}</a
                >
              </div>
            </div>
            <div
              v-if="project.previewSrc"
              class="hidden overflow-hidden rounded-[1.5rem] border border-white/55 bg-white/30 shadow-float sm:block sm:w-44 lg:w-52"
              style="aspect-ratio: 3/4"
            >
              <video
                :src="project.previewSrc"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
                class="h-full w-full scale-[1.18] object-cover object-center"
              >
                <track
                  default
                  kind="captions"
                  label="Project preview"
                  srclang="en"
                  :src="decorativeTrack"
                />
              </video>
            </div>
          </div>
        </article>
      </MotionReveal>
    </div>
  </section>
</template>

<style scoped>
/* ─────────────────────────────────────────────
   Background decorative title — desktop only
───────────────────────────────────────────── */
.vale-bg-title {
  position: absolute;
  top: -2.5rem;
  left: -0.75rem;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: clamp(6rem, 14vw, 16rem);
  line-height: 0.82;
  letter-spacing: -0.03em;
  color: rgba(71, 57, 84, 0.055);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

/* ─────────────────────────────────────────────
   Eyebrow + badge
───────────────────────────────────────────── */
.vale-eyebrow {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(71, 57, 84, 0.46);
}

.vale-metric-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.78);
  box-shadow: 0 4px 14px rgba(71, 57, 84, 0.08);
  font-size: 0.6875rem;
  font-weight: 600;
  color: rgba(71, 57, 84, 0.62);
}

/* ─────────────────────────────────────────────
   Main title
───────────────────────────────────────────── */
.vale-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: clamp(3.25rem, 7.5vw, 6.75rem);
  line-height: 0.88;
  letter-spacing: -0.02em;
  color: #473954;
}

.vale-subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  font-style: italic;
  font-size: clamp(1.25rem, 3vw, 2.5rem);
  color: rgba(71, 57, 84, 0.46);
  margin-top: 0.18em;
  padding-left: 0.06em;
}

/* ─────────────────────────────────────────────
   Blurb
───────────────────────────────────────────── */
.vale-blurb {
  font-size: 0.9375rem;
  line-height: 1.9;
  color: rgba(71, 57, 84, 0.7);
  max-width: 42ch;
}

@media (min-width: 1024px) {
  .vale-blurb {
    font-size: 1rem;
    max-width: 44ch;
  }
}

/* ─────────────────────────────────────────────
   The Idea block
───────────────────────────────────────────── */
.vale-idea {
  margin-top: 0.25rem;
}

.vale-mini-label {
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(71, 57, 84, 0.36);
  margin-bottom: 0.55rem;
}

.vale-idea-text {
  font-size: 0.8125rem;
  line-height: 1.9;
  color: rgba(71, 57, 84, 0.65);
}

/* ─────────────────────────────────────────────
   Tech annotations
───────────────────────────────────────────── */
.vale-tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.75rem;
}

.vale-tech-item {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
}

.vale-tech-name {
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(71, 57, 84, 0.7);
}

.vale-tech-note {
  font-size: 0.625rem;
  color: rgba(71, 57, 84, 0.4);
}

/* ─────────────────────────────────────────────
   Editorial CTAs
───────────────────────────────────────────── */
.vale-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
}

.vale-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  padding-bottom: 0.15rem;
  transition:
    color 250ms ease,
    border-color 250ms ease;
}

.vale-cta:focus-visible {
  outline: 2px solid #473954;
  outline-offset: 3px;
  border-radius: 2px;
}

.vale-cta--primary {
  color: #473954;
  border-bottom: 1.5px solid rgba(71, 57, 84, 0.35);
}

.vale-cta--primary:hover {
  border-bottom-color: #473954;
}

.vale-cta--secondary {
  color: rgba(71, 57, 84, 0.48);
  border-bottom: 1px solid rgba(71, 57, 84, 0.16);
}

.vale-cta--secondary:hover {
  color: rgba(71, 57, 84, 0.72);
  border-bottom-color: rgba(71, 57, 84, 0.34);
}

.vale-arrow {
  display: inline-block;
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.vale-cta:hover .vale-arrow {
  transform: translate(3px, -3px);
}

/* ─────────────────────────────────────────────
   Reduced motion
───────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .vale-title,
  .vale-subtitle {
    transition: none;
  }
}
</style>
