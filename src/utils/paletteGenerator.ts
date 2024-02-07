// import chroma = require("chroma-js");
// import chroma from 'chroma-js';
import chroma, { Color } from 'chroma-js';
import { findContrastLevel } from './checkContrast';
import colorFunctions from './colorFunctions';

interface TailwindPalette {
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

interface LinkPalette {
  initial: string;
  visited: string;
  active: string;
}


const steps = 11;
const darkMax = 0.95;
const lightMax = 0.01;


export function generateTailwindPalette(colorInput: string): TailwindPalette {
  if (!chroma.valid(colorInput)) {
    throw new Error(`Invalid color: ${colorInput}. See https://gka.github.io/chroma.js/#chroma-valid for valid color formats.`);
  }

  const oklabPalette = generatePalette(colorInput, 'oklab');
  const oklchPalette = generatePalette(colorInput, 'oklch');
  const hslPalette = generatePalette(colorInput, 'hsl');

  const blendedColors: Color[] = [];
  for (let i = 1; i <= steps; i++) {
    const oklabColor = oklabPalette[i - 1];
    const oklchColor = oklchPalette[i - 1];
    const hslColor = hslPalette[i - 1];
    const blendedColor = chroma.average([oklabColor, oklchColor, hslColor], 'oklch', [1,1,1.5]);
    blendedColors.push(blendedColor);
  };

  const stringFormattedColorScale = blendedColors.map((color) => {
    // primary: 'rgb(var(--color-primary) / <alpha-value>)',
    return color.css('hsl');
  });
  
  const tailwindPalette: TailwindPalette = {
    '50': stringFormattedColorScale[0],
    '100': stringFormattedColorScale[1],
    '200': stringFormattedColorScale[2],
    '300': stringFormattedColorScale[3],
    '400': stringFormattedColorScale[4],
    '500': stringFormattedColorScale[5],
    '600': stringFormattedColorScale[6],
    '700': stringFormattedColorScale[7],
    '800': stringFormattedColorScale[8],
    '900': stringFormattedColorScale[9],
    '950': stringFormattedColorScale[10],
  };
  return tailwindPalette;
}

function generatePalette(colorInput: string, mode: 'hsl' | 'lab' | 'lch' | 'rgb' | 'hsv' | 'oklab' | 'oklch') {
  let brightest = chroma(colorInput).luminance(lightMax, mode);
  let darkest = chroma(colorInput).luminance(darkMax, mode);
  let colorScale = chroma.scale([darkest, colorInput, brightest]).mode(mode);
 
  
  let luminanceSteps: number[] = [];
  for (let i = 1; i <= steps; i++) {
    let fraction = (i - 1) / (steps - 1);
    let position = lightMax + fraction * (darkMax - lightMax);
    luminanceSteps.push(position);
  };
  // luminanceSteps = luminanceSteps.sort((a, b) => b - a);

  const colors: Color[] = [];
  luminanceSteps.forEach((luminanceStep) => {
    let colorStep = colorScale(luminanceStep);
    colors.push(colorStep);
  });
  return colors;
}

const defaultText = '#202122';
const defaultTextH = chroma(defaultText).get('hsl.h');
const defaultTextS = chroma(defaultText).get('hsl.s');
const defaultTextL = chroma(defaultText).get('hsl.l');

// Hue 220%
const defaultInitialLink = '#3366CC';
const defaultIitialLinkL = chroma(defaultInitialLink).get('oklch.l');
const defaultIitialLinkC = chroma(defaultInitialLink).get('oklch.c');
const defaultIitialLinkH = chroma(defaultInitialLink).get('oklch.h');

// Hue 260%
const defaultVisitedLink = '#795CB2';
const defaultVisitedLinkL = chroma(defaultVisitedLink).get('oklch.l');
const defaultVisitedLinkC = chroma(defaultVisitedLink).get('oklch.c');
const defaultVisitedLinkH = chroma(defaultVisitedLink).get('oklch.h');

// Hue 40%
const defaultActiveLink = '#faa700';
const defaultActiveLinkL = chroma(defaultActiveLink).get('oklch.l');
const defaultActiveLinkC = chroma(defaultActiveLink).get('oklch.c');
const defaultActiveLinkH = chroma(defaultActiveLink).get('oklch.h');

export  function generateLinkPalette(primaryColorInput: string | Color , bgColorInput: string | Color): LinkPalette {
  colorFunctions.validateColor(primaryColorInput);
  colorFunctions.validateColor(bgColorInput);
  let testColors: { [key: string]: any  } = {}
  testColors['complementary'] = colorFunctions.complemetaryColor(primaryColorInput);
  testColors['complementarySplit'] = colorFunctions.complemetarySplitColors(primaryColorInput);
  testColors['triadic'] = colorFunctions.triadicColors(primaryColorInput);
  testColors['tetradic'] = colorFunctions.tetradicColors(primaryColorInput);
  testColors['analogous'] = colorFunctions.analogousColors(primaryColorInput);
  testColors['square'] = colorFunctions.squareColors(primaryColorInput);
  const closestScheme = findClosestScheme(defaultInitialLink, testColors);

  let closestColors: Color[];
  switch (closestScheme) {
    case 'complementary':
      closestColors = colorFunctions.complemetaryColor(primaryColorInput);
    case 'complementarySplit':
      closestColors = colorFunctions.complemetarySplitColors(primaryColorInput);
    case 'triadic':
      closestColors = colorFunctions.triadicColors(primaryColorInput);
    case 'tetradic':
      closestColors = colorFunctions.tetradicColors(primaryColorInput);
    case 'analogous':
      closestColors = colorFunctions.analogousColors(primaryColorInput);
    case 'square':
      closestColors = colorFunctions.squareColors(primaryColorInput);
  };

  let sortedColors = sortColorsByCloseness(defaultInitialLink, closestColors);
  const differenceInitialToVisited = getDifference(defaultVisitedLink, defaultInitialLink)
  let maybeVisitedH = (chroma(sortedColors[0]).get('oklch.h') + differenceInitialToVisited) % 360;
  // sortedColors.push(chroma(sortedColors[0]).set('oklch.h', maybeVisitedH));
  // sortedColors = sortColorsByCloseness(defaultInitialLink, sortedColors);

  const colorInputL = chroma(primaryColorInput).get('oklch.l');
  const colorInputC = chroma(primaryColorInput).get('oklch.c');
  
  const newInitialLink = chroma.oklch((defaultIitialLinkL + colorInputL) / 2, (defaultIitialLinkC + colorInputC) / 2, sortColorsByCloseness(defaultInitialLink, sortedColors)[0].get('oklch.h'));
  
  const newVisitedLink = chroma.oklch((defaultVisitedLinkL + colorInputL) / 2, (defaultVisitedLinkC + colorInputC) / 2, maybeVisitedH);

  const newActiveLink = chroma.oklch((defaultActiveLinkL + colorInputL) / 2, (defaultActiveLinkC + colorInputC) / 2, sortColorsByCloseness(defaultActiveLink, sortedColors)[0].get('oklch.h'));
  
  return {
    initial: findContrastLevel(bgColorInput, newInitialLink, 'first').css('hsl'),
    visited: findContrastLevel(bgColorInput, newVisitedLink, 'first').css('hsl'),
    active: findContrastLevel(bgColorInput, newActiveLink, 'first').css('hsl'),
  }
}

function findClosestScheme(matchColor: Color | string, testColors: {[key: string]: [Color] }): string {
  colorFunctions.validateColor(matchColor);
  let closestScheme = '';
  let closestMatch = Infinity; 
  Object.entries(testColors).forEach(([schemeName, schemeColors]) => {
    schemeColors.forEach(schemeColor => {
      const difference = getDifference(matchColor, schemeColor);
      if (closestMatch === 0 || difference < closestMatch) {
        closestMatch = difference;
        closestScheme = schemeName;
      }
    });
  })
  return closestScheme;
}

function sortColorsByCloseness(matchColor: Color | string, testColors: Color[]) {
  const huesWithDifferences = testColors.map(hue => {
    let difference = getDifference(matchColor, hue);
    return { hue, difference };
  });
  huesWithDifferences.sort((a, b) => a.difference - b.difference);
  return huesWithDifferences.map(item => item.hue);
}

function getDifference(color1: Color | string, color2: Color | string) {
  let difference = Math.abs(chroma(color1).get('oklch.h') - chroma(color2).get('oklch.h'));
  difference = difference > 180 ? 360 - difference : difference;
  return difference;
}

  