import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { StockService } from '../../../../../services/stock.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-revenue-widget-magseven',
  standalone: true,
  imports: [],
  templateUrl: './revenue-widget-magseven.component.html',
  styleUrl: './revenue-widget-magseven.component.scss',
})
export class RevenueWidgetMagsevenComponent {
  tickers: string[] = ['AAPL', 'AMZN', 'GOOG', 'META', 'MSFT', 'NVDA', 'TSLA'];
  @ViewChild('chart', { static: true }) chart!: ElementRef;
  private stockService = inject(StockService);

  ngOnInit(): void {
    // Daten für die 7 Aktien laden
    const chartData: { labels: string[]; datasets: any[] } = { labels: [], datasets: [] };
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#66FF66']; // Farben für jede Aktie

    // Alle Tickers durchlaufen und Revenue-Daten abrufen
    this.tickers.forEach((ticker, index) => {
      this.stockService.firestoreService.getStockDetails(ticker).subscribe((stockData) => {
        if (stockData.revenue && stockData.quarter) {
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
            backgroundColor: colors[index % colors.length], // Zyklische Farben verwenden
          });

          // Chart aktualisieren
          this.renderChart(chartData);
        }
      });
    });
  }

  renderChart(data: { labels: string[]; datasets: any[] }): void {
    const scaleColor = getComputedStyle(document.documentElement).getPropertyValue('--scale-color').trim();

    new Chart(this.chart.nativeElement, {
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
