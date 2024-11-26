import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { BasicWidget } from '../../../interfaces/basic-widget';
import { FirestoreService } from '../../../services/firestore.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BasicWidgetComponent } from './../../widgets/basic-widget/basic-widget.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, BasicWidgetComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  firestoreService = inject(FirestoreService);
  stocks$: Observable<BasicWidget[]> = this.firestoreService.getStocks();
  searchControl = new FormControl<string>('');


  // ngOnInit(): void {
  //   window.addEventListener('scroll', this.toggleScrollButtonVisibility.bind(this));
  // }  


  // scrollToTop() {
  //   console.log('Scroll to top triggered');
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }
  
  
  // toggleScrollButtonVisibility() {
  //   const scrollTop = window.scrollY || document.documentElement.scrollTop;
  //   const scrollButton = document.querySelector('.scroll-top-btn') as HTMLElement;
  
  //   if (scrollButton) {
  //     if (scrollTop > 100) {
  //       scrollButton.classList.add('visible');
  //     } else {
  //       scrollButton.classList.remove('visible');
  //     }
  //   }
  // }


  filteredStocks$: Observable<BasicWidget[]> = combineLatest([
    this.stocks$,
    this.searchControl.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([stocks, searchText]) => 
      stocks.filter(stock => 
        stock.name.toLowerCase().includes(searchText!.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(searchText!.toLowerCase())
      )
    )
  );
}
