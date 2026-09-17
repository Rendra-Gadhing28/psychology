<script>
  import { onMount } from 'svelte';
  import { theme } from './stores/theme.js';
  import { answers, resetQuiz } from './stores/quiz.js';
  import { QUESTIONS } from './lib/questions.js';
  import { calculateMBTI } from './lib/scoring.js';

  import ParallaxBg from './components/ParallaxBg.svelte';
  import CustomCursor from './components/CustomCursor.svelte';
  import DarkModeToggle from './components/DarkModeToggle.svelte';
  import SoundToggle from './components/SoundToggle.svelte';

  import Landing from './components/Landing.svelte';
  import IntroNarrative from './components/IntroNarrative.svelte';
  import Quiz from './components/Quiz.svelte';
  import Result from './components/Result.svelte';
  import ExplorePage from './components/ExplorePage.svelte';

  // Router State: 'landing' | 'intro' | 'quiz' | 'result' | 'explore'
  let currentState = $state('landing');
  let previousState = $state('landing');
  let mbtiResult = $state(null);

  // Sync dark mode class strictly
  $effect(() => {
    if (typeof document !== 'undefined') {
      if ($theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });

  function navigateTo(state, replace = false) {
    currentState = state;
    if (typeof window !== 'undefined') {
      const hash = state === 'landing' ? '' : `#${state}`;
      if (replace) {
        history.replaceState({ state }, '', hash || window.location.pathname);
      } else if (window.location.hash !== hash) {
        history.pushState({ state }, '', hash || window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleHashRoute() {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (['intro', 'quiz', 'result', 'explore'].includes(hash)) {
      if (hash === 'result') {
        if ($answers.length >= QUESTIONS.length) {
          mbtiResult = calculateMBTI($answers, QUESTIONS);
          currentState = 'result';
        } else {
          navigateTo('landing', true);
        }
      } else {
        currentState = hash;
      }
    } else {
      currentState = 'landing';
    }
  }

  onMount(() => {
    theme.init();
    handleHashRoute();

    window.addEventListener('popstate', handleHashRoute);
    window.addEventListener('hashchange', handleHashRoute);

    return () => {
      window.removeEventListener('popstate', handleHashRoute);
      window.removeEventListener('hashchange', handleHashRoute);
    };
  });

  function handleStartIntro() {
    navigateTo('intro');
  }

  function handleStartQuiz() {
    if ($answers.length === 0) {
      resetQuiz();
    }
    navigateTo('quiz');
  }

  function handleFinishQuiz() {
    mbtiResult = calculateMBTI($answers, QUESTIONS);
    navigateTo('result');
  }

  function handleOpenExplore() {
    previousState = currentState;
    navigateTo('explore');
  }

  function handleBackFromExplore() {
    const target = previousState === 'quiz' ? 'landing' : previousState;
    navigateTo(target);
  }

  function handleRestart() {
    resetQuiz();
    navigateTo('quiz', true);
  }
</script>

<ParallaxBg />
<CustomCursor />

<!-- Global Top Controls (Dark Mode & Sound) -->
<DarkModeToggle />
<SoundToggle />

<div class="relative z-10 w-full min-h-screen">
  {#if currentState === 'landing'}
    <Landing
      onStart={handleStartIntro}
      onExplore={handleOpenExplore}
    />
  {:else if currentState === 'intro'}
    <IntroNarrative
      onComplete={handleStartQuiz}
    />
  {:else if currentState === 'quiz'}
    <Quiz
      onFinish={handleFinishQuiz}
    />
  {:else if currentState === 'result' && mbtiResult}
    <Result
      result={mbtiResult}
      onRestart={handleRestart}
      onExplore={handleOpenExplore}
    />
  {:else if currentState === 'explore'}
    <ExplorePage
      onBack={handleBackFromExplore}
      onStartQuiz={handleStartQuiz}
    />
  {/if}
</div>
