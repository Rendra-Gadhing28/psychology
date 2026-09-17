import { writable } from 'svelte/store';

function createSoundStore() {
  const isBrowser = typeof window !== 'undefined';
  let initial = true;

  if (isBrowser) {
    const saved = localStorage.getItem('phsycology-sound');
    if (saved !== null) {
      initial = saved === 'true';
    }
  }

  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,
    set: (val) => {
      if (isBrowser) {
        localStorage.setItem('phsycology-sound', String(val));
      }
      set(val);
    },
    toggle: () => {
      update((curr) => {
        const next = !curr;
        if (isBrowser) {
          localStorage.setItem('phsycology-sound', String(next));
        }
        return next;
      });
    }
  };
}

export const sound = createSoundStore();
