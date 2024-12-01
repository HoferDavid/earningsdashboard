import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { StockService } from '../../../../../services/stock.service';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';
import { TickersService } from '../../../../../services/tickers.service';

@Component({
  selector: 'app-netincomettm-widget-magseven',
  standalone: true,
  imports: [],
  templateUrl: './netincomettm-widget-magseven.component.html',
  styleUrl: './netincomettm-widget-magseven.component.scss'
})
export class NetincomettmWidgetMagsevenComponent {

  @ViewChild('chart', { static: true }) chart!: ElementRef<HTMLCanvasElement>;
  private stockService = inject(StockService);
  private magsevenTickers = inject(TickersService);
  private chartInstance: Chart | null = null;


  tickers = this.magsevenTickers.getMagsevenTickers();
  colors = this.magsevenTickers.getMagsevenColors();


  async ngOnInit(): Promise<void> {
    await this.loadAllStockData();
  }


  async loadAllStockData(): Promise<void> {
    const chartData: { labels: string[]; datasets: any[] } = { labels: this.tickers(), datasets: [] };
  
    const requests = this.tickers().map(async (ticker, index) => {
      try {
        const stockData = await firstValueFrom(this.stockService.firestoreService.getStockDetails(ticker));
  
        if (stockData && stockData.netIncome) {
          const netincoms = stockData.netIncome.slice(-4).map((rev) =>
            typeof rev === 'string' ? parseFloat(rev.replace(',', '.')) : rev
          );
  
          const sum = netincoms.reduce((a, b) => a + b, 0);
  
          console.log('sum', sum);
  
          // Add Dataset
          chartData.datasets.push({
            label: `${ticker}`,
            data: this.tickers().map((t, i) => (i === index ? sum : null)), // Wert an der richtigen Position
            backgroundColor: this.colors()[index % this.colors().length],
            // barThickness: 'flex', // Flexible Balkenbreite
            // maxBarThickness: 40,  // Maximale Breite der Balken in Pixeln
            categoryPercentage: 0.5, // Platz für die Kategorie (zwischen 0 und 1)
            barPercentage: 8, 
          });
        }
      } catch (error) {
        console.error(`Error while loading data for ${ticker}:`, error);
      }
    });
  
    // Wait until all data is loaded
    await Promise.all(requests);
  
    // Render Chart
    this.renderChart(chartData);
  }


  renderChart(data: { labels: string[]; datasets: any[] }): void {
  
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  
    this.chartInstance = new Chart(this.chart.nativeElement, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: data.datasets
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Net income TTM',
            color: 'rgb(226 226 233)',
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'rgb(226 226 233)',
            },
          },
          y: {
            ticks: {
              color: 'rgb(226 226 233)',
            },
          },
        },
      },
    });
  }
}
