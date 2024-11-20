import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../../services/favorites.service';
import { FirestoreService } from '../../../services/firestore.service';
import { BasicWidget } from '../../../interfaces/basic-widget';
import { BasicWidgetComponent } from '../../widgets/basic-widget/basic-widget.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, BasicWidgetComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favoritesService = inject(FavoritesService);
  firestoreService = inject(FirestoreService);

  // Computed Signal: Holt alle Favoriten-Daten aus Firestore
  widgets = computed<BasicWidget[]>(() => {
    const favoriteTickers = this.favoritesService.favorites(); // Liste der Favoriten-Ticker
    const allStocks = this.firestoreService.getStocksSnapshot(); // Holt den aktuellen Snapshot aller Aktien
    return allStocks.filter(stock => favoriteTickers.includes(stock.ticker));
  });
}
