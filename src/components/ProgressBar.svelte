<script>
  let { current = 0, total = 35 } = $props();

  let percentage = $derived(
    Math.min(100, Math.max(0, Math.round((current / total) * 100)))
  );
</script>

<div
  class="w-full select-none"
  role="progressbar"
  aria-label="Kemajuan pengerjaan tes kepribadian"
  aria-valuenow={percentage}
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuetext="{percentage}% selesai"
>
  <div class="flex items-center justify-between text-xs font-semibold text-[#5A6D5C] dark:text-[#9FB19E] mb-2">
    <span>Soal {Math.min(current + 1, total)} dari {total}</span>
    <span class="text-[#203123] dark:text-[#EAEF9D] font-bold font-mono">{percentage}% selesai</span>
  </div>

  <div class="w-full h-2.5 bg-[#E6E5D1] dark:bg-[#1A261D] rounded-full overflow-hidden p-0.5 border border-[#D5D4BE] dark:border-[#2C3B2E]">
    <div
      class="h-full rounded-full bg-gradient-to-r from-[#B4C56E] via-[#EAEF9D] to-[#8C9F85] transition-all duration-500 ease-out"
      style="width: {percentage}%;"
    ></div>
  </div>
</div>
