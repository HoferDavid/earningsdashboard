import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { wrapGrid } from 'animate-css-grid';
import { CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { WidgetComponent } from './widget/widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ WidgetComponent, MatButtonModule, MatIconModule, MatMenuModule, CdkDropList, CdkDropListGroup, DashboardHeaderComponent ],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {

  store = inject(DashboardService);


  dashboard = viewChild.required<ElementRef>('dashboard');


  clearAnimations = () => {};


  ngOnInit(): void {
    const { unwrapGrid } = wrapGrid(this.dashboard().nativeElement, {
      duration: 300,
    });
    this.clearAnimations = unwrapGrid;
  }


  ngOnDestroy(): void {
    this.clearAnimations();
  }

  
  drop(event: CdkDragDrop<number, any>) {
    const {
      previousContainer,
      container,
      item: { data },
    } = event;

    if (data) {
      this.store.insertWidgetAtPosition(data, container.data);
      return;
    }

    this.store.updateWidgetPosition(previousContainer.data, container.data);
  }
}