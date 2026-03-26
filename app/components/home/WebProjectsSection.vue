<script setup lang="ts">
import type { ShowcaseProject } from '~/data/portfolio';
import FloatingAssetSlot from '~/components/shared/FloatingAssetSlot.vue';
import MotionReveal from '~/components/shared/MotionReveal.vue';
import SectionHeading from '~/components/shared/SectionHeading.vue';
import StickerChip from '~/components/shared/StickerChip.vue';

defineProps<{
  projects: ShowcaseProject[];
}>();

const previewBlobClasses = [
  'project-preview-shell',
  'project-preview-shell-alt',
  'project-preview-shell',
];

const highlightBlobClasses = [
  'bg-[#ffe6f2] -rotate-[3deg]',
  'bg-[#e8f6ff] rotate-[2deg]',
  'bg-[#fff4bf] -rotate-[2deg]',
  'bg-[#e7f8ee] rotate-[3deg]',
] as const;

const highlightBlobShapes = [
  'border-radius: 42% 58% 51% 49% / 60% 42% 58% 40%',
  'border-radius: 63% 37% 45% 55% / 43% 56% 44% 57%',
  'border-radius: 36% 64% 58% 42% / 48% 35% 65% 52%',
  'border-radius: 58% 42% 39% 61% / 34% 54% 46% 66%',
] as const;

const decorativeTrack =
  'data:text/vtt;charset=utf-8,WEBVTT%0A%0A00:00.000%20-->%2000:10.000%0ADecorative%20project%20preview%0A';
</script>

