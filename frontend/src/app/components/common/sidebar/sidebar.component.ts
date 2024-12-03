import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { SidenavService } from '../../../services/sidenav.service';
import { FirestoreService } from '../../../services/firestore.service';
import { MatButtonModule } from '@angular/material/button';

export type MenuItem = {
  icon: string;
  label: string;
  route?: any;
  subItems?: MenuItem[];
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  animations: [
    trigger('expandContractMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('250ms ease-in-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('250ms ease-in-out', style({ opacity: 0, height: '0px' })),
      ]),
    ]),
  ],
  imports: [ MatSidenavModule, MatIconModule, RouterModule, MatListModule, CommonModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  sidenavService = inject(SidenavService);
  firestoreService = inject(FirestoreService);

  stockDetails: any;


  ngOnInit(): void {
    this.firestoreService.getStockDetails('AAPL').subscribe(data => { this.stockDetails = data });
  }


  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Overview',
      route: 'overview',
    },
    {
      icon: 'star',
      label: 'Mag7',
      route: 'magseven',
    },
    {
      icon: 'favorite',
      label: 'Favorites',
      route: 'favorites',
    },
    {
      icon: 'groups',
      label: 'Community',
      route: 'community',
    },
    {
      icon: 'info',
      label: 'Info',
      route: 'info',
      subItems: [
        {
          icon: 'group',
          label: 'Doppelgänger',
          route: 'doppelgaenger',
        },
        {
          icon: 'sentiment_satisfied',
          label: 'About',
          route: 'about',
        },
        {
          icon: 'warning',
          label: 'Disclaimer',
          route: 'disclaimer',
        },
        {
          icon: 'policy',
          label: 'Imprint',
          route: 'imprint',
        },
        {
          icon: 'privacy_tip',
          label: 'Privacy',
          route: 'privacy',
        },
      ],
    },
  ]);


  sidenavWidth = computed(() => this.sidenavService.sidenavWidth);
  imgWidth = computed(() => this.sidenavService.imgWidth);
  isCollapsed = computed(() => this.sidenavService.collapsed());


  nestedMenuOpenIndex = signal<number | null>(null);


  isNestedMenuOpen(index: number): boolean {
    return this.nestedMenuOpenIndex() === index;
  }


  toggleNested(index: number): void {
    this.nestedMenuOpenIndex() === index ? this.nestedMenuOpenIndex.set(null) : this.nestedMenuOpenIndex.set(index);
    // this.sidenavService.toggle(); // Close Sidebar when clicking on a tab
  }
}
