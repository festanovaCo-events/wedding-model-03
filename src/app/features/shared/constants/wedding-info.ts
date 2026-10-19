import { ACTIVE_THEME } from '../themes/active-theme';
import {
  buildGoogleCalendarUrl,
  formatBannerDate,
  formatEventDateLabel,
  formatLongDate,
  instagramExploreUrl,
  toGoogleCalendarStamp,
} from '../utils/wedding-datetime';

const HUSBAND_NAME = 'Alex';
const WIFE_NAME = 'Sam';
const HASHTAG = `#${HUSBAND_NAME}&${WIFE_NAME}`;
const CALENDAR_DETAILS = 'Te esperamos en este momento especial.';

const CEREMONY_START = '2026-09-12T17:00:00-05:00';
const CEREMONY_END = '2026-09-12T18:00:00-05:00';
const PARTY_START = '2026-09-12T19:30:00-05:00';
const PARTY_END = '2026-09-12T23:00:00-05:00';
const CONFIRMATION_DEADLINE = '2026-11-20T23:59:59-05:00';

const CEREMONY_PLACE = 'Lugar de la ceremonia';
const CEREMONY_ADDRESS = 'Dirección de la ceremonia';
const PARTY_PLACE = 'Lugar de la fiesta';
const PARTY_ADDRESS = 'Dirección de la fiesta';

/** Entrada: 'letter' abre una carta al hacer clic; 'heart' usa el loader del corazón. */
export type EntranceAnimation = 'heart' | 'letter';

function entranceAnimation(): EntranceAnimation {
  return 'letter';
}

function calendarUrl(title: string, startsAt: string, endsAt: string, location: string): string {
  return buildGoogleCalendarUrl({
    title: `Boda de ${HUSBAND_NAME} y ${WIFE_NAME} (${title})`,
    startsAt,
    endsAt,
    location,
    details: CALENDAR_DETAILS,
  });
}

export const WEDDING_INFO = {
  entrance: entranceAnimation(),

  couple: {
    husbandName: HUSBAND_NAME,
    wifeName: WIFE_NAME,
    fullName: `${HUSBAND_NAME} & ${WIFE_NAME}`,
    hashtag: HASHTAG,
  },

  confirmation: {
    deadline: CONFIRMATION_DEADLINE,
    deadlineLabel: formatLongDate(CONFIRMATION_DEADLINE),
  },

  dates: {
    bannerDate: formatBannerDate(CEREMONY_START),
    weddingDate: CEREMONY_START,
    ceremonyDate: formatEventDateLabel(CEREMONY_START),
    partyDate: formatEventDateLabel(PARTY_START),
    ceremonyDateTimeISO: toGoogleCalendarStamp(CEREMONY_START),
    ceremonyEndDateTimeISO: toGoogleCalendarStamp(CEREMONY_END),
    partyDateTimeISO: toGoogleCalendarStamp(PARTY_START),
    partyEndDateTimeISO: toGoogleCalendarStamp(PARTY_END),
  },

  quote: {
    text: 'Una frase de la pareja va aquí.',
  },

  events: {
    ceremony: {
      title: 'Ceremonia',
      place: CEREMONY_PLACE,
      address: CEREMONY_ADDRESS,
      location: 'Dirección de la ceremonia',
      date: formatEventDateLabel(CEREMONY_START),
      startsAt: CEREMONY_START,
      endsAt: CEREMONY_END,
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bogota',
      calendarUrl: calendarUrl('Ceremonia', CEREMONY_START, CEREMONY_END, `${CEREMONY_PLACE}, ${CEREMONY_ADDRESS}`),
    },
    party: {
      title: 'Fiesta',
      place: PARTY_PLACE,
      address: PARTY_ADDRESS,
      location: 'Dirección de la fiesta',
      date: formatEventDateLabel(PARTY_START),
      startsAt: PARTY_START,
      endsAt: PARTY_END,
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bogota',
      calendarUrl: calendarUrl('Fiesta', PARTY_START, PARTY_END, `${PARTY_PLACE}, ${PARTY_ADDRESS}`),
    },
  },

  music: {
    url: ACTIVE_THEME.assets.music,
    volume: 0.3,
    loop: true,
  },

  assets: {
    bannerImage: ACTIVE_THEME.assets.bannerImage,
    decoration: ACTIVE_THEME.assets.decoration,
  },

  animations: ACTIVE_THEME.animations,

  sections: {
    gifts: {
      title: 'Regalos',
      description: 'El texto de la sección de regalos va aquí.',
    },
    instagram: {
      title: 'Fotos del día',
      description: 'Invita a compartir las fotos de la celebración.',
      buttonText: 'Ver en Instagram',
      hashtag: HASHTAG,
      url: instagramExploreUrl(HASHTAG),
    },
  },
};
