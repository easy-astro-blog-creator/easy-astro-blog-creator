
/* Color Palette */
/* Find a palette with https://mycolor.space/?hex=%23D4E9F8&sub=1 */
/* Another fun tool is https://huemint.com/illustration-1/ */


import { generateTailwindPalette } from '../utils/color/paletteGenerator';
import { THEME } from '../siteConfig';


const tailwindsPalette = generateTailwindPalette(THEME.primaryColor);

export const tailwindsTheme = {  
    /* Generate color codes with https://uicolors.app/create */
    colors: tailwindsPalette,
    /* Generate gradients with https://mycolor.space/gradient?ori=to+bottom&hex=%23102C41&hex2=%230F2424&sub=1 */
    // backgroundImage: {
    //   // 'gradient-light': 'linear-gradient(to bottom, #f2f9fd, #ebf7fa, #e4f4f6, #ddf2f1, #d8efea)',
    //   'gradient-light': `linear-gradient(to bottom, ${backgroundColor['50']}, ${backgroundColor['200']})`,
    //   'gradient-light-short': `linear-gradient(to bottom, ${secondary['200']}, ${secondary['100']})`,
    //   'gradient-dark': `linear-gradient(to bottom, ${backgroundColor['800']}, ${backgroundColor['900']}, ${backgroundColor['950']})`,
    // },
    fontFamily: {
      sans: ['REM', 'sans-serif'],
    },
  }
  /* https://themes.ionevolve.com/ */

export const daisyuiTheme = {
  "primary": tailwindsPalette.light.primary['500'],
  "secondary": tailwindsPalette.light.primary['500'],
  "accent": tailwindsPalette.light.primary['500'],
  "neutral": tailwindsPalette.light.primary['500'],
  "base-100": tailwindsPalette.light.primary['500'],
}