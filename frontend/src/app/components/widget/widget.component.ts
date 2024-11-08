import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss'
})
export class WidgetComponent {

  @Input() width: string = '200px';
}
