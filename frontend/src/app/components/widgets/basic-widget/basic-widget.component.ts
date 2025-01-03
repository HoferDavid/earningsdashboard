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
}
