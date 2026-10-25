import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WEDDING_INFO } from '../../shared/constants/wedding-info';
import { MODEL_03_INFO } from '../../constants/m03-info';
import { RsvpView } from '../../shared/interfaces/rsvp-view.interface';
import { ConfirmationModalHostComponent } from '../../shared/components/confirmations/confirmation-modal-host.component';
import { ConfirmationStatusComponent } from '../../shared/components/confirmations/confirmation-status/confirmation-status.component';
import { DeclinedStatusComponent } from '../../shared/components/confirmations/declined-status/declined-status.component';
import { ErrorStatusComponent } from '../../shared/components/confirmations/error-status/error-status.component';
import { InvitationStateService } from '../../shared/services/invitation-state.service';
import { ModalFlowService } from '../../shared/services/modal-flow.service';
import { hasResponded, invitationStatusView } from '../../shared/utils/invitation-status';

@Component({
  selector: 'app-m03-rsvp',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmationModalHostComponent,
    ConfirmationStatusComponent,
    DeclinedStatusComponent,
    ErrorStatusComponent,
  ],
  templateUrl: './m03-rsvp.component.html',
})
export class M03RsvpComponent implements OnInit {
  readonly weddingInfo = WEDDING_INFO;
  readonly info = MODEL_03_INFO.rsvp;
  readonly leaf = MODEL_03_INFO.images.leaf;
  readonly flourish = MODEL_03_INFO.images.flourish;
  readonly view$: Observable<RsvpView>;

  isConfirmationModalVisible = false;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private invitationStateService: InvitationStateService,
    private modalFlowService: ModalFlowService,
  ) {
    this.view$ = combineLatest([
      this.invitationStateService.invitationData$,
      this.invitationStateService.error$,
    ]).pipe(
      map(([invitationData, error]): RsvpView => {
        const status = invitationStatusView(invitationData?.data.invitation.status);
        return {
          invitationData,
          error,
          isConfirmed: status.isAccepted,
          isDeclined: status.isDeclined,
        };
      }),
    );
  }

  ngOnInit(): void {
    this.invitationStateService.error$
      .pipe(
        filter((error): error is string => !!error),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.isConfirmationModalVisible = false;
      });

    this.modalFlowService.openConfirmationModal$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.openConfirmation());
  }

  openConfirmation(): void {
    const status = this.invitationStateService.getInvitationData()?.data.invitation.status;
    if (hasResponded(status) || this.invitationStateService.getError()) {
      return;
    }
    this.isConfirmationModalVisible = true;
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalVisible = false;
  }
}
