<script>
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';
  import { playClick } from '../lib/sounds.js';

  let { item, onClose } = $props();
  let modalRef = $state(null);
  let closeBtnRef = $state(null);

  function handleClose() {
    playClick();
    onClose();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      handleClose();
      return;
    }

    if (e.key === 'Tab' && modalRef) {
      const focusable = modalRef.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    // Focus close button initially for accessibility
    setTimeout(() => {
      if (closeBtnRef) closeBtnRef.focus();
    }, 50);

    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div
  class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0D140E]/60 backdrop-blur-sm animate-pulse-once select-none"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <!-- Backdrop Clickable -->
  <button
    type="button"
    class="fixed inset-0 w-full h-full cursor-default -z-10 focus:outline-none"
    onclick={handleClose}
    aria-label="Tutup modal"
  ></button>

  <!-- Modal Box -->
  <div
    bind:this={modalRef}
    class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[36px] bg-[#FAF9F3] dark:bg-[#18231B] border border-[#DDDDC6] dark:border-[#2C3D2E] p-6 sm:p-8 shadow-2xl"
  >
    <!-- Close Button (Ergonomic 44x44px touch target) -->
    <button
      bind:this={closeBtnRef}
      type="button"
      onclick={handleClose}
      class="absolute top-5 right-5 w-11 h-11 rounded-2xl bg-[#EBEAD3] dark:bg-[#223024] text-[#485946] hover:text-[#19261C] dark:hover:text-[#F3F6ED] flex items-center justify-center hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EAEF9D]"
      aria-label="Tutup modal profil"
    >
      <Icon name="close" size={18} />
    </button>

    <!-- Header Section -->
    <div class="flex items-center gap-4 mb-6 pr-12">
      <div class="w-14 h-14 rounded-2xl bg-[#EAEF9D]/60 dark:bg-[#EAEF9D]/15 border border-[#CCD77E] dark:border-[#EAEF9D]/30 flex items-center justify-center text-[#223326] dark:text-[#EAEF9D] shrink-0 shadow-sm">
        <Icon name={item.icon} size={26} strokeWidth={1.8} />
      </div>

      <div>
        <div class="flex items-center gap-2.5">
          <h2 id="modal-title" class="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#16241A] dark:text-[#F4F7EE] tracking-tight leading-none">
            {item.type}
          </h2>
          <span class="px-2.5 py-0.5 rounded-full bg-[#EAEF9D]/50 dark:bg-[#EAEF9D]/15 border border-[#CCD77E] dark:border-[#EAEF9D]/30 text-[11px] font-semibold text-[#202F21] dark:text-[#EAEF9D]">
            {item.population}% populasi
          </span>
        </div>
        <div class="font-serif-instrument italic text-xl sm:text-2xl font-normal text-[#2D4230] dark:text-[#EAEF9D] mt-0.5">
          {item.nickname}
        </div>
        <div class="text-[11px] uppercase tracking-[0.16em] text-[#556754] dark:text-[#9DB09B] font-semibold">
          {item.tagline}
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="p-5 sm:p-6 rounded-2xl bg-[#F3F2E4] dark:bg-[#131C15] border border-[#DDDDC6] dark:border-[#223023] font-serif-luxury text-base sm:text-lg text-[#253627] dark:text-[#D5E1D1] leading-relaxed mb-6 font-normal">
      {item.description}
    </div>

    <!-- Strengths & Challenges -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div class="p-4 rounded-2xl bg-[#EAEF9D]/30 dark:bg-[#EAEF9D]/10 border border-[#CCD77E]/60 dark:border-[#EAEF9D]/20">
        <div class="flex items-center gap-1.5 text-[11px] font-semibold text-[#253927] dark:text-[#EAEF9D] uppercase tracking-[0.16em] mb-2">
          <Icon name="check" size={13} />
          <span>Kekuatan Utama</span>
        </div>
        <ul class="space-y-1.5 text-xs sm:text-[13px] text-[#273829] dark:text-[#D1DFCE] leading-relaxed font-normal">
          {#each item.strengths as str}
            <li class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#8E9F4A] dark:bg-[#EAEF9D] mt-1.5 shrink-0"></span>
              <span>{str}</span>
            </li>
          {/each}
        </ul>
      </div>

      <div class="p-4 rounded-2xl bg-[#F0EFE0] dark:bg-[#1E291F] border border-[#DDDDC6] dark:border-[#2B3B2C]">
        <div class="flex items-center gap-1.5 text-[11px] font-semibold text-[#4B5E49] dark:text-[#CCD77E] uppercase tracking-[0.16em] mb-2">
          <Icon name="compass" size={13} />
          <span>Ruang Bertumbuh</span>
        </div>
        <ul class="space-y-1.5 text-xs sm:text-[13px] text-[#273829] dark:text-[#D1DFCE] leading-relaxed font-normal">
          {#each item.challenges as ch}
            <li class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#5E725C] dark:bg-[#A9BC76] mt-1.5 shrink-0"></span>
              <span>{ch}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Compatibility -->
    <div class="p-4 rounded-2xl bg-[#F7F6EB] dark:bg-[#162018] border border-[#DDDDC6] dark:border-[#263628] mb-6">
      <div class="text-[11px] font-semibold text-[#576A56] dark:text-[#93A590] uppercase tracking-[0.16em] mb-2.5">
        Kesesuaian & Sinergi
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
        <div>
          <span class="font-semibold text-[#2C412E] dark:text-[#EAEF9D]">Sangat Selaras: </span>
          <span class="font-bold text-[#1C281E] dark:text-[#FAFBF7]">{item.compatibility.best.join(', ')}</span>
        </div>
        <div>
          <span class="font-semibold text-[#5B6F58] dark:text-[#CCD77E]">Tantangan: </span>
          <span class="font-medium text-[#354836] dark:text-[#C5D3C1]">{item.compatibility.challenge.join(', ')}</span>
        </div>
      </div>
    </div>

    <!-- Fun fact & Celebrity -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#526351] dark:text-[#96A794] pt-3 border-t border-[#DDDDC6] dark:border-[#273729] font-normal">
      <div>
        <span class="font-semibold text-[#233425] dark:text-[#E4EFE0]">Fakta Unik:</span> {item.funFact}
      </div>
      <div>
        <span class="font-semibold text-[#233425] dark:text-[#E4EFE0]">Figur Publik:</span> {item.celebrity}
      </div>
    </div>
  </div>
</div>
