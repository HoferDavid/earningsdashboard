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
    return this.collapsed() ? '0px' : '200px';
  }

  get imgWidth(): string {
    return this.collapsed() ? '0px' : '80px';
  }
}
