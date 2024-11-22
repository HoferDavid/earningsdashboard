import { Component } from '@angular/core';
import { PagesHeaderComponent } from '../../../common/pages-header/pages-header.component';

@Component({
  selector: 'app-disclaimer',
  standalone: true,
  imports: [PagesHeaderComponent],
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss'
})
export class DisclaimerComponent {

  pageTitle = 'Disclaimer';

}
