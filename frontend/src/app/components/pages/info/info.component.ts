import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PagesHeaderComponent } from "../../common/pages-header/pages-header.component";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PagesHeaderComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {

  pageTitle = 'Info';

  constructor(private router: Router) {}

  isImprintActive(): boolean {
    return this.router.url.includes('/info/imprint');
  }

  isDgActive(): boolean {
    return this.router.url.includes('/info/doppelgaenger');
  }

  isDisclaimerActive(): boolean {
    return this.router.url.includes('/info/disclaimer');
  }

  isPrivacyActive(): boolean {
    return this.router.url.includes('/info/privacy');
  }
}
