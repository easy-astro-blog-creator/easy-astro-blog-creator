// import chroma = require("chroma-js");
// import chroma from 'chroma-js';
import chroma from 'chroma-js';
import { findContrastLevel, adjustContrastViaLuminance } from './checkContrast';
import colorFunctions from './colorFunctions';

export const tailwindsTheme = {  
  colors: materialPalette,
  // backgroundImage: {
  //   // 'gradient-light': 'linear-gradient(to bottom, #f2f9fd, #ebf7fa, #e4f4f6, #ddf2f1, #d8efea)',
  //   'gradient-light': `linear-gradient(to bottom, ${backgroundColor['50']}, ${backgroundColor['200']})`,
  //   'gradient-light-short': `linear-gradient(to bottom, ${secondary['200']}, ${secondary['100']})`,
  //   'gradient-dark': `linear-gradient(to bottom, ${backgroundColor['800']}, ${backgroundColor['900']}, ${backgroundColor['950']})`,
  // },
}


// export const daisyuiTheme = {
//   "primary": tailwindsPalette.light.primary['500'],
//   "secondary": tailwindsPalette.light.primary['500'],
//   "accent": tailwindsPalette.light.primary['500'],
//   "neutral": tailwindsPalette.light.primary['500'],
//   "base-100": tailwindsPalette.light.primary['500'],
// }

type TailwindPalette = {
  light: {
    background: {
        default: string;
    },
    text: textPalette;
    links: linkPalette;
    primary: paletteCSS;
    complementary: paletteCSS;
    accents: accentPalette;
  },
  dark: {
    background: {
      default: string;
    },
    text: textPalette;
    links: linkPalette;
    primary: paletteCSS;
    complementary: paletteCSS;
    accents: accentPalette;
  },
};

type accentPalette = {
primary: string;
complementary: string;
complementarySplit1: string;
complementarySplit2: string;
}
type linkPalette = {
initial: string;
visited: string;
active: string;
}

type textPalette = {
lighter: string;
default: string;
darker: string;
}


// Primary color palette
// text - light and dark
// background - light and dark
// links - initial, visited, active - light and dark

const tailwindsPalette = generateTailwindPalette(THEME.primary);
const materialPalette = tailwindThemeFromColor(THEME.primary, tailwindsPalette.light.primary['500'], tailwindsPalette.light.complementary['500'], 'vibrant');




export function generateTailwindPalette(colorInput: string): TailwindPalette {
colorFunctions.validateColor(colorInput);

const primary = generatePalette(colorInput);
const complementary = generatePalette(colorFunctions.complemetaryColor(colorInput));

const bgLight = primary['50'];
const bgDark = primary['950'];

const accentsLight = generateAccents(colorInput, bgLight);
const accentsDark = generateAccents(colorInput, bgDark);

const textLight = generateTextColor(primary['900'], bgLight, 'light');
const textDark = generateTextColor(primary['100'], bgDark, 'dark');

const linksLight = generateLinkPalette(textLight.default, primary['900'], bgLight);
const linksDark = generateLinkPalette(textDark.default, primary['100'], bgDark);

const tailwindPalette: TailwindPalette = {
  light: {
    background: {
      default: bgLight.css('hsl'),
    },
    text: textLight,
    links: linksLight,
    primary: generateCSSPalette(primary),
    complementary: generateCSSPalette(complementary),
    accents: accentsLight,
  },
  dark: {
    background: {
      default: bgDark.css('hsl'),
    },
    text: textDark,
    links: linksDark,
    primary: generateCSSPalette(primary),
    complementary: generateCSSPalette(complementary),
    accents: accentsDark,
  },
};
return tailwindPalette;
}


function generateCSSPalette(palette: paletteMaterialDesign): paletteCSS {
let paletteOutput: paletteCSS = {} as paletteCSS;
Object.entries(palette).forEach(([key, color]) => {
  paletteOutput[key] = color.css('hsl');
});
return paletteOutput;
}



// // Wikipedia's text color converted to OKLCH
// const defaultText = '#202122';
// const defaultTextH = .2471;
// const defaultTextS = .002;
// const defaultTextL = .24792;

// function generateTextColor(colorInput: string | chroma.Color, bgColorInput: string | chroma.Color, mode: 'light' | 'dark'): textPalette {
// colorFunctions.validateColor(colorInput);
// colorFunctions.validateColor(bgColorInput);

