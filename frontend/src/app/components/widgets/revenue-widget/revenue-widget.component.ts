import { Component, Input, OnInit } from '@angular/core';
import { RevenueWidget } from '../../../interfaces/revenue-widget';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from "../../widget/widget.component";

@Component({
  selector: 'app-revenue-widget',
  standalone: true,
  imports: [CommonModule, WidgetComponent],
  templateUrl: './revenue-widget.component.html',
  styleUrl: './revenue-widget.component.scss'
})
export class RevenueWidgetComponent implements OnInit {

  @Input() data: RevenueWidget | undefined;

  ngOnInit() {
    console.log('Revenue Widget Data:', this.data); // Debugging-Ausgabe
  }
}
