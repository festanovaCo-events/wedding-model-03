import { Component, Input } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Alert02Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-error-status',
  standalone: true,
  imports: [HugeiconsIconComponent],
  templateUrl: './error-status.component.html',
})
export class ErrorStatusComponent {
  readonly Alert02Icon = Alert02Icon;
  @Input() error: string | null = null;
}
