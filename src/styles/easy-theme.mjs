
/* Color Palette */
/* Find a palette with https://mycolor.space/?hex=%23D4E9F8&sub=1 */
/* Another fun tool is https://huemint.com/illustration-1/ */


import generateTailwindPalette from '../utils/paletteGenerator';
import { THEME } from '../siteConfig';


const primaryColor = generateTailwindPalette(THEME.primaryColor);
const secondary = generateTailwindPalette(THEME.secondaryColor);
const accent = generateTailwindPalette(THEME.accentColor);
const neutral = generateTailwindPalette(THEME.neutralColor);
const base = generateTailwindPalette(THEME.baseColor);

export const tailwindsTheme = {  
  theme: {
    /* Generate color codes with https://uicolors.app/create */
    colors: {
      'primary-color': primaryColor,
      'secondary-color': secondary,
      'accent-color': accent,
      'neutral-color': neutral,
      'base-color': base,
    },
    /* Generate gradients with https://mycolor.space/gradient?ori=to+bottom&hex=%23102C41&hex2=%230F2424&sub=1 */
    backgroundImage: {
      // 'gradient-light': 'linear-gradient(to bottom, #f2f9fd, #ebf7fa, #e4f4f6, #ddf2f1, #d8efea)',
      'gradient-light': `linear-gradient(to bottom, ${base['50']}, ${base['200']})`,
      'gradient-light-short': `linear-gradient(to bottom, ${secondary['200']}, ${secondary['100']})`,
      'gradient-dark': `linear-gradient(to bottom, ${base['800']}, ${base['900']}, ${base['950']})`,
    },
    fontFamily: {
      sans: ['REM', 'sans-serif'],
    },
  },
  /* https://themes.ionevolve.com/ */
}

export const daisyuiTheme = {
  "primary": primaryColor['500'],
  "secondary": secondary['500'],
  "accent": accent['500'],
  "neutral": neutral['500'],
  "base-100": base['500'],
}