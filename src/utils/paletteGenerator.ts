// import chroma = require("chroma-js");
// import chroma from 'chroma-js';
import chroma, { Color } from 'chroma-js';

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


const steps = 11;
const darkMax = 0.95;
const lightMax = 0.01;

export default function generateTailwindPalette(colorInput: string) {
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
  