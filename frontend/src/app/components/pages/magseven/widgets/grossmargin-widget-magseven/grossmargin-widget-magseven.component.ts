import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';
import { TickersService } from '../../../../../services/tickers.service';
import { FirestoreService } from '../../../../../services/firestore.service';

@Component({
  selector: 'app-grossmargin-widget-magseven',
  standalone: true,
  imports: [],
  templateUrl: './grossmargin-widget-magseven.component.html',
  styleUrl: './grossmargin-widget-magseven.component.scss'
})
export class GrossmarginWidgetMagsevenComponent {

  @ViewChild('chart', { static: true }) chart!: ElementRef<HTMLCanvasElement>;
  private firestoreService = inject(FirestoreService);
  private magsevenTickers = inject(TickersService);
  private chartInstance: Chart | null = null;


  tickers = this.magsevenTickers.getMagsevenTickers();
  colors = this.magsevenTickers.getMagsevenColors();


  async ngOnInit(): Promise<void> {
    await this.loadAllStockData();
  }


  async loadAllStockData(): Promise<void> {
    const chartData: { labels: string[]; datasets: any[] } = { labels: [], datasets: [] };


    // All Requests together
    const requests = this.tickers().map(async (ticker, index) => {
      try {
        const stockData = await firstValueFrom(this.firestoreService.getStockDetails(ticker));
        
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
            backgroundColor: this.colors()[index % this.colors().length],
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
                    text: 'Gross margin last 3 years',
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
                          return `${label}: ${value}%`; // Show only Value and Ticker
                      },
                      title: function () {
                          return ''; // Remove Title of Quarter
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
