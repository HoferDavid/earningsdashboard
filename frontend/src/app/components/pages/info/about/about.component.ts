import { Component, computed } from '@angular/core';
import { PagesHeaderComponent } from '../../../common/pages-header/pages-header.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PagesHeaderComponent, MatButtonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {

  pageTitle = 'About';
  portfolioWebsiteUrl = 'https://davidhofer.com/';
  mail = 'info@davidhofer.com';
}
