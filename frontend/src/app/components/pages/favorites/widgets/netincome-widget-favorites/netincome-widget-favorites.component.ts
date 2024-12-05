import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';
import { TickersService } from '../../../../../services/tickers.service';
import { FirestoreService } from '../../../../../services/firestore.service';
import { FavoritesService } from '../../../../../services/favorites.service';

@Component({
  selector: 'app-netincome-widget-favorites',
  standalone: true,
  imports: [],
  templateUrl: './netincome-widget-favorites.component.html',
  styleUrl: './netincome-widget-favorites.component.scss',
})
export class NetincomeWidgetFavoritesComponent {
  @ViewChild('chart', { static: true }) chart!: ElementRef<HTMLCanvasElement>;
  private firestoreService = inject(FirestoreService);
  private favoritesService = inject(FavoritesService);
  private chartInstance: Chart | null = null;

  async ngOnInit(): Promise<void> {
    await this.loadAllStockData();
  }

  async loadAllStockData(): Promise<void> {
    const chartData: { labels: string[]; datasets: any[] } = {
      labels: [],
      datasets: [],
    };
    const favoriteTickers = this.favoritesService.favorites();


    const requests = favoriteTickers.map(async (ticker, index) => {
      try {
        const stockData = await firstValueFrom(
          this.firestoreService.getStockDetails(ticker)
        );

        if (stockData && stockData.netIncome && stockData.quarter) {
          const last12Quarters = stockData.quarter.slice(-4);
          const netIncomes = stockData.netIncome
            .slice(-4)
            .map((rev) =>
              typeof rev === 'string' ? parseFloat(rev.replace(',', '.')) : rev
            );

          if (index === 0) {
            chartData.labels = last12Quarters;
          }

          chartData.datasets.push({
            label: `${ticker}`,
            data: netIncomes,
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
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: data.datasets,
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Net income last 4 quarters',
            color: 'rgb(226 226 233)',
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              display: false,
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
