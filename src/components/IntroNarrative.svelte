<script>
  import Icon from './Icon.svelte';
  import { playClick } from '../lib/sounds.js';

  let { onComplete } = $props();
  let step = $state(0);

  function handleNext() {
    playClick();
    if (step === 0) {
      step = 1;
    } else {
      onComplete();
    }
  }
</script>

<div class="min-h-screen flex flex-col items-center justify-center px-6 py-16 max-w-2xl mx-auto text-center select-none">
  {#if step === 0}
    <div class="space-y-7 animate-pulse-once">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#EAEF9D]/60 dark:bg-[#EAEF9D]/15 border border-[#CCD77E] dark:border-[#EAEF9D]/30 text-[#223326] dark:text-[#EAEF9D] mx-auto shadow-sm">
        <Icon name="sparkles" size={22} />
      </div>

      <h2 class="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-normal text-[#17241A] dark:text-[#F4F7EE] leading-[1.15] tracking-tight">
        Pernahkah kamu merasa <br class="hidden sm:inline" />
        <span class="font-serif-instrument italic text-4xl sm:text-6xl md:text-7xl text-[#314634] dark:text-[#EAEF9D]">
          ritmemu
        </span>
        berbeda dari orang di sekitarmu?
      </h2>

      <p class="text-sm sm:text-base text-[#475749] dark:text-[#A8B7A4] leading-relaxed max-w-lg mx-auto font-normal">
        Terkadang kamu memikirkan hal-hal yang dilewatkan orang lain, atau membutuhkan keheningan di saat suasana begitu ramai.
      </p>

      <div class="pt-3">
        <button
          type="button"
          onclick={handleNext}
          class="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3.5 rounded-2xl bg-[#223326] hover:bg-[#19271E] dark:bg-[#EAEF9D] dark:hover:bg-[#DFE784] text-[#FAF9F3] dark:text-[#18241B] font-semibold text-sm sm:text-base shadow-md shadow-[#223326]/10 dark:shadow-[#EAEF9D]/15 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <span>Benar, sering sekali...</span>
          <Icon name="arrow-right" size={17} class="text-[#EAEF9D] dark:text-[#18241B]" />
        </button>
      </div>
    </div>
  {:else}
    <div class="space-y-7 animate-pulse-once">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#EAEF9D]/60 dark:bg-[#EAEF9D]/15 border border-[#CCD77E] dark:border-[#EAEF9D]/30 text-[#223326] dark:text-[#EAEF9D] mx-auto shadow-sm">
        <Icon name="heart" size={22} />
      </div>

      <h2 class="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-normal text-[#17241A] dark:text-[#F4F7EE] leading-[1.15] tracking-tight">
        Itu adalah keunikanmu,<br />
        <span class="font-serif-instrument italic text-4xl sm:text-6xl md:text-7xl text-[#314634] dark:text-[#EAEF9D]">
          bukan sebuah kekurangan.
        </span>
      </h2>

      <p class="text-sm sm:text-base text-[#475749] dark:text-[#A8B7A4] leading-relaxed max-w-lg mx-auto font-normal">
        Karakter sejati terbentuk dari kejujuran menerima diri sendiri. Jawablah setiap pertanyaan secara santai dan tulus.
      </p>

      <div class="pt-3">
        <button
          type="button"
          onclick={handleNext}
          class="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3.5 rounded-2xl bg-[#223326] hover:bg-[#19271E] dark:bg-[#EAEF9D] dark:hover:bg-[#DFE784] text-[#FAF9F3] dark:text-[#18241B] font-semibold text-sm sm:text-base shadow-md shadow-[#223326]/10 dark:shadow-[#EAEF9D]/15 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <span>Mulai Pertanyaan Pertama</span>
          <Icon name="arrow-right" size={17} class="text-[#EAEF9D] dark:text-[#18241B]" />
        </button>
      </div>
    </div>
  {/if}
</div>
