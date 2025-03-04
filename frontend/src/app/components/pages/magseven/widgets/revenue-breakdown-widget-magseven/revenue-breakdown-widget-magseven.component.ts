import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';
import { TickersService } from '../../../../../services/tickers.service';
import { FirestoreService } from '../../../../../services/firestore.service';
import { BillionFormatPipe } from '../../../../../pipes/billion-format.pipe';

@Component({
  selector: 'app-revenue-breakdown-widget-magseven',
  standalone: true,
  imports: [],
  templateUrl: './revenue-breakdown-widget-magseven.component.html',
  styleUrl: './revenue-breakdown-widget-magseven.component.scss',
})
export class RevenueBreakdownWidgetMagsevenComponent {
  @ViewChild('chart', { static: true }) chart!: ElementRef<HTMLCanvasElement>;
  private firestoreService = inject(FirestoreService);
  private magsevenTickers = inject(TickersService);
  private chartInstance: Chart<'doughnut'> | null = null;
  private billionFormatPipe = inject(BillionFormatPipe);


  tickers = this.magsevenTickers.getMagsevenTickers();
  colors = this.magsevenTickers.getCustomChartColors();


  async ngOnInit(): Promise<void> {
    await this.loadAllStockData();
  }


  async loadAllStockData(): Promise<void> {
    const totalRevenues: number[] = [];
    const formattedRevenues: string[] = [];
    const requests = this.tickers().map(async (ticker) => {
      try {
        const stockData = await firstValueFrom(
          this.firestoreService.getStockDetails(ticker)
        );

        if (stockData && stockData.revenue) {
          const revenues = stockData.revenue
            .slice(-4)
            .map((rev) =>
              typeof rev === 'string' ? parseFloat(rev.replace(',', '.')) : rev
            );

          const sum = revenues.reduce((a, b) => a + b, 0);
          const formattedSum = this.billionFormatPipe.transform(sum);
          totalRevenues.push(sum);
          formattedRevenues.push(formattedSum);
        }
      } catch (error) {
        console.error(`Error while loading data for ${ticker}:`, error);
        totalRevenues.push(0);
        formattedRevenues.push('0');
      }
    });

    await Promise.all(requests);

    const chartData = {
      labels: this.tickers(),
      datasets: [
        {
          data: totalRevenues,
          backgroundColor: this.colors(),
        },
      ],
    };
    this.renderChart(chartData, formattedRevenues);
  }

  
  renderChart(data: {
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  }, formattedRevenues: string[]): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart<'doughnut'>(this.chart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
          ...dataset,
          borderWidth: 0,
        })),
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Revenue Breakdown TTM',
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
              label: (tooltipItem) => {
                const index = tooltipItem.dataIndex;
                const ticker = data.labels[index];
                const formattedRevenue = formattedRevenues[index];
                return `${ticker}: ${formattedRevenue}B`;
              },
              title: function () {
                return ''; // Remove Title
            },
            },
          },
        },
      },
    });
  }
}
