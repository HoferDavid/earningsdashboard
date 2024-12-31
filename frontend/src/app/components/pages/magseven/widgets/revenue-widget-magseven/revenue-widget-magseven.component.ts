import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';
import { TickersService } from '../../../../../services/tickers.service';
import { FirestoreService } from '../../../../../services/firestore.service';
import { BillionFormatPipe } from '../../../../../pipes/billion-format.pipe';
@Component({
  selector: 'app-revenue-widget-magseven',
  standalone: true,
  imports: [],
  templateUrl: './revenue-widget-magseven.component.html',
  styleUrl: './revenue-widget-magseven.component.scss',
})
export class RevenueWidgetMagsevenComponent {

  @ViewChild('chart', { static: true }) chart!: ElementRef<HTMLCanvasElement>;
  private firestoreService = inject(FirestoreService);
  private tickersService = inject(TickersService);
  private chartInstance: Chart | null = null;
  private billionFormatPipe = inject(BillionFormatPipe);


  tickers = this.tickersService.getMagsevenTickers();
  colors = this.tickersService.getCustomChartColors();


  async ngOnInit(): Promise<void> {
    await this.loadAllStockData();
  }


  async loadAllStockData(): Promise<void> {
    const chartData: { labels: string[]; datasets: any[] } = { labels: [], datasets: [] };

    const requests = this.tickers().map(async (ticker, index) => {
      try {
        const stockData = await firstValueFrom(this.firestoreService.getStockDetails(ticker));
        
        if (stockData && stockData.revenue && stockData.quarter) {
          const last12Quarters = stockData.quarter.slice(-12);
          const revenues = stockData.revenue
          .slice(-12)
          .map((rev) => {
            const numericValue = typeof rev === 'string' ? parseFloat(rev.replace(',', '.')) : rev;
            return numericValue !== null ? this.billionFormatPipe.transform(numericValue) : '0';
          })
          .filter((rev): rev is string => rev !== null); 

          if (index === 0) {
            chartData.labels = last12Quarters;
          }

          chartData.datasets.push({
            label: `${ticker}`,
            data: revenues,
            backgroundColor: this.colors()[index % this.colors().length],
          });
        }
      } catch (error) {
        console.error(`Error while loading data for ${ticker}:`, error);
      }
    });

    await Promise.all(requests);
    this.renderChart(chartData);
  }


  renderChart(data: { labels: string[]; datasets: any[] }): void {
    if (this.chartInstance) {
        this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(this.chart.nativeElement, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: data.datasets.map((dataset, index) => ({
                label: dataset.label,
                data: dataset.data,
                borderColor: this.colors()[index % this.colors().length],
                backgroundColor: this.colors()[index % this.colors().length],
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
                    text: 'Revenue last 3 years',
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
                tooltip: {
                  callbacks: {
                      label: function (context) { // Tooltip Settings. What to show on hover
                          const label = context.dataset.label || '';
                          const value = context.raw || '';
                          return `${label}: ${value}B`; // Show only Value and Ticker
                      },
                      title: function () {
                          return ''; // Remove Title
                      },
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