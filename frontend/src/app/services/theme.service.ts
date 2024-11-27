import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  lightMode = signal(this.loadThemePreference());

  constructor() {
    this.applyTheme(this.lightMode());
  }

  toggleTheme() {
    this.lightMode.update(current => !current);
    this.applyTheme(this.lightMode());
    this.saveThemePreference(this.lightMode());
  }

  private saveThemePreference(isLightMode: boolean): void {
    localStorage.setItem('lightMode', JSON.stringify(isLightMode));
  }

  private loadThemePreference(): boolean {
    const savedPreference = localStorage.getItem('lightMode');
    return savedPreference ? JSON.parse(savedPreference) : false;
  }

  private applyTheme(isLightMode: boolean): void {
    document.documentElement.classList.toggle('light', isLightMode);
  }
}
