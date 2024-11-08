import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  constructor(private router: Router) {}

  isImprintActive(): boolean {
    return this.router.url.includes('/info/imprint');
  }

}
