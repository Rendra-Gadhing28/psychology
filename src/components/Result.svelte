<script>
  import { onMount } from 'svelte';
  import { RESULTS } from '../lib/results.js';
  import { startTime, endTime, formatDuration } from '../stores/quiz.js';
  import { playClick } from '../lib/sounds.js';
  import ConfettiCanvas from './ConfettiCanvas.svelte';
  import TemplateSelector from './TemplateSelector.svelte';
  import ResultCard from './ResultCard.svelte';
  import Icon from './Icon.svelte';

  let { result, onRestart, onExplore } = $props();

  let selectedTemplate = $state('ketupat-ivory');
  let cardElement = $state(null);
  let isDownloading = $state(false);
  let revealed = $state(false);

  const resultData = $derived(RESULTS[result.type] || RESULTS.INTJ);
  const durationText = $derived(
    formatDuration(($endTime || Date.now()) - ($startTime || (Date.now() - 180000)))
  );

  onMount(() => {
    const timer = setTimeout(() => {
      revealed = true;
    }, 280);
    return () => clearTimeout(timer);
  });

  async function handleDownloadImage() {
    if (!cardElement || isDownloading) return;
    playClick();
    isDownloading = true;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      // High-resolution yet memory-conscious scale: 2.5x on mobile to avoid memory spikes, 3x on desktop
      const renderScale = isMobile ? 2.5 : 3;

      const canvas = await html2canvas(cardElement, {
        scale: renderScale,
        useCORS: true,
        backgroundColor: null,
        logging: false
      });

      // Use native toBlob instead of huge base64 string on JS heap
      canvas.toBlob((blob) => {
        if (!blob) {
          isDownloading = false;
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `psychology-${result.type}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        isDownloading = false;
      }, 'image/png');
    } catch (err) {
      console.error('Download card error:', err);
      isDownloading = false;
    }
  }

  function handleRestartClick() {
    playClick();
    onRestart();
  }

  function handleExploreClick() {
    playClick();
    onExplore();
  }
</script>

<ConfettiCanvas />

<div class="relative min-h-screen px-4 py-12 sm:py-16 max-w-4xl mx-auto select-none">
  <!-- Top Badge -->
  <div class="flex flex-col items-center text-center mb-8">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAEF9D]/70 dark:bg-[#EAEF9D]/15 border border-[#CCD77E] dark:border-[#EAEF9D]/30 text-[#1D2920] dark:text-[#EAEF9D] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4 shadow-sm">
      <Icon name="brain" size={14} />
      <span>Hasil Analisis Kepribadian</span>
    </div>

    <!-- Giant MBTI Monograph: Cormorant Garamond Serenity -->
    <div class="flex items-center justify-center gap-2 sm:gap-4 my-2">
      {#each result.type.split('') as letter, i}
        <div
          class="inline-flex items-center justify-center font-serif-luxury text-7xl sm:text-9xl md:text-[144px] font-normal tracking-tight text-[#16241A] dark:text-[#EAEF9D] leading-none transition-all duration-700 transform"
          style="transition-delay: {i * 110}ms; opacity: {revealed ? 1 : 0}; transform: translateY({revealed ? 0 : 20}px);"
        >
          {letter}
        </div>
      {/each}
    </div>

    <!-- Nickname Framed with Subtle Lines -->
    <div class="inline-flex items-center gap-3 mt-1 mb-1">
      <span class="w-6 sm:w-10 h-[1px] bg-[#CCD77E] dark:bg-[#EAEF9D]/40"></span>
      <h1 class="font-serif-instrument italic text-3xl sm:text-5xl font-normal text-[#18261B] dark:text-[#FAFBF7]">
        {resultData.nickname}
      </h1>
      <span class="w-6 sm:w-10 h-[1px] bg-[#CCD77E] dark:bg-[#EAEF9D]/40"></span>
    </div>

    <p class="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#4E624F] dark:text-[#B6C5B2] mt-1">
      {resultData.tagline}
    </p>

    <!-- Meta Info: Timer & Population -->
    <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 text-xs font-medium text-[#586A57] dark:text-[#9FB19E]">
      <span class="inline-flex items-center gap-1.5">
        <Icon name="clock" size={13} />
        <span>Selesai dalam {durationText}</span>
      </span>
      <span class="inline-flex items-center gap-1.5">
        <Icon name="bar-chart" size={13} />
        <span>Populasi dunia: {resultData.population}%</span>
      </span>
    </div>
  </div>

  <!-- Warm Counselor Description with Literary Drop Cap -->
  <div class="p-6 sm:p-10 rounded-[32px] bg-[#FAF9F3] dark:bg-[#18231B] border border-[#DDDCC5] dark:border-[#2B3B2D] shadow-sm mb-10 relative overflow-hidden">
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#344735] dark:text-[#EAEF9D]">
        <Icon name="feather" size={15} />
        <span>Refleksi Jiwa</span>
      </div>
      <span class="text-[10px] font-mono uppercase tracking-widest text-[#788B76] dark:text-[#889B86]">
        Karakter {result.type}
      </span>
    </div>

    <p class="font-serif-luxury text-lg sm:text-[22px] text-[#243526] dark:text-[#D9E5D4] leading-[1.8] font-normal first-letter:text-5xl first-letter:font-serif-instrument first-letter:italic first-letter:mr-2.5 first-letter:float-left first-letter:text-[#18261B] dark:first-letter:text-[#EAEF9D]">
      {resultData.description}
    </p>
  </div>

  <!-- 4 Dimension Percentages Grid -->
  <div class="mb-10">
    <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-[#5A6D59] dark:text-[#9FB29D] mb-4 px-1">
      Komposisi Dimensi Karakter
    </h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {#each Object.entries(result.percentages) as [dim, data]}
        <div class="p-5 rounded-2xl bg-[#FAF9F3] dark:bg-[#18231B] border border-[#DDDDC6] dark:border-[#2A392C] shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between text-sm font-semibold mb-2">
            <span class="text-[#1D2A1F] dark:text-[#EAEFDF]">{data.label}</span>
            <span class="text-[#324935] dark:text-[#EAEF9D] font-mono text-xs">{data.percentage}%</span>
          </div>

          <!-- Percentage Slider Bar -->
          <div class="w-full h-2 bg-[#E6E5D1] dark:bg-[#121A13] rounded-full overflow-hidden p-0.5 border border-[#D5D4BE] dark:border-[#273629]">
            <div
              class="h-full rounded-full bg-gradient-to-r from-[#A4B65B] via-[#CCD77E] to-[#EAEF9D] transition-all duration-700"
              style="width: {data.percentage}%;"
            ></div>
          </div>

          <div class="flex justify-between text-[11px] font-medium text-[#657863] dark:text-[#889B86] mt-2">
            <span>Dominan: {data.winner}</span>
            <span>Lawan: {data.loser}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Strengths & Growth Areas -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
    <!-- Strengths -->
    <div class="p-6 rounded-[28px] bg-[#FAF9F3] dark:bg-[#18231B] border border-[#DDDDC6] dark:border-[#2A392C] shadow-sm">
      <div class="flex items-center gap-2 text-sm font-bold text-[#324A34] dark:text-[#EAEF9D] mb-4">
        <Icon name="check" size={17} />
        <span>Kekuatan Asli Dirimu</span>
      </div>
      <ul class="space-y-2.5">
        {#each resultData.strengths as item}
          <li class="flex items-start gap-2.5 text-sm text-[#273829] dark:text-[#D5E1D1] leading-relaxed">
            <span class="w-1.5 h-1.5 rounded-full bg-[#8E9F4A] dark:bg-[#EAEF9D] mt-2 shrink-0"></span>
            <span>{item}</span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Challenges / Growth Area -->
    <div class="p-6 rounded-[28px] bg-[#FAF9F3] dark:bg-[#18231B] border border-[#DDDDC6] dark:border-[#2A392C] shadow-sm">
      <div class="flex items-center gap-2 text-sm font-bold text-[#556953] dark:text-[#CCD77E] mb-4">
        <Icon name="compass" size={17} />
        <span>Ruang Untuk Bertumbuh</span>
      </div>
      <ul class="space-y-2.5">
        {#each resultData.challenges as item}
          <li class="flex items-start gap-2.5 text-sm text-[#273829] dark:text-[#D5E1D1] leading-relaxed">
            <span class="w-1.5 h-1.5 rounded-full bg-[#627760] dark:bg-[#B5C472] mt-2 shrink-0"></span>
            <span>{item}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Compatibility Section -->
  <div class="p-6 sm:p-8 rounded-[32px] bg-[#FAF9F3] dark:bg-[#18231B] border border-[#DDDDC6] dark:border-[#2A392C] shadow-sm mb-10">
    <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4E614C] dark:text-[#EAEF9D] mb-6">
      <Icon name="heart" size={15} />
      <span>Sinergi Relasi & Keselarasan</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Best Match -->
      <div>
        <div class="text-xs font-semibold text-[#5B6C59] dark:text-[#90A28E] uppercase tracking-wider mb-3">
          Sangat Selaras
        </div>
        <div class="flex flex-wrap gap-2">
          {#each resultData.compatibility.best as match}
            <span class="px-3.5 py-1.5 rounded-xl bg-[#EAEF9D]/70 dark:bg-[#EAEF9D]/20 border border-[#CCD77E] dark:border-[#EAEF9D]/40 text-[#1A281E] dark:text-[#EAEF9D] font-bold text-xs sm:text-sm tracking-wide shadow-sm">
              {match}
            </span>
          {/each}
        </div>
        <p class="text-xs text-[#6F816E] dark:text-[#889B86] mt-2 leading-relaxed">
          Komunikasi mengalir alami dan saling melengkapi.
        </p>
      </div>

      <!-- Challenge Match -->
      <div>
        <div class="text-xs font-semibold text-[#5B6C59] dark:text-[#90A28E] uppercase tracking-wider mb-3">
          Tantangan Penyesuaian
        </div>
        <div class="flex flex-wrap gap-2">
          {#each resultData.compatibility.challenge as match}
            <span class="px-3.5 py-1.5 rounded-xl bg-[#EFEFD8] dark:bg-[#253225] border border-[#D0D0B5] dark:border-[#3A4A3B] text-[#344533] dark:text-[#CEDBC8] font-medium text-xs sm:text-sm tracking-wide">
              {match}
            </span>
          {/each}
        </div>
        <p class="text-xs text-[#6F816E] dark:text-[#889B86] mt-2 leading-relaxed">
          Menuntut kesabaran dan saling menghormati perbedaan gaya hidup.
        </p>
      </div>
    </div>
  </div>

  <!-- Fun Fact & Celebrity -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
    <div class="p-5 rounded-2xl bg-[#EAEF9D]/45 dark:bg-[#EAEF9D]/10 border border-[#CCD77E]/80 dark:border-[#EAEF9D]/25 text-[#1E2B1E] dark:text-[#EAEF9D]">
      <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] mb-2 text-[#354834] dark:text-[#CCD77E]">
        <Icon name="sparkles" size={14} />
        <span>Fakta Karakter</span>
      </div>
      <p class="text-sm font-normal leading-relaxed">
        {resultData.funFact}
      </p>
    </div>

    <div class="p-5 rounded-2xl bg-[#FAF9F3] dark:bg-[#18231B] border border-[#DDDDC6] dark:border-[#2A392C] text-[#223324] dark:text-[#DCE7D8]">
      <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] mb-2 text-[#4C5E4A] dark:text-[#B2C3AE]">
        <Icon name="users" size={14} />
        <span>Figur Publik Serupa</span>
      </div>
      <p class="text-sm font-normal leading-relaxed">
        {resultData.celebrity}
      </p>
    </div>
  </div>

  <!-- Shareable Result Card Section (9:16 Canvas) -->
  <div class="flex flex-col items-center text-center p-6 sm:p-8 rounded-[32px] bg-[#FAF9F3] dark:bg-[#18231B] border border-[#DDDDC6] dark:border-[#2A392C] shadow-sm mb-12">
    <div class="max-w-md mx-auto mb-6">
      <h3 class="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#18261B] dark:text-[#F4F7EE] mb-2">
        Simpan Kartu Hasil (9:16)
      </h3>
      <p class="text-xs sm:text-sm text-[#5B6C59] dark:text-[#90A28E] leading-relaxed">
        Format proporsional dan tenang, cocok untuk Instagram Story atau pengingat pribadi.
      </p>
    </div>

    <!-- Template Selector -->
    <div class="mb-6">
      <TemplateSelector bind:selected={selectedTemplate} />
    </div>

    <!-- The 9:16 Card Canvas Component -->
    <div class="my-4 flex justify-center w-full overflow-x-auto p-2">
      <ResultCard
        result={result}
        resultData={resultData}
        template={selectedTemplate}
        bind:cardRef={cardElement}
      />
    </div>

    <!-- Download Trigger Button (Zero-CLS min-width & min 44px touch target) -->
    <button
      type="button"
      onclick={handleDownloadImage}
      disabled={isDownloading}
      class="mt-6 inline-flex items-center justify-center gap-2.5 min-h-[48px] min-w-[230px] px-8 py-3.5 rounded-2xl bg-[#223326] hover:bg-[#19271E] dark:bg-[#EAEF9D] dark:hover:bg-[#DFE784] disabled:opacity-60 text-[#FAF9F3] dark:text-[#18241B] font-semibold text-sm sm:text-base shadow-md shadow-[#223326]/10 dark:shadow-[#EAEF9D]/15 hover:scale-105 active:scale-95 transition-all duration-200"
    >
      {#if isDownloading}
        <div class="w-4 h-4 border-2 border-[#FAF9F3]/30 border-t-[#FAF9F3] dark:border-[#18241B]/30 dark:border-t-[#18241B] rounded-full animate-spin"></div>
        <span>Menyusun Kartu...</span>
      {:else}
        <Icon name="download" size={18} />
        <span>Unduh Gambar PNG</span>
      {/if}
    </button>
  </div>

  <!-- Navigation Action Buttons -->
  <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 border-t border-[#DDDDC6] dark:border-[#29382B]">
    <button
      type="button"
      onclick={handleExploreClick}
      class="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-2xl bg-[#FAF9F3] dark:bg-[#18231B] border border-[#D5D4BD] dark:border-[#2E3F30] text-[#1D2B1F] dark:text-[#E4EEE0] font-semibold text-sm hover:border-[#CCD77E] transition-all shadow-sm"
    >
      <Icon name="grid" size={15} class="text-[#4E614C] dark:text-[#EAEF9D]" />
      <span>Jelajahi 16 Kepribadian</span>
    </button>

    <button
      type="button"
      onclick={handleRestartClick}
      class="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-2xl border border-transparent text-[#5B6D5A] hover:text-[#1A261D] dark:text-[#91A38E] dark:hover:text-[#F3F6EE] font-medium text-sm transition-all"
    >
      <Icon name="rotate-ccw" size={15} />
      <span>Ulangi Tes</span>
    </button>
  </div>
</div>
