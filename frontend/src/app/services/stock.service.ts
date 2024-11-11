// stock.service.ts
import { Injectable, signal } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { StockData } from '../interfaces/stock-data';

@Injectable({ providedIn: 'root' })
export class StockService {
  private stockDataSignal = signal<StockData | null>(null);

  constructor(private firestoreService: FirestoreService) {}

  loadStockData(ticker: string) {
    this.firestoreService.getStockDetails(ticker).subscribe(data => {
      this.stockDataSignal.set(data);
    });
  }

  stockData() {
    return this.stockDataSignal();
  }
}
