<script setup lang="ts">
import type { ShowcaseProject } from '~/data/portfolio';

defineProps<{
  webProjects: ShowcaseProject[];
  creativeProjects: ShowcaseProject[];
}>();
</script>

<template>
  <section
    id="work"
    class="section-shell relative pb-24 pt-16 sm:pb-28 sm:pt-20 lg:pb-32"
  >
    <div
      class="glass-panel mask-wave relative overflow-hidden px-5 py-12 sm:px-8 sm:py-14 lg:px-12"
    >
      <div
        class="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/55 to-transparent"
      />
      <div
        class="absolute -left-10 bottom-20 h-40 w-40 rounded-full bg-blush/50 blur-3xl"
      />
      <div
        class="absolute right-0 top-16 h-52 w-52 rounded-full bg-mint/40 blur-3xl"
      />

      <MotionReveal>
        <SectionHeading
          eyebrow="Selected work"
          title="Web experiences and styling stories, shown as scenes instead of tiles."
          description="The layout is intentionally fluid: overlapping cards, floating decorative zones, and soft motion cues that let your projects feel more like a curated world than a rigid archive."
        />
      </MotionReveal>

      <div class="relative z-10 mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <MotionReveal class="space-y-6" :delay="70">
          <div class="flex items-center justify-between gap-4 px-1">
            <h3
              class="font-display text-3xl font-semibold text-ink sm:text-4xl"
            >
              Web worlds
            </h3>
            <span class="soft-tag">Nuxt + motion + narrative</span>
          </div>

          <article
            v-for="(project, index) in webProjects"
            :key="project.title"
            :class="[
              'organic-card relative overflow-hidden p-6 sm:p-7 lg:p-8 hover:-translate-y-1.5',
              project.tone,
              project.tilt,
              index === 1 ? 'sm:ml-8' : '',
            ]"
          >
            <div
              class="absolute right-5 top-5 h-16 w-16 rounded-full bg-white/55 blur-2xl"
            />
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p
                  class="text-xs font-semibold uppercase tracking-[0.24em] text-ink/52"
                >
                  {{ project.type }}
                </p>
                <h4
                  class="mt-3 font-display text-3xl font-semibold text-ink sm:text-[2.2rem]"
                >
                  {{ project.title }}
                </h4>
              </div>
              <span
                class="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-ink/75 shadow-float"
              >
                {{ project.metric }}
              </span>
            </div>

            <p class="mt-5 max-w-2xl text-base leading-8 text-ink/72">
              {{ project.blurb }}
            </p>

            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="item in project.tech"
                :key="item"
                class="rounded-full border border-white/65 bg-white/55 px-3 py-2 text-sm text-ink/75"
              >
                {{ item }}
              </span>
            </div>
          </article>
        </MotionReveal>

        <div class="space-y-6">
          <MotionReveal :delay="140" direction="left">
            <div
              class="rounded-[2.5rem] border border-white/60 bg-white/60 p-6 shadow-float backdrop-blur-xl sm:p-7"
            >
              <div class="flex items-center justify-between gap-4">
                <h3
                  class="font-display text-3xl font-semibold text-ink sm:text-4xl"
                >
                  Styling work
                </h3>
                <span class="soft-tag">Visual direction</span>
              </div>

              <div class="mt-6 space-y-5">
                <article
                  v-for="project in creativeProjects"
                  :key="project.title"
                  :class="[
                    'rounded-[2rem] border border-white/60 p-6 shadow-float transition duration-500 hover:-translate-y-1',
                    project.tone,
                    project.tilt,
                  ]"
                >
                  <p
                    class="text-xs font-semibold uppercase tracking-[0.24em] text-ink/52"
                  >
                    {{ project.type }}
                  </p>
                  <h4 class="mt-3 font-display text-3xl font-semibold text-ink">
                    {{ project.title }}
                  </h4>
                  <p class="mt-4 text-base leading-8 text-ink/72">
                    {{ project.blurb }}
                  </p>

                  <div class="mt-5 flex flex-wrap gap-2">
                    <span
                      v-for="item in project.tech"
                      :key="item"
                      class="rounded-full bg-white/65 px-3 py-2 text-sm text-ink/75"
                    >
                      {{ item }}
                    </span>
                  </div>
                </article>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal
            class="grid gap-4 sm:grid-cols-2"
            :delay="210"
            direction="up"
          >
            <DecorSlot label="place fashion sketch / icon" accent="pink" />
            <DecorSlot label="drop layered sticker set" accent="lavender" />
          </MotionReveal>
        </div>
      </div>
    </div>
  </section>
</template>
