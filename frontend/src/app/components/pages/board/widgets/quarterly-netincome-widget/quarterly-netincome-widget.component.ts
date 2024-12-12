import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { StockService } from '../../../../../services/stock.service';
import Chart from 'chart.js/auto';
import { QuarterlyNetincomeData } from '../../../../../interfaces/quarterly-netincome-data';

@Component({
  selector: 'app-quarterly-netincome-widget',
  standalone: true,
  imports: [],
  templateUrl: './quarterly-netincome-widget.component.html',
  styleUrl: './quarterly-netincome-widget.component.scss'
})
export class QuarterlyNetincomeWidgetComponent {

  @Input() data!: QuarterlyNetincomeData;
  @ViewChild('chart', { static: true }) chart!: ElementRef;
  private stockService = inject(StockService);


  async ngOnInit(): Promise<void> {
    await this.loadAllStockData();
  }


  async loadAllStockData(): Promise<void> {
    const last12Quarters = this.stockService.netIncomeLast12Quarters();
    const labels = last12Quarters.map((item) => item.quarter);
    const data = last12Quarters.map(item => item.revenue);

    new Chart(this.chart.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'in Bill. USD',
            data: data,
            backgroundColor: '#26ebd0',
            borderColor: 'rgb(190 198 220)',
            borderWidth: 1,
          },
        ],
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
            text: 'Net income TTM',
            color: 'rgb(226 226 233)',
          },
          legend: {
            labels: {
              color: 'rgb(226 226 233)',
              boxWidth: 8,
              boxHeight: 8,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 6,
              minRotation: 45,
              color: 'rgb(226 226 233)',
            },
            grid: {
            color: 'rgb(226 226 233)',
              lineWidth: 0.2,
            },
          },
          y: {
            min: 0,
            ticks: {
              color: 'rgb(226 226 233)',
              callback: function(value) { return Number.isInteger(value) ? value : ''; }
            },
            grid: {
              color: 'rgb(142 144 153)',
              lineWidth: 0.2,
            },
          },
        },
      },
    });
  }
}
