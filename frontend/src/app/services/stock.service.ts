import { computed, inject, Injectable, signal } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { StockData } from '../interfaces/stock-data';
import { QuarterlyRevenueData } from '../interfaces/quarterly-revenue-data';

@Injectable({ providedIn: 'root' })
export class StockService {

  private stockDataSignal = signal<StockData | null>(null);
  firestoreService = inject(FirestoreService);


  loadStockData(ticker: string) {
    this.stockDataSignal.set(null); // Zurücksetzen der Daten
    this.firestoreService.getStockDetails(ticker).subscribe({
      next: data => this.stockDataSignal.set(data),
      error: error => console.error('Fehler beim Laden der Aktie:', error)
    });
  }  

  
  stockData() {    
    return this.stockDataSignal();
  }


  last12Quarters = computed(() => {
    const data = this.stockDataSignal();
    
    console.log('Stock Data:', data);
  
    if (data && data.revenue && data.quarter) {
      console.log('Revenue:', data.revenue);
      console.log('Quarter:', data.quarter);
      console.log('Quarter:', data.netIncome);
      console.log('Quarter:', data.grossmargin);
      
      const quarters = data.quarter.slice(-12);
      const revenues = data.revenue.slice(-12).map((rev) => {
        if (typeof rev === 'string') {
          return parseFloat((rev as string).replace(',', '.'));
        } else if (typeof rev === 'number') {
          return rev;
        }
        return null;
      }).filter((rev): rev is number => rev !== null);
      
      return quarters.map((quarter, index) => ({
        quarter,
        revenue: revenues[index] ?? 0,
      }));
    }
    return [];
  });
}
