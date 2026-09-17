<script>
  import Icon from './Icon.svelte';

  let { result, resultData, template = 'ketupat-ivory', cardRef = $bindable(null) } = $props();

  const themeConfig = $derived({
    'ketupat-ivory': {
      cardBg: '#FAF8F0',
      gradientBg: '#FAF8F0',
      textColor: '#18241A',
      accentColor: '#243727',
      highlightColor: '#EAEF9D',
      badgeBg: '#EAEF9D',
      badgeBorder: '#CCD77E',
      badgeText: '#18251B',
      barBg: '#E5E4CF',
      barFill: 'linear-gradient(90deg, #7C9246, #CCD77E)',
      subtext: '#586A57',
      divider: '#E0DFCA'
    },
    'forest-heritage': {
      cardBg: '#18261C',
      gradientBg: 'linear-gradient(160deg, #131E16 0%, #1F2F23 60%, #16241A 100%)',
      textColor: '#F5F8F1',
      accentColor: '#EAEF9D',
      highlightColor: '#EAEF9D',
      badgeBg: 'rgba(234, 239, 157, 0.15)',
      badgeBorder: 'rgba(234, 239, 157, 0.35)',
      badgeText: '#EAEF9D',
      barBg: 'rgba(255, 255, 255, 0.12)',
      barFill: 'linear-gradient(90deg, #ADC060, #EAEF9D)',
      subtext: '#B0C2AE',
      divider: 'rgba(234, 239, 157, 0.2)'
    },
    'olive-noir': {
      cardBg: '#101712',
      gradientBg: 'linear-gradient(160deg, #0D140F 0%, #17221A 60%, #111A13 100%)',
      textColor: '#E8EFE5',
      accentColor: '#D8E285',
      highlightColor: '#D8E285',
      badgeBg: 'rgba(216, 226, 133, 0.12)',
      badgeBorder: 'rgba(216, 226, 133, 0.3)',
      badgeText: '#D8E285',
      barBg: 'rgba(255, 255, 255, 0.08)',
      barFill: 'linear-gradient(90deg, #6C8539, #D8E285)',
      subtext: '#93A490',
      divider: 'rgba(255, 255, 255, 0.1)'
    }
  }[template] || {
    cardBg: '#FAF8F0',
    gradientBg: '#FAF8F0',
    textColor: '#18241A',
    accentColor: '#243727',
    highlightColor: '#EAEF9D',
    badgeBg: '#EAEF9D',
    badgeBorder: '#CCD77E',
    badgeText: '#18251B',
    barBg: '#E5E4CF',
    barFill: 'linear-gradient(90deg, #7C9246, #CCD77E)',
    subtext: '#586A57',
    divider: '#E0DFCA'
  });
</script>

<!-- Outer 9:16 Canvas Wrapper: Collector's Character Monograph -->
<div
  bind:this={cardRef}
  class="relative w-[340px] sm:w-[360px] h-[600px] sm:h-[640px] rounded-[36px] p-7 sm:p-8 flex flex-col justify-between border shadow-2xl overflow-hidden select-none"
  style="background: {themeConfig.gradientBg}; color: {themeConfig.textColor}; border-color: {themeConfig.divider}; font-family: inherit;"
>
  <!-- Background Subtle Glow Orb -->
  <div
    class="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-3xl pointer-events-none opacity-30"
    style="background: {themeConfig.highlightColor};"
  ></div>

  <!-- Top Header: Monogram & Identity -->
  <div class="relative flex items-center justify-between w-full">
    <div class="flex items-center gap-2.5">
      <div class="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm" style="background: {themeConfig.badgeBg}; border: 1px solid {themeConfig.badgeBorder}; color: {themeConfig.accentColor};">
        <Icon name="brain" size={15} />
      </div>
      <div>
        <div class="text-[12px] font-bold tracking-[0.25em] uppercase">phsycology</div>
        <div class="text-[9px] uppercase tracking-[0.18em] font-medium" style="color: {themeConfig.subtext};">Old Money Assessment</div>
      </div>
    </div>

    <div class="px-3 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em]" style="background: {themeConfig.badgeBg}; color: {themeConfig.badgeText}; border: 1px solid {themeConfig.badgeBorder};">
      Authentic
    </div>
  </div>

  <!-- Center Section: MBTI Type & Icon Badge -->
  <div class="relative my-auto flex flex-col items-center text-center">
    <!-- Icon in Rounded Squircle -->
    <div
      class="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-sm"
      style="background: {themeConfig.badgeBg}; border: 1px solid {themeConfig.badgeBorder}; color: {themeConfig.accentColor};"
    >
      <Icon name={resultData.icon} size={26} strokeWidth={1.8} />
    </div>

    <!-- MBTI Type 4 Letters in Classical Garamond Serif -->
    <h3 class="font-serif-luxury text-[68px] sm:text-[76px] font-normal tracking-wide leading-none mb-1" style="color: {themeConfig.accentColor}; font-feature-settings: 'lnum' 1;">
      {result.type}
    </h3>

    <!-- Nickname in Instrument Serif Italic -->
    <div class="font-serif-instrument italic text-2xl sm:text-[28px] font-normal tracking-tight mb-1">
      {resultData.nickname}
    </div>

    <!-- Tagline -->
    <p class="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] max-w-[280px] leading-relaxed mb-5" style="color: {themeConfig.subtext};">
      {resultData.tagline}
    </p>

    <!-- Mini Trait Bars (EI, SN, TF, JP) -->
    <div class="w-full space-y-2 px-2">
      {#each Object.entries(result.percentages) as [dim, data]}
        <div class="flex items-center justify-between text-[11px] font-medium">
          <div class="flex items-center gap-1.5">
            <span style="color: {themeConfig.accentColor};">{data.label}</span>
          </div>
          <div class="w-28 h-1.5 rounded-full overflow-hidden" style="background: {themeConfig.barBg};">
            <div class="h-full rounded-full" style="width: {data.percentage}%; background: {themeConfig.barFill};"></div>
          </div>
          <span style="color: {themeConfig.subtext}; font-family: monospace; font-size: 10px;">{data.percentage}%</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Bottom: Strengths Pills & Watermark -->
  <div class="relative pt-3.5" style="border-top: 1px solid {themeConfig.divider};">
    <div class="flex flex-wrap items-center justify-center gap-1.5 mb-2.5">
      {#each resultData.strengths.slice(0, 2) as str}
        <span
          class="px-2.5 py-0.5 rounded-lg text-[10px] font-medium"
          style="background: {themeConfig.badgeBg}; color: {themeConfig.badgeText}; border: 1px solid {themeConfig.badgeBorder};"
        >
          {str}
        </span>
      {/each}
    </div>

    <div class="flex items-center justify-between text-[10px] font-normal" style="color: {themeConfig.subtext};">
      <span>Populasi: {resultData.population}%</span>
      <span class="tracking-[0.18em] uppercase text-[9px] font-medium">phsycology.id</span>
    </div>
  </div>
</div>
