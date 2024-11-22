import { Component } from '@angular/core';
import { PagesHeaderComponent } from '../../../common/pages-header/pages-header.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-doppelgaenger',
  standalone: true,
  imports: [PagesHeaderComponent, MatButtonModule],
  templateUrl: './doppelgaenger.component.html',
  styleUrl: './doppelgaenger.component.scss'
})
export class DoppelgaengerComponent {

  pageTitle = 'Doppelgänger';
  doppelgaengerUrl = 'https://www.doppelgaenger.io/';
  applePodcastsUrl = 'https://podcasts.apple.com/de/podcast/doppelg%C3%A4nger-tech-talk/id1519234952';
  spotifyUrl = 'https://open.spotify.com/show/3vBAacJIGDEb7hBHgdYlw3';
  discordUrl = 'https://www.doppelgaenger.io/discord/';

}
