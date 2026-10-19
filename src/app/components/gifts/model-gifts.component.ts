import { Component } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { GiftIcon } from '@hugeicons/core-free-icons';
import { MODEL_INFO } from '../../constants/model-info';

@Component({
  selector: 'app-model-gifts',
  standalone: true,
  imports: [HugeiconsIconComponent],
  templateUrl: './model-gifts.component.html',
})
export class ModelGiftsComponent {
  readonly gifts = MODEL_INFO.gifts;
  readonly qr = MODEL_INFO.images.qr;
  readonly leaf = MODEL_INFO.images.leaf;
  readonly flourish = MODEL_INFO.images.flourish;
  readonly GiftIcon = GiftIcon;
}
