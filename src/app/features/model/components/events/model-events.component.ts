import { Component } from '@angular/core';
import { WEDDING_INFO } from '../../../shared/constants/wedding-info';

@Component({
  selector: 'app-model-events',
  standalone: true,
  templateUrl: './model-events.component.html',
})
export class ModelEventsComponent {
  readonly ceremony = WEDDING_INFO.events.ceremony;
  readonly party = WEDDING_INFO.events.party;
}
