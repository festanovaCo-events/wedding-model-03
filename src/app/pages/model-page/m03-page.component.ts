import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { M03HeroComponent } from '../../components/hero/m03-hero.component';
import { M03EventsComponent } from '../../components/events/m03-events.component';
import { M03GiftsComponent } from '../../components/gifts/m03-gifts.component';
import { M03RsvpComponent } from '../../components/rsvp/m03-rsvp.component';
import { M03ClosingComponent } from '../../components/closing/m03-closing.component';
import { ModalComponent } from '../../shared/components/common/modal/modal.component';
import { ConfirmationGuideStore } from '../../shared/services/confirmation-guide.store';
import { ModalFlowService } from '../../shared/services/modal-flow.service';
import { InvitationStateService } from '../../shared/services/invitation-state.service';
import { MODEL_03_INFO } from '../../constants/m03-info';
import { InvitationInfoResponse } from '../../shared/interfaces/invitation.interface';
import { hasResponded } from '../../shared/utils/invitation-status';
import { shouldShowExpiredInvitationPage } from '../../shared/utils/confirmation-deadline';

@Component({
  selector: 'app-m03-page',
  standalone: true,
  imports: [
    CommonModule,
    M03HeroComponent,
    M03EventsComponent,
    M03GiftsComponent,
    M03RsvpComponent,
    M03ClosingComponent,
    ModalComponent,
  ],
  templateUrl: './m03-page.component.html',
})
export class M03PageComponent implements OnInit {
  readonly guide = MODEL_03_INFO.confirmationGuide;
  showConfirmationGuide = false;

  private readonly destroyRef = inject(DestroyRef);
  private welcomeAccepted = false;
  private invitationLoadPending = false;
  private isPreviewMode = false;

  constructor(
    private modalFlowService: ModalFlowService,
    private invitationStateService: InvitationStateService,
    private confirmationGuideStore: ConfirmationGuideStore,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          this.isPreviewMode = params['preview'] === '1';
          const invitationToken = typeof params['token'] === 'string' ? params['token'] : undefined;

          if (!invitationToken) {
            this.invitationLoadPending = false;
            if (this.welcomeAccepted) {
              this.tryShowConfirmationGuide();
            }
            return EMPTY;
          }

          this.invitationLoadPending = true;
          return this.invitationStateService.load(invitationToken).pipe(
            catchError(() => {
              this.invitationLoadPending = false;
              if (this.welcomeAccepted) {
                this.tryShowConfirmationGuide();
              }
              return EMPTY;
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.modalFlowService.welcomeModalAccepted$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.welcomeAccepted = true;
        this.tryShowConfirmationGuide();
      });

    this.invitationStateService.invitationData$
      .pipe(
        filter((data): data is InvitationInfoResponse => data !== null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data) => this.handleInvitation(data));
  }

  openConfirmation(): void {
    this.closeGuide();
    this.modalFlowService.requestOpenConfirmationModal();
  }

  closeGuide(): void {
    this.dismissConfirmationGuide();
  }

  private handleInvitation(data: InvitationInfoResponse): void {
    this.invitationLoadPending = false;

    const status = data.data.invitation.status;
    if (!this.isPreviewMode && shouldShowExpiredInvitationPage(status)) {
      void this.router.navigate(['/expired'], {
        queryParamsHandling: 'preserve',
        replaceUrl: true,
      });
      return;
    }

    if (hasResponded(status)) {
      this.dismissConfirmationGuide();
      return;
    }

    if (this.welcomeAccepted) {
      this.tryShowConfirmationGuide();
    }
  }

  private shouldShowConfirmationGuide(): boolean {
    if (this.confirmationGuideStore.hasBeenDismissed()) {
      return false;
    }

    const status = this.invitationStateService.getInvitationData()?.data.invitation.status;
    if (hasResponded(status)) {
      return false;
    }

    return !this.invitationLoadPending;
  }

  private tryShowConfirmationGuide(): void {
    if (this.shouldShowConfirmationGuide()) {
      this.showConfirmationGuide = true;
    }
  }

  private dismissConfirmationGuide(): void {
    this.showConfirmationGuide = false;
    this.confirmationGuideStore.markDismissed();
  }
}
