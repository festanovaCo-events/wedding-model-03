import { ACTIVE_THEME } from '../themes/active-theme';
import {
  formatBannerDate,
  formatDottedDate,
  formatEventDateLabel,
  formatLongDate,
  formatModelTime,
  instagramExploreUrl,
  toGoogleCalendarStamp,
  weddingEventCalendarUrl,
} from '../utils/wedding-datetime';

const HUSBAND_NAME = 'Daniel';
const WIFE_NAME = 'Sophia';
const HASHTAG = '#SophiaAndDaniel2025';
const CALENDAR_DETAILS = 'Te esperamos en este momento especial.';

const CEREMONY_START = '2025-08-24T16:00:00-05:00';
const CEREMONY_END = '2025-08-24T17:00:00-05:00';
const PARTY_START = '2025-08-24T18:00:00-05:00';
const PARTY_END = '2025-08-24T23:00:00-05:00';
const CONFIRMATION_DEADLINE = '2025-07-10T23:59:59-05:00';

const CEREMONY_PLACE = "St. Mary's Catholic Church";
const CEREMONY_ADDRESS = '123 Faith Avenue';
const PARTY_PLACE = 'The Botanical Garden';
const PARTY_ADDRESS = '456 Garden Lane';

/** Entrada: 'letter' abre una carta al hacer clic; 'heart' usa el loader del corazón. */
export type EntranceAnimation = 'heart' | 'letter';

const ENTRANCE_ANIMATION = 'letter' as EntranceAnimation;

/** Fecha del diseño de referencia (24.08.2025 SATURDAY). */
const REFERENCE_WEEKDAY = 'SATURDAY';

export const WEDDING_INFO = {
  entrance: ENTRANCE_ANIMATION,

  couple: {
    husbandName: HUSBAND_NAME,
    wifeName: WIFE_NAME,
    fullName: `${WIFE_NAME} & ${HUSBAND_NAME}`,
    monogram: `${WIFE_NAME.charAt(0)} / ${HUSBAND_NAME.charAt(0)}`,
    hashtag: HASHTAG,
  },

  confirmation: {
    deadline: CONFIRMATION_DEADLINE,
    deadlineLabel: formatLongDate(CONFIRMATION_DEADLINE),
    deadlineBanner: 'JULY 10, 2025',
  },

  dates: {
    bannerDate: formatBannerDate(CEREMONY_START),
    dottedDate: formatDottedDate(CEREMONY_START),
    weekday: REFERENCE_WEEKDAY,
    weddingDate: CEREMONY_START,
    ceremonyDate: formatEventDateLabel(CEREMONY_START),
    partyDate: formatEventDateLabel(PARTY_START),
    ceremonyDateTimeISO: toGoogleCalendarStamp(CEREMONY_START),
    ceremonyEndDateTimeISO: toGoogleCalendarStamp(CEREMONY_END),
    partyDateTimeISO: toGoogleCalendarStamp(PARTY_START),
    partyEndDateTimeISO: toGoogleCalendarStamp(PARTY_END),
  },

  quote: {
    text: 'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.',
  },

  events: {
    ceremony: {
      title: 'Ceremony',
      place: CEREMONY_PLACE,
      address: CEREMONY_ADDRESS,
      location: `${CEREMONY_PLACE}, ${CEREMONY_ADDRESS}`,
      date: formatEventDateLabel(CEREMONY_START),
      time: formatModelTime(CEREMONY_START),
      startsAt: CEREMONY_START,
      endsAt: CEREMONY_END,
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=St+Marys+Catholic+Church',
      calendarUrl: weddingEventCalendarUrl({
        eventTitle: 'Ceremony',
        wifeName: WIFE_NAME,
        husbandName: HUSBAND_NAME,
        startsAt: CEREMONY_START,
        endsAt: CEREMONY_END,
        location: `${CEREMONY_PLACE}, ${CEREMONY_ADDRESS}`,
        details: CALENDAR_DETAILS,
      }),
    },
    party: {
      title: 'Reception',
      place: PARTY_PLACE,
      address: PARTY_ADDRESS,
      location: `${PARTY_PLACE}, ${PARTY_ADDRESS}`,
      date: formatEventDateLabel(PARTY_START),
      time: formatModelTime(PARTY_START),
      startsAt: PARTY_START,
      endsAt: PARTY_END,
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Botanical+Garden',
      calendarUrl: weddingEventCalendarUrl({
        eventTitle: 'Reception',
        wifeName: WIFE_NAME,
        husbandName: HUSBAND_NAME,
        startsAt: PARTY_START,
        endsAt: PARTY_END,
        location: `${PARTY_PLACE}, ${PARTY_ADDRESS}`,
        details: CALENDAR_DETAILS,
      }),
    },
  },

  music: {
    url: ACTIVE_THEME.assets.music,
    title: 'Love Me Like You Do',
    artist: 'Ellie Goulding',
    volume: 0.35,
    loop: true,
  },

  assets: {
    bannerImage: ACTIVE_THEME.assets.bannerImage,
    decoration: ACTIVE_THEME.assets.decoration,
    heroImage: 'assets/images/hero.png',
    footerImage: 'assets/images/footer.png',
    leaf: 'assets/images/leaf.png',
    wreath: 'assets/images/wreath.png',
    qrContribute: 'assets/images/qr-contribute.svg',
  },

  animations: ACTIVE_THEME.animations,

  sections: {
    gifts: {
      title: 'A Gift of Love',
      description:
        'Your presence is the greatest gift. If you wish to honor us further, a contribution toward our future would mean the world.',
      scanLabel: 'Scan to contribute',
    },
    instagram: {
      title: 'Capture the Moment',
      description: 'Share your photos with our hashtag',
      buttonText: 'View on Instagram',
      hashtag: HASHTAG,
      url: instagramExploreUrl(HASHTAG),
    },
    dressCode: {
      title: 'Dress Code',
      label: 'Semi Formal',
      colors: ['#0B2E2A', '#6E7F55', '#C9A84C', '#C5B8A4', '#F7F3EB'],
    },
    guestInfo: {
      title: 'Guest Information',
      transportation: {
        title: 'Transportation',
        text: 'Shuttle service available from the ceremony to the reception starting at 5:30 PM.',
      },
      accommodations: {
        title: 'Accommodations',
        text: `Hotel block reserved at The Grand Hotel. Mention ${WIFE_NAME} & ${HUSBAND_NAME} for the group rate.`,
      },
      capture: {
        title: 'Capture the Moment',
        text: HASHTAG,
      },
    },
  },
};
