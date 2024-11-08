import { Component, inject } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { DashboardService } from '../../../../../services/dashboard.service';

@Component({
  selector: 'app-widgets-panel',
  standalone: true,
  imports: [MatIconModule, MatIcon, CdkDrag, CdkDragPlaceholder],
  templateUrl: './widgets-panel.component.html',
  styleUrl: './widgets-panel.component.scss',
})
export class WidgetsPanelComponent {
  store = inject(DashboardService);
}
