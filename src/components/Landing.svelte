<script>
  import Icon from './Icon.svelte';
  import { playClick } from '../lib/sounds.js';

  let { onStart, onExplore } = $props();

  function handleStart() {
    playClick();
    onStart();
  }

  function handleExplore() {
    playClick();
    onExplore();
  }
</script>

<div class="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-16 max-w-4xl mx-auto text-center select-none overflow-x-hidden">
  <!-- Brand Badge with Quiet Luxury Lettering -->
  <div class="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 rounded-full bg-[#EAEF9D]/70 dark:bg-[#EAEF9D]/15 border border-[#CCD77E]/80 dark:border-[#EAEF9D]/30 text-[#1E2B20] dark:text-[#EAEF9D] text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] sm:tracking-[0.28em] uppercase mb-6 sm:mb-8 shadow-sm max-w-[92vw]">
    <Icon name="brain" size={14} class="shrink-0" />
    <span class="truncate">psychology • kajian kepribadian</span>
  </div>

  <!-- Majestic Typographic Play: Cormorant Garamond + Instrument Serif Italic + Ketupat Pill -->
  <h1 class="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-normal tracking-tight text-[#16221A] dark:text-[#F4F7EE] leading-[1.15] mb-6">
    Kenali Siapa<br />
    <span class="inline-flex items-baseline justify-center gap-3 sm:gap-4.5 mt-2">
      <span class="font-serif-instrument italic text-[#2F4733] dark:text-[#EAEF9D] text-5xl sm:text-7xl md:text-8xl lg:text-[92px] leading-none">
        Dirimu
      </span>
      <span class="inline-block font-sans font-bold text-2xl sm:text-4xl md:text-5xl lg:text-[52px] px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#EAEF9D] dark:bg-[#EAEF9D]/20 text-[#18261B] dark:text-[#EAEF9D] shadow-sm border border-[#D5DE7F]/60 dark:border-[#EAEF9D]/30 leading-none">
        Sebenarnya
      </span>
    </span>
  </h1>

  <!-- Subtitle -->
  <p class="text-sm sm:text-base md:text-[18px] text-[#475749] dark:text-[#A8B7A4] max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal px-2">
    Tes kepribadian MBTI dalam nuansa lembut dan menenangkan. Menemukan cara pikir, ritme energi, dan keaslian dirimu secara elegan dalam 5 menit.
  </p>

  <!-- Feature Badges (Responsive Wrap) -->
  <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 text-xs font-medium text-[#3A4A3C] dark:text-[#B1BFAD] max-w-full">
    <div class="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-[#FAF9F3] dark:bg-[#18221A] border border-[#DDDDC6] dark:border-[#2C3B2E] shadow-sm text-[11px] sm:text-xs">
      <Icon name="clipboard-check" size={14} class="text-[#324936] dark:text-[#EAEF9D] shrink-0" />
      <span>35 Skenario Relatable</span>
    </div>
    <div class="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-[#FAF9F3] dark:bg-[#18221A] border border-[#DDDDC6] dark:border-[#2C3B2E] shadow-sm text-[11px] sm:text-xs">
      <Icon name="shield" size={14} class="text-[#324936] dark:text-[#EAEF9D] shrink-0" />
      <span>Privat & Bebas Distraksi</span>
    </div>
    <div class="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-[#FAF9F3] dark:bg-[#18221A] border border-[#DDDDC6] dark:border-[#2C3B2E] shadow-sm text-[11px] sm:text-xs">
      <Icon name="download" size={14} class="text-[#324936] dark:text-[#EAEF9D] shrink-0" />
      <span>Kartu Estetik Siap Share</span>
    </div>
  </div>

  <!-- Actions (Centered and Fluid) -->
  <div class="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none">
    <button
      type="button"
      onclick={handleStart}
      class="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[48px] px-8 py-3.5 rounded-2xl bg-[#223326] hover:bg-[#19271E] dark:bg-[#EAEF9D] dark:hover:bg-[#DFE784] text-[#FAF9F3] dark:text-[#18241B] font-semibold text-sm sm:text-base shadow-md shadow-[#223326]/10 dark:shadow-[#EAEF9D]/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
    >
      <span>Mulai Tes MBTI</span>
      <Icon name="arrow-right" size={17} class="transition-transform group-hover:translate-x-0.5 text-[#EAEF9D] dark:text-[#18241B]" />
    </button>

    <button
      type="button"
      onclick={handleExplore}
      class="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 rounded-2xl bg-[#FAF9F3] dark:bg-[#18221A] border border-[#D5D4BC] dark:border-[#2D3C2F] text-[#223326] dark:text-[#E8EFE5] font-medium text-sm sm:text-base hover:border-[#B5C26B] dark:hover:border-[#EAEF9D]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm"
    >
      <Icon name="grid" size={16} class="text-[#556956] dark:text-[#EAEF9D]" />
      <span>Katalog 16 Tipe</span>
    </button>
  </div>

  <!-- Micro Footer with high WCAG contrast -->
  <div class="mt-14 sm:mt-16 text-[10px] sm:text-[11px] text-[#4F604E] dark:text-[#9FB19B] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-medium">
    psychology • quiet luxury self-discovery
  </div>
</div>
