<script>
  import { theme } from '../stores/theme.js';
  import { playClick } from '../lib/sounds.js';
  import Icon from './Icon.svelte';

  function handleToggle() {
    playClick();
    theme.toggle();
  }
</script>

<button
  type="button"
  onclick={handleToggle}
  class="fixed top-4 right-4 z-50 flex items-center justify-center w-11 h-11 rounded-2xl bg-[#FAF9F3]/90 dark:bg-[#18221A]/90 backdrop-blur-md border border-[#E0DFC9] dark:border-[#2C3B2E] shadow-sm hover:shadow hover:border-[#C8D17A] dark:hover:border-[#EAEF9D]/50 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-[#243328] dark:text-[#E8EFE5] focus:outline-none focus:ring-2 focus:ring-[#EAEF9D]"
  aria-label={$theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
  title={$theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
>
  {#if $theme === 'dark'}
    <Icon name="sun" size={19} class="transition-transform duration-300 rotate-0 hover:rotate-45 text-[#EAEF9D]" />
  {:else}
    <Icon name="moon" size={19} class="transition-transform duration-300 -rotate-12 hover:rotate-0 text-[#223326]" />
  {/if}
</button>
