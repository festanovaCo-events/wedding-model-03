import { Component } from '@angular/core';
import { MODEL_03_INFO } from '../../constants/m03-info';
import { M03MusicPlayerComponent } from '../music-player/m03-music-player.component';

@Component({
  selector: 'app-m03-hero',
  standalone: true,
  imports: [M03MusicPlayerComponent],
  templateUrl: './m03-hero.component.html',
})
export class M03HeroComponent {
  readonly info = MODEL_03_INFO;
}
