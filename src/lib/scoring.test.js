import { describe, it, expect } from 'vitest';
import { calculateMBTI } from './scoring.js';
import { QUESTIONS, CHAPTERS } from './questions.js';
import { RESULTS } from './results.js';

describe('Data Verification', () => {
  it('harus memiliki 35 pertanyaan dengan struktur valid', () => {
    expect(QUESTIONS.length).toBe(35);

    const seenIds = new Set();
    for (const q of QUESTIONS) {
      expect(q.id).toBeDefined();
      expect(seenIds.has(q.id)).toBe(false);
      seenIds.add(q.id);

      expect([0, 1, 2, 3]).toContain(q.chapter);
      expect(['EI', 'SN', 'TF', 'JP']).toContain(q.dimension);
      expect(['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P']).toContain(q.polarity);
      expect(q.text.length).toBeGreaterThan(10);
    }
  });

  it('harus memiliki 4 chapter', () => {
    expect(CHAPTERS.length).toBe(4);
  });

  it('harus memiliki data 16 tipe MBTI lengkap tanpa cacat', () => {
    const requiredTypes = [
      'INTJ', 'INTP', 'ENTJ', 'ENTP',
      'INFJ', 'INFP', 'ENFJ', 'ENFP',
      'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
      'ISTP', 'ISFP', 'ESTP', 'ESFP'
    ];

    expect(Object.keys(RESULTS).length).toBe(16);

    for (const type of requiredTypes) {
      const data = RESULTS[type];
      expect(data).toBeDefined();
      expect(data.type).toBe(type);
      expect(data.nickname.length).toBeGreaterThan(3);
      expect(data.icon.length).toBeGreaterThan(1);
      expect(data.description.length).toBeGreaterThan(30);
      expect(data.strengths.length).toBeGreaterThanOrEqual(3);
      expect(data.challenges.length).toBeGreaterThanOrEqual(2);
      expect(data.compatibility.best.length).toBeGreaterThanOrEqual(2);
      expect(data.compatibility.challenge.length).toBeGreaterThanOrEqual(2);
      expect(data.celebrity.length).toBeGreaterThan(2);
      expect(data.funFact.length).toBeGreaterThan(10);
      expect(typeof data.population).toBe('number');
    }
  });
});

describe('Scoring Logic calculateMBTI', () => {
  it('harus menghasilkan INTJ jika diarahkan ke I, N, T, J', () => {
    const answers = QUESTIONS.map(q => {
      let value = 3;
      if (q.polarity === 'I' || q.polarity === 'N' || q.polarity === 'T' || q.polarity === 'J') {
        value = 5; // sangat setuju ke trait INTJ
      } else {
        value = 1; // sangat tidak setuju ke kebalikannya
      }
      return { questionId: q.id, value };
    });

    const res = calculateMBTI(answers, QUESTIONS);
    expect(res.type).toBe('INTJ');
    expect(res.percentages.EI.winner).toBe('I');
    expect(res.percentages.SN.winner).toBe('N');
    expect(res.percentages.TF.winner).toBe('T');
    expect(res.percentages.JP.winner).toBe('J');
  });

  it('harus menghasilkan ESFP jika diarahkan ke E, S, F, P', () => {
    const answers = QUESTIONS.map(q => {
      let value = 3;
      if (q.polarity === 'E' || q.polarity === 'S' || q.polarity === 'F' || q.polarity === 'P') {
        value = 5; // sangat setuju ke trait ESFP
      } else {
        value = 1;
      }
      return { questionId: q.id, value };
    });

    const res = calculateMBTI(answers, QUESTIONS);
    expect(res.type).toBe('ESFP');
    expect(res.percentages.EI.winner).toBe('E');
    expect(res.percentages.SN.winner).toBe('S');
    expect(res.percentages.TF.winner).toBe('F');
    expect(res.percentages.JP.winner).toBe('P');
  });

  it('harus menangani jawaban netral (semua 3) dengan aman', () => {
    const answers = QUESTIONS.map(q => ({ questionId: q.id, value: 3 }));
    const res = calculateMBTI(answers, QUESTIONS);
    expect(res.type.length).toBe(4);
    expect(res.percentages.EI.percentage).toBeGreaterThanOrEqual(50);
  });
});
