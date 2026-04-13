<script setup lang="ts">
import { ref } from 'vue';

const menuOpen = ref(false);

function closeMenu() {
  menuOpen.value = false;
}

const links = [
  {
    label: 'Home',
    href: '#home',
    chip: 'nav-pill-rose',
    mobileBg: 'rgba(255,216,230,0.82)',
    emoji: '🌸',
    rotate: '-3deg',
  },
  {
    label: 'Web',
    href: '#web-projects',
    chip: 'nav-pill-mint',
    mobileBg: 'rgba(214,240,213,0.82)',
    emoji: '💻',
    rotate: '2deg',
  },
  {
    label: 'About',
    href: '#about',
    chip: 'nav-pill-butter',
    mobileBg: 'rgba(255,241,184,0.88)',
    emoji: '☀️',
    rotate: '3deg',
  },
  {
    label: 'Contact',
    href: '#contact',
    chip: 'nav-pill-peach',
    mobileBg: 'rgba(255,214,194,0.82)',
    emoji: '💌',
    rotate: '-1.5deg',
  },
];
</script>

<template>
  <header class="section-shell sticky top-0 z-50 pt-4 sm:pt-6">
    <div
      class="glass-panel flex w-full items-center justify-between gap-4 rounded-[2rem] px-4 py-3 sm:px-6 lg:px-7 xl:px-8 min-[1440px]:px-10"
    >
      <a
        href="#home"
        class="font-display text-2xl font-semibold tracking-[0.08em] text-ink transition hover:text-rose"
        @click="closeMenu"
      >
        Michelle Aprile
      </a>

      <!-- Desktop nav -->
      <nav
        aria-label="Primary"
        class="hidden items-center gap-2 rounded-full bg-white/50 p-1 md:flex lg:ml-auto"
      >
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :class="['nav-pill', link.chip]"
        >
          {{ link.label }}
        </a>
      </nav>

      <a
        href="#contact"
        class="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-float transition duration-300 hover:-translate-y-0.5 hover:bg-rose sm:px-5 md:inline-flex"
      >
        Let's create
      </a>

      <!-- Burger button — mobile only -->
      <button
        type="button"
        class="burger-btn relative flex h-10 w-10 items-center justify-center md:hidden"
        :class="{ 'is-open': menuOpen }"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <span class="burger-bun burger-top" />
        <span class="burger-bun burger-mid" />
        <span class="burger-bun burger-bot" />
      </button>
    </div>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <nav
        v-if="menuOpen"
        aria-label="Mobile primary"
        class="mobile-drawer mt-2 md:hidden"
      >
        <ul class="mobile-nav-list">
          <li
            v-for="(link, i) in links"
            :key="link.href"
            class="mobile-nav-item"
            :style="`--i: ${i}; --r: ${link.rotate}; background: ${link.mobileBg};`"
          >
            <a :href="link.href" class="mobile-nav-link" @click="closeMenu">
              <span class="mobile-nav-emoji">{{ link.emoji }}</span>
              <span class="mobile-nav-label">{{ link.label }}</span>
            </a>
          </li>
        </ul>
        <a href="#contact" class="mobile-cta" @click="closeMenu">
          Let&#39;s create ✦
        </a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
/* ── Desktop nav pills ──────────────────────────────────────────── */
.nav-pill {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(71, 57, 84, 0.72);
  transition:
    background-color 300ms cubic-bezier(0.22, 1, 0.36, 1),
    border-radius 350ms cubic-bezier(0.22, 1, 0.36, 1),
    color 240ms ease,
    transform 340ms cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: center;
}

.nav-pill-rose:hover {
  background: rgba(255, 216, 230, 0.88);
  color: #a03068;
  border-radius: 62% 38% 44% 56% / 48% 31% 69% 52%;
  transform: rotate(-1.6deg) scale(1.05);
}
.nav-pill-mint:hover {
  background: rgba(214, 240, 213, 0.9);
  color: #1c5e35;
  border-radius: 38% 62% 56% 44% / 52% 69% 31% 48%;
  transform: rotate(1.2deg) scale(1.05);
}
.nav-pill-lavender:hover {
  background: rgba(230, 221, 255, 0.9);
  color: #5c3ba3;
  border-radius: 50% 50% 38% 62% / 62% 38% 62% 38%;
  transform: rotate(-0.9deg) scale(1.05);
}
.nav-pill-butter:hover {
  background: rgba(255, 241, 184, 0.95);
  color: #7a6004;
  border-radius: 44% 56% 62% 38% / 38% 52% 48% 62%;
  transform: rotate(1.8deg) scale(1.05);
}
.nav-pill-peach:hover {
  background: rgba(255, 214, 194, 0.9);
  color: #8c3c14;
  border-radius: 56% 44% 38% 62% / 52% 62% 38% 48%;
  transform: rotate(-1.2deg) scale(1.05);
}

