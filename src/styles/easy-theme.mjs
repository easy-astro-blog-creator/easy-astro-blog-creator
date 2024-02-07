
/* Color Palette */
/* Find a palette with https://mycolor.space/?hex=%23D4E9F8&sub=1 */
/* Another fun tool is https://huemint.com/illustration-1/ */


import { generateTailwindPalette, generateLinkPalette } from '../utils/paletteGenerator';
import { THEME } from '../siteConfig';


const primaryColor = generateTailwindPalette(THEME.primaryColor);
const secondary = generateTailwindPalette(THEME.secondaryColor);
const accent = generateTailwindPalette(THEME.accentColor);
const neutral = generateTailwindPalette(THEME.neutralColor);
const backgroundColor = generateTailwindPalette(THEME.backgroundColor);

const linkPalette = generateLinkPalette(THEME.primaryColor, backgroundColor['50']);


export const tailwindsTheme = {  
    /* Generate color codes with https://uicolors.app/create */
    colors: {
      'links': {
        'initial': linkPalette.initial,
        'visited': linkPalette.visited,
        'active': linkPalette.active,
      },
      'primary-color': primaryColor,
      'background-color': backgroundColor,
    },
    /* Generate gradients with https://mycolor.space/gradient?ori=to+bottom&hex=%23102C41&hex2=%230F2424&sub=1 */
    backgroundImage: {
      // 'gradient-light': 'linear-gradient(to bottom, #f2f9fd, #ebf7fa, #e4f4f6, #ddf2f1, #d8efea)',
      'gradient-light': `linear-gradient(to bottom, ${backgroundColor['50']}, ${backgroundColor['200']})`,
      'gradient-light-short': `linear-gradient(to bottom, ${secondary['200']}, ${secondary['100']})`,
      'gradient-dark': `linear-gradient(to bottom, ${backgroundColor['800']}, ${backgroundColor['900']}, ${backgroundColor['950']})`,
    },
    fontFamily: {
      sans: ['REM', 'sans-serif'],
    },
  }
  /* https://themes.ionevolve.com/ */

export const daisyuiTheme = {
  "primary": primaryColor['500'],
  "secondary": secondary['500'],
  "accent": accent['500'],
  "neutral": neutral['500'],
  "base-100": backgroundColor['500'],
}