<script setup lang="ts">
import type { CodeProject, FriendReview } from '~/data/portfolio';
import { computed } from 'vue';
import FloatingAssetSlot from '~/components/shared/FloatingAssetSlot.vue';
import MotionReveal from '~/components/shared/MotionReveal.vue';

type RecentCommit = {
  id: string;
  repo: string;
  repoLabel: string;
  message: string;
  sha: string;
  createdAt: string;
  url: string;
};

type GitHubFeedResponse = {
  commits: RecentCommit[];
  profileUrl: string;
  status: 'ok' | 'unavailable';
};

const props = defineProps<{
  codeProjects: CodeProject[];
  friendReviews: FriendReview[];
}>();

const stickyNotes = props.friendReviews.slice(0, 3);

const extraStickyNote = {
  role: 'Working note',
  quote: 'Strong balance between design taste and real product thinking.',
  accent: 'yellow' as const,
};

const stickyShapes = [
  'border-radius: 38% 62% 51% 49% / 24% 41% 59% 76%',
  'border-radius: 57% 43% 34% 66% / 46% 30% 70% 54%',
  'border-radius: 44% 56% 63% 37% / 33% 62% 38% 67%',
] as const;

const techTags = [
  { label: 'Vue', tone: 'bg-[#efe8ff]' },
  { label: 'React', tone: 'bg-[#ffe5f0]' },
  { label: 'TypeScript', tone: 'bg-[#fff2bf]' },
  { label: 'Cypress', tone: 'bg-[#e5fff1]' },
  { label: 'Angular', tone: 'bg-[#ffe8eb]' },
  { label: 'Javascript', tone: 'bg-[#fff7c8]' },
  { label: 'csharp', tone: 'bg-[#ece7ff]' },
  { label: 'git', tone: 'bg-[#e8fff4]' },
] as const;

const workingNotes = [
  'keeps things simple',
  'edge cases matter',
  'clean but not cold',
  'structure first, then polish',
] as const;

const deskBits = [
  {
    title: 'terminal tab',
    text: 'tests passing, still checking hover states',
    tone: 'bg-gradient-to-br from-[#ffe2f1] via-[#fff7ff] to-[#dff7ff]',
  },
  {
    title: 'debug receipt',
    text: '1 bug, 2 edge cases, 1 softer shadow',
    tone: 'bg-gradient-to-br from-[#fff0a8] via-[#fff7da] to-[#ffd5ee]',
  },
  {
    title: 'tiny shortcut',
    text: 'cmd + shift + p + fix the thing properly',
    tone: 'bg-gradient-to-br from-[#e8e1ff] via-[#fdf7ff] to-[#d9fff1]',
  },
] as const;

const codeFragments = [
  'if (form.breaks) fixIt();',
  'const vibe = "soft but solid";',
  'shipCalmUI({ edgeCases: true })',
  'state.value = clearer;',
  'git commit -m "tiny polish"',
  'TODO: fix spacing before coffee',
] as const;

const codeFragmentTones = [
  'from-[#ffe3ef] via-[#fff7fb] to-[#efe6ff]',
  'from-[#fff3c6] via-[#fff9e8] to-[#ffe9d9]',
  'from-[#def7ea] via-[#f5fff9] to-[#e6f2ff]',
  'from-[#efe6ff] via-[#fbf7ff] to-[#ffeaf4]',
  'from-[#ffe8d8] via-[#fff7ef] to-[#fff1bf]',
  'from-[#e4f5ff] via-[#f7fcff] to-[#ece6ff]',
] as const;

const githubProjects = props.codeProjects.slice(0, 3);

const {
  data: githubFeed,
  error: githubFeedError,
  pending: githubFeedPending,
} = await useAsyncData(
  'github-activity',
  () => $fetch<GitHubFeedResponse>('/api/github-activity'),
  {
    default: () => ({
      commits: [],
      profileUrl: 'https://github.com/KeMichelle',
      status: 'ok',
    }),
  },
);

const recentCommits = computed(() =>
  (githubFeed.value?.commits ?? []).slice(0, 3),
);
const githubProfileUrl = computed(
  () => githubFeed.value?.profileUrl ?? 'https://github.com/KeMichelle',
);
const githubFeedStatus = computed(() => githubFeed.value?.status ?? 'ok');

