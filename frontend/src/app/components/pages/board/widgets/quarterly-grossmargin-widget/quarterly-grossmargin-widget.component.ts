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
            label: 'in %',
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
            text: 'Gross margin last 12 quarters',
            color: scaleColor,
          },
          legend: {
            labels: {
              color: scaleColor,
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
              color: scaleColor,
            },
            grid: {
              color: grid,
              lineWidth: 0.2,
            },
          },
          y: {
            // min: 0,
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
