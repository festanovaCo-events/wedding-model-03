import {
  InvitationStatus,
  InvitationStatusView,
} from '../interfaces/invitation.interface';

export function invitationStatusView(
  status: InvitationStatus | null | undefined,
): InvitationStatusView {
  switch (status) {
    case 'ACCEPTED':
      return { isAccepted: true, isDeclined: false, hasResponded: true };
    case 'DECLINED':
      return { isAccepted: false, isDeclined: true, hasResponded: true };
    case 'PENDING':
    case null:
    case undefined:
      return { isAccepted: false, isDeclined: false, hasResponded: false };
    default: {
      const unexpectedStatus: never = status;
      return unexpectedStatus;
    }
  }
}

export function hasResponded(status: InvitationStatus | null | undefined): boolean {
  return invitationStatusView(status).hasResponded;
}
