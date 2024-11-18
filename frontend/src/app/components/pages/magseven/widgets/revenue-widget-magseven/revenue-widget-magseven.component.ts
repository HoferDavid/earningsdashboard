import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { StockService } from '../../../../../services/stock.service';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs'; // Neuere Methode für Observables

@Component({
  selector: 'app-revenue-widget-magseven',
  standalone: true,
  imports: [],
  templateUrl: './revenue-widget-magseven.component.html',
  styleUrl: './revenue-widget-magseven.component.scss',
})
export class RevenueWidgetMagsevenComponent {

  tickers: string[] = ['AAPL', 'AMZN', 'GOOG', 'META', 'MSFT', 'NVDA', 'TSLA'];
  @ViewChild('chart', { static: true }) chart!: ElementRef<HTMLCanvasElement>;
  private stockService = inject(StockService);
  private chartInstance: Chart | null = null;

  async ngOnInit(): Promise<void> {
    await this.loadAllStockData();
  }

  async loadAllStockData(): Promise<void> {
    const chartData: { labels: string[]; datasets: any[] } = { labels: [], datasets: [] };
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#66FF66'];

    // Alle Requests gleichzeitig ausführen
    const requests = this.tickers.map(async (ticker, index) => {
      try {
        const stockData = await firstValueFrom(this.stockService.firestoreService.getStockDetails(ticker));
        
        if (stockData && stockData.revenue && stockData.quarter) {
          const last12Quarters = stockData.quarter.slice(-4);
          const revenues = stockData.revenue
            .slice(-4)
            .map((rev) => (typeof rev === 'string' ? parseFloat(rev.replace(',', '.')) : rev));

          // Labels setzen (nur einmal, da sie für alle Aktien gleich sind)
          if (index === 0) {
            chartData.labels = last12Quarters;
          }

          // Dataset hinzufügen
          chartData.datasets.push({
            label: `${stockData.name} (${ticker})`,
            data: revenues,
            backgroundColor: colors[index % colors.length],
          });
        }
      } catch (error) {
        console.error(`Fehler beim Laden der Daten für ${ticker}:`, error);
      }
    });

    // Warten, bis alle Daten geladen sind
    await Promise.all(requests);

    // Chart rendern
    this.renderChart(chartData);
  }

  renderChart(data: { labels: string[]; datasets: any[] }): void {
    const scaleColor = getComputedStyle(document.documentElement).getPropertyValue('--scale-color').trim();

    // Vorherige Chart-Instanz zerstören, falls vorhanden
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    // Neue Chart-Instanz erstellen
    this.chartInstance = new Chart(this.chart.nativeElement, {
      type: 'bar',
      data: data,
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Revenue last 12 quarters',
            color: scaleColor,
          },
          legend: {
            labels: {
              color: scaleColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: scaleColor,
              maxRotation: 45,
            },
          },
          y: {
            ticks: {
              color: scaleColor,
            },
          },
        },
      },
    });
  }
}
