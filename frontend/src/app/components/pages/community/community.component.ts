import { Component, computed, Signal, ViewChild, AfterViewInit, effect } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PagesHeaderComponent } from "../../common/pages-header/pages-header.component";
import { CommunityPrediction } from '../../../interfaces/community-prediction';
import { StockDataService } from '../../../services/community.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [PagesHeaderComponent, CommonModule, MatTableModule, MatSortModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements AfterViewInit {
  pageTitle = 'Community Prediction';
  stockData: Signal<CommunityPrediction[]>;
  lastUpdate!: Signal<string | null>;
  dataSource = new MatTableDataSource<CommunityPrediction>();
  displayedColumns: string[] = ['username', 'stock', 'ticker', 'startPrice', 'currentPrice', 'performance'];

  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private stockDataService: StockDataService) {
    this.stockData = computed(() => {
      const data = this.stockDataService.getStockDataSignal()();
      this.dataSource.data = data;
      return data;
    });
    this.lastUpdate = this.stockDataService.getLastUpdateSignal();
  }


  ngOnInit() {
    this.stockDataService.fetchStockData();
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}