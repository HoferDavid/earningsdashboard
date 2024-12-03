import { Component, computed, Signal } from '@angular/core';
import { PagesHeaderComponent } from "../../common/pages-header/pages-header.component";
import { CommunityPrediction } from '../../../interfaces/community-prediction';
import { StockDataService } from '../../../services/community.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [PagesHeaderComponent, CommonModule],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent {

  pageTitle = 'Community Prediction';

  stockData: Signal<CommunityPrediction[]>;

  constructor(private stockDataService: StockDataService) {
    this.stockData = computed(() => this.stockDataService.getStockDataSignal()());
  }

  ngOnInit() {
    this.stockDataService.fetchStockData();
  }

}
