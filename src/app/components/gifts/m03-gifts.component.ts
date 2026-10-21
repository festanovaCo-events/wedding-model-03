import { Component } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { GiftIcon } from '@hugeicons/core-free-icons';
import { MODEL_03_INFO } from '../../constants/m03-info';

@Component({
  selector: 'app-m03-gifts',
  standalone: true,
  imports: [HugeiconsIconComponent],
  templateUrl: './m03-gifts.component.html',
})
export class M03GiftsComponent {
  readonly gifts = MODEL_03_INFO.gifts;
  readonly qr = MODEL_03_INFO.images.qr;
  readonly leaf = MODEL_03_INFO.images.leaf;
  readonly flourish = MODEL_03_INFO.images.flourish;
  readonly GiftIcon = GiftIcon;
}
