import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  collapsed: WritableSignal<boolean> = signal(false);

  toggle(): void {
    this.collapsed.set(!this.collapsed());
  }

  get sidenavWidth(): string {
    return this.collapsed() ? '0px' : '160px';
  }

  get imgWidth(): string {
    return this.collapsed() ? '32px' : '80px';
  }
}
