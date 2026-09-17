<script>
  import { onMount } from 'svelte';
  import {
    answers,
    currentIndex,
    recordAnswer,
    updateCurrentIndex,
    endTime,
    startTime
  } from '../stores/quiz.js';
  import { QUESTIONS, CHAPTERS } from '../lib/questions.js';
  import { playDing, playClick } from '../lib/sounds.js';
  import ProgressBar from './ProgressBar.svelte';
  import ChapterDivider from './ChapterDivider.svelte';
  import LikertScale from './LikertScale.svelte';
  import Icon from './Icon.svelte';

  let { onFinish } = $props();

  let seenChapters = $state(new Set());
  let showingChapter = $state(true);
  let isNavigating = $state(false);

  // Touch gesture state
  let touchStartX = 0;
  let touchStartY = 0;

  const currentQ = $derived(QUESTIONS[$currentIndex] || QUESTIONS[0]);
  const currentAnswer = $derived(
    $answers.find((a) => a.questionId === currentQ.id)?.value ?? null
  );

  const activeChapterObj = $derived(CHAPTERS[currentQ.chapter] || CHAPTERS[0]);

  // Check if we need to show chapter divider for current question
  $effect(() => {
    const chapterId = currentQ.chapter;
    if (!seenChapters.has(chapterId)) {
      showingChapter = true;
    }
  });

  function handleContinueChapter() {
    seenChapters.add(currentQ.chapter);
    seenChapters = new Set(seenChapters);
    showingChapter = false;
  }

  function handleSelectLikert(val) {
    recordAnswer(currentQ.id, val);

    if (isNavigating) return;
    isNavigating = true;

    setTimeout(() => {
      if ($currentIndex < QUESTIONS.length - 1) {
        updateCurrentIndex($currentIndex + 1);
        isNavigating = false;
      } else {
        // Last question answered
        endTime.set(Date.now());
        playDing();
        onFinish();
      }
    }, 420);
  }

  function handlePrev() {
    if ($currentIndex > 0) {
      playClick();
      updateCurrentIndex($currentIndex - 1);
    }
  }

  function handleNext() {
    if (currentAnswer !== null && $currentIndex < QUESTIONS.length - 1) {
      playClick();
      updateCurrentIndex($currentIndex + 1);
    }
  }

  // Keyboard navigation shortcuts
  function handleWindowKeydown(e) {
    if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

    if (showingChapter) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleContinueChapter();
      }
      return;
    }

    if (['1', '2', '3', '4', '5'].includes(e.key)) {
      e.preventDefault();
      handleSelectLikert(parseInt(e.key, 10));
    } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
      if (currentAnswer !== null) {
        e.preventDefault();
        handleNext();
      }
    }
  }

  // Swipe gesture handlers
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchEnd(e) {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 60) {
      if (deltaX < 0) {
        if (currentAnswer !== null) handleNext();
      } else {
        handlePrev();
      }
    }
  }

  onMount(() => {
    if (!$startTime) {
      startTime.set(Date.now());
    }
    window.addEventListener('keydown', handleWindowKeydown);
    return () => {
      window.removeEventListener('keydown', handleWindowKeydown);
    };
  });
</script>

<div
  role="region"
  aria-label="Area Kuis MBTI"
  class="min-h-screen flex flex-col justify-between px-4 py-6 sm:p-8 max-w-3xl mx-auto select-none"
  ontouchstart={handleTouchStart}
  ontouchend={handleTouchEnd}
