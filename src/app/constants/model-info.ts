import { WEDDING_INFO } from '../shared/constants/wedding-info';
import { formatModelTime } from '../shared/utils/wedding-datetime';

const ceremony = WEDDING_INFO.events.ceremony;
const party = WEDDING_INFO.events.party;

export type ModelTimelineIcon = 'rings' | 'camera' | 'dinner' | 'music' | 'sparkle';

export interface ModelTimelineItem {
  time: string;
  label: string;
  icon: ModelTimelineIcon;
}

export const MODEL_INFO = {
  hero: {
    kicker: "We're getting married",
    title: WEDDING_INFO.couple.fullName,
    brideName: WEDDING_INFO.couple.wifeName,
    groomName: WEDDING_INFO.couple.husbandName,
    date: WEDDING_INFO.dates.dottedDate,
    weekday: WEDDING_INFO.dates.weekday,
    monogram: WEDDING_INFO.couple.monogram,
    musicHint: 'Please play music during your visit',
    photoAlt: `${WEDDING_INFO.couple.wifeName} y ${WEDDING_INFO.couple.husbandName}`,
  },

  images: {
    hero: WEDDING_INFO.assets.heroImage,
    footer: WEDDING_INFO.assets.footerImage,
    leaf: WEDDING_INFO.assets.leaf,
    wreath: WEDDING_INFO.assets.wreath,
    flourish: 'assets/images/flourish.png',
    qr: WEDDING_INFO.assets.qrContribute,
  },

  music: {
    title: WEDDING_INFO.music.title,
    artist: WEDDING_INFO.music.artist,
  },

  bigDay: {
    title: 'The Big Day',
    ceremony: {
      title: ceremony.title,
      time: ceremony.time,
      place: ceremony.place,
      address: ceremony.address,
      mapsUrl: ceremony.mapsUrl,
      cta: 'View Location',
    },
    reception: {
      title: party.title,
      time: party.time,
      place: party.place,
      address: party.address,
      mapsUrl: party.mapsUrl,
      cta: 'View Location',
    },
  },

  timeline: {
    title: 'Timeline',
    items: [
      { time: formatModelTime(ceremony.startsAt), label: 'Ceremony', icon: 'rings' },
      { time: '5:00 PM', label: 'Photos & Cocktails', icon: 'camera' },
      { time: formatModelTime(party.startsAt), label: 'Dinner', icon: 'dinner' },
      { time: '7:30 PM', label: 'Dancing & Party', icon: 'music' },
      { time: '11:00 PM', label: 'Sparkler Send-off', icon: 'sparkle' },
    ] as const satisfies readonly ModelTimelineItem[],
  },

  dressCode: WEDDING_INFO.sections.dressCode,
  gifts: WEDDING_INFO.sections.gifts,
  guestInfo: WEDDING_INFO.sections.guestInfo,
  quote: WEDDING_INFO.quote.text,
  instagram: WEDDING_INFO.sections.instagram,

  rsvp: {
    title: 'RSVP',
    text: 'Kindly confirm your attendance by',
    deadline: WEDDING_INFO.confirmation.deadlineBanner,
    buttonText: "Yes, I'll be there!",
  },

  confirmationGuide: {
    title: 'No olvides confirmar tu asistencia',
    text: 'Tu confirmación nos ayuda a organizar todo. Solo te tomará un momento.',
    confirmButton: 'Confirmar asistencia',
    laterButton: 'Más tarde',
  },

  closing: {
    thankYou: 'Thank you!',
    signature: 'With love,',
    names: WEDDING_INFO.couple.fullName,
    photoAlt: `${WEDDING_INFO.couple.wifeName} y ${WEDDING_INFO.couple.husbandName}`,
  },
};
