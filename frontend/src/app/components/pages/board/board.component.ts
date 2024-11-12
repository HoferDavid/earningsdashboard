import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { BoardHeaderComponent } from './board-header/board-header.component';
import { QuarterlyRevenueWidgetComponent } from '../../widgets/quarterly-revenue-widget/quarterly-revenue-widget.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [BoardHeaderComponent, QuarterlyRevenueWidgetComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  private stockService = inject(StockService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const ticker = params['ticker'];
      this.stockService.loadStockData(ticker);
    });
  }
}