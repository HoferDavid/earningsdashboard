import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { QuarterlyRevenueData } from '../../../interfaces/quarterly-revenue-data';
import { StockService } from '../../../services/stock.service';
import Chart from 'chart.js/auto';

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

    const last12Quarters = this.stockService.last12Quarters();
    console.log('Last 12 Quarters for Chart:', last12Quarters);


    const labels = last12Quarters.map((item) => item.quarter);
    const data = last12Quarters.map((item) => item.revenue);


    const scaleColor = getComputedStyle(document.documentElement).getPropertyValue('--scale-color').trim();
    const datasetPrimary = getComputedStyle(document.documentElement).getPropertyValue('--dataset-primary-color').trim();
    const datasetSecondary = getComputedStyle(document.documentElement).getPropertyValue('--dataset-secondary-color').trim();


    new Chart(this.chart.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Margin (%)',
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
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: scaleColor,
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
              lineWidth: 0.5,
            },
          },
          y: {
            ticks: {
              color: scaleColor,
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
              lineWidth: 0.5,
            },
          },
        },
      },
    });
  }
}
