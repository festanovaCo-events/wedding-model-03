import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WEDDING_INFO } from '../constants/wedding-info';

@Injectable({ providedIn: 'root' })
export class BackgroundMusicService {
  private audio: HTMLAudioElement | null = null;
  private playing = false;
  private readonly playingSubject = new BehaviorSubject<boolean>(false);
  private readonly currentTimeSubject = new BehaviorSubject<number>(0);
  private readonly durationSubject = new BehaviorSubject<number>(0);
  private rafId = 0;

  readonly playing$ = this.playingSubject.asObservable();
  readonly currentTime$ = this.currentTimeSubject.asObservable();
  readonly duration$ = this.durationSubject.asObservable();

  get isPlaying(): boolean {
    return this.playing;
  }

  play(): void {
    this.ensureAudio();
    const audio = this.audio;
    if (!audio) {
      return;
    }

    this.playing = true;
    this.playingSubject.next(true);
    this.startTicker();
    void audio.play().catch(() => {
      this.playing = false;
      this.playingSubject.next(false);
      this.stopTicker();
    });
  }

  pause(): void {
    this.audio?.pause();
    this.playing = false;
    this.playingSubject.next(false);
    this.stopTicker();
  }

  toggle(): boolean {
    if (this.playing) {
      this.pause();
      return false;
    }

    this.play();
    return true;
  }

  seek(ratio: number): void {
    this.ensureAudio();
    const audio = this.audio;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) {
      return;
    }

    const clamped = Math.min(1, Math.max(0, ratio));
    audio.currentTime = clamped * audio.duration;
    this.currentTimeSubject.next(audio.currentTime);
  }

  /** Adelanta o retrocede la pista actual (segundos). */
  skipBy(seconds: number): void {
    this.ensureAudio();
    const audio = this.audio;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) {
      return;
    }

    const next = Math.min(audio.duration, Math.max(0, audio.currentTime + seconds));
    audio.currentTime = next;
    this.currentTimeSubject.next(audio.currentTime);
  }

  private ensureAudio(): void {
    if (this.audio || !WEDDING_INFO.music.url) {
      return;
    }

    this.audio = new Audio(WEDDING_INFO.music.url);
    this.audio.loop = WEDDING_INFO.music.loop;
    this.audio.volume = WEDDING_INFO.music.volume;
    this.audio.preload = 'metadata';

    this.audio.addEventListener('loadedmetadata', () => {
      this.durationSubject.next(this.audio?.duration ?? 0);
    });

    this.audio.addEventListener('ended', () => {
      if (!WEDDING_INFO.music.loop) {
        this.playing = false;
        this.playingSubject.next(false);
        this.stopTicker();
      }
    });
  }

  private startTicker(): void {
    this.stopTicker();
    const tick = () => {
      if (this.audio) {
        this.currentTimeSubject.next(this.audio.currentTime);
        if (this.audio.duration && this.durationSubject.value !== this.audio.duration) {
          this.durationSubject.next(this.audio.duration);
        }
      }
      this.rafId = window.requestAnimationFrame(tick);
    };
    this.rafId = window.requestAnimationFrame(tick);
  }

  private stopTicker(): void {
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
  }
}
