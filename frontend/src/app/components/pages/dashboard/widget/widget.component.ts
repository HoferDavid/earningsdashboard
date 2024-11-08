import { Component, input, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { WidgetOptionsComponent } from './widget-options/widget-options.component';
import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { Widget } from '../../../../interfaces/dashboard';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [
    NgComponentOutlet,
    MatButtonModule,
    MatIconModule,
    WidgetOptionsComponent,
    MatIcon,
    CdkDrag,
    CdkDragPlaceholder,
  ],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
  host: {
    '[style.grid-area]':
      '"span " + (data().rows ?? 1) + "/ span " + (data().columns ?? 1)',
  },
})
export class WidgetComponent {
  data = input.required<Widget>();

  showOptions = signal(false);
}
