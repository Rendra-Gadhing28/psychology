import { writable, derived, get } from 'svelte/store';
import { QUESTIONS } from '../lib/questions.js';

const STORAGE_KEY = 'psychology_quiz_state';

function loadSavedState() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState() {
  if (typeof window === 'undefined') return;
  try {
    const data = {
      answers: get(answers),
      currentIndex: get(currentIndex),
      startTime: get(startTime),
      endTime: get(endTime)
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors
  }
}

const saved = loadSavedState();

export const answers = writable(saved?.answers || []);
export const currentIndex = writable(saved?.currentIndex || 0);
export const startTime = writable(saved?.startTime || null);
export const endTime = writable(saved?.endTime || null);
export const showChapterModal = writable(false);

export const currentQuestion = derived(currentIndex, ($idx) => {
  return QUESTIONS[$idx] || QUESTIONS[0];
});

export const progressPercentage = derived(
  [currentIndex, answers],
  ([$idx, $ans]) => {
    return Math.round((Math.max($idx, $ans.length) / QUESTIONS.length) * 100);
  }
);

export function recordAnswer(questionId, value) {
  answers.update((items) => {
    const idx = items.findIndex((a) => a.questionId === questionId);
    let updated;
    if (idx >= 0) {
      updated = [...items];
      updated[idx] = { questionId, value };
    } else {
      updated = [...items, { questionId, value }];
    }
    return updated;
  });
  saveState();
}

export function updateCurrentIndex(idx) {
  currentIndex.set(idx);
  saveState();
}

export function resetQuiz() {
  answers.set([]);
  currentIndex.set(0);
  startTime.set(Date.now());
  endTime.set(null);
  showChapterModal.set(false);
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
}

export function saveQuizProgress() {
  saveState();
}

export function formatDuration(ms) {
  if (!ms || ms <= 0) return "3 menit 30 detik";
  const totalSec = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  if (minutes === 0) {
    return `${seconds} detik`;
  }
  return `${minutes} menit ${seconds} detik`;
}