function formatCommitTime(dateString: string) {
  const timestamp = new Date(dateString).getTime();

  if (Number.isNaN(timestamp)) return 'recently';

  const diffInHours = Math.max(
    1,
    Math.round((Date.now() - timestamp) / 3600000),
  );

  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.round(diffInHours / 24);
  return `${diffInDays}d ago`;
}
</script>

<template>
  <section
    class="section-shell relative overflow-x-clip overflow-y-visible pb-24 pt-6 sm:pb-28 lg:pb-32"
  >
    <div class="section-bleed relative overflow-visible">
      <MotionReveal class="relative z-10" :delay="70" direction="up">
        <div
          class="absolute left-[2%] top-[6%] h-40 w-40 rounded-full bg-[#eddfff]/55 blur-3xl sm:h-48 sm:w-48"
        />
        <div
          class="absolute right-[3%] top-[18%] h-44 w-44 rounded-full bg-[#dff8ec]/50 blur-3xl sm:h-56 sm:w-56"
        />
        <div
          class="absolute left-[26%] bottom-[7%] h-48 w-48 rounded-full bg-[#ffe4f2]/45 blur-3xl sm:h-60 sm:w-60"
        />

        <div class="absolute left-[5%] top-[3%] z-10 hidden xl:block">
          <FloatingAssetSlot
            label="purple stars"
            src="/purple_stars.gif"
            alt="Purple stars"
            tone="lavender"
            size="md"
            :rotate="-9"
            class="animate-drift"
          />
        </div>
        <div class="absolute right-[6%] top-[8%] z-10 hidden lg:block">
          <FloatingAssetSlot
            label="heart doodle"
            src="/heart.png"
            alt="Heart"
            tone="pink"
            size="sm"
            :rotate="8"
            class="animate-float"
          />
        </div>
        <div class="absolute left-[9%] bottom-[14%] z-10 hidden lg:block">
          <FloatingAssetSlot
            label="flower doodle"
            src="/flower.png"
            alt="Flower"
            tone="pink"
            size="sm"
            :rotate="-8"
            class="animate-float"
          />
        </div>

        <div class="relative mx-auto max-w-[78rem] px-3 sm:px-4 lg:px-0">
          <div
            class="proof-window relative overflow-visible rounded-[2.6rem] border border-white/65 bg-[linear-gradient(135deg,rgba(255,248,252,0.92),rgba(249,251,255,0.9))] p-4 shadow-[0_30px_90px_rgba(117,87,122,0.14)] backdrop-blur-xl sm:p-5 lg:p-6"
          >
            <div
              class="flex items-center justify-between gap-3 rounded-[1.8rem] border border-white/65 bg-white/70 px-4 py-3 shadow-float"
            >
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-[#ff8ca8]" />
                <span class="h-2.5 w-2.5 rounded-full bg-[#ffe38c]" />
                <span class="h-2.5 w-2.5 rounded-full bg-[#9cebb2]" />
              </div>
              <p
                class="text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/42"
              >
                Michelle.exe
              </p>
              <div class="hidden h-8 w-20 rounded-full bg-[#f3efff] sm:block" />
            </div>

            <div
              class="proof-stage mt-4 grid gap-4 lg:grid-cols-[minmax(18rem,0.88fr)_minmax(0,1.12fr)] lg:items-start"
            >
              <div class="space-y-4">
                <div
                  class="card-hover-soft rounded-[2rem] border border-white/70 bg-white/78 p-5 shadow-float backdrop-blur-sm transition duration-300 hover:scale-[1.02] hover:shadow-dreamy"
                >
                  <p
                    class="text-xs font-semibold uppercase tracking-[0.24em] text-ink/48"
                  >
                    Workspace proof
                  </p>
                  <p
                    class="mt-3 font-display text-[1.65rem] leading-[1.0] text-ink sm:text-[2.6rem]"
                  >
                    Code, thoughts, GitHub, and the way I actually work.
                  </p>
                </div>

                <!-- Mobile-only: one featured review blob instead of the full grid -->
                <article
                  class="sm:hidden blob-card card-hover-lilt border border-white/65 p-4 shadow-float backdrop-blur-sm bg-gradient-to-br from-[#ffb8d6] via-[#ffe4f1] to-[#fff8fb]"
                  style="border-radius: 38% 62% 51% 49% / 24% 41% 59% 76%"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/48"
                  >
                    {{ stickyNotes[0]?.role }}
                  </p>
                  <p class="mt-3 text-sm leading-7 text-ink/72">
                    &ldquo;{{ stickyNotes[0]?.quote }}&rdquo;
                  </p>
                </article>

                <div class="hidden sm:grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <article
                    v-for="(note, index) in stickyNotes"
                    :key="note.name"
                    :class="[
                      'blob-card card-hover-lilt border border-white/65 p-4 shadow-float backdrop-blur-sm transition duration-300 hover:z-50 hover:scale-[1.03]',
                      note.accent === 'pink'
                        ? 'bg-gradient-to-br from-[#ffb8d6] via-[#ffe4f1] to-[#fff8fb]'
                        : '',
                      note.accent === 'green'
                        ? 'bg-gradient-to-br from-[#bdf2d2] via-[#e6fff2] to-[#fbfffd]'
                        : '',
                      note.accent === 'lavender'
                        ? 'bg-gradient-to-br from-[#d8c8ff] via-[#efe8ff] to-[#fbf9ff]'
                        : '',
                      note.accent === 'yellow'
                        ? 'bg-gradient-to-br from-[#ffe78b] via-[#fff3b6] to-[#fffbea]'
                        : '',
                    ]"
                    :style="stickyShapes[index]"
                  >
                    <p
                      class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/48"
                    >
                      {{ note.role }}
                    </p>
                    <p class="mt-3 text-sm leading-7 text-ink/72">
                      "{{ note.quote }}"
                    </p>
                  </article>
                </div>

                <div
                  :class="[
                    'hidden sm:block blob-card card-hover-lilt border border-white/65 px-4 py-4 shadow-float backdrop-blur-sm transition duration-300 hover:scale-[1.03]',
                    extraStickyNote.accent === 'yellow'
                      ? 'bg-gradient-to-br from-[#ffe16b] via-[#fff0a8] to-[#ffd5ee]'
                      : 'bg-white/78',
                  ]"
                  style="border-radius: 46% 54% 44% 56% / 36% 34% 66% 64%"
                >
                  <p
                    class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/48"
                  >
                    {{ extraStickyNote.role }}
                  </p>
                  <p class="mt-3 text-sm leading-7 text-ink/72">
                    "{{ extraStickyNote.quote }}"
                  </p>
                  <div
                    class="mt-3 inline-flex items-center rounded-full border border-white/55 bg-white/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/58"
                  >
                    design taste + product thinking
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex flex-wrap gap-2 px-0 sm:px-1">
                  <span
                    v-for="tag in techTags"
                    :key="tag.label"
                    :class="[
                      'tap-safe-press blob-card inline-flex items-center border border-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink shadow-float transition duration-300 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em] hover:scale-[1.05]',
                      tag.tone,
                    ]"
                    style="border-radius: 42% 58% 51% 49% / 43% 35% 65% 57%"
                  >
                    {{ tag.label }}
                  </span>
                </div>

                <a
                  :href="githubProfileUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="proof-github-link group tap-safe-press block rounded-[2.8rem] transition duration-300 hover:scale-[1.02]"
                >
                  <div
                    class="proof-github-frame card-hover-soft rounded-[2.8rem] border border-white/65 bg-[#d7d2cf] p-4 shadow-[0_28px_80px_rgba(74,59,88,0.2)] transition duration-300 group-hover:shadow-[0_34px_95px_rgba(74,59,88,0.28)]"
                  >
                    <div class="rounded-[2rem] bg-[#f7f2ef] p-4 sm:p-5">
                      <div
                        class="flex items-center justify-between gap-3 rounded-[1.4rem] bg-white/78 px-4 py-3 shadow-float"
                      >
                        <div>
                          <p
                            class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/46"
                          >
                            GitHub preview
                          </p>
                          <p
                            class="mt-1 font-display text-[1.6rem] leading-[1] text-ink sm:text-[2rem]"
                          >
                            @KeMichelle
                          </p>
                        </div>
                        <span
                          class="rounded-full bg-[#efe7ff] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/58"
                        >
                          live feed
                        </span>
                      </div>

                      <div
                        class="mt-4 hidden sm:block rounded-[1.8rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,246,251,0.98),rgba(244,240,255,0.96))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_18px_42px_rgba(122,94,140,0.12)]"
                      >
                        <div class="flex items-center gap-2">
                          <span class="h-2.5 w-2.5 rounded-full bg-[#ff8ca8]" />
                          <span class="h-2.5 w-2.5 rounded-full bg-[#ffe38c]" />
                          <span class="h-2.5 w-2.5 rounded-full bg-[#9cebb2]" />
                        </div>

                        <div class="mt-4 space-y-3">
                          <div
                            v-for="commit in recentCommits"
                            :key="commit.id"
                            class="rounded-[1.4rem] border border-[#eadcf6] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,243,248,0.92))] px-4 py-3 text-ink shadow-[0_12px_28px_rgba(122,94,140,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#dbc8ee] hover:shadow-[0_16px_34px_rgba(122,94,140,0.12)]"
                          >
                            <div
                              class="flex items-center justify-between gap-3"
                            >
                              <p
                                class="text-sm font-semibold tracking-[0.02em] text-ink"
                              >
                                {{ commit.repoLabel }}
                              </p>
                              <span
                                class="rounded-full bg-[#f4ecff] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/62"
                              >
                                {{ formatCommitTime(commit.createdAt) }}
                              </span>
                            </div>
                            <p class="mt-2 text-sm leading-6 text-ink/80">
                              {{ commit.message }}
                            </p>
                            <div
                              class="mt-3 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.18em] text-ink/50"
                            >
                              <span>#{{ commit.sha }}</span>
                              <span>recent commit</span>
                            </div>
                          </div>

                          <div
                            v-if="githubFeedPending"
                            class="rounded-[1.4rem] border border-[#eadcf6] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,243,248,0.92))] px-4 py-3 text-ink/88 shadow-[0_12px_28px_rgba(122,94,140,0.08)]"
                          >
                            <p
                              class="text-sm font-semibold tracking-[0.02em] text-ink"
                            >
                              Loading recent commits
                            </p>
                            <p class="mt-2 text-xs leading-6 text-ink/62">
                              Pulling the latest public GitHub activity.
                            </p>
                          </div>

                          <div
                            v-else-if="
                              githubFeedStatus === 'ok' &&
                              !recentCommits.length &&
                              !githubFeedError
                            "
                            class="rounded-[1.4rem] border border-[#eadcf6] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,243,248,0.92))] px-4 py-3 text-ink/88 shadow-[0_12px_28px_rgba(122,94,140,0.08)]"
                          >
                            <p
                              class="text-sm font-semibold tracking-[0.02em] text-ink"
                            >
                              No public commits found
                            </p>
                            <p class="mt-2 text-xs leading-6 text-ink/62">
                              GitHub only exposes commits from public repos
                              here. Open the profile to see the full activity
                              history.
                            </p>
                          </div>

                          <div
                            v-if="
                              githubFeedError ||
                              githubFeedStatus === 'unavailable'
                            "
                            class="rounded-[1.4rem] border border-[#eadcf6] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,243,248,0.92))] px-4 py-3 text-ink/88 shadow-[0_12px_28px_rgba(122,94,140,0.08)]"
                          >
                            <p
                              class="text-sm font-semibold tracking-[0.02em] text-ink"
                            >
                              GitHub feed unavailable
                            </p>
                            <p class="mt-2 text-xs leading-6 text-ink/62">
                              GitHub likely rate-limited the public API for this
                              request. Open the profile to see the latest public
                              activity.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>

                <div
                  class="hidden sm:grid gap-3 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]"
                >
                  <div class="space-y-3">
                    <p
                      v-for="note in workingNotes"
                      :key="note"
                      class="tap-safe-press rounded-full bg-white/62 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/56 shadow-float backdrop-blur-sm transition duration-300 hover:scale-[1.03] hover:text-ink/74 hover:shadow-dreamy"
                    >
                      {{ note }}
                    </p>

                    <div
                      v-for="item in deskBits"
                      :key="item.title"
                      :class="[
                        'blob-card card-hover-lilt border border-white/60 p-4 shadow-float backdrop-blur-sm transition duration-300 hover:scale-[1.03] hover:shadow-dreamy',
                        item.tone,
                      ]"
                      style="border-radius: 45% 55% 52% 48% / 27% 38% 62% 73%"
                    >
                      <p
                        class="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/46"
                      >
                        {{ item.title }}
                      </p>
                      <p class="mt-2 text-xs leading-6 text-ink/68">
                        {{ item.text }}
                      </p>
                    </div>
                  </div>

                  <div
                    class="card-hover-soft rounded-[2rem] border border-white/65 bg-[#fff8f0]/88 p-4 shadow-float backdrop-blur-sm"
                  >
                    <p
                      class="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/48"
                    >
                      live notes
                    </p>
                    <div class="mt-3 space-y-3">
                      <div
                        v-for="(snippet, index) in codeFragments"
                        :key="snippet"
                        :class="[
                          'card-hover-soft rounded-[1.2rem] border border-white/70 bg-gradient-to-br px-4 py-3 font-mono text-[11px] text-[#2f243c] shadow-float backdrop-blur-sm transition duration-300 hover:scale-[1.03] hover:shadow-dreamy',
                          codeFragmentTones[index % codeFragmentTones.length],
                        ]"
                      >
                        <span
                          class="typing-line"
                          :style="{ animationDelay: `${index * 0.45}s` }"
                        >
                          {{ snippet }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="pointer-events-none absolute -left-5 top-[18%] hidden lg:block"
            >
              <img
                src="/hello_Note.gif"
                alt=""
                aria-hidden="true"
                class="w-20 -rotate-[8deg] object-contain opacity-90 animate-float"
              />
            </div>
            <div
              class="pointer-events-none absolute right-4 top-[8%] hidden lg:block"
            >
              <img
                src="/pink_Sparkle.gif"
                alt=""
                aria-hidden="true"
                class="w-14 rotate-[10deg] object-contain opacity-90 animate-drift"
              />
            </div>
            <div
              class="pointer-events-none absolute -right-3 bottom-[10%] hidden xl:block"
            >
              <img
                src="/yellow_sparkle_2.gif"
                alt=""
                aria-hidden="true"
                class="w-14 -rotate-[4deg] object-contain opacity-90 animate-float"
              />
            </div>
            <div
              class="pointer-events-none absolute right-[7%] top-[16%] hidden xl:block"
            >
              <div class="h-24 w-24 rotate-[12deg]">
                <div
                  class="absolute inset-[24%] rounded-full bg-gradient-to-br from-[#ffd96c] via-[#ffc4de] to-[#d8c9ff] shadow-float"
                />
                <div
                  class="absolute left-[-8%] top-[32%] h-[34%] w-[116%] rounded-full border-2 border-[#8bc7ff]/65"
                />
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>
    </div>
  </section>
</template>

<style scoped>
.typing-line {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 1px solid rgba(47, 36, 60, 0.7);
  width: 0;
  animation:
    typingLoop 4.2s steps(34, end) infinite,
    blinkCaret 0.85s step-end infinite;
}

@keyframes typingLoop {
  0%,
  12% {
    width: 0;
  }

  55%,
  78% {
    width: 100%;
  }

  100% {
    width: 0;
  }
}

@keyframes blinkCaret {
  0%,
  49% {
    border-color: rgba(47, 36, 60, 0.7);
  }

  50%,
  100% {
    border-color: transparent;
  }
}

@media (max-width: 639px) {
  .proof-window {
    border-radius: 2.8rem 2.1rem 3rem 1.9rem / 2.1rem 3rem 2.15rem 2.8rem;
    padding: 0.95rem;
    transform: rotate(-0.7deg);
  }

  .proof-window::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
      radial-gradient(
        circle at 12% 18%,
        rgba(255, 231, 144, 0.32),
        transparent 24%
      ),
      radial-gradient(
        circle at 86% 72%,
        rgba(217, 206, 255, 0.28),
        transparent 28%
      );
    pointer-events: none;
  }

  .proof-stage {
    gap: 0.9rem;
  }

  .proof-stage > div:first-child {
    transform: rotate(1.2deg);
  }

  .proof-stage > div:last-child {
    transform: rotate(-1deg);
  }

  .proof-github-link {
    margin-top: -0.3rem;
  }

  .proof-github-frame {
    border-radius: 2.3rem 1.8rem 2.5rem 1.8rem / 1.9rem 2.5rem 2rem 2.6rem;
    box-shadow: 0 24px 64px rgba(74, 59, 88, 0.18);
  }
}
</style>
