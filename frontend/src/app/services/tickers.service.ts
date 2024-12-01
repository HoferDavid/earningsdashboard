import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TickersService {

  private magsevenTickers = signal<string[]>(['AAPL', 'AMZN', 'GOOG', 'META', 'MSFT', 'NVDA', 'TSLA']);
  private magsevenColors = signal<string[]>(['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590']);


  getMagsevenTickers() {
    return this.magsevenTickers;
  }


  getMagsevenColors() {
    return this.magsevenColors;
  }

  constructor() { }
}
