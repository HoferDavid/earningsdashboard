import { Component } from '@angular/core';
import { RevenueWidgetMagsevenComponent } from './widgets/revenue-widget-magseven/revenue-widget-magseven.component';
import { GrossmarginWidgetMagsevenComponent } from './widgets/grossmargin-widget-magseven/grossmargin-widget-magseven.component';
import { NetincomeWidgetMagsevenComponent } from './widgets/netincome-widget-magseven/netincome-widget-magseven.component';
import { PagesHeaderComponent } from "../../common/pages-header/pages-header.component";
import { NetincomettmWidgetMagsevenComponent } from "./widgets/netincomettm-widget-magseven/netincomettm-widget-magseven.component";

@Component({
  selector: 'app-magseven',
  standalone: true,
  imports: [RevenueWidgetMagsevenComponent, GrossmarginWidgetMagsevenComponent, NetincomeWidgetMagsevenComponent, PagesHeaderComponent, NetincomettmWidgetMagsevenComponent],
  templateUrl: './magseven.component.html',
  styleUrl: './magseven.component.scss'
})
export class MagsevenComponent {

  pageTitle = 'Mag7';

}
