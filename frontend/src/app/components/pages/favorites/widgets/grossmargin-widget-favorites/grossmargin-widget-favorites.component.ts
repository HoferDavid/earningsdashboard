import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';
import { FirestoreService } from '../../../../../services/firestore.service';
import { FavoritesService } from '../../../../../services/favorites.service';

@Component({
  selector: 'app-grossmargin-widget-favorites',
  standalone: true,
  templateUrl: './grossmargin-widget-favorites.component.html',
  styleUrls: ['./grossmargin-widget-favorites.component.scss'],
})
export class GrossmarginWidgetFavoritesComponent {

  @ViewChild('chart', { static: true }) chart!: ElementRef<HTMLCanvasElement>;
  private firestoreService = inject(FirestoreService);
  private favoritesService = inject(FavoritesService);
  private chartInstance: Chart | null = null;


  async ngOnInit(): Promise<void> {
    await this.loadAllStockData();
  }


  async loadAllStockData(): Promise<void> {
    const chartData: { labels: string[]; datasets: any[] } = { labels: [], datasets: [] };
    const favoriteTickers = this.favoritesService.favorites();

    const requests = favoriteTickers.map(async (ticker, index) => {
      try {
        const stockData = await firstValueFrom(this.firestoreService.getStockDetails(ticker));

        if (stockData && stockData.revenue && stockData.quarter) {
          const last12Quarters = stockData.quarter.slice(-12);
          const grossmargins = stockData.grossmargin
            .slice(-12)
            .map((rev) => (typeof rev === 'string' ? parseFloat(rev.replace(',', '.')) : rev));

          if (index === 0) {
            chartData.labels = last12Quarters;
          }

          chartData.datasets.push({
            label: `${ticker}`,
            data: grossmargins,
            fill: false,
            borderWidth: 1,
          });
        }
      } catch (error) {
        console.error(`Fehler beim Laden der Daten für ${ticker}:`, error);
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
        datasets: data.datasets,
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