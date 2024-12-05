import { Component, computed, inject, Input, Signal } from '@angular/core';
import { FirestoreService } from '../../../../../services/firestore.service';
import { map, Observable } from 'rxjs';
import { BasicWidget } from '../../../../../interfaces/basic-widget';
import { BasicWidgetComponent } from '../../../../widgets/basic-widget/basic-widget.component';
import { CommonModule } from '@angular/common';
import { TickersService } from '../../../../../services/tickers.service';

@Component({
  selector: 'app-basic-widget-favorites',
  standalone: true,
  imports: [BasicWidgetComponent, CommonModule],
  templateUrl: './basic-widget-favorites.component.html',
  styleUrl: './basic-widget-favorites.component.scss',
})
export class BasicWidgetFavoritesComponent {
  
  firestoreService = inject(FirestoreService);
  magsevenTickers = inject(TickersService);
  tickers = this.magsevenTickers.getMagsevenTickers();
  stocks$: Observable<BasicWidget[]> = this.firestoreService.getStocks();

  @Input({ required: true }) filteredFavorites!: Signal<BasicWidget[]>;

  tickerList = computed(() => {
    return this.stocks$.pipe(
      map((stocks) =>
        stocks.filter((stock) => this.tickers().includes(stock.ticker))
      )
    );
  });
}
