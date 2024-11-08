import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidenavService } from '../../../services/sidenav.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  sidenavService = inject(SidenavService);
  themeService = inject(ThemeService);


  get lightMode() {
    return this.themeService.lightMode();
  }


  toggleTheme() {
    this.themeService.toggleTheme();
  }


  toggleSidenav(): void {
    this.sidenavService.toggle();
  }
}
