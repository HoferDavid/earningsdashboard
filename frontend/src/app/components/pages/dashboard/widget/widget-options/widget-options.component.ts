import { Component, inject, input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Widget } from '../../../../../interfaces/dashboard';
import { DashboardService } from '../../../../../services/dashboard.service';

@Component({
  selector: 'app-widget-options',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatButtonToggleModule, MatIcon],
  templateUrl: './widget-options.component.html',
  styleUrl: './widget-options.component.scss',
})
export class WidgetOptionsComponent {
  data = input.required<Widget>();

  showOptions = model<boolean>(false);

  store = inject(DashboardService);
}
