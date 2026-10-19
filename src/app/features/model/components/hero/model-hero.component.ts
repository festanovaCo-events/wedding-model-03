import { Component } from '@angular/core';
import { MODEL_INFO } from '../../constants/model-info';

@Component({
  selector: 'app-model-hero',
  standalone: true,
  templateUrl: './model-hero.component.html',
})
export class ModelHeroComponent {
  readonly info = MODEL_INFO;
}