>
  {#if showingChapter}
    <ChapterDivider
      chapter={activeChapterObj}
      onContinue={handleContinueChapter}
    />
  {:else}
    <!-- Top Bar: Progress -->
    <header class="w-full pt-8 sm:pt-4 pb-6">
      <div class="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] font-medium text-[#465948] dark:text-[#EAEF9D] mb-2.5">
        <span class="inline-flex items-center gap-1.5">
          <Icon name={activeChapterObj.icon} size={13} />
          <span>Bagian {activeChapterObj.id + 1}: {activeChapterObj.title}</span>
        </span>
      </div>
      <ProgressBar current={$currentIndex} total={QUESTIONS.length} />
    </header>

    <!-- Center: Main Question Card -->
    <main class="my-auto py-8 sm:py-12 flex flex-col items-center text-center">
      <!-- Question Number Badge -->
      <span class="inline-block px-3.5 py-1 rounded-full bg-[#EAEF9D]/50 dark:bg-[#EAEF9D]/15 border border-[#CCD77E] dark:border-[#EAEF9D]/30 text-[#1E2B20] dark:text-[#EAEF9D] text-[11px] font-semibold tracking-[0.2em] mb-6 shadow-sm">
        SOAL {$currentIndex + 1} DARI {QUESTIONS.length}
      </span>

      <!-- Question Text: Cinematic Literary Serif with Watermark Quote -->
      <div class="relative max-w-xl mx-auto mb-10 px-2">
        <span class="font-serif-instrument italic absolute -top-8 -left-3 text-7xl text-[#CCD77E]/30 dark:text-[#EAEF9D]/15 select-none pointer-events-none" aria-hidden="true">“</span>
        <h2 class="font-serif-luxury text-2xl sm:text-3xl md:text-[34px] font-normal text-[#16241A] dark:text-[#F4F7EE] leading-[1.35] tracking-tight relative z-10">
          {currentQ.text}
        </h2>
      </div>

      <!-- Likert Scale -->
      <div class="w-full">
        <LikertScale
          selectedValue={currentAnswer}
          onSelect={handleSelectLikert}
        />
      </div>

      <!-- Desktop Keyboard Shortcut Hint -->
      <div class="hidden sm:flex items-center justify-center gap-2 mt-6 text-[11px] text-[#5A6D59] dark:text-[#9FB29D]">
        <span>Pintasan keyboard:</span>
        <kbd class="px-1.5 py-0.5 rounded bg-[#EBEAD3] dark:bg-[#1E2C20] border border-[#D5D4BC] dark:border-[#2E3E30] font-mono text-[10px] text-[#1E2B20] dark:text-[#EAEF9D]">1</kbd>
        <span>-</span>
        <kbd class="px-1.5 py-0.5 rounded bg-[#EBEAD3] dark:bg-[#1E2C20] border border-[#D5D4BC] dark:border-[#2E3E30] font-mono text-[10px] text-[#1E2B20] dark:text-[#EAEF9D]">5</kbd>
        <span class="ml-1">pilih opsi</span>
        <span class="mx-1">•</span>
        <kbd class="px-1.5 py-0.5 rounded bg-[#EBEAD3] dark:bg-[#1E2C20] border border-[#D5D4BC] dark:border-[#2E3E30] font-mono text-[10px] text-[#1E2B20] dark:text-[#EAEF9D]">←</kbd>
        <kbd class="px-1.5 py-0.5 rounded bg-[#EBEAD3] dark:bg-[#1E2C20] border border-[#D5D4BC] dark:border-[#2E3E30] font-mono text-[10px] text-[#1E2B20] dark:text-[#EAEF9D]">→</kbd>
        <span>navigasi</span>
      </div>
    </main>

    <!-- Bottom Navigation Bar -->
    <footer class="w-full pt-4 pb-safe flex items-center justify-between border-t border-[#DDDDC6] dark:border-[#28372A]">
      <div>
        {#if $currentIndex > 0}
          <button
            type="button"
            onclick={handlePrev}
            class="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-[#D5D4BC] dark:border-[#2E3E30] text-[#223326] dark:text-[#E8EFE5] hover:bg-[#FAF9F3] dark:hover:bg-[#1A261D] text-xs sm:text-sm font-medium transition-all shadow-sm"
          >
            <Icon name="arrow-left" size={15} />
            <span>Sebelumnya</span>
          </button>
        {/if}
      </div>

      <div class="text-[11px] text-[#5E715C] dark:text-[#95A893] hidden sm:block tracking-wide">
        Tersimpan otomatis di sesi browser Anda
      </div>

      <div>
        {#if currentAnswer !== null && $currentIndex < QUESTIONS.length - 1}
          <button
            type="button"
            onclick={handleNext}
            class="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 rounded-xl bg-[#223326] hover:bg-[#19271E] dark:bg-[#EAEF9D] dark:hover:bg-[#DFE784] text-[#FAF9F3] dark:text-[#18241B] text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <span>Selanjutnya</span>
            <Icon name="arrow-right" size={15} class="text-[#EAEF9D] dark:text-[#18241B]" />
          </button>
        {/if}
      </div>
    </footer>
  {/if}
</div>
