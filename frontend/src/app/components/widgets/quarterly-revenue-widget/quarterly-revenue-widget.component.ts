import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import Chart from 'chart.js/auto';
import { QuarterlyRevenueData } from '../../../interfaces/quarterly-revenue-data';

@Component({
  selector: 'app-quarterly-revenue-widget',
  standalone: true,
  imports: [],
  templateUrl: './quarterly-revenue-widget.component.html',
  styleUrl: './quarterly-revenue-widget.component.scss'
})
export class QuarterlyRevenueWidgetComponent {

  @Input() data!: QuarterlyRevenueData;
  @ViewChild('chart', { static: true }) chart!: ElementRef;
  private stockService = inject(StockService);


  ngOnInit(): void {
    const last12Quarters = this.stockService.last12Quarters();
    console.log('Last 12 Quarters for Chart:', last12Quarters);

    const labels = last12Quarters.map(item => item.quarter);
    const data = last12Quarters.map(item => item.revenue);

    const scaleColor = getComputedStyle(document.documentElement).getPropertyValue('--scale-color').trim();
    const datasetPrimary = getComputedStyle(document.documentElement).getPropertyValue('--dataset-primary-color').trim();

    new Chart(this.chart.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Revenue (B/M USD)',
            data: data,
            backgroundColor: datasetPrimary,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4,
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Revenue last 12 quarters',
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
              color: scaleColor
            }
          },
          y: {
            ticks: {
              color: scaleColor
            }
          }
        }
      }
    });
  }
}