/* ── Burger button ──────────────────────────────────────────────── */
.burger-btn {
  border-radius: 0.875rem;
  border: 1.5px solid rgba(255, 255, 255, 0.65);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 14px rgba(71, 57, 84, 0.1);
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
    background 200ms ease;
}

.burger-btn:active {
  transform: scale(0.9);
}
.burger-btn.is-open {
  background: rgba(255, 216, 230, 0.82);
  border-color: rgba(245, 164, 198, 0.55);
}

.burger-bun {
  position: absolute;
  left: 50%;
  width: 1.2rem;
  height: 2px;
  border-radius: 99px;
  background: #473954;
  transform-origin: center;
  transition:
    transform 360ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 240ms ease,
    top 360ms cubic-bezier(0.22, 1, 0.36, 1);
}

.burger-top {
  top: calc(50% - 5px);
  transform: translateX(-50%);
}
.burger-mid {
  top: calc(50% - 1px);
  transform: translateX(-50%);
}
.burger-bot {
  top: calc(50% + 3px);
  transform: translateX(-50%);
}

/* Morphs to × when open */
.burger-btn.is-open .burger-top {
  top: calc(50% - 1px);
  transform: translateX(-50%) rotate(45deg);
}
.burger-btn.is-open .burger-mid {
  opacity: 0;
  transform: translateX(-50%) scaleX(0);
}
.burger-btn.is-open .burger-bot {
  top: calc(50% - 1px);
  transform: translateX(-50%) rotate(-45deg);
}

/* ── Mobile drawer ──────────────────────────────────────────────── */
.mobile-drawer {
  border-radius: 1.75rem;
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  background: rgba(255, 250, 246, 0.94);
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(71, 57, 84, 0.14);
  padding: 1.1rem 1.1rem 0.9rem;
  overflow: hidden;
}

.drawer-enter-active {
  transition:
    opacity 340ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
}
.drawer-leave-active {
  transition:
    opacity 220ms ease,
    transform 260ms cubic-bezier(0.55, 0, 0.55, 0.85);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.97);
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.mobile-nav-item {
  border-radius: 1.25rem;
  border: 1.5px solid rgba(255, 255, 255, 0.72);
  box-shadow: 0 4px 12px rgba(71, 57, 84, 0.07);
  transform: rotate(var(--r, 0deg));
  animation: navItemBounce 400ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i, 0) * 50ms + 50ms);
}

@keyframes navItemBounce {
  from {
    opacity: 0;
    transform: rotate(var(--r, 0deg)) translateY(14px) scale(0.92);
  }
  to {
    opacity: 1;
    transform: rotate(var(--r, 0deg)) translateY(0) scale(1);
  }
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: inherit;
  text-decoration: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 160ms ease;
}
.mobile-nav-link:active {
  opacity: 0.7;
}

.mobile-nav-emoji {
  font-size: 1.2rem;
  line-height: 1;
  flex-shrink: 0;
}
.mobile-nav-label {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(71, 57, 84, 0.9);
  letter-spacing: 0.01em;
}

.mobile-cta {
  display: block;
  margin-top: 0.8rem;
  border-radius: 999px;
  background: #473954;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  text-align: center;
  padding: 0.7rem 1.5rem;
  letter-spacing: 0.02em;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 8px 22px rgba(71, 57, 84, 0.22);
  animation: navItemBounce 400ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: 300ms;
  transition:
    opacity 160ms ease,
    transform 160ms ease;
  text-decoration: none;
}
.mobile-cta:active {
  opacity: 0.88;
  transform: scale(0.97);
}

@media (max-width: 639px) {
  .glass-panel {
    border-radius: 1.55rem 1.9rem 1.5rem 1.8rem / 1.4rem 1.8rem 1.6rem 2rem;
    background: linear-gradient(
      135deg,
      rgba(255, 251, 247, 0.88),
      rgba(255, 244, 247, 0.74)
    );
    box-shadow: 0 18px 48px rgba(71, 57, 84, 0.12);
  }

  .mobile-drawer {
    margin-top: 0.55rem;
    border-radius: 2.15rem 1.8rem 2.2rem 1.85rem / 1.7rem 2.2rem 1.9rem 2.35rem;
    background:
      radial-gradient(
        circle at top left,
        rgba(255, 236, 170, 0.4),
        transparent 28%
      ),
      linear-gradient(
        160deg,
        rgba(255, 250, 246, 0.95),
        rgba(255, 240, 246, 0.92)
      );
    box-shadow: 0 24px 64px rgba(71, 57, 84, 0.14);
    transform-origin: top center;
  }

  .mobile-nav-list {
    gap: 0.7rem;
  }

  .mobile-nav-item:nth-child(odd) {
    margin-right: 0.8rem;
  }

  .mobile-nav-item:nth-child(even) {
    margin-left: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-pill,
  .burger-bun {
    transition: none;
  }
  .mobile-nav-item,
  .mobile-cta {
    animation: none;
  }
  .drawer-enter-active,
  .drawer-leave-active {
    transition: none;
  }
}
</style>
