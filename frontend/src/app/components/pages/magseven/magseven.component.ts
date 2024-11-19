import { Component } from '@angular/core';
import { RevenueWidgetMagsevenComponent } from './widgets/revenue-widget-magseven/revenue-widget-magseven.component';
import { GrossmarginWidgetMagsevenComponent } from './widgets/grossmargin-widget-magseven/grossmargin-widget-magseven.component';
import { NetincomeWidgetMagsevenComponent } from './widgets/netincome-widget-magseven/netincome-widget-magseven.component';

@Component({
  selector: 'app-magseven',
  standalone: true,
  imports: [RevenueWidgetMagsevenComponent, GrossmarginWidgetMagsevenComponent, NetincomeWidgetMagsevenComponent],
  templateUrl: './magseven.component.html',
  styleUrl: './magseven.component.scss'
})
export class MagsevenComponent {

}
