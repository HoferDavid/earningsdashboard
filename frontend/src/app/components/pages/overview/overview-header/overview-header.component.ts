import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-overview-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './overview-header.component.html',
  styleUrl: './overview-header.component.scss',
})
export class OverviewHeaderComponent {
}
