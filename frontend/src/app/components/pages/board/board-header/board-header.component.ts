import { Component, inject } from '@angular/core';
import { StockService } from '../../../../services/stock.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-board-header',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.scss'
})
export class BoardHeaderComponent {
  stockService = inject(StockService);
}
