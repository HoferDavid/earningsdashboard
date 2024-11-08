import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../../widget/widget.component';
import { RevenueWidgetComponent } from "../../widgets/revenue-widget/revenue-widget.component";
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../../services/firestore.service';
import { DataProcessingService } from '../../../services/data-processing.service';
import { RevenueWidget } from '../../../interfaces/revenue-widget';
import { CommonModule } from '@angular/common';
import { BoardHeaderComponent } from './board-header/board-header.component';
import { BasicWidgetComponent } from "../../widgets/basic-widget/basic-widget.component";
import { StockData } from '../../../interfaces/stock-data';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardHeaderComponent],
  // imports: [WidgetComponent, RevenueWidgetComponent, CommonModule, BoardHeaderComponent, BasicWidgetComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  stockData$!: Observable<StockData>;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.stockData$ = this.route.params.pipe(
      switchMap(params => this.firestoreService.getStockDetails(params['ticker']))
    );
  }
}
