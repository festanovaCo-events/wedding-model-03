import { hasResponded, invitationStatusView } from './invitation-status';

describe('invitation status', () => {
  it('treats accepted and declined as already answered', () => {
    expect(hasResponded('ACCEPTED')).toBeTrue();
    expect(hasResponded('DECLINED')).toBeTrue();
    expect(hasResponded('PENDING')).toBeFalse();
    expect(hasResponded(null)).toBeFalse();
    expect(hasResponded(undefined)).toBeFalse();
  });

  it('maps each status to one view', () => {
    expect(invitationStatusView('ACCEPTED')).toEqual({
      isAccepted: true,
      isDeclined: false,
      hasResponded: true,
    });
    expect(invitationStatusView('DECLINED')).toEqual({
      isAccepted: false,
      isDeclined: true,
      hasResponded: true,
    });
    expect(invitationStatusView('PENDING')).toEqual({
      isAccepted: false,
      isDeclined: false,
      hasResponded: false,
    });
  });
});
