import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  collapsed: WritableSignal<boolean> = signal(true);

  toggle(): void {
    this.collapsed.set(!this.collapsed());
  }

  get sidenavWidth(): string {
    return this.collapsed() ? '64px' : '160px';
  }

  get profilPicWidth(): string {
    return this.collapsed() ? '32px' : '80px';
  }
}
