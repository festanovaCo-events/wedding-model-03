import { Component } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Bus01Icon, Camera01Icon, Hotel01Icon } from '@hugeicons/core-free-icons';
import { MODEL_INFO } from '../../constants/model-info';

@Component({
  selector: 'app-model-closing',
  standalone: true,
  imports: [HugeiconsIconComponent],
  templateUrl: './model-closing.component.html',
})
export class ModelClosingComponent {
  readonly info = MODEL_INFO;
  readonly Bus01Icon = Bus01Icon;
  readonly Hotel01Icon = Hotel01Icon;
  readonly Camera01Icon = Camera01Icon;
}