// const initialColor = chroma(defaultText).set('oklch.h', chroma(colorInput).get('oklch.h'));

// const sortedByL = colorFunctions.sortColorsByP([
//   findContrastLevel(initialColor, bgColorInput, 'highest', 9, 7), 
//   findContrastLevel(initialColor, bgColorInput, 'lowest', 9, 4.5), 
//   findContrastLevel(initialColor, bgColorInput, 'middle', 9, 7)], 
//   'l');

// let mostContrast = sortedByL[0];
// let mediumContrast = sortedByL[1];
// let leastContrast = sortedByL[2];

// return {
//   lighter: leastContrast.css('hsl'),
//   default: mediumContrast.css('hsl'),
//   darker: mostContrast.css('hsl'),
// }
// }


// // Hue 220%
// const defaultInitialLink = '#3366CC';
// const defaultIitialLinkL = .5325;
// const defaultIitialLinkC = .168;
// const defaultIitialLinkH = .26229;

// // Hue 260%
// const defaultVisitedLink = '#795CB2';
// const defaultVisitedLinkL = .5431;
// const defaultVisitedLinkC = .132;
// const defaultVisitedLinkH = .29737;

// // Hue 40%
// const defaultActiveLink = '#faa700';
// const defaultActiveLinkL = .7904;
// const defaultActiveLinkC = .16793516725277677;
// const defaultActiveLinkH = .7348992356913826;

// function generateLinkPalette(textColor: string | chroma.Color, primaryColorInput: string | chroma.Color , bgColorInput: string | chroma.Color): linkPalette {
//   colorFunctions.validateColor(textColor);
//   colorFunctions.validateColor(primaryColorInput);
//   colorFunctions.validateColor(bgColorInput);
  
//   const closestColors = colorFunctions.complemetarySplitColors(primaryColorInput);

//   let closestColorsSorted = colorFunctions.sortColorsByDifferenceHue(defaultInitialLink, closestColors);
//   const newInitialLinkH = closestColorsSorted.shift().get('oklch.h');
//   closestColorsSorted = colorFunctions.sortColorsByDifferenceHue(defaultVisitedLink, closestColorsSorted);
//   const newVisitedLinkH = closestColorsSorted.shift().get('oklch.h');
//   closestColorsSorted = colorFunctions.sortColorsByDifferenceHue(defaultActiveLink, closestColorsSorted);
//   const newActiveLinkH = closestColorsSorted.shift().get('oklch.h');

//   const newInitialLink = chroma(defaultInitialLink).set('oklch.h', newInitialLinkH);
//   const newVisitedLink = chroma(defaultVisitedLink).set('oklch.h', newVisitedLinkH);
//   const newActiveLink = chroma(defaultActiveLink).set('oklch.h', newActiveLinkH);
//   const finalInitialLink = findContrastLevel(newInitialLink, textColor, 'first', 9, 9);
//   const finalVisitedLink = findContrastLevel(newVisitedLink, textColor, 'first', 9, 7);
//   const finalActiveLink = findContrastLevel(newActiveLink, textColor, 'first', 9, 4.5);
//   return {
//     initial: finalInitialLink.css('hsl'),
//     visited: finalVisitedLink.css('hsl'),
//     active: finalActiveLink.css('hsl'),
//   }

// }

// function generateAccents(colorInput: string | chroma.Color, bgColorInput: string | chroma.Color): accentPalette {
//   colorFunctions.validateColor(colorInput);
//   colorFunctions.validateColor(bgColorInput);
//   const complementary = colorFunctions.complemetaryColor(colorInput);
//   const complementarySplits = colorFunctions.complemetarySplitColors(colorInput);
  
//   return {
//     primary: findContrastLevel(colorInput, bgColorInput, 'first', 9, 3).css('hsl'),
//     complementary: findContrastLevel(complementary, bgColorInput, 'first', 9, 3).css('hsl'),
//     complementarySplit1: findContrastLevel(complementarySplits[1], bgColorInput, 'first', 9, 3).css('hsl'),
//     complementarySplit2: findContrastLevel(complementarySplits[2], bgColorInput, 'first', 9, 3).css('hsl'),
//   }
// }





