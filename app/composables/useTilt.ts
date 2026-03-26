import { onBeforeUnmount, onMounted, type Ref } from 'vue';

/**
 * Adds a subtle CSS 3-D tilt to `el` that reacts to the pointer position.
 * On devices without a fine pointer or when reduced-motion is requested,
 * this is a no-op so it gracefully degrades.
 *
 * @param el        - Template ref pointing to the target element
 * @param intensity - Max rotation in degrees (default 8)
 * @param lift      - Max translateY upward in px (default 6)
 */
export function useTilt(el: Ref<HTMLElement | null>, intensity = 8, lift = 6) {
  let isFine = false;
  let reducedMotion = false;

  function onEnter() {
    if (!el.value) return;
    el.value.style.transition = 'transform 120ms ease-out';
  }

  function onMove(e: PointerEvent) {
    if (!isFine || reducedMotion || !el.value) return;

    const rect = el.value.getBoundingClientRect();
    // Normalised offset: −1 … +1 within the element
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    const rotY = nx * intensity;
    const rotX = -ny * intensity;
    const ty = -Math.abs(ny) * lift;

    el.value.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${ty}px)`;
  }

  function onLeave() {
    if (!el.value) return;
    el.value.style.transition = 'transform 400ms cubic-bezier(0.22,1,0.36,1)';
    el.value.style.transform =
      'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  }

  onMounted(() => {
    isFine = window.matchMedia('(pointer: fine)').matches;
    reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!isFine || reducedMotion || !el.value) return;

    el.value.addEventListener('pointerenter', onEnter);
    el.value.addEventListener('pointermove', onMove);
    el.value.addEventListener('pointerleave', onLeave);
  });

  onBeforeUnmount(() => {
    el.value?.removeEventListener('pointerenter', onEnter);
    el.value?.removeEventListener('pointermove', onMove);
    el.value?.removeEventListener('pointerleave', onLeave);
  });
}
