import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FavoritesService } from '../../../services/favorites.service';
import { FirestoreService } from '../../../services/firestore.service';
import { BasicWidget } from '../../../interfaces/basic-widget';
import { BasicWidgetComponent } from './../../widgets/basic-widget/basic-widget.component';
import { PagesHeaderComponent } from '../../common/pages-header/pages-header.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, BasicWidgetComponent, PagesHeaderComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {

  pageTitle = 'Favorites';

  favoritesService = inject(FavoritesService);
  firestoreService = inject(FirestoreService);

  // Signal for Favorites Ticker
  favoriteTickers = this.favoritesService.favorites;

  // Observable for all Stocks
  stocks$: Observable<BasicWidget[]> = this.firestoreService.getStocks();

  // Computed Signal for filtered Favorites
  filteredFavorites = computed(() => {
    const tickers = this.favoriteTickers();
    return this.stocks$.pipe(
      map(stocks => stocks.filter(stock => tickers.includes(stock.ticker)))
    );
  });
}