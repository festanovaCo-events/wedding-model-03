import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { WEDDING_INFO } from '../../../../constants/wedding-info';
import { LetterPhase, NudgeState } from '../../../../interfaces/entrance-letter.types';

@Component({
  selector: 'app-entrance-letter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entrance-letter.component.html',
  styleUrl: './entrance-letter.component.css',
  animations: [
    trigger('panelLeft', [
      state('sealed', style({ transform: 'rotateY(0deg)' })),
      state('open', style({ transform: 'rotateY(-105deg)' })),
      transition(
        'sealed => open',
        animate('1600ms cubic-bezier(0.22, 0.61, 0.36, 1)'),
      ),
    ]),
    trigger('panelRight', [
      state('sealed', style({ transform: 'rotateY(0deg)' })),
      state('open', style({ transform: 'rotateY(105deg)' })),
      transition(
        'sealed => open',
        animate('1600ms cubic-bezier(0.22, 0.61, 0.36, 1)'),
      ),
    ]),
    trigger('actions', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(14px)' }),
        animate('480ms 720ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ],
})
export class EntranceLetterComponent {
  @Input() husbandName = '';
  @Input() wifeName = '';
  @Input() ready = false;
  @Output() accept = new EventEmitter<boolean>();

  phase: LetterPhase = 'sealed';
  nudge: NudgeState = 'idle';
  readonly dateLabel = WEDDING_INFO.dates.bannerDate;
  readonly reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  get hint(): string {
    if (this.phase === 'open') {
      return 'La música de fondo es parte de la experiencia';
    }
    if (!this.ready) {
      return 'Preparando tu invitación';
    }
    return 'Toca para abrir';
  }

  open(): void {
    if (!this.ready || this.phase !== 'sealed') {
      return;
    }
    this.phase = 'open';
  }

  onBackdrop(): void {
    if (!this.ready || this.phase !== 'sealed') {
      return;
    }
    this.nudge = 'shake';
  }

  onNudgeDone(): void {
    this.nudge = 'idle';
  }

  enter(withMusic: boolean): void {
    this.accept.emit(withMusic);
  }
}
