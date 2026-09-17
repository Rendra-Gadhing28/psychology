<script>
  import Icon from './Icon.svelte';
  import { playClick } from '../lib/sounds.js';

  let { item, onClick } = $props();

  function handleClick() {
    playClick();
    onClick(item);
  }
</script>

<button
  type="button"
  onclick={handleClick}
  class="group relative flex flex-col items-start p-5 sm:p-6 rounded-[28px] bg-[#FAF9F3] dark:bg-[#18231B] border border-[#DDDDC6] dark:border-[#28382A] text-left shadow-sm hover:shadow-md hover:border-[#CCD77E] dark:hover:border-[#EAEF9D]/60 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EAEF9D] select-none w-full"
>
  <!-- Top: Icon & Population -->
  <div class="flex items-center justify-between w-full mb-3">
    <div class="w-9 h-9 rounded-xl bg-[#EAEF9D]/60 dark:bg-[#EAEF9D]/15 border border-[#CCD77E] dark:border-[#EAEF9D]/30 flex items-center justify-center text-[#223326] dark:text-[#EAEF9D] transition-colors group-hover:bg-[#223326] group-hover:text-[#EAEF9D] dark:group-hover:bg-[#EAEF9D] dark:group-hover:text-[#18251B]">
      <Icon name={item.icon} size={17} strokeWidth={1.8} />
    </div>
    <span class="text-[10px] font-medium font-mono text-[#586A57] dark:text-[#9FB19D]">
      {item.population}%
    </span>
  </div>

  <!-- Type Code in Cormorant Garamond -->
  <div class="font-serif-luxury text-3xl sm:text-[32px] font-normal tracking-wide text-[#16231A] dark:text-[#F4F7EE] mb-0.5 group-hover:text-[#2E4532] dark:group-hover:text-[#EAEF9D] transition-colors">
    {item.type}
  </div>

  <!-- Nickname in Instrument Serif Italic -->
  <div class="font-serif-instrument italic text-base sm:text-lg font-normal text-[#2E4532] dark:text-[#EAEF9D] line-clamp-1 mb-1">
    {item.nickname}
  </div>

  <!-- Tagline Preview -->
  <p class="font-sans text-[11px] sm:text-xs text-[#526350] dark:text-[#9FB19D] line-clamp-2 leading-relaxed font-normal">
    {item.tagline}
  </p>
</button>
