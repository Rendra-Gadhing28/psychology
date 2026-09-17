<script>
  import { onMount } from 'svelte';

  let mouseX = $state(0);
  let mouseY = $state(0);
  let targetX = 0;
  let targetY = 0;
  let animId = null;
  let isLooping = false;

  function handleMouseMove(e) {
    const { innerWidth, innerHeight } = window;
    targetX = (e.clientX / innerWidth - 0.5) * 30;
    targetY = (e.clientY / innerHeight - 0.5) * 30;

    if (!isLooping) {
      isLooping = true;
      animId = requestAnimationFrame(loop);
    }
  }

  function loop() {
    const dx = targetX - mouseX;
    const dy = targetY - mouseY;

    // Halt render loop when idle to preserve CPU/GPU battery
    if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
      mouseX = targetX;
      mouseY = targetY;
      isLooping = false;
      return;
    }

    mouseX += dx * 0.04;
    mouseY += dy * 0.04;
    animId = requestAnimationFrame(loop);
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        isLooping = true;
        animId = requestAnimationFrame(loop);
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        if (animId) cancelAnimationFrame(animId);
      }
    };
  });
</script>

<div class="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none" aria-hidden="true">
  <!-- Blob 1: Soft Ketupat Pastel #EAEF9D Top-Left -->
  <div
    class="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[620px] max-h-[620px] rounded-full bg-[#EAEF9D]/22 dark:bg-[#EAEF9D]/10 blur-3xl transition-transform duration-100 will-change-transform"
    style="transform: translate3d({mouseX * 0.7}px, {mouseY * 0.7}px, 0);"
  ></div>

  <!-- Blob 2: Warm Linen / Sage Muted Bottom-Right -->
  <div
    class="absolute -bottom-[15%] -right-[10%] w-[50vw] h-[50vw] max-w-[580px] max-h-[580px] rounded-full bg-[#A8BAA2]/18 dark:bg-[#2F4432]/30 blur-3xl transition-transform duration-100 will-change-transform"
    style="transform: translate3d({-mouseX * 0.5}px, {-mouseY * 0.5}px, 0);"
  ></div>

  <!-- Blob 3: Subtle Warm Ivory Mid Center -->
  <div
    class="absolute top-[30%] right-[25%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-[#F3F4D2]/25 dark:bg-[#1E2E21]/25 blur-3xl transition-transform duration-100 will-change-transform"
    style="transform: translate3d({mouseX * 0.3}px, {-mouseY * 0.4}px, 0);"
  ></div>

  <!-- Subtle Old-Money Linen Grid Texture -->
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#26392807_1px,transparent_1px),linear-gradient(to_bottom,#26392807_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#eaef9d05_1px,transparent_1px),linear-gradient(to_bottom,#eaef9d05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
</div>
