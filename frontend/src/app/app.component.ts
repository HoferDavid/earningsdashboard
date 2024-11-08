import { Component } from '@angular/core';
import { HeaderComponent } from './components/common/header/header.component';
import { SidebarComponent } from "./components/common/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'earnings dashboard';
}
