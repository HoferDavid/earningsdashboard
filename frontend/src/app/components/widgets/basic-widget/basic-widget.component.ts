import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BillionFormatPipe } from '../../../pipes/billion-format.pipe';
import { QuarterFormatPipe } from '../../../pipes/quarter-format.pipe';
import { BasicWidget } from '../../../interfaces/basic-widget';

@Component({
  selector: 'app-basic-widget',
  standalone: true,
  imports: [CommonModule, BillionFormatPipe, QuarterFormatPipe],
  templateUrl: './basic-widget.component.html',
  styleUrl: './basic-widget.component.scss'
})
export class BasicWidgetComponent {
  @Input() data!: BasicWidget;


  constructor(private router: Router) {}

  
  goToDashboard() {
    this.router.navigate(['/board', this.data.ticker]);
  }
}
