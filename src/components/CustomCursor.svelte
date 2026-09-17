<script>
  import { onMount } from 'svelte';

  let isFinePointer = $state(false);
  let isVisible = $state(false);
  let isHovered = $state(false);

  let mouseX = $state(-100);
  let mouseY = $state(-100);
  let ringX = $state(-100);
  let ringY = $state(-100);
  let animId = null;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) isVisible = true;

    const target = e.target;
    if (target && (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="button"]') ||
      target.classList?.contains('cursor-pointer')
    )) {
      isHovered = true;
    } else {
      isHovered = false;
    }
  }

  function onMouseLeave() {
    isVisible = false;
  }

  function onMouseEnter() {
    isVisible = true;
  }

  function renderRing() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    animId = requestAnimationFrame(renderRing);
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(pointer: fine)');
      isFinePointer = media.matches;

      if (isFinePointer) {
        document.documentElement.classList.add('custom-cursor-active');
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);
        animId = requestAnimationFrame(renderRing);
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('custom-cursor-active');
        window.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseleave', onMouseLeave);
        document.removeEventListener('mouseenter', onMouseEnter);
        if (animId) cancelAnimationFrame(animId);
      }
    };
  });
</script>

{#if isFinePointer && isVisible}
  <!-- Small Center Dot -->
  <div
    class="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#223326] dark:bg-[#EAEF9D] pointer-events-none z-[9999] transition-transform duration-75"
    style="transform: translate3d({mouseX}px, {mouseY}px, 0);"
  ></div>

  <!-- Smooth Following Outer Ring (Old Money subtle) -->
  <div
    class="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none z-[9998] transition-[width,height,background-color,border-color] duration-200 {isHovered ? 'w-10 h-10 bg-[#EAEF9D]/35 dark:bg-[#EAEF9D]/15 border-[#223326]/60 dark:border-[#EAEF9D]/70' : 'w-7 h-7 bg-transparent border-[#223326]/30 dark:border-[#EAEF9D]/40'}"
    style="transform: translate3d({ringX}px, {ringY}px, 0);"
  ></div>
{/if}
