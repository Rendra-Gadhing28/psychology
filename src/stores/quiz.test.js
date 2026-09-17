import '../test-setup.js';
import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { answers, recordAnswer, resetQuiz, formatDuration } from './quiz.js';
import { sound } from './sound.js';

describe('Quiz & Sound Stores', () => {
  beforeEach(() => {
    resetQuiz();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('harus mencatat dan memperbarui jawaban quiz', () => {
    expect(get(answers).length).toBe(0);

    recordAnswer(1, 5);
    expect(get(answers)).toEqual([{ questionId: 1, value: 5 }]);

    // Update same question
    recordAnswer(1, 2);
    expect(get(answers)).toEqual([{ questionId: 1, value: 2 }]);

    // Add another question
    recordAnswer(2, 4);
    expect(get(answers).length).toBe(2);

    const stored = JSON.parse(sessionStorage.getItem('phsycology_quiz_state'));
    expect(stored.answers.length).toBe(2);
    expect(stored.answers[0]).toEqual({ questionId: 1, value: 2 });
  });

  it('harus mereset quiz dengan bersih', () => {
    recordAnswer(1, 4);
    recordAnswer(2, 5);
    expect(get(answers).length).toBe(2);

    resetQuiz();
    expect(get(answers).length).toBe(0);
  });

  it('formatDuration harus menghasilkan teks durasi bahasa Indonesia yang ramah', () => {
    expect(formatDuration(45000)).toBe('45 detik');
    expect(formatDuration(135000)).toBe('2 menit 15 detik');
    expect(formatDuration(0)).toBe('3 menit 30 detik');
  });

  it('sound toggle harus bekerja dan menyimpan ke localStorage', () => {
    sound.set(true);
    expect(get(sound)).toBe(true);

    sound.toggle();
    expect(get(sound)).toBe(false);
    expect(localStorage.getItem('phsycology-sound')).toBe('false');

    sound.toggle();
    expect(get(sound)).toBe(true);
    expect(localStorage.getItem('phsycology-sound')).toBe('true');
  });
});
