import { WEDDING_INFO } from '../../shared/constants/wedding-info';
import { ACTIVE_THEME } from '../../shared/themes/active-theme';

export const MODEL_INFO = {
  hero: {
    title: WEDDING_INFO.couple.fullName,
    date: WEDDING_INFO.dates.bannerDate,
    quote: WEDDING_INFO.quote.text,
  },
  decoration: ACTIVE_THEME.assets.decoration,
  gifts: WEDDING_INFO.sections.gifts,
  rsvp: {
    title: 'Confirmación',
    text: 'Confirma tu asistencia antes del',
    buttonText: 'Confirmar asistencia',
  },
};
