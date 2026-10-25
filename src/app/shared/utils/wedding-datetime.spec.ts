import { WEDDING_INFO } from '../constants/wedding-info';
import {
  formatDottedDate,
  formatLongDate,
  formatModelTime,
  toGoogleCalendarStamp,
  weddingEventCalendarUrl,
} from './wedding-datetime';

describe('wedding datetime', () => {
  const ceremonyStart = '2026-09-12T17:00:00-05:00';
  const partyStart = '2026-09-12T19:30:00-05:00';

  it('converts Cartagena local time to a Google Calendar stamp', () => {
    expect(toGoogleCalendarStamp(ceremonyStart)).toBe('20260912T220000Z');
    expect(toGoogleCalendarStamp(partyStart)).toBe('20260913T003000Z');
  });

  it('builds the confirmation deadline label from the deadline instant', () => {
    expect(formatLongDate('2026-11-20T23:59:59-05:00')).toBe('20 de noviembre de 2026');
    expect(WEDDING_INFO.confirmation.deadlineLabel).toBe('20 de noviembre de 2026');
  });

  it('formats the dotted model date', () => {
    expect(formatDottedDate('2025-08-24T16:00:00-05:00')).toBe('24 . 08 . 2025');
  });

  it('builds a wedding event calendar link from the couple and the event', () => {
    const url = weddingEventCalendarUrl({
      eventTitle: 'Ceremony',
      wifeName: 'Alex',
      husbandName: 'Sam',
      startsAt: ceremonyStart,
      endsAt: '2026-09-12T18:00:00-05:00',
      location: 'Church',
      details: 'Te esperamos',
    });

    expect(url).toContain('Boda+de+Alex+y+Sam');
    expect(url).toContain('20260912T220000Z');
  });

  it('formats ceremony and party times', () => {
    expect(formatModelTime(ceremonyStart)).toBe('5:00 PM');
    expect(formatModelTime(partyStart)).toBe('7:30 PM');
  });

  it('builds calendar and instagram links from the couple and the event times', () => {
    expect(WEDDING_INFO.events.ceremony.calendarUrl).toContain('20260912T220000Z');
    expect(WEDDING_INFO.events.ceremony.calendarUrl).toContain('Boda+de+Alex+y+Sam');
    expect(WEDDING_INFO.events.party.calendarUrl).toContain('20260913T003000Z/20260913T040000Z');
    expect(WEDDING_INFO.couple.hashtag).toBe('#Alex&Sam');
    expect(WEDDING_INFO.sections.instagram.hashtag).toBe(WEDDING_INFO.couple.hashtag);
    expect(WEDDING_INFO.sections.instagram.url).toBe(
      'https://www.instagram.com/explore/tags/Alex%26Sam/',
    );
  });
});
