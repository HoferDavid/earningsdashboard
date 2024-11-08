import { Injectable } from '@angular/core';
import { StockData } from '../interfaces/stock-data';
import { RevenueWidget } from '../interfaces/revenue-widget';

@Injectable({
  providedIn: 'root'
})
export class DataProcessingService {
  processRevenueData(stockData: StockData): RevenueWidget {
    return {
      name: stockData.name,
      ticker: stockData.id,
      logo: `/logos/${stockData.name.toLowerCase()}.png`,
      lastRevenue: stockData.revenue[stockData.revenue.length - 1],
      lastQuarter: stockData.quarter[stockData.quarter.length - 1],
      revenueData: stockData.revenue.map((value, index) => ({
        date: stockData.quarter[index],
        value: value
      })).slice(-12) // Last 12 months
    };
  }
}