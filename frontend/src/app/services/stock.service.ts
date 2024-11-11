import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { StockData } from '../interfaces/stock-data';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stockData = signal<StockData | null>(null); // Signal für die Stock-Daten

  setStockData(data: StockData) {
    this.stockData.set(data); // Setzen der Daten im Signal
  }

  get stockData$() {
    return this.stockData; // Rückgabe des Signals
  }
}