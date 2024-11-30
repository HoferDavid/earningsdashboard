import { Component, inject } from '@angular/core';
import { StockService } from '../../../../services/stock.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../../../services/favorites.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-board-header',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.scss'
})
export class BoardHeaderComponent {

  stockService = inject(StockService);
  favoritesService = inject(FavoritesService);

  
  // Get current Ticker
  get ticker(): string | null {
    const stock = this.stockService.stockData();
    return stock ? stock.ticker : null;
  }


  // Check if Dtock is a Favorit
  isFavorite(): boolean {
    return this.ticker ? this.favoritesService.isFavorite(this.ticker) : false;
  }


  // Toggle Favorite Status
  toggleFavorite(): void {
    if (this.ticker) {
      if (this.isFavorite()) {
        this.favoritesService.removeFavorite(this.ticker);
      } else {
        this.favoritesService.addFavorite(this.ticker);
      }
    }
  }
}
