import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { QuarterlyRevenueData } from '../../../../../interfaces/quarterly-revenue-data';
import { StockService } from '../../../../../services/stock.service';

@Component({
  selector: 'app-quarterly-grossmargin-widget',
  standalone: true,
  imports: [],
  templateUrl: './quarterly-grossmargin-widget.component.html',
  styleUrl: './quarterly-grossmargin-widget.component.scss',
})
export class QuarterlyGrossmarginWidgetComponent implements OnInit {
  @Input() data!: QuarterlyRevenueData;
  @ViewChild('chart', { static: true }) chart!: ElementRef;
  private stockService = inject(StockService);

  ngOnInit(): void {
    const last12Quarters = this.stockService.grossmarginLast12Quarters();


    const labels = last12Quarters.map((item) => item.quarter);
    const data = last12Quarters.map((item) => item.revenue);


    new Chart(this.chart.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'in %',
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
            text: 'Gross margin last 12 quarters',
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
            // min: 0,
            ticks: {
              color: 'rgb(226 226 233)',
              callback: function(value) { return Number.isInteger(value) ? value : ''; }
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
