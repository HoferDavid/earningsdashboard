import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../../../services/stock.service';
import Chart from 'chart.js/auto';
import { BasicWidget } from '../../../interfaces/basic-widget';
import { WidgetComponent } from "../../widget/widget.component";

@Component({
  selector: 'app-quarterly-revenue-widget',
  standalone: true,
  imports: [WidgetComponent],
  templateUrl: './quarterly-revenue-widget.component.html',
  styleUrl: './quarterly-revenue-widget.component.scss'
})
export class QuarterlyRevenueWidgetComponent {

  @Input() data!: BasicWidget;

  widgetWidth: string = '500px';

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
