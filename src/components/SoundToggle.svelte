<script>
  import { sound } from '../stores/sound.js';
  import { playClick } from '../lib/sounds.js';
  import Icon from './Icon.svelte';

  function handleToggle() {
    sound.toggle();
    playClick();
  }
</script>

<button
  type="button"
  onclick={handleToggle}
  class="fixed top-4 left-4 z-50 flex items-center justify-center w-11 h-11 rounded-2xl bg-[#FAF9F3]/90 dark:bg-[#18221A]/90 backdrop-blur-md border border-[#E0DFC9] dark:border-[#2C3B2E] shadow-sm hover:shadow hover:border-[#C8D17A] dark:hover:border-[#EAEF9D]/50 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 text-[#243328] dark:text-[#E8EFE5] focus:outline-none focus:ring-2 focus:ring-[#EAEF9D]"
  aria-label={$sound ? 'Nonaktifkan efek suara' : 'Aktifkan efek suara'}
  title={$sound ? 'Suara Aktif' : 'Suara Mati'}
>
  {#if $sound}
    <Icon name="volume-2" size={19} class="text-[#223326] dark:text-[#EAEF9D]" />
  {:else}
    <Icon name="volume-x" size={19} class="text-[#889585] dark:text-[#657864]" />
  {/if}
</button>
