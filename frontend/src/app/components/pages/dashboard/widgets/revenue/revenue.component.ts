import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})
export class RevenueComponent implements OnInit {

  chart = viewChild.required<ElementRef>('chart');

  ngOnInit(): void {
    new Chart(this.chart().nativeElement, {
      type: 'line',
      data: {
        labels: ['Aug', 'Sep', 'Okt', 'Nov', 'Dec', 'Jan'],
        datasets: [
          {
            label: 'Views',
            data: [100, 102, 105, 110, 115, 120],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132, 0.5)',
            fill: 'start',
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
    })
  }

}
