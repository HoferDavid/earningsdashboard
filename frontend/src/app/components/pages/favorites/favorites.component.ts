import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { FavoritesService } from '../../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { BasicWidgetComponent } from '../../widgets/basic-widget/basic-widget.component';
import { StockService } from '../../../services/stock.service';
import { BasicWidget } from '../../../interfaces/basic-widget';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, BasicWidgetComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  widgets: Signal<BasicWidget[]>; // Angular Signal, um die Daten reaktiv zu verwalten

  constructor(private stockService: StockService) {
    // Initialisierung des Signals
    this.widgets = this.stockService.getBasicWidgets();
  }

  ngOnInit(): void {
    // Keine zusätzlichen Aktionen erforderlich, da das Signal die Daten aktualisiert
  }
}
