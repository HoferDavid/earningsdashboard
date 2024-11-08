import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  lightMode = signal(false);

  toggleTheme() {
    this.lightMode.update(current => !current);
    document.documentElement.classList.toggle('light', this.lightMode());
  }

  constructor() { }
}
