<script>
  import { playClick } from '../lib/sounds.js';

  let { selected = $bindable('ketupat-ivory') } = $props();

  const templates = [
    {
      id: 'ketupat-ivory',
      label: 'Ivory',
      bgPreview: 'bg-[#F9F8F0] border-[#CCD77E]'
    },
    {
      id: 'forest-heritage',
      label: 'Forest',
      bgPreview: 'bg-[#1C2A20] border-[#EAEF9D]/50'
    },
    {
      id: 'olive-noir',
      label: 'Noir',
      bgPreview: 'bg-[#151B16] border-[#7F937B]'
    }
  ];

  function handleSelect(id) {
    playClick();
    selected = id;
  }
</script>

<div class="flex flex-col items-center gap-2 select-none">
  <span class="text-xs font-semibold text-[#576956] dark:text-[#9EB09C]">Pilih Palet Kartu (Old Money)</span>
  <div class="flex items-center gap-3">
    {#each templates as t}
      {@const isActive = selected === t.id}
      <button
        type="button"
        onclick={() => handleSelect(t.id)}
        class="flex flex-col items-center gap-1.5 focus:outline-none"
      >
        <div
          class="w-11 h-14 rounded-xl border-2 transition-all duration-200 {t.bgPreview} {isActive ? 'ring-2 ring-[#CCD77E] dark:ring-[#EAEF9D] ring-offset-2 dark:ring-offset-[#121813] scale-105 border-[#BAC65E] shadow-sm' : 'opacity-70 hover:opacity-100 hover:scale-102'}"
        ></div>
        <span class="text-[11px] font-semibold {isActive ? 'text-[#223326] dark:text-[#EAEF9D] font-bold' : 'text-[#728371]'}">
          {t.label}
        </span>
      </button>
    {/each}
  </div>
</div>
