<script>
  import { RESULTS } from '../lib/results.js';
  import TypeCard from './TypeCard.svelte';
  import TypeModal from './TypeModal.svelte';
  import Icon from './Icon.svelte';
  import { playClick } from '../lib/sounds.js';

  let { onBack, onStartQuiz } = $props();

  let activeCategory = $state('all');
  let selectedType = $state(null);

  const categories = [
    { id: 'all', label: 'Semua (16)' },
    { id: 'analysts', label: 'Analis', types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] },
    { id: 'diplomats', label: 'Diplomat', types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] },
    { id: 'sentinels', label: 'Pengawal', types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] },
    { id: 'explorers', label: 'Penjelajah', types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'] }
  ];

  const allItems = Object.values(RESULTS);

  const filteredItems = $derived(
    activeCategory === 'all'
      ? allItems
      : allItems.filter((it) => {
          const cat = categories.find((c) => c.id === activeCategory);
          return cat ? cat.types.includes(it.type) : true;
        })
  );

  function handleFilter(id) {
    playClick();
    activeCategory = id;
  }

  function handleSelectType(item) {
    selectedType = item;
  }

  function handleCloseModal() {
    selectedType = null;
  }

  function handleStart() {
    playClick();
    onStartQuiz();
  }

  function handleBack() {
    playClick();
    onBack();
  }
</script>

<div class="min-h-screen px-4 py-12 sm:py-16 max-w-5xl mx-auto select-none">
  <!-- Top Navigation & Return -->
  <div class="flex items-center justify-between mb-8">
    <button
      type="button"
      onclick={handleBack}
      class="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-2xl bg-[#FAF9F3] dark:bg-[#18231B] border border-[#D5D4BD] dark:border-[#2D3E2F] text-xs sm:text-sm font-medium text-[#202F22] dark:text-[#E8EFE5] hover:border-[#CCD77E] transition-all shadow-sm"
    >
      <Icon name="arrow-left" size={15} />
      <span>Kembali</span>
    </button>

    <button
      type="button"
      onclick={handleStart}
      class="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 rounded-2xl bg-[#223326] hover:bg-[#18271C] dark:bg-[#EAEF9D] dark:hover:bg-[#DFE784] text-[#FAF9F3] dark:text-[#18241B] text-xs sm:text-sm font-semibold shadow-sm transition-all"
    >
      <span>Mulai Tes</span>
      <Icon name="arrow-right" size={15} class="text-[#EAEF9D] dark:text-[#18241B]" />
    </button>
  </div>

  <!-- Header -->
  <div class="text-center max-w-2xl mx-auto mb-10">
    <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAEF9D]/70 dark:bg-[#EAEF9D]/15 border border-[#CCD77E] dark:border-[#EAEF9D]/30 text-[#1E2C20] dark:text-[#EAEF9D] text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 shadow-sm">
      <Icon name="grid" size={13} />
      <span>Katalog 16 Tipe MBTI</span>
    </div>

    <h1 class="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-normal text-[#17241A] dark:text-[#F4F7EE] tracking-tight leading-tight mb-3">
      Arsip Karakter Manusia
    </h1>

    <p class="text-sm sm:text-base text-[#495B4A] dark:text-[#A7B6A3] leading-relaxed font-normal">
      Setiap tipe kepribadian memiliki pola pikir, cara mengolah energi, dan keunikan alaminya sendiri. Ketuk kartu untuk membaca profil lengkap.
    </p>
  </div>

  <!-- Category Filter Pills (Touch friendly min-h-[44px]) -->
  <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10" role="tablist" aria-label="Kategori Kepribadian">
    {#each categories as cat}
      {@const isActive = activeCategory === cat.id}
      <button
        type="button"
        role="tab"
        aria-selected={isActive}
        onclick={() => handleFilter(cat.id)}
        class="min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition-all duration-200 {isActive ? 'bg-[#223326] text-[#FAF9F3] dark:bg-[#EAEF9D] dark:text-[#18241B] shadow-sm scale-102' : 'bg-[#FAF9F3] dark:bg-[#18231B] border border-[#D8D7C0] dark:border-[#2C3B2E] text-[#475846] dark:text-[#A8B9A4] hover:border-[#BAC764]'}"
      >
        {cat.label}
      </button>
    {/each}
  </div>

  <!-- 16 Type Cards Grid -->
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-16">
    {#each filteredItems as item}
      <TypeCard
        {item}
        onClick={handleSelectType}
      />
    {/each}
  </div>

  <!-- Modal for active selection -->
  {#if selectedType}
    <TypeModal
      item={selectedType}
      onClose={handleCloseModal}
    />
  {/if}

  <!-- Bottom CTA Box (Old Money Quiet Luxury) -->
  <div class="p-8 sm:p-10 rounded-[32px] bg-[#223326] dark:bg-[#18241B] text-[#FAF9F3] border border-[#344838] dark:border-[#2A3C2D] text-center shadow-lg shadow-[#223326]/10 max-w-xl mx-auto">
    <h3 class="font-serif-luxury text-2xl sm:text-3xl font-normal mb-2 text-[#FAF8F2] dark:text-[#F3F6EE]">
      Temukan Tipe Asli Dirimu
    </h3>
    <p class="text-sm text-[#CCD8CA] dark:text-[#B2C4AF] max-w-md mx-auto mb-6 leading-relaxed font-normal">
      Ikuti tes 35 pernyataan dengan nuansa menenangkan dalam 5 menit.
    </p>
    <button
      type="button"
      onclick={handleStart}
      class="inline-flex items-center gap-2 min-h-[44px] px-8 py-3 rounded-2xl bg-[#EAEF9D] hover:bg-[#DDE57F] text-[#18251B] font-semibold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all shadow-sm"
    >
      <span>Mulai Tes MBTI</span>
      <Icon name="arrow-right" size={17} />
    </button>
  </div>
</div>
