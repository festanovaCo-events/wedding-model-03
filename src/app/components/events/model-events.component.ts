import { Component } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import {
  Camera01Icon,
  ChurchIcon,
  MusicNote01Icon,
  Restaurant01Icon,
  SparklesIcon,
  UserGroupIcon,
  WeddingIcon,
} from '@hugeicons/core-free-icons';
import { MODEL_INFO, ModelTimelineIcon } from '../../constants/model-info';

@Component({
  selector: 'app-model-events',
  standalone: true,
  imports: [HugeiconsIconComponent],
  templateUrl: './model-events.component.html',
})
export class ModelEventsComponent {
  readonly info = MODEL_INFO;
  readonly ChurchIcon = ChurchIcon;
  readonly UserGroupIcon = UserGroupIcon;

  private readonly timelineIcons = {
    rings: WeddingIcon,
    camera: Camera01Icon,
    dinner: Restaurant01Icon,
    music: MusicNote01Icon,
    sparkle: SparklesIcon,
  } as const;

  timelineIcon(icon: ModelTimelineIcon) {
    switch (icon) {
      case 'rings':
        return this.timelineIcons.rings;
      case 'camera':
        return this.timelineIcons.camera;
      case 'dinner':
        return this.timelineIcons.dinner;
      case 'music':
        return this.timelineIcons.music;
      case 'sparkle':
        return this.timelineIcons.sparkle;
      default: {
        const exhaustive: never = icon;
        return exhaustive;
      }
    }
  }
}
