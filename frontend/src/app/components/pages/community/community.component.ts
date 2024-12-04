import { Component, computed, Signal, ViewChild, AfterViewInit, effect, ChangeDetectorRef, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PagesHeaderComponent } from '../../common/pages-header/pages-header.component';
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
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements AfterViewInit {
  pageTitle = 'Community Prediction';
  stockData: Signal<CommunityPrediction[]>;
  lastUpdate!: Signal<string | null>;
  dataSource = new MatTableDataSource<CommunityPrediction>();
  displayedColumns: string[] = [ 'username', 'stock', 'ticker', 'startPrice', 'currentPrice', 'performance' ];
  isMobile: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;


  constructor(private stockDataService: StockDataService, private cdr: ChangeDetectorRef) {
    this.stockData = computed(() => {
      const data = this.stockDataService.getStockDataSignal()();
      this.dataSource.data = data;
      return data;
    });
    this.lastUpdate = this.stockDataService.getLastUpdateSignal();
  }


  ngOnInit() {
    this.checkMobile();
    this.stockDataService.fetchStockData();
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.sort.active = 'performance'; // Sort Standard
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkMobile();
  }


  checkMobile() {
    this.isMobile = window.innerWidth <= 600;
    this.displayedColumns = this.isMobile ? this.displayedColumns = ['username', 'stock', 'performance'] : ['username', 'stock', 'ticker', 'startPrice', 'currentPrice', 'performance'];
  }
}
