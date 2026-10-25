import { Component, Input } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Alert02Icon, CalendarRemove01Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-expired-banner',
  standalone: true,
  imports: [HugeiconsIconComponent],
  templateUrl: './expired-banner.component.html',
  styleUrl: './expired-banner.component.css',
})
export class ExpiredBannerComponent {
  readonly CalendarRemove01Icon = CalendarRemove01Icon;
  readonly Alert02Icon = Alert02Icon;
  @Input({ required: true }) deadline!: string;
}
