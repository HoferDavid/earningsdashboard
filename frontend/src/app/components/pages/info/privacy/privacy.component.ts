import { Component } from '@angular/core';
import { PagesHeaderComponent } from '../../../common/pages-header/pages-header.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [PagesHeaderComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {

  pageTitle = 'Datenschutzhinweise';

}
