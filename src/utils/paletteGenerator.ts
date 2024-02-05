import chroma = require("chroma-js");
import { Color } from 'chroma-js';

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
const lightMax = 0.99;
const darkMax = 0.01;

export default function generateTailwindPalette(colorInput: string) {
  if (!chroma.valid(colorInput)) {
    throw new Error(`Invalid color: ${colorInput}. See https://gka.github.io/chroma.js/#chroma-valid for valid color formats.`);
  }

  let inputLuminance = chroma(colorInput).get('oklab.l');

  let initialStepSize = (lightMax + darkMax) / steps;
  let lightStepSize = 0;
  let rangeLight = lightMax - inputLuminance;
  let lightSteps = Math.floor(rangeLight / initialStepSize);

  let darkStepSize = 0;
  let rangeDark = inputLuminance - darkMax;
  let darkSteps = Math.floor(rangeDark / initialStepSize);

  if (lightSteps === 0) {
    if ((rangeLight >= initialStepSize / 2)) {
      lightSteps = 1;
      lightStepSize = rangeLight / 2;
      darkSteps = steps - 2;
    } else {
      lightSteps = 0;
    }
    darkStepSize = (rangeDark / darkSteps);
  } else if (darkSteps === 0) {
    if ((rangeDark >= initialStepSize / 2)) {
      darkSteps = 1;
      darkStepSize = rangeDark / 2;
      lightSteps = steps - 2;
    } else {
      darkSteps = 0;
    }
    lightStepSize = (rangeLight / lightSteps);
  } else {
    lightStepSize = initialStepSize;
    darkStepSize = initialStepSize;
  }


  let luminanceScale: number[] = [];
  for (let i = 1; i <= lightSteps; i++) {
      luminanceScale.push(inputLuminance + (lightStepSize * i));
  };
 
  for (let i = 1; i <= darkSteps; i++) {
    let darkness = inputLuminance - (darkStepSize * i);
    let adjustedDarkness = darkness * (1 - (i / 33));
    luminanceScale.push(adjustedDarkness);
  };


  luminanceScale.push(inputLuminance);

  luminanceScale = luminanceScale.sort((a, b) => b - a);
  const colorScale: Color[] = [];
  luminanceScale.forEach((luminanceStep) => {
    let colorStep = chroma(colorInput).luminance((luminanceStep), 'oklab')
    colorScale.push(colorStep);
  });

  if (colorScale.length != 11) {
    throw new Error(
      `
      Error for: ${colorInput}
      Color scale is not long enough. Expected 11, got ${colorScale.length}.
      lightSteps: ${lightSteps} 
      lightStepSize: ${lightStepSize} 
      rangeLight: ${rangeLight}
      darkSteps: ${darkSteps}
      darkStepSize: ${darkStepSize}
      rangeDark: ${rangeDark}
      `);
  };
  
  const stringFormattedColorScale = colorScale.map((color) => {
    const hsl = color.hsl();
    const hslString = `hsl(${hsl[0]}, ${hsl[1]*100}%, ${hsl[2]*100}%)`;
    return hslString;
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



  