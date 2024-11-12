// revenue-widget.component.ts
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../../../services/stock.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-revenue-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue-widget.component.html',
  styleUrls: ['./revenue-widget.component.scss']
})
export class RevenueWidgetComponent implements OnInit {
  @ViewChild('chart', { static: true }) chart!: ElementRef;

  private stockService = inject(StockService);

  ngOnInit(): void {
    const last12Quarters = this.stockService.last12Quarters();
    console.log('Last 12 Quarters for Chart:', last12Quarters);

    const labels = last12Quarters.map(item => item.quarter);
    const data = last12Quarters.map(item => item.revenue);

    new Chart(this.chart.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Revenue (in Bill. USD)',
            data: data,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132, 0.5)',
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4,
          }
        }
      }
    });
  }
}