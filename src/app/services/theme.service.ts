import { Injectable, signal, effect } from '@angular/core';

export type AppTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<AppTheme>('light');

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('hanoi_smart_tourism_theme') as AppTheme | null;
      const initialTheme: AppTheme = savedTheme === 'dark' ? 'dark' : 'light';
      this.theme.set(initialTheme);
      this.applyTheme(initialTheme);
    }
  }

  toggleTheme(): void {
    const nextTheme: AppTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(nextTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hanoi_smart_tourism_theme', nextTheme);
      this.applyTheme(nextTheme);
    }
  }

  setTheme(theme: AppTheme): void {
    this.theme.set(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hanoi_smart_tourism_theme', theme);
      this.applyTheme(theme);
    }
  }

  private applyTheme(theme: AppTheme): void {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }
}
