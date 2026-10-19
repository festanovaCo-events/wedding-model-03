import { TEMPLATE_STARTER_A } from './template-starter-a.theme';
import { TEMPLATE_STARTER_B } from './template-starter-b.theme';

describe('theme palette values', () => {
  it('uses the primary color for starter-b headings', () => {
    expect(TEMPLATE_STARTER_B.palette.heading).toBe('#3D5A80');
  });

  it('keeps starter-a headings on the starter primary color', () => {
    expect(TEMPLATE_STARTER_A.palette.heading).toBe('#5C4A3A');
  });

  it('uses a dedicated color for card headings', () => {
    expect(TEMPLATE_STARTER_A.palette.cardHeading).toBe('#8B6F4A');
    expect(TEMPLATE_STARTER_B.palette.cardHeading).toBe('#3D5A80');
  });
});
