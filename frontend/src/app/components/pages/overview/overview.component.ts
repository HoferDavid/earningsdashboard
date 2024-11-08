import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { OverviewHeaderComponent } from "./overview-header/overview-header.component";
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../../services/firestore.service';
import { Observable } from 'rxjs';
import { BasicWidgetComponent } from '../../widgets/basic-widget/basic-widget.component';
import { BasicWidget } from '../../../interfaces/basic-widget';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule, MatMenuModule, OverviewHeaderComponent, BasicWidgetComponent, CommonModule ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {

  firestoreService = inject(FirestoreService);
  
  stocks$: Observable<BasicWidget[]> = this.firestoreService.getStocks();
}
