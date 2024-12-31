import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';
import { TickersService } from '../../../../../services/tickers.service';
import { FirestoreService } from '../../../../../services/firestore.service';
import { BillionFormatPipe } from '../../../../../pipes/billion-format.pipe';

@Component({
  selector: 'app-netincomettm-widget-magseven',
  standalone: true,
  imports: [],
  templateUrl: './netincomettm-widget-magseven.component.html',
  styleUrl: './netincomettm-widget-magseven.component.scss'
})
export class NetincomettmWidgetMagsevenComponent {
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
    const chartData: { labels: string[]; datasets: any[] } = { labels: this.tickers(), datasets: [] };

    const requests = this.tickers().map(async (ticker, index) => {
      try {
        const stockData = await firstValueFrom(this.firestoreService.getStockDetails(ticker));

        if (stockData && stockData.netIncome) {
          const netincoms = stockData.netIncome
            .slice(-4)
            .map((rev) =>
              typeof rev === 'string' ? parseFloat(rev.replace(',', '.')) : rev
            );

          const sum = netincoms.reduce((a, b) => a + b, 0);

          const formattedSum = this.billionFormatPipe.transform(sum);
  
          chartData.datasets.push({
            label: `${ticker}`,
            data: this.tickers().map((t, i) => (i === index ? formattedSum : null)),
            backgroundColor: this.colors()[index % this.colors().length],
            // barThickness: 'flex', // Flexible Balkenbreite
            // maxBarThickness: 40,  // Maximale Breite der Balken in Pixeln
            categoryPercentage: 0.5,
            barPercentage: 8, 
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
          tooltip: {
            callbacks: {
                label: function (context) { // Tooltip Settings. What to show on hover
                    const label = context.dataset.label || '';
                    const value = context.raw || '';
                    return `${value}B`; // Show only Value and Ticker
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
