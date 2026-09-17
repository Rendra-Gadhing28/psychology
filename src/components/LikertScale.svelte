<script>
  import { playClick } from '../lib/sounds.js';

  let { selectedValue = null, onSelect } = $props();

  // Harmonious Old Money scale from muted linen-fawn to signature pastel ketupat
  const options = [
    {
      value: 1,
      shortLabel: "STS",
      fullLabel: "Sangat Tidak Setuju",
      hoverClass: "hover:border-[#C4B7A6] hover:bg-[#FAF7F2] dark:hover:bg-[#25231F] text-[#786657] dark:text-[#D5C6B7]",
      activeClass: "bg-[#7A6757] text-[#FAF8F5] ring-2 ring-[#C4B7A6] ring-offset-2 dark:ring-offset-[#121813] border-[#635243] shadow-sm"
    },
    {
      value: 2,
      shortLabel: "TS",
      fullLabel: "Tidak Setuju",
      hoverClass: "hover:border-[#B4C3AB] hover:bg-[#F6F8F3] dark:hover:bg-[#1E251E] text-[#556950] dark:text-[#C5D5C1]",
      activeClass: "bg-[#5D7358] text-[#FAF8F5] ring-2 ring-[#B4C3AB] ring-offset-2 dark:ring-offset-[#121813] border-[#475C42] shadow-sm"
    },
    {
      value: 3,
      shortLabel: "N",
      fullLabel: "Netral",
      hoverClass: "hover:border-[#A4B59F] hover:bg-[#F5F7F1] dark:hover:bg-[#1C251D] text-[#4E614A] dark:text-[#B6C8B2]",
      activeClass: "bg-[#4E634A] text-[#FAF8F5] ring-2 ring-[#A4B59F] ring-offset-2 dark:ring-offset-[#121813] border-[#3B4F37] shadow-sm"
    },
    {
      value: 4,
      shortLabel: "S",
      fullLabel: "Setuju",
      hoverClass: "hover:border-[#B8CA72] hover:bg-[#F8FAF0] dark:hover:bg-[#20291B] text-[#55692B] dark:text-[#D5E692]",
      activeClass: "bg-[#667E32] text-[#FAF8F5] ring-2 ring-[#B8CA72] ring-offset-2 dark:ring-offset-[#121813] border-[#4F6423] shadow-sm"
    },
    {
      value: 5,
      shortLabel: "SS",
      fullLabel: "Sangat Setuju",
      hoverClass: "hover:border-[#CCD77E] hover:bg-[#FAFBEB] dark:hover:bg-[#232D1B] text-[#2F441A] dark:text-[#EAEF9D]",
      activeClass: "bg-[#EAEF9D] text-[#18261A] ring-2 ring-[#CCD77E] ring-offset-2 dark:ring-offset-[#121813] border-[#BAC65E] shadow-md font-bold"
    }
  ];

  function handleChoose(val) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(10);
      } catch {
        // silent fail
      }
    }
    playClick();
    onSelect(val);
  }

  function handleKeyDown(e, currentIndex) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (currentIndex + 1) % options.length;
      handleChoose(options[next].value);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (currentIndex - 1 + options.length) % options.length;
      handleChoose(options[prev].value);
    } else if (e.key === 'Home') {
      e.preventDefault();
      handleChoose(options[0].value);
    } else if (e.key === 'End') {
      e.preventDefault();
      handleChoose(options[options.length - 1].value);
    }
  }
</script>

<div
  class="w-full max-w-xl mx-auto select-none"
  role="radiogroup"
  aria-label="Pilihan persetujuan skala 1 sampai 5"
>
  <!-- Guide Headers -->
  <div class="hidden sm:flex justify-between items-center text-[11px] font-semibold tracking-wider uppercase text-[#637662] dark:text-[#8E9F8B] px-2 mb-3">
    <span>Sangat Tidak Setuju</span>
    <span>Netral</span>
    <span>Sangat Setuju</span>
  </div>

  <!-- Likert 5 Options Row -->
  <div class="grid grid-cols-5 gap-2 sm:gap-3 items-center">
    {#each options as opt, idx}
      {@const isSelected = selectedValue === opt.value}
      <button
        type="button"
        role="radio"
        aria-checked={isSelected}
        tabindex={isSelected || (!selectedValue && opt.value === 3) ? 0 : -1}
        onclick={() => handleChoose(opt.value)}
        onkeydown={(e) => handleKeyDown(e, idx)}
        class="group relative flex flex-col items-center justify-center min-h-[58px] sm:min-h-[68px] p-2 sm:p-3 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EAEF9D] {isSelected ? opt.activeClass + ' scale-105 font-bold animate-pulse-once' : 'bg-[#FAF9F3]/90 dark:bg-[#18231B]/90 border-[#DDDDC6] dark:border-[#2C3C2E] ' + opt.hoverClass + ' hover:scale-102 active:scale-95 shadow-sm'}"
        aria-label="{opt.value} - {opt.fullLabel}"
        title="{opt.value} - {opt.fullLabel}"
      >
        <!-- Circle / Indicator Number -->
        <span class="text-base sm:text-lg font-bold transition-transform group-hover:scale-110">
          {opt.value}
        </span>

        <!-- Short Label -->
        <span class="text-[11px] sm:text-xs tracking-tight font-medium opacity-85 mt-0.5">
          {opt.shortLabel}
        </span>
      </button>
    {/each}
  </div>

  <!-- Mobile Footnote -->
  <div class="flex sm:hidden justify-between items-center text-[11px] text-[#6A7C69] dark:text-[#889B86] px-1 mt-3">
    <span>1 = Sangat Tidak Setuju</span>
    <span>5 = Sangat Setuju</span>
  </div>
</div>
