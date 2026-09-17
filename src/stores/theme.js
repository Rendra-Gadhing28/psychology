import { writable } from 'svelte/store';

function createThemeStore() {
  const isBrowser = typeof window !== 'undefined';
  
  let initialTheme = 'light';
  if (isBrowser) {
    const saved = localStorage.getItem('psychology-theme');
    if (saved === 'dark' || saved === 'light') {
      initialTheme = saved;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      initialTheme = 'dark';
    }
  }

  const { subscribe, set, update } = writable(initialTheme);

  function applyTheme(theme) {
    if (!isBrowser) return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('psychology-theme', theme);
  }

  // Apply immediately on initialization
  if (isBrowser) {
    applyTheme(initialTheme);
  }

  return {
    subscribe,
    set: (theme) => {
      applyTheme(theme);
      set(theme);
    },
    toggle: () => {
      update((curr) => {
        const next = curr === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        return next;
      });
    },
    init: () => {
      if (!isBrowser) return;
      const saved = localStorage.getItem('psychology-theme');
      let t = saved;
      if (!t) {
        t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      applyTheme(t);
      set(t);
    }
  };
}

export const theme = createThemeStore();
