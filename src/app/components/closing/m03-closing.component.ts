import { Component } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Bus01Icon, Camera01Icon, Hotel01Icon } from '@hugeicons/core-free-icons';
import { MODEL_03_INFO } from '../../constants/m03-info';

@Component({
  selector: 'app-m03-closing',
  standalone: true,
  imports: [HugeiconsIconComponent],
  templateUrl: './m03-closing.component.html',
})
export class M03ClosingComponent {
  readonly info = MODEL_03_INFO;
  readonly Bus01Icon = Bus01Icon;
  readonly Hotel01Icon = Hotel01Icon;
  readonly Camera01Icon = Camera01Icon;
}