<template>
  <section
    id="web-projects"
    class="section-shell relative overflow-x-clip overflow-y-visible pb-20 pt-14 sm:pb-28 sm:pt-20 lg:pb-32"
  >
    <div
      class="section-bleed curve-panel-b relative overflow-x-clip overflow-y-visible border border-white/60 bg-white/45 px-5 py-12 shadow-dreamy backdrop-blur-xl sm:px-8 sm:py-16 lg:px-12 xl:px-16 min-[1440px]:px-20"
    >
      <div class="absolute inset-0 mesh-glow opacity-90" />
      <div
        class="absolute -left-16 top-16 h-48 w-48 rounded-full bg-blush/55 blur-3xl"
      />
      <div
        class="absolute right-6 top-8 h-56 w-56 rounded-full bg-lavender/45 blur-3xl"
      />
      <div
        class="float-orbit right-[5%] top-[-1.2rem] hidden lg:block animate-float"
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
      <img
        src="/random_lines.png"
        alt=""
        aria-hidden="true"
        class="float-orbit left-[-1%] top-[12%] hidden w-28 -rotate-[16deg] object-contain opacity-70 xl:block animate-drift"
      />
      <img
        src="/left_Arrow_Green.gif"
        alt=""
        aria-hidden="true"
        class="float-orbit right-[4%] bottom-[8%] hidden w-16 rotate-[11deg] object-contain opacity-90 min-[1440px]:block animate-float"
      />

      <div
        class="relative z-10 grid gap-10 lg:grid-cols-[minmax(18rem,0.58fr)_minmax(0,1.42fr)] lg:gap-12 xl:grid-cols-[minmax(19rem,0.54fr)_minmax(0,1.46fr)] xl:gap-14 min-[1440px]:gap-20"
      >
        <MotionReveal
          class="relative space-y-6 lg:sticky lg:top-28 lg:self-start lg:pl-2 xl:pl-4 min-[1440px]:pl-6"
        >
          <SectionHeading
            eyebrow="Web projects"
            title="A small selection of work I’ve built so far, more coming soon."
            description="Right now this is a mix of one real client project and a couple of things I’m currently working on, or intentionally leaving space for next."
          />

          <div
            class="card-hover-lilt paper-layer rounded-[2.25rem] border border-white/60 bg-white/60 p-5 shadow-float backdrop-blur-xl"
          >
            <div class="absolute -right-3 -top-3 hidden sm:block">
              <img
                src="/heart.png"
                alt=""
                aria-hidden="true"
                class="w-12 rotate-[12deg] object-contain opacity-90 animate-float"
              />
            </div>
            <p class="text-sm leading-7 text-ink/72 sm:text-base">
              I wanted this section to stay honest: one live website, one build
              in progress, and one space I’m saving for whatever comes next.
            </p>
          </div>
        </MotionReveal>

        <div class="space-y-8 xl:pr-6 min-[1440px]:pr-10">
          <MotionReveal
            v-for="(project, index) in projects"
            :key="project.title"
            :delay="index * 90"
            :direction="index % 2 === 0 ? 'up' : 'left'"
          >
            <article
              :class="[
                'group card-hover-lilt paper-layer relative overflow-visible rounded-[2.7rem] border border-white/60 p-6 shadow-float backdrop-blur-xl transition duration-500 ease-out hover:-translate-y-1 hover:shadow-dreamy sm:p-8',
                project.tone,
                project.tilt,
                project.status ? 'opacity-95' : '',
                index === 0 ? 'xl:mr-12 min-[1440px]:mr-20' : '',
                index === 1 ? 'sm:ml-8 xl:ml-20 min-[1440px]:ml-28' : '',
                index === 2 ? 'xl:-ml-6 min-[1440px]:-ml-14' : '',
              ]"
            >
              <div
                v-if="project.previewSrc"
                :class="[
                  'project-preview-blob pointer-events-none absolute right-2 top-1/2 hidden h-[18rem] w-[14rem] border border-white/50 bg-white/30 p-3 shadow-dreamy backdrop-blur-xl lg:block xl:h-[21rem] xl:w-[16rem]',
                  previewBlobClasses[index % previewBlobClasses.length],
                  index === 1
                    ? 'xl:-right-20 min-[1440px]:-right-24'
                    : 'xl:-right-12 min-[1440px]:-right-16',
                  index === 2
                    ? 'xl:right-auto xl:-left-[4.5rem] min-[1440px]:-left-24'
                    : '',
                ]"
              >
                <div
                  :class="[
                    'project-preview-media flex h-full w-full items-center justify-center border border-white/40 bg-gradient-to-br p-3',
                    project.previewTone ||
                      'from-blush/60 via-white/85 to-mint/55',
                  ]"
                >
                  <video
                    v-if="project.previewSrc"
                    :src="project.previewSrc"
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    class="h-full w-full scale-[1.32] object-cover object-center"
                  >
                    <track
                      default
                      kind="captions"
                      label="Decorative preview"
                      srclang="en"
                      :src="decorativeTrack"
                    />
                  </video>
                </div>
              </div>

              <div
                class="absolute right-5 top-5 h-20 w-20 rounded-full bg-white/50 blur-2xl"
              />
              <img
                v-if="index !== 1"
                src="/yellow_sparkle_1.gif"
                alt=""
                aria-hidden="true"
                class="absolute -left-4 top-16 hidden w-12 -rotate-[8deg] object-contain opacity-85 xl:block animate-float"
              />
              <img
                v-if="index === 1"
                src="/left_Arrow_Green.gif"
                alt=""
                aria-hidden="true"
                class="absolute right-10 -top-6 hidden w-16 rotate-[14deg] object-contain opacity-90 xl:block animate-drift"
              />
              <div
                class="relative z-10 grid gap-6 lg:grid-cols-[1.22fr_0.78fr] lg:items-start lg:gap-8 min-[1440px]:gap-10"
              >
                <div>
                  <div class="flex flex-wrap items-center gap-3">
                    <StickerChip :label="project.type" tone="pink" icon="✦" />
                    <StickerChip
                      v-if="project.status"
                      :label="project.status"
                      tone="yellow"
                      icon="✿"
                    />
                    <span
                      class="rounded-full bg-white/65 px-4 py-2 text-sm font-semibold text-ink/70 shadow-float"
                    >
                      {{ project.metric }}
                    </span>
                  </div>

                  <h3
                    class="mt-5 font-display text-4xl font-semibold text-ink sm:text-5xl"
                  >
                    {{ project.title }}
                  </h3>

                  <p
                    class="mt-4 max-w-2xl text-base leading-8 text-ink/72 sm:text-lg"
                  >
                    {{ project.blurb }}
                  </p>

                  <p
                    v-if="project.note"
                    class="mt-4 max-w-xl text-sm leading-7 text-ink/60 sm:text-base"
                  >
                    {{ project.note }}
                  </p>

                  <a
                    v-if="project.href"
                    :href="project.href"
                    target="_blank"
                    rel="noreferrer"
                    class="mt-5 inline-flex text-sm font-semibold text-ink underline decoration-rose/50 underline-offset-4"
                  >
                    {{ project.hrefLabel || 'Open project' }}
                  </a>

                  <div class="mt-6 flex flex-wrap gap-2">
                    <span
                      v-for="item in project.tech"
                      :key="item"
                      class="rounded-full border border-white/65 bg-white/55 px-3 py-2 text-sm text-ink/75"
                    >
                      {{ item }}
                    </span>
                  </div>
                </div>

                <div :class="['space-y-4', index === 1 ? 'lg:-mt-8' : '']">
                  <div
                    v-if="project.previewSrc"
                    class="card-hover-soft curve-panel-b flex min-h-[13rem] overflow-hidden rounded-[2rem] border border-white/60 bg-white/55 p-2 shadow-float lg:hidden"
                  >
                    <video
                      :src="project.previewSrc"
                      autoplay
                      muted
                      loop
                      playsinline
                      preload="metadata"
                      class="h-full w-full rounded-[1.5rem] scale-[1.32] object-cover object-center"
                    >
                      <track
                        default
                        kind="captions"
                        label="Decorative preview"
                        srclang="en"
                        :src="decorativeTrack"
                      />
                    </video>
                  </div>
                  <div
                    class="curve-panel-c rounded-[2rem] border border-white/60 bg-white/65 p-4 shadow-float"
                  >
                    <p
                      class="text-xs font-semibold uppercase tracking-[0.24em] text-ink/50"
                    >
                      Highlights
                    </p>
                    <div class="mt-3 flex flex-wrap gap-2.5">
                      <span
                        v-for="(item, highlightIndex) in project.highlights"
                        :key="item"
                        :class="[
                          'inline-flex px-3 py-2 text-sm font-medium text-ink shadow-float transition duration-300 hover:-translate-y-0.5',
                          highlightBlobClasses[
                            highlightIndex % highlightBlobClasses.length
                          ],
                        ]"
                        :style="
                          highlightBlobShapes[
                            highlightIndex % highlightBlobShapes.length
                          ]
                        "
                      >
                        {{ item }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </MotionReveal>
        </div>
      </div>
    </div>
  </section>
</template>
