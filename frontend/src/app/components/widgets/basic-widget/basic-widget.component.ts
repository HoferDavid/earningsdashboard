import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BasicWidget } from '../../../interfaces/basic-widget';
import { BillionFormatPipe } from '../../../pipes/billion-format.pipe';

@Component({
  selector: 'app-basic-widget',
  standalone: true,
  imports: [CommonModule, BillionFormatPipe],
  templateUrl: './basic-widget.component.html',
  styleUrl: './basic-widget.component.scss'
})
export class BasicWidgetComponent {
  @Input() data!: BasicWidget;


  constructor(private router: Router) {}

  
  goToDashboard() {
    this.router.navigate(['/board', this.data.ticker]);
  }


  calculatePercentageChange(): number {
    if (!this.data.lastRevenue || !this.data.lastYearRevenue) return 0;
    const percentageChange = ((this.data.lastRevenue - this.data.lastYearRevenue) / this.data.lastYearRevenue) * 100;
    return percentageChange;
  }
}
