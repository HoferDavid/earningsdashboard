import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../../services/favorites.service';
import { FirestoreService } from '../../../services/firestore.service';
import { BasicWidget } from '../../../interfaces/basic-widget';
import { BasicWidgetFavoritesComponent } from "./widgets/basic-widget-favorites/basic-widget-favorites.component";
import { Subscription } from 'rxjs';
import { PagesHeaderComponent } from "../../common/pages-header/pages-header.component";
import { GrossmarginWidgetFavoritesComponent } from "./widgets/grossmargin-widget-favorites/grossmargin-widget-favorites.component";
import { NetincomeWidgetFavoritesComponent } from "./widgets/netincome-widget-favorites/netincome-widget-favorites.component";
import { NetincomettmWidgetFavoritesComponent } from "./widgets/netincomettm-widget-favorites/netincomettm-widget-favorites.component";
import { RevenueBreakdownWidgetFavoritesComponent } from "./widgets/revenue-breakdown-widget-favorites/revenue-breakdown-widget-favorites.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, BasicWidgetFavoritesComponent, PagesHeaderComponent, GrossmarginWidgetFavoritesComponent, NetincomeWidgetFavoritesComponent, NetincomettmWidgetFavoritesComponent, RevenueBreakdownWidgetFavoritesComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {

  pageTitle = 'Favorites';

  favoritesService = inject(FavoritesService);
  firestoreService = inject(FirestoreService);
  favoriteTickers = this.favoritesService.favorites;
  filteredFavorites = signal<BasicWidget[]>([]);
  private subscriptions: Subscription = new Subscription();


  ngOnInit(): void {
    const sub = this.firestoreService.getStocks().subscribe((stocks) => {
      const tickers = this.favoriteTickers();
      const filtered = stocks.filter((stock) => tickers.includes(stock.ticker));
      this.filteredFavorites.set(filtered);
    });
    this.subscriptions.add(sub);
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
