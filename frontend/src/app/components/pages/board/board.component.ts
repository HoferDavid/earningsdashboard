import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { BoardHeaderComponent } from './board-header/board-header.component';
import { QuarterlyRevenueWidgetComponent } from '../../widgets/quarterly-revenue-widget/quarterly-revenue-widget.component';
import { CommonModule } from '@angular/common';
import { QuarterlyGrossmarginWidgetComponent } from '../../widgets/quarterly-grossmargin-widget/quarterly-grossmargin-widget.component';
import { QuarterlyNetincomeWidgetComponent } from '../../widgets/quarterly-netincome-widget/quarterly-netincome-widget.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardHeaderComponent, QuarterlyRevenueWidgetComponent, QuarterlyGrossmarginWidgetComponent, QuarterlyNetincomeWidgetComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public stockService = inject(StockService);
  stockData$ = signal(this.stockService.stockData());

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.stockService.loadStockData(params['ticker']);
    });
  }
}