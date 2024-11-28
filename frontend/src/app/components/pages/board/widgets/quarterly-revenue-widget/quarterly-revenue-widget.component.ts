import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { QuarterlyRevenueData } from '../../../../../interfaces/quarterly-revenue-data';
import { StockService } from '../../../../../services/stock.service';
import Chart from 'chart.js/auto';

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
    const last12Quarters = this.stockService.revenueLast12Quarters();

    const labels = last12Quarters.map(item => item.quarter);
    const data = last12Quarters.map(item => item.revenue);


    new Chart(this.chart.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'in Bill/Mill USD',
            data: data,
            backgroundColor: 'rgb(40 71 119)'
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
            }
          },
          y: {
            ticks: {
              color: 'rgb(226 226 233)',
            }
          }
        }
      }
    });
  }
}
