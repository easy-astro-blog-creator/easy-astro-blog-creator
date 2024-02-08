// import chroma = require("chroma-js");
// import chroma from 'chroma-js';
import chroma, { Color } from 'chroma-js';
import { findContrastLevel, adjustContrastViaLuminance } from './checkContrast';
import colorFunctions from './colorFunctions';

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

type paletteMaterialDesign = {
  '50': Color;
  '100': Color;
  '200': Color;
  '300': Color;
  '400': Color;
  '500': Color;
  '600': Color;
  '700': Color;
  '800': Color;
  '900': Color;
  '950': Color;
}
type paletteCSS = {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  '950': string;
}
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


function generatePalette(colorInput: string | Color, mode: 'hsl' | 'rgb' | 'oklab' | 'oklch'  = 'oklch'): paletteMaterialDesign {
  colorFunctions.validateColor(colorInput);
  const steps = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 ];
  let darkest = chroma(colorInput).luminance(steps[0] / 1000, mode);
  let brightest = chroma(colorInput).luminance(steps[steps.length - 1] / 1000, mode);
  let colorScale = chroma.scale([brightest, colorInput, darkest]).mode(mode);

 
  const colors: Color[] = [];
  steps.forEach((step) => {
    let colorStep = colorScale(step / 1000);
    colors.push(colorStep);
  });

  const paletteOutput: paletteMaterialDesign = {
    '50': colors[0],
    '100': colors[1],
    '200': colors[2],
    '300': colors[3],
    '400': colors[4],
    '500': colors[5],
    '600': colors[6],
    '700': colors[7],
    '800': colors[8],
    '900': colors[9],
    '950': colors[10],
  };
  return paletteOutput;
}

function generateCSSPalette(palette: paletteMaterialDesign): paletteCSS {
  let paletteOutput: paletteCSS = {} as paletteCSS;
  Object.entries(palette).forEach(([key, color]) => {
    paletteOutput[key] = color.css('hsl');
  });
  return paletteOutput;
}

function generateBlendedPalette(
  colorInput: string | Color,
  ): paletteMaterialDesign {
  type ColorMode = 'oklab' | 'oklch' | 'hsl';
  const modes: ColorMode[] = ['oklab', 'oklch', 'hsl']
  colorFunctions.validateColor(colorInput);
  let initialPalettes: paletteMaterialDesign[] = modes.map(mode => generatePalette(colorInput, mode));
  let paletteOutput: paletteMaterialDesign = generatePalette(colorInput);
  Object.keys(paletteOutput).forEach((key) => {
    let colors: Color[] = [];
    for (let palette of initialPalettes) {
      colors.push(palette[key]);
    }
    paletteOutput[key] = chroma.average(colors, 'oklch', [1, 1, 1.33]);
  });
  return paletteOutput;
}

// Wikipedia's text color converted to OKLCH
const defaultText = '#202122';
const defaultTextH = .2471;
const defaultTextS = .002;
const defaultTextL = .24792;

function generateTextColor(colorInput: string | Color, bgColorInput: string | Color, mode: 'light' | 'dark'): textPalette {
  colorFunctions.validateColor(colorInput);
  colorFunctions.validateColor(bgColorInput);

  const initialColor = chroma(defaultText).set('oklch.h', chroma(colorInput).get('oklch.h'));

  const sortedByL = colorFunctions.sortColorsByP([
    findContrastLevel(initialColor, bgColorInput, 'highest', 9, 9), 
    findContrastLevel(initialColor, bgColorInput, 'lowest', 9, 4.5), 
    findContrastLevel(initialColor, bgColorInput, 'middle', 9, 7)], 
    'l');
  
  let mostContrast = sortedByL[0];
  let mediumContrast = sortedByL[1];
  let leastContrast = sortedByL[2];
 
  return {
    lighter: leastContrast.css('hsl'),
    default: mediumContrast.css('hsl'),
    darker: mostContrast.css('hsl'),
  }
}


// Hue 220%
const defaultInitialLink = '#3366CC';
const defaultIitialLinkL = .5325;
const defaultIitialLinkC = .168;
const defaultIitialLinkH = .26229;

// Hue 260%
const defaultVisitedLink = '#795CB2';
const defaultVisitedLinkL = .5431;
const defaultVisitedLinkC = .132;
const defaultVisitedLinkH = .29737;

// Hue 40%
const defaultActiveLink = '#faa700';
const defaultActiveLinkL = .7904;
const defaultActiveLinkC = .16793516725277677;
const defaultActiveLinkH = .7348992356913826;

function generateLinkPalette(textColor: string | Color, primaryColorInput: string | Color , bgColorInput: string | Color): linkPalette {
  colorFunctions.validateColor(textColor);
  colorFunctions.validateColor(primaryColorInput);
  colorFunctions.validateColor(bgColorInput);
  
  const closestColors = colorFunctions.complemetarySplitColors(primaryColorInput);

  let closestColorsSorted = colorFunctions.sortColorsByDifferenceHue(defaultInitialLink, closestColors);
  const newInitialLinkH = closestColorsSorted.shift().get('oklch.h');
  closestColorsSorted = colorFunctions.sortColorsByDifferenceHue(defaultVisitedLink, closestColorsSorted);
  const newVisitedLinkH = closestColorsSorted.shift().get('oklch.h');
  closestColorsSorted = colorFunctions.sortColorsByDifferenceHue(defaultActiveLink, closestColorsSorted);
  const newActiveLinkH = closestColorsSorted.shift().get('oklch.h');

  const newInitialLink = chroma(defaultInitialLink).set('oklch.h', newInitialLinkH);
  const newVisitedLink = chroma(defaultVisitedLink).set('oklch.h', newVisitedLinkH);
  const newActiveLink = chroma(defaultActiveLink).set('oklch.h', newActiveLinkH);
  const finalInitialLink = findContrastLevel(newInitialLink, textColor, 'first', 9, 9);
  const finalVisitedLink = findContrastLevel(newVisitedLink, textColor, 'first', 9, 7);
  const finalActiveLink = findContrastLevel(newActiveLink, textColor, 'first', 9, 4.5);
  return {
    initial: finalInitialLink.css('hsl'),
    visited: finalVisitedLink.css('hsl'),
    active: finalActiveLink.css('hsl'),
  }

}

function generateAccents(colorInput: string | Color, bgColorInput: string | Color): accentPalette {
  colorFunctions.validateColor(colorInput);
  colorFunctions.validateColor(bgColorInput);
  const complementary = colorFunctions.complemetaryColor(colorInput);
  const complementarySplits = colorFunctions.complemetarySplitColors(colorInput);
  
  return {
    primary: findContrastLevel(colorInput, bgColorInput, 'first', 9, 3).css('hsl'),
    complementary: findContrastLevel(complementary, bgColorInput, 'first', 9, 3).css('hsl'),
    complementarySplit1: findContrastLevel(complementarySplits[1], bgColorInput, 'first', 9, 3).css('hsl'),
    complementarySplit2: findContrastLevel(complementarySplits[2], bgColorInput, 'first', 9, 3).css('hsl'),
  }
}





