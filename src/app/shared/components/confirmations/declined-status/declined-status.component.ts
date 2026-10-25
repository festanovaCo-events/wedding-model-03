import { Component } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-declined-status',
  standalone: true,
  imports: [HugeiconsIconComponent],
  templateUrl: './declined-status.component.html',
})
export class DeclinedStatusComponent {
  readonly Cancel01Icon = Cancel01Icon;
}
