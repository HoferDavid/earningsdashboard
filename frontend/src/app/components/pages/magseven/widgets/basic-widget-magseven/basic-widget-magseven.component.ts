import { Component, computed, inject } from '@angular/core';
import { FirestoreService } from '../../../../../services/firestore.service';
import { map, Observable } from 'rxjs';
import { BasicWidget } from '../../../../../interfaces/basic-widget';
import { BasicWidgetComponent } from '../../../../widgets/basic-widget/basic-widget.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-basic-widget-magseven',
  standalone: true,
  imports: [BasicWidgetComponent, CommonModule],
  templateUrl: './basic-widget-magseven.component.html',
  styleUrl: './basic-widget-magseven.component.scss'
})
export class BasicWidgetMagsevenComponent {

  firestoreService = inject(FirestoreService);
  tickers: string[] = ['AAPL', 'AMZN', 'GOOG', 'META', 'MSFT', 'NVDA', 'TSLA'];


  // Observable for all Stocks
  stocks$: Observable<BasicWidget[]> = this.firestoreService.getStocks();


  // Computed Signal for filtered Favorites
  filteredFavorites = computed(() => {
    return this.stocks$.pipe(map(stocks => stocks.filter(stock => this.tickers.includes(stock.ticker))));
  });
}
