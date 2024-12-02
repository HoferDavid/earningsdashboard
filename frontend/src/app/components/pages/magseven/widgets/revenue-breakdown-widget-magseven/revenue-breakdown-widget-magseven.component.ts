import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';
import { TickersService } from '../../../../../services/tickers.service';
import { FirestoreService } from '../../../../../services/firestore.service';

@Component({
  selector: 'app-revenue-breakdown-widget-magseven',
  standalone: true,
  imports: [],
  templateUrl: './revenue-breakdown-widget-magseven.component.html',
  styleUrl: './revenue-breakdown-widget-magseven.component.scss'
})
export class RevenueBreakdownWidgetMagsevenComponent {

  @ViewChild('chart', { static: true }) chart!: ElementRef<HTMLCanvasElement>;
  private firestoreService = inject(FirestoreService);
  private magsevenTickers = inject(TickersService);
  private chartInstance: Chart<"doughnut"> | null = null;


  tickers = this.magsevenTickers.getMagsevenTickers();
  colors = this.magsevenTickers.getMagsevenColors();


  async ngOnInit(): Promise<void> {
    await this.loadAllStockData();
  }


  async loadAllStockData(): Promise<void> {
    const totalRevenues: number[] = [];

    const requests = this.tickers().map(async (ticker) => {
        try {
            const stockData = await firstValueFrom(this.firestoreService.getStockDetails(ticker));

            if (stockData && stockData.revenue) {
                // Nehme die letzten 4 Quartalswerte
                const revenues = stockData.revenue.slice(-4).map((rev) =>
                    typeof rev === 'string' ? parseFloat(rev.replace(',', '.')) : rev
                );

                // Summiere die letzten 4 Quartalswerte
                const sum = revenues.reduce((a, b) => a + b, 0);
                totalRevenues.push(sum); // Füge zur Gesamtliste hinzu
            }
        } catch (error) {
            console.error(`Error while loading data for ${ticker}:`, error);
            totalRevenues.push(0); // Bei Fehler Null hinzufügen
        }
    });

    // Warten bis alle Daten geladen sind
    await Promise.all(requests);

    // Chart-Daten erstellen
    const chartData = {
        labels: this.tickers(),
        datasets: [
            {
                data: totalRevenues, // Verwende die Gesamtsummen direkt
                backgroundColor: this.colors(), // Farben aus dem Service
            },
        ],
    };

    // Render Chart
    this.renderChart(chartData);
}



  renderChart(data: { labels: string[]; datasets: { data: number[]; backgroundColor: string[] }[] }): void {
    if (this.chartInstance) {
        this.chartInstance.destroy();
    }

    this.chartInstance = new Chart<"doughnut">(this.chart.nativeElement, {
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
            },
        },
    });
}

}
