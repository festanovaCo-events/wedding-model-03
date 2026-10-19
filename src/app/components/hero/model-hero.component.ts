import { Component } from '@angular/core';
import { MODEL_INFO } from '../../constants/model-info';
import { ModelMusicPlayerComponent } from '../music-player/model-music-player.component';

@Component({
  selector: 'app-model-hero',
  standalone: true,
  imports: [ModelMusicPlayerComponent],
  templateUrl: './model-hero.component.html',
})
export class ModelHeroComponent {
  readonly info = MODEL_INFO;
}
