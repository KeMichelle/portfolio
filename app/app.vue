<script setup lang="ts">
onMounted(() => {
  // Always start at the very top — prevents browser scroll restoration
  // from dropping users mid-page after a reload or back-navigation.
  history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="min-h-screen bg-cream text-ink antialiased">
    <NuxtLoadingIndicator color="#f2a5c4" />
    <NuxtRouteAnnouncer />

    <!--
      `isolate` scopes this layer into its own stacking/compositing context so the
      `mix-blend-mode: multiply` noise texture below only blends with the ambient
      blobs behind it, not with the live page content scrolling underneath this
      fixed overlay. Without it, the browser has to re-composite the blend against
      freshly-scrolled content on every single scroll frame — the main cause of
      site-wide scroll stutter, since this layer is present on every page view.
    -->
    <div
      class="pointer-events-none fixed inset-0 -z-10 isolate overflow-hidden"
    >
      <div
        class="ambient-blob ambient-blob-slow absolute left-[-8rem] top-[-5rem] h-72 w-72 rounded-full bg-blush/60 blur-3xl sm:h-96 sm:w-96"
        style="animation-delay: -3s"
      />
      <div
        class="ambient-blob ambient-blob-reverse absolute right-[-7rem] top-[18%] h-80 w-80 rounded-full bg-lavender/60 blur-3xl sm:h-[28rem] sm:w-[28rem]"
        style="animation-delay: -9s"
      />
      <div
        class="ambient-blob absolute bottom-[-8rem] left-[12%] h-72 w-72 rounded-full bg-mint/60 blur-3xl sm:h-[26rem] sm:w-[26rem]"
        style="animation-delay: -6s"
      />
      <div
        class="ambient-blob ambient-blob-slow absolute bottom-[10%] right-[10%] h-64 w-64 rounded-full bg-peach/50 blur-3xl sm:h-80 sm:w-80"
        style="animation-delay: -12s"
      />
      <img
        src="/random_lines.png"
        alt=""
        aria-hidden="true"
        width="500"
        height="500"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        class="absolute left-[3%] top-[12%] hidden w-28 -rotate-[8deg] object-contain opacity-65 lg:block animate-drift"
      />
      <img
        src="/yellow_sparkle_2.gif"
        alt=""
        aria-hidden="true"
        width="400"
        height="400"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        class="absolute right-[5%] top-[32%] hidden w-14 rotate-[9deg] object-contain opacity-70 xl:block animate-float"
      />
      <img
        src="/purple_stars.gif"
        alt=""
        aria-hidden="true"
        width="400"
        height="400"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        class="absolute left-[8%] bottom-[18%] hidden w-24 -rotate-[12deg] object-contain opacity-60 xl:block animate-drift"
      />
      <img
        src="/colorful_lines.gif"
        alt=""
        aria-hidden="true"
        width="400"
        height="400"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        class="absolute right-[12%] bottom-[8%] hidden w-28 rotate-[14deg] object-contain opacity-55 2xl:block animate-float"
      />
      <div class="noise-texture absolute inset-0 opacity-40" />
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
