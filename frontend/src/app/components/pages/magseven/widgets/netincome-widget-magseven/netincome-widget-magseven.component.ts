import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';
import { TickersService } from '../../../../../services/tickers.service';
import { FirestoreService } from '../../../../../services/firestore.service';

@Component({
  selector: 'app-netincome-widget-magseven',
  standalone: true,
  imports: [],
  templateUrl: './netincome-widget-magseven.component.html',
  styleUrl: './netincome-widget-magseven.component.scss'
})
export class NetincomeWidgetMagsevenComponent {

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
  
    chartData.labels = this.tickers();
  
    // Array for Quarter Datasets
    const quarterDatasets: { label: string; data: number[]; backgroundColor: string }[] = [
      { label: 'Q1', data: [], backgroundColor: '#C40C0C' },
      { label: 'Q2', data: [], backgroundColor: '#FF6500' },
      { label: 'Q3', data: [], backgroundColor: '#FF8A08' },
      { label: 'Q4', data: [], backgroundColor: '#FFC100' },
    ];
  

    const requests = this.tickers().map(async (ticker, index) => {
      try {
        const stockData = await firstValueFrom(this.firestoreService.getStockDetails(ticker));
  
        if (stockData && stockData.netIncome && stockData.quarter) {
          const netIncomes = stockData.netIncome.slice(-4).map((rev) => (typeof rev === 'string' ? parseFloat(rev.replace(',', '.')) : rev));
  
          netIncomes.forEach((income, quarterIndex) => {
            quarterDatasets[quarterIndex].data.push(income);
          });
        } else {
          quarterDatasets.forEach((dataset) => dataset.data.push(0));
        }
      } catch (error) {
        console.error(`Error while loading data for ${ticker}:`, error);
        quarterDatasets.forEach((dataset) => dataset.data.push(0));
      }
    });
  
    await Promise.all(requests);
    chartData.datasets = quarterDatasets;
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
