import {
    hexFromArgb,
    Hct,
    MaterialDynamicColors,
    argbFromHex,
    TonalPalette,
} from "@material/material-color-utilities";
import chroma from "chroma-js";

import { validateColor } from "./utils";


type paletteTailwinds = {
    50: chroma.Color;
    100: chroma.Color;
    200: chroma.Color;
    300: chroma.Color;
    400: chroma.Color;
    500: chroma.Color;
    600: chroma.Color;
    700: chroma.Color;
    800: chroma.Color;
    900: chroma.Color;
    950: chroma.Color;
}

const stepsMCU = [ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95 ];
const stepsTailwind = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 ];

export function paletteTailwind(palette): paletteTailwinds {
    return {
      50: palette[0],
      100: palette[1],
      200: palette[2],
      300: palette[3],
      400: palette[4],
      500: palette[5],
      600: palette[6],
      700: palette[7],
      800: palette[8],
      900: palette[9],
      950: palette[10],
    };
}

export function paletteMCU(color: string | chroma.Color): Record<number, string> {
    validateColor(color);
    const colorHex = chroma(color).hex();
    const colorARGB = argbFromHex(colorHex);

    const tonalPalette = TonalPalette.fromInt(colorARGB);

    const palette = {};
    for (let i = 0; i <= stepsMCU.length; i++) {
      const argbTone = tonalPalette.tone(stepsMCU[i]);
      palette[stepsMCU[i]] = hexFromArgb(argbTone);
    }
    return palette;
}

export function paletteChroma(color: string | chroma.Color, mode: 'hsl' | 'rgb' | 'oklab' | 'oklch'  = 'oklch'): Record<number, string> {
    validateColor(color);
    let darkest = chroma(color).luminance(stepsTailwind[0] / 1000, mode);
    let brightest = chroma(color).luminance(stepsTailwind[stepsTailwind.length - 1] / 1000, mode);
    let colorScale = chroma.scale([brightest, color, darkest]).mode(mode);
  
    const palette  = {};
    for (let i = 0; i <= stepsTailwind.length; i++) {
      palette[stepsTailwind[i]] = colorScale(stepsTailwind[i] / 1000).hex();
    }
    return palette;
}

// function generateBlendedPalette(
//     colorInput: string | chroma.Color,
//     ): paletteMaterialDesign {
//     type ColorMode = 'oklab' | 'oklch' | 'hsl';
//     const modes: ColorMode[] = ['oklab', 'oklch', 'hsl']
//     colorFunctions.validateColor(colorInput);
//     let initialPalettes: paletteMaterialDesign[] = modes.map(mode => generatePalette(colorInput, mode));
//     let paletteOutput: paletteMaterialDesign = generatePalette(colorInput);
//     Object.keys(paletteOutput).forEach((key) => {
//       let colors: chroma.Color[] = [];
//       for (let palette of initialPalettes) {
//         colors.push(palette[key]);
//       }
//       paletteOutput[key] = chroma.average(colors, 'oklch', [1, 1, 1.33]);
//     });
//     return paletteOutput;
//   }