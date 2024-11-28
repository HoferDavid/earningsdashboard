import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { StockService } from '../../../../../services/stock.service';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-grossmargin-widget-magseven',
  standalone: true,
  imports: [],
  templateUrl: './grossmargin-widget-magseven.component.html',
  styleUrl: './grossmargin-widget-magseven.component.scss'
})
export class GrossmarginWidgetMagsevenComponent {

  tickers: string[] = ['AAPL', 'AMZN', 'GOOG', 'META', 'MSFT', 'NVDA', 'TSLA'];
  colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
  @ViewChild('chart', { static: true }) chart!: ElementRef<HTMLCanvasElement>;
  private stockService = inject(StockService);
  private chartInstance: Chart | null = null;


  async ngOnInit(): Promise<void> {
    await this.loadAllStockData();
  }


  async loadAllStockData(): Promise<void> {
    const chartData: { labels: string[]; datasets: any[] } = { labels: [], datasets: [] };


    // All Requests together
    const requests = this.tickers.map(async (ticker, index) => {
      try {
        const stockData = await firstValueFrom(this.stockService.firestoreService.getStockDetails(ticker));
        
        if (stockData && stockData.revenue && stockData.quarter) {
          const last12Quarters = stockData.quarter.slice(-12);
          const grossmargins = stockData.grossmargin
            .slice(-12)
            .map((rev) => (typeof rev === 'string' ? parseFloat(rev.replace(',', '.')) : rev));

          // Labels
          if (index === 0) {
            chartData.labels = last12Quarters;
          }

          // Add Dataset
          chartData.datasets.push({
            label: `${ticker}`,
            data: grossmargins,
            backgroundColor: this.colors[index % this.colors.length],
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
    // Destroy previous chart instance, if available
    if (this.chartInstance) {
        this.chartInstance.destroy();
    }


    // Create new chart instance
    this.chartInstance = new Chart(this.chart.nativeElement, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: data.datasets.map((dataset, index) => ({
                label: dataset.label,
                data: dataset.data,
                borderColor: this.colors[index % this.colors.length],
                backgroundColor: this.colors[index % this.colors.length],
                fill: false,
                borderWidth: 1,
            })),
        },
        options: {
            maintainAspectRatio: false,
            elements: {
                line: {
                    tension: 0.4,
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Gross margin last 12 quarters',
                    color: 'rgb(226 226 233)',
                },
                legend: {
                    labels: {
                      color: 'rgb(226 226 233)',
                        boxWidth: 8,
                        boxHeight: 8,
                        padding: 8,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                      display: false,
                      // color: 'rgb(226 226 233)',
                      // maxRotation: 45,
                    },
                    grid: {
                      color: 'rgb(226 226 233)',
                      lineWidth: 0.2,
                    },
                },
                y: {
                    ticks: {
                      color: 'rgb(226 226 233)',
                    },
                    grid: {
                      color: 'rgb(226 226 233)',
                      lineWidth: 0.2,
                    },
                },
            },
        },
    });
  }
}
