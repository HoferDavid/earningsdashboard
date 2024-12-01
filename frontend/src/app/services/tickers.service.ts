import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TickersService {

  private magsevenTickers = signal<string[]>(['AAPL', 'AMZN', 'GOOG', 'META', 'MSFT', 'NVDA', 'TSLA']);

  getTickers() {
    return this.magsevenTickers;
  }

  constructor() { }
}
