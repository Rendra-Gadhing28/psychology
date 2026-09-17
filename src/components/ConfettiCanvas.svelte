<script>
  import { onMount } from 'svelte';

  let canvasRef = $state(null);

  onMount(() => {
    if (!canvasRef || typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = canvasRef.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let width = (canvasRef.width = window.innerWidth * dpr);
    let height = (canvasRef.height = window.innerHeight * dpr);

    // Old Money soft satisfying palette
    const colors = [
      '#EAEF9D', // Pastel Hijau Ketupat
      '#DCE38C', // Soft Ketupat Shade
      '#99AC92', // Muted Sage
      '#415444', // Forest Olive
      '#F4F4E2', // Warm Alabaster
      '#C8D1B3'  // Pale Olive Linen
    ];

    const particleCount = 80;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * -height * 0.4,
        w: (Math.random() * 7 + 5) * dpr,
        h: (Math.random() * 10 + 7) * dpr,
        vx: (Math.random() - 0.5) * 3 * dpr,
        vy: (Math.random() * 3 + 2.5) * dpr,
        rot: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.9
      });
    }

    let startTime = performance.now();
    let animId = null;

    function render(now) {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);

      let anyAlive = false;
      const fadeStart = 2400;
      const duration = 3400;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;

        if (elapsed > fadeStart) {
          p.opacity = Math.max(0, 0.9 * (1 - (elapsed - fadeStart) / (duration - fadeStart)));
        }

        if (p.opacity > 0 && p.y < height + 50) {
          anyAlive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      }

      if (anyAlive && elapsed < duration) {
        animId = requestAnimationFrame(render);
      }
    }

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  });
</script>

<canvas
  bind:this={canvasRef}
  class="fixed inset-0 pointer-events-none z-40 w-full h-full"
  style="display: block;"
></canvas>
