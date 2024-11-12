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


  getLabelColor(): string {
    return this.lightMode() ? '#000000' : '#ffffff'; // Farbe für Light und Dark Mode
  }

  constructor() { }
}
