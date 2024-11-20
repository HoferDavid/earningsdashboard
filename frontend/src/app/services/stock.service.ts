import { computed, inject, Injectable, signal } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { StockData } from '../interfaces/stock-data';

@Injectable({ providedIn: 'root' })
export class StockService {
  
  basicWidgets() {
    throw new Error('Method not implemented.');
  }

  private stockDataSignal = signal<StockData | null>(null);
  firestoreService = inject(FirestoreService);


  loadStockData(ticker: string) {
    this.stockDataSignal.set(null); // Setback Data
    this.firestoreService.getStockDetails(ticker).subscribe({
      next: data => this.stockDataSignal.set(data),
      error: error => console.error('Fehler beim Laden der Aktie:', error)
    });
  }  

  
  stockData() {    
    return this.stockDataSignal();
  }


  revenueLast12Quarters = computed(() => {
    const data = this.stockDataSignal();
  
    if (data && data.revenue && data.quarter) {
      const quarters = data.quarter.slice(-12);
      const revenues = data.revenue.slice(-12).map((rev) => {
        if (typeof rev === 'string') {
          return parseFloat((rev as string).replace(',', '.'));
        } else if (typeof rev === 'number') {
          return rev;
        }
        return null;
      }).filter((rev): rev is number => rev !== null);
      
      return quarters.map((quarter, index) => ({ quarter, revenue: revenues[index] ?? 0 }));
    }
    return [];
  });


  grossmarginLast12Quarters = computed(() => {
    const data = this.stockDataSignal();
  
    if (data && data.revenue && data.quarter) {
      const quarters = data.quarter.slice(-12);
      const revenues = data.grossmargin.slice(-12).map((rev) => {
        if (typeof rev === 'string') {
          return parseFloat((rev as string).replace(',', '.'));
        } else if (typeof rev === 'number') {
          return rev;
        }
        return null;
      }).filter((rev): rev is number => rev !== null);
      
      return quarters.map((quarter, index) => ({ quarter, revenue: revenues[index] ?? 0 }));
    }
    return [];
  });


  netIncomeLast12Quarters = computed(() => {
    const data = this.stockDataSignal();
    
    console.log('Stock Data:', data);
  
    if (data && data.revenue && data.quarter) {
      console.log('quarter:', data.quarter);
      console.log('netIncome:', data.netIncome);
      
      const quarters = data.quarter.slice(-12);
      const revenues = data.netIncome.slice(-12).map((rev) => {
        if (typeof rev === 'string') {
          return parseFloat((rev as string).replace(',', '').replace('.', '') ) / 1000;
        } else if (typeof rev === 'number') {
          return rev / 1000;
        }
        return null;
      }).filter((rev): rev is number => rev !== null);
      
      return quarters.map((quarter, index) => ({ quarter, revenue: revenues[index] ?? 0 }));
    }
    return [];
  });
}

