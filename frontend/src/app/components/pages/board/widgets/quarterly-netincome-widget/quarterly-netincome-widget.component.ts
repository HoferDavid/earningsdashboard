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

  ngOnInit(): void {

    const last12Quarters = this.stockService.netIncomeLast12Quarters();
    console.log('Last 12 Quarters for Chart:', last12Quarters);


    const labels = last12Quarters.map((item) => item.quarter);
    const data = last12Quarters.map((item) => item.revenue);


    const scaleColor = getComputedStyle(document.documentElement).getPropertyValue('--scale-color').trim();
    const datasetPrimary = getComputedStyle(document.documentElement).getPropertyValue('--dataset-primary-color').trim();
    const datasetSecondary = getComputedStyle(document.documentElement).getPropertyValue('--dataset-secondary-color').trim();
    const grid = getComputedStyle(document.documentElement).getPropertyValue('--grid-color').trim();


    new Chart(this.chart.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'in Bill. USD',
            data: data,
            backgroundColor: datasetPrimary,
            borderColor: datasetSecondary,
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
            text: 'Net income last 12 quarters',
            color: scaleColor,
          },
          legend: {
            labels: {
              color: scaleColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: scaleColor,
            },
            grid: {
              color: grid,
              lineWidth: 0.2,
            },
          },
          y: {
            min: 0,
            ticks: {
              color: scaleColor,
              callback: function(value) { return Number.isInteger(value) ? value : ''; }
            },
            grid: {
              color: grid,
              lineWidth: 0.2,
            },
          },
        },
      },
    });
  }
}
