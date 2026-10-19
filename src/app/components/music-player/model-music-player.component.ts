import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { NextIcon, PauseIcon, PlayIcon, PreviousIcon } from '@hugeicons/core-free-icons';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MODEL_INFO } from '../../constants/model-info';
import { BackgroundMusicService } from '../../shared/services/background-music.service';

@Component({
  selector: 'app-model-music-player',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  templateUrl: './model-music-player.component.html',
})
export class ModelMusicPlayerComponent implements OnInit {
  readonly music = MODEL_INFO.music;
  readonly hint = MODEL_INFO.hero.musicHint;
  readonly PreviousIcon = PreviousIcon;
  readonly PlayIcon = PlayIcon;
  readonly PauseIcon = PauseIcon;
  readonly NextIcon = NextIcon;
  private readonly skipSeconds = 10;

  playing = false;
  currentTime = 0;
  duration = 0;
  progress = 0;

  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly backgroundMusic: BackgroundMusicService) {}

  ngOnInit(): void {
    combineLatest([
      this.backgroundMusic.playing$,
      this.backgroundMusic.currentTime$,
      this.backgroundMusic.duration$,
    ])
      .pipe(
        map(([playing, currentTime, duration]) => ({ playing, currentTime, duration })),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ playing, currentTime, duration }) => {
        this.playing = playing;
        this.currentTime = currentTime;
        this.duration = duration;
        this.progress = duration > 0 ? (currentTime / duration) * 100 : 0;
      });
  }

  toggle(): void {
    this.backgroundMusic.toggle();
  }

  skipBack(): void {
    this.backgroundMusic.skipBy(-this.skipSeconds);
  }

  skipForward(): void {
    this.backgroundMusic.skipBy(this.skipSeconds);
  }

  onSeek(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement | null;
    if (!target) {
      return;
    }
    const rect = target.getBoundingClientRect();
    const ratio = rect.width > 0 ? (event.clientX - rect.left) / rect.width : 0;
    this.backgroundMusic.seek(ratio);
  }

  formatTime(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return '0:00';
    }
    const total = Math.floor(seconds);
    const mins = Math.floor(total / 60);
    const secs = String(total % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  }
}
