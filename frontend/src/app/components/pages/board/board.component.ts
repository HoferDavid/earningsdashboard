import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { BoardHeaderComponent } from './board-header/board-header.component';
import { StockData } from '../../../interfaces/stock-data';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoardHeaderComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  stockData = signal<StockData | null>(null);

  constructor(private route: ActivatedRoute, private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.firestoreService.getStockDetails(params['ticker']).subscribe({
        next: (data) => {
          this.stockData.set(data);
          console.log('Stock Data:', data);
          console.log('test:', data.id);
        },
        error: (err) => {
          console.error('Error fetching stock data:', err);
        }
      });
    });
  }
}