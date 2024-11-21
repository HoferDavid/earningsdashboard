import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pages-header',
  standalone: true,
  imports: [],
  templateUrl: './pages-header.component.html',
  styleUrl: './pages-header.component.scss'
})
export class PagesHeaderComponent {

  @Input() title: string = '';

}
