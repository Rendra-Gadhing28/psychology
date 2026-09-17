import '../test-setup.js';
import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { theme } from './theme.js';

describe('Theme Store & Dark Mode Synchronization', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('harus dapat mengubah tema light ke dark dan sebaliknya', () => {
    theme.set('light');
    expect(get(theme)).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('psychology-theme')).toBe('light');

    theme.toggle();
    expect(get(theme)).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('psychology-theme')).toBe('dark');

    theme.toggle();
    expect(get(theme)).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('psychology-theme')).toBe('light');
  });

  it('harus memuat tema tersimpan dari localStorage saat init', () => {
    localStorage.setItem('psychology-theme', 'dark');
    theme.init();
    expect(get(theme)).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
