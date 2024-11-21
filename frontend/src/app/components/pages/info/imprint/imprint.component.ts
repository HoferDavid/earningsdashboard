import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PagesHeaderComponent } from "../../../common/pages-header/pages-header.component";

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [RouterModule, PagesHeaderComponent],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {

  pageTitle = 'Imprint';

  mail = 'info@davidhofer.com';
  phone = '+39 3408959151';

}
