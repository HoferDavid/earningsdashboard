import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-board-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.scss'
})
export class BoardHeaderComponent {
  @Input() name: string = '';
  @Input() ticker: string = '';
  @Input() logo: string = '';
  @Input() url: string = '';
}
