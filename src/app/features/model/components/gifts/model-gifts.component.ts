import { Component } from '@angular/core';
import { MODEL_INFO } from '../../constants/model-info';

@Component({
  selector: 'app-model-gifts',
  standalone: true,
  templateUrl: './model-gifts.component.html',
})
export class ModelGiftsComponent {
  readonly gifts = MODEL_INFO.gifts;
}
