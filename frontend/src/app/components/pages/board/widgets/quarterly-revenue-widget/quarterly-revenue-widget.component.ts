import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { QuarterlyRevenueData } from '../../../../../interfaces/quarterly-revenue-data';
import { StockService } from '../../../../../services/stock.service';
import Chart from 'chart.js/auto';
import { BillionFormatPipe } from '../../../../../pipes/billion-format.pipe';

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
    const billionFormatPipe = new BillionFormatPipe();
    const last12Quarters = this.stockService.revenueLast12Quarters();
    const labels = last12Quarters.map(item => item.quarter);
    const data = last12Quarters.map(item => { return billionFormatPipe.transform(item.revenue) });


    new Chart(this.chart.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'in Bill. USD',
            data: data,
            backgroundColor: '#26ebd0'
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
            text: 'Revenue TTM',
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
