<script>
  import Icon from './Icon.svelte';
  import { playClick } from '../lib/sounds.js';

  let { chapter, onContinue } = $props();

  const romanNumerals = ['I', 'II', 'III', 'IV'];

  function handleContinue() {
    playClick();
    onContinue();
  }
</script>

<div class="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 max-w-xl mx-auto text-center select-none animate-pulse-once">
  <!-- Chapter Classical Roman Numeral Badge -->
  <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAEF9D]/60 dark:bg-[#EAEF9D]/15 border border-[#CCD77E] dark:border-[#EAEF9D]/30 text-[#1E2B20] dark:text-[#EAEF9D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 shadow-sm">
    <span>BAGIAN {romanNumerals[chapter.id] || chapter.id + 1} DARI IV</span>
  </div>

  <!-- Icon in Glass Squircle -->
  <div class="w-16 h-16 rounded-2xl bg-[#EAEF9D]/40 dark:bg-[#EAEF9D]/15 border border-[#CCD77E] dark:border-[#EAEF9D]/30 flex items-center justify-center text-[#223326] dark:text-[#EAEF9D] mb-6 shadow-sm">
    <Icon name={chapter.icon} size={30} strokeWidth={1.8} />
  </div>

  <!-- Title in Classical Garamond Serif: Confident, Regal Weight -->
  <h2 class="font-serif-luxury text-3xl sm:text-5xl font-medium sm:font-semibold text-[#16231A] dark:text-[#F4F7EE] tracking-tight leading-snug mb-2">
    {chapter.title}
  </h2>

  <!-- Subtitle in Instrument Serif Italic -->
  <p class="font-serif-instrument italic text-lg sm:text-2xl text-[#354B38] dark:text-[#EAEF9D] max-w-md mx-auto leading-relaxed mb-8">
    {chapter.subtitle}
  </p>

  <!-- Button -->
  <button
    type="button"
    onclick={handleContinue}
    class="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-8 py-3.5 rounded-2xl bg-[#223326] hover:bg-[#19271E] dark:bg-[#EAEF9D] dark:hover:bg-[#DFE784] text-[#FAF9F3] dark:text-[#18241B] font-semibold text-sm sm:text-base shadow-md shadow-[#223326]/10 dark:shadow-[#EAEF9D]/15 hover:scale-105 active:scale-95 transition-all duration-200"
  >
    <span>Mulai Bagian Ini</span>
    <Icon name="arrow-right" size={17} class="text-[#EAEF9D] dark:text-[#18241B]" />
  </button>
</div>
